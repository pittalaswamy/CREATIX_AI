// This file manages the login functionality, including form submission, validation, and handling responses from the backend.

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Basic validation
    if (!email || !password) {
        document.getElementById("message").textContent = "Please fill in all fields.";
        return;
    }

    // Send login request to the backend
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Login failed. Please check your credentials.');
        }
        return response.json();
    })
    .then(data => {
        // Handle successful login
        document.getElementById("message").textContent = "Login successful! Redirecting...";
        // Redirect to the main application page or dashboard
        window.location.href = '/dashboard.html';
    })
    .catch(error => {
        document.getElementById("message").textContent = error.message;
    });
});