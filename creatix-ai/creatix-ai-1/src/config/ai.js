// src/config/ai.js

const AI_CONFIG = {
    apiKey: process.env.AI_API_KEY, // Your AI service API key
    model: 'text-davinci-003', // Specify the AI model to use
    maxTokens: 150, // Maximum number of tokens to generate
    temperature: 0.7, // Controls the randomness of the output
    topP: 1.0, // Controls diversity via nucleus sampling
    frequencyPenalty: 0, // Penalizes new tokens based on their existing frequency
    presencePenalty: 0 // Penalizes new tokens based on whether they appear in the text so far
};

module.exports = AI_CONFIG;