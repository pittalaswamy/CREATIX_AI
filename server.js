require("dotenv").config();

const path = require("node:path");
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const port = Number(process.env.PORT) || 5000;
const databaseName = process.env.MONGODB_DB || "creator_ai";
const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
let projects;
const allowedStatuses = new Set([
    "Planning",
    "In Progress",
    "Review",
    "Delivered"
]);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", (_req, res, next) => {
    if (!projects) {
        return res.status(503).json({
            message: "MongoDB is unavailable. Start MongoDB and retry."
        });
    }

    next();
});

function serializeProject(project) {
    const { _id, ...fields } = project;
    return { id: _id.toString(), ...fields };
}

function validateProject(body) {
    const data = body && typeof body === "object" ? body : {};
    const title = typeof data.title === "string" ? data.title.trim() : "";
    const creator = typeof data.creator === "string" ? data.creator.trim() : "";
    const budget = data.budget;

    if (!title || title.length > 160) {
        return { error: "Project title must be between 1 and 160 characters." };
    }

    if (!creator || creator.length > 100) {
        return { error: "Creator name must be between 1 and 100 characters." };
    }

    if (!Number.isFinite(budget) || budget < 0) {
        return { error: "Budget must be a non-negative number." };
    }

    return { project: { title, creator, budget } };
}

app.get("/api/projects", async (_req, res, next) => {
        try {
            const records = await projects.find({}).sort({ createdAt: -1 }).toArray();
            res.json(records.map(serializeProject));
        } catch (error) {
            next(error);
        }
    });

app.post("/api/projects", async (req, res, next) => {
        const validation = validateProject(req.body);
        if (validation.error) {
            return res.status(400).json({ message: validation.error });
        }

        try {
            const now = new Date();
            const project = {
                ...validation.project,
                status: "Planning",
                createdAt: now,
                updatedAt: now
            };
            const result = await projects.insertOne(project);
            res.status(201).json(serializeProject({ ...project, _id: result.insertedId }));
        } catch (error) {
            next(error);
        }
    });

app.patch("/api/projects/:id", async (req, res, next) => {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Project ID is invalid." });
        }

        if (typeof req.body?.status !== "string" || !allowedStatuses.has(req.body.status)) {
            return res.status(400).json({ message: "Project status is invalid." });
        }

        try {
            const project = await projects.findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $set: { status: req.body.status, updatedAt: new Date() } },
                { returnDocument: "after" }
            );

            if (!project) {
                return res.status(404).json({ message: "Project not found." });
            }

            res.json(serializeProject(project));
        } catch (error) {
            next(error);
        }
    });

app.use((error, _req, res, _next) => {
    console.error("API request failed:", error);
    const status = error.status >= 400 && error.status < 500 ? error.status : 500;
    res.status(status).json({ message: "The request could not be completed." });
});

async function connectToDatabase() {
    const client = new MongoClient(mongoUri, { serverSelectionTimeoutMS: 2000 });
    try {
        await client.connect();
        projects = client.db(databaseName).collection("projects");
        console.log(`Connected to MongoDB database "${databaseName}".`);
    } catch (error) {
        console.error(`MongoDB unavailable at ${mongoUri}: ${error.message}`);
        await client.close().catch(closeError => {
            console.error("Could not close failed MongoDB connection:", closeError.message);
        });
        const retry = setTimeout(connectToDatabase, 5000);
        retry.unref();
    }
}

app.listen(port, () => {
    console.log(`Creator AI is running at http://localhost:${port}`);
    connectToDatabase();
});
