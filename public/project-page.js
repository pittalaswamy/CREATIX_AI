const searchInput = document.getElementById("searchInput");
const creatorCards = Array.from(document.querySelectorAll(".creator-card"));
const categoryButtons = Array.from(
    document.querySelectorAll(".category-btn")
);
const noResults = document.getElementById("noResults");
let selectedCategory = "All";

function searchCreators() {
    const query = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    creatorCards.forEach(card => {
        const matchesSearch = card.textContent.toLowerCase().includes(query);
        const matchesCategory =
            selectedCategory === "All" ||
            card.dataset.category === selectedCategory;
        const visible = matchesSearch && matchesCategory;
        card.hidden = !visible;
        visibleCount += visible ? 1 : 0;
    });

    noResults.hidden = visibleCount !== 0;
}

searchInput.addEventListener("input", searchCreators);

categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        selectedCategory = button.dataset.category;
        categoryButtons.forEach(item => {
            item.classList.toggle("active", item === button);
        });
        searchCreators();
    });
});

function viewCreator(name) {
    const card = creatorCards.find(item => item.dataset.name === name);
    if (!card) {
        return;
    }

    alert(card.innerText);
}

async function hireCreator(name) {
    const card = creatorCards.find(item => item.dataset.name === name);
    if (!card) {
        alert("Creator not found.");
        return;
    }

    const title = prompt("Enter the project title:");
    if (!title || !title.trim()) {
        return;
    }

    const budgetText = card.querySelector(".price").textContent;
    const budget = Number(budgetText.replace(/[^\d]/g, ""));

    try {
        const response = await fetch("/api/projects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: title.trim(), creator: name, budget })
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || "Could not create the project.");
        }
        alert("Project saved. View it on the home page.");
    } catch (error) {
        console.error("Could not create project.", error);
        alert("Could not create project: " + error.message);
    }
}
