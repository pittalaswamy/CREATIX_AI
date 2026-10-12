// public/js/app.js

document.addEventListener("DOMContentLoaded", function() {
    const contentForm = document.getElementById("contentForm");
    const messageElement = document.getElementById("message");

    if (contentForm) {
        contentForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const formData = new FormData(contentForm);
            const contentType = formData.get("contentType");
            const contentInput = formData.get("contentInput");

            fetch("/api/content/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ contentType, contentInput }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    messageElement.textContent = "Content generated successfully!";
                    // Display generated content
                    displayGeneratedContent(data.content);
                } else {
                    messageElement.textContent = "Error: " + data.message;
                }
            })
            .catch(error => {
                messageElement.textContent = "An error occurred: " + error.message;
            });
        });
    }

    function displayGeneratedContent(content) {
        const contentDisplay = document.getElementById("contentDisplay");
        contentDisplay.innerHTML = ""; // Clear previous content
        const contentElement = document.createElement("div");
        contentElement.textContent = content;
        contentDisplay.appendChild(contentElement);
    }
});