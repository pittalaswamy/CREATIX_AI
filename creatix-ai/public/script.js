// ======================================
// CreatorOrbit - AI Creator Marketplace
// ======================================


// Sample creator data

const creators = [
    {
        id: 1,
        name: "Mira Kapoor",
        role: "AI Filmmaker",
        skills: ["AI Video", "Storytelling", "Product Ads"],
        price: 8500,
        rating: 4.9,
        emoji: "🎬"
    },

    {
        id: 2,
        name: "Dev Shah",
        role: "3D Animator",
        skills: ["3D Animation", "Motion Design", "Blender"],
        price: 12000,
        rating: 4.8,
        emoji: "🎨"
    },

    {
        id: 3,
        name: "Anya Rao",
        role: "AI Artist",
        skills: ["AI Art", "Midjourney", "Campaign Graphics"],
        price: 4500,
        rating: 5.0,
        emoji: "✨"
    },

    {
        id: 4,
        name: "Kabir Sen",
        role: "Brand Designer",
        skills: ["Brand Design", "Typography", "Figma"],
        price: 7000,
        rating: 4.9,
        emoji: "✳️"
    },

    {
        id: 5,
        name: "Isha Nair",
        role: "Product Visual Creator",
        skills: ["Product Visuals", "AI Images", "Lighting"],
        price: 6000,
        rating: 4.7,
        emoji: "📦"
    },

    {
        id: 6,
        name: "Rohan Verma",
        role: "Social Media Creator",
        skills: ["Social Media", "Video Editing", "Reels"],
        price: 3500,
        rating: 4.8,
        emoji: "📱"
    }
];


// Store projects in the browser

let projects = [];


// Format currency in Indian rupees

function formatMoney(amount) {
    return "₹" + Number(amount).toLocaleString("en-IN");
}


// ======================================
// Display Creator Profiles
// ======================================

function displayCreators(list = creators) {

    const creatorList = document.getElementById("creatorList");

    creatorList.innerHTML = "";

    if (list.length === 0) {
        creatorList.innerHTML =
            "<p>No creators found. Try another search.</p>";
        return;
    }

    list.forEach(creator => {

        const card = document.createElement("div");

        card.className = "creator-card";

        card.innerHTML = `
            <div class="creator-avatar">
                ${creator.emoji}
            </div>

            <h3>${creator.name}</h3>

            <p>${creator.role}</p>

            <p>
                Skills: ${creator.skills.join(", ")}
            </p>

            <p>⭐ ${creator.rating} rating</p>

            <div class="creator-price">
                Starting at ${formatMoney(creator.price)}
            </div>

            <button
                class="primary-btn"
                onclick="createProject(${creator.id})">
                Connect with Creator
            </button>
        `;

        creatorList.appendChild(card);

    });

}


// ======================================
// Search Creators
// ======================================

document.getElementById("searchInput")
    .addEventListener("input", function () {

        const searchText = this.value.toLowerCase().trim();

        const filteredCreators = creators.filter(creator => {

            const searchableText = [
                creator.name,
                creator.role,
                ...creator.skills
            ].join(" ").toLowerCase();

            return searchableText.includes(searchText);

        });

        displayCreators(filteredCreators);

    });


// ======================================
// Navigate to Creators
// ======================================

function showCreators() {

    document.getElementById("creators")
        .scrollIntoView({ behavior: "smooth" });

}


// ======================================
// Brand Brief Form
// ======================================

function showBrandForm() {

    document.getElementById("brands")
        .scrollIntoView({ behavior: "smooth" });

}


document.getElementById("brandForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();

        const brandName =
            document.getElementById("brandName").value.trim();

        const title =
            document.getElementById("projectTitle").value.trim();

        const skills =
            document.getElementById("requiredSkills").value.trim();

        const budget =
            Number(document.getElementById("projectBudget").value);

        const description =
            document.getElementById("projectDescription").value.trim();


        if (!brandName || !title || !skills || !description) {

            alert("Please complete all required fields.");

            return;

        }

        if (!Number.isFinite(budget) || budget < 500) {

            alert("Please enter a valid budget of at least ₹500.");

            return;

        }


        const brief = {
            brandName,
            title,
            skills,
            budget,
            description
        };


        findMatchingCreators(brief);

    });


// ======================================
// Creator Matching Demonstration
// ======================================

function findMatchingCreators(brief) {

    const requestedWords = brief.skills
        .toLowerCase()
        .split(/[, ]+/)
        .filter(word => word.length > 2);

    const matches = creators.map(creator => {

        const creatorText = [
            creator.role,
            ...creator.skills
        ].join(" ").toLowerCase();

        const matchedWords = requestedWords.filter(word =>
            creatorText.includes(word)
        );

        let score = 50 + matchedWords.length * 15;

        // Increase the score when the creator is within budget.

        if (creator.price <= brief.budget) {
            score += 15;
        }

        score = Math.min(score, 98);

        return {
            ...creator,
            score
        };

    }).sort((a, b) => b.score - a.score);


    const matchResults =
        document.getElementById("matchResults");

    matchResults.innerHTML = "<h3>Recommended Creators</h3>";

    matches.slice(0, 3).forEach(creator => {

        const card = document.createElement("div");

        card.className = "match-card";

        card.innerHTML = `
            <h3>${creator.emoji} ${creator.name}</h3>

            <p>${creator.role}</p>

            <p>
                Skills: ${creator.skills.join(", ")}
            </p>

            <span class="match-score">
                ${creator.score}% match
            </span>

            <p>
                Starting price:
                ${formatMoney(creator.price)}
            </p>

            <button
                class="primary-btn"
                onclick="createProject(${creator.id}, ${JSON.stringify(brief.budget)})">
                Select Creator
            </button>
        `;

        matchResults.appendChild(card);

    });

    matchResults.scrollIntoView({ behavior: "smooth" });

}


// ======================================
// Project Management
// ======================================

function createProject(creatorId, budget = null) {

    const creator = creators.find(c => c.id === creatorId);

    if (!creator) {
        alert("Creator not found.");
        return;
    }

    const title =
        prompt("Enter the project title:");

    if (!title || !title.trim()) {
        return;
    }

    const projectBudget =
        budget === null
            ? creator.price
            : Number(budget);

    const project = {
        id: Date.now(),
        title: title.trim(),
        creator: creator.name,
        budget: projectBudget,
        status: "Planning"
    };

    projects.push(project);

    saveProjects();

    displayProjects();

    document.getElementById("projects")
        .scrollIntoView({ behavior: "smooth" });

    alert("Project created successfully!");

}


// ======================================
// Display Projects
// ======================================

function displayProjects() {

    const projectList =
        document.getElementById("projectList");

    projectList.innerHTML = "";

    projects.forEach(project => {

        const card = document.createElement("div");

        card.className = "project-card";

        card.innerHTML = `
            <h3>${project.title}</h3>

            <p>
                Creator: ${project.creator}
            </p>

            <p>
                Budget: ${formatMoney(project.budget)}
            </p>

            <p>
                Status:
                <span class="status-label">
                    ${project.status}
                </span>
            </p>

            <label>Update Status</label>

            <select
                onchange="updateProjectStatus(
                    ${project.id},
                    this.value
                )">

                <option ${project.status === "Planning" ? "selected" : ""}>
                    Planning
                </option>

                <option ${project.status === "In Progress" ? "selected" : ""}>
                    In Progress
                </option>

                <option ${project.status === "Review" ? "selected" : ""}>
                    Review
                </option>

                <option ${project.status === "Delivered" ? "selected" : ""}>
                    Delivered
                </option>

            </select>
        `;

        projectList.appendChild(card);

    });

    document.getElementById("projectCount").textContent =
        projects.length;

}


// ======================================
// Update Project Status
// ======================================

function updateProjectStatus(projectId, newStatus) {

    const project = projects.find(p => p.id === projectId);

    if (!project) {
        return;
    }

    project.status = newStatus;

    saveProjects();

    displayProjects();

}


// ======================================
// Save Projects to Browser Storage
// ======================================

function saveProjects() {

    try {

        localStorage.setItem(
            "creatorOrbitProjects",
            JSON.stringify(projects)
        );

    } catch (error) {

        console.error("Could not save projects.", error);

    }

}


// ======================================
// Load Saved Projects
// ======================================

function loadProjects() {

    try {

        const savedProjects =
            localStorage.getItem("creatorOrbitProjects");

        if (savedProjects) {

            const parsed = JSON.parse(savedProjects);

            if (Array.isArray(parsed)) {
                projects = parsed;
            }

        }

    } catch (error) {

        projects = [];

        console.error("Could not load projects.", error);

    }

}


// ======================================
// Smart Budget Estimator
// ======================================

function calculateBudget() {

    const basePrice =
        Number(document.getElementById("contentType").value);

    const complexity =
        Number(document.getElementById("complexity").value);

    const deliverables =
        Number(document.getElementById("deliverables").value);


    if (
        !Number.isFinite(basePrice) ||
        !Number.isFinite(complexity) ||
        !Number.isInteger(deliverables) ||
        deliverables < 1 ||
        deliverables > 20
    ) {

        alert("Enter valid budget options and 1–20 deliverables.");

        return;

    }


    // Additional deliverables cost 35% of the base price each.

    const subtotal =
        basePrice * (1 + (deliverables - 1) * 0.35);

    const estimatedCost =
        Math.round(subtotal * complexity);

    // Display an indicative range rather than a guaranteed quote.

    const lowerEstimate = estimatedCost;

    const upperEstimate = Math.round(estimatedCost * 1.5);


    document.getElementById("budgetResult").innerHTML = `
        <h3>Estimated Project Budget</h3>

        <p>
            ${formatMoney(lowerEstimate)}
            – ${formatMoney(upperEstimate)}
        </p>

        <small>
            This is an indicative estimate. Actual prices depend
            on the creator, project scope, revisions, and usage rights.
        </small>
    `;

}


// ======================================
// Login Demonstration
// ======================================

function loginUser() {

    const name = prompt("Enter your name:");

    if (!name || !name.trim()) {
        return;
    }

    alert(
        "Welcome to CreatorOrbit, " +
        name.trim() +
        "!"
    );

}


// ======================================
// Initialize Website
// ======================================

loadProjects();

displayCreators();

displayProjects();