# Creatix AI

Creatix AI is a small Node.js and Express application for generating content ideas and social media posts with the OpenAI API.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- Generate content ideas using AI.
- Create AI-generated content based on user input.
- Responsive design for a seamless user experience.
- Serve the frontend and API from the same local server.

The login page is currently a UI mockup; authentication and account creation are not implemented.

## Technologies

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **AI Integration:** OpenAI Chat Completions API
- **Environment Variables:** Managed with `.env` file

## Installation

1. Install Node.js.
2. In PowerShell, navigate to this project directory (the one containing this `package.json`):
   ```powershell
   cd "C:\path\to\creatix-ai\creatix-ai"
   ```
3. Install dependencies:
   ```powershell
   npm install
   ```
4. Copy `.env.example` to `.env` and set `OPENAI_API_KEY` to your OpenAI API key. Keep the key private and do not commit `.env`.

## Usage

Run the development server:
```powershell
npm run dev
```

Open `http://localhost:5000`. The server also provides `GET /api/health`; content generation requires a valid OpenAI API key and may incur API charges.

## API Endpoints

- **GET /api/health**: Check that the server is running.
- **POST /api/content/generate-ideas**: Generate ideas from `{ "topic": "..." }`.
- **POST /api/content/create-content**: Create a post from `{ "idea": "..." }`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.