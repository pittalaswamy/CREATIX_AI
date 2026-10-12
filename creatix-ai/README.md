# Creatix AI

Creatix AI is a full-stack application designed to help users generate content ideas and create AI-generated content. This project combines a user-friendly frontend with a powerful backend that integrates an AI model for content generation.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication with a login page.
- Generate content ideas using AI.
- Create AI-generated content based on user input.
- Responsive design for a seamless user experience.

## Technologies

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **AI Integration:** Custom AI model (details in `src/config/ai.js`)
- **Database:** (Specify if applicable)
- **Environment Variables:** Managed with `.env` file

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/creatix-ai.git
   ```
2. Navigate to the project directory:
   ```
   cd creatix-ai
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Create a `.env` file based on the `.env.example` template and fill in the required variables.

## Usage

1. Start the server:
   ```
   npm start
   ```
2. Open your browser and navigate to `http://localhost:3000` to access the application.

## API Endpoints

- **POST /api/content/generate-ideas**: Generate content ideas.
- **POST /api/content/create**: Create AI-generated content.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.