// This file contains the main JavaScript logic for the application, handling user interactions, making API calls to the backend, and updating the UI dynamically.

document.addEventListener("DOMContentLoaded", function() {
    const generateButton = document.getElementById("generateButton");
    const contentIdeasContainer = document.getElementById("contentIdeas");
    const contentForm = document.getElementById("contentForm");
    const contentInput = document.getElementById("contentInput");

    generateButton.addEventListener("click", function() {
        const prompt = contentInput.value;
        if (prompt) {
            fetch('/api/ai/generate-ideas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt })
            })
            .then(response => response.json())
            .then(data => {
                displayContentIdeas(data.ideas);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while generating content ideas.');
            });
        } else {
            alert('Please enter a prompt to generate content ideas.');
        }
    });

    function displayContentIdeas(ideas) {
        contentIdeasContainer.innerHTML = '';
        ideas.forEach(idea => {
            const ideaElement = document.createElement("div");
            ideaElement.classList.add("idea");
            ideaElement.textContent = idea;
            contentIdeasContainer.appendChild(ideaElement);
        });
    }

    contentForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const content = contentInput.value;
        if (content) {
            fetch('/api/ai/create-content', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content })
            })
            .then(response => response.json())
            .then(data => {
                alert('Content created successfully!');
                contentInput.value = '';
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while creating content.');
            });
        } else {
            alert('Please enter content to create.');
        }
    });
});