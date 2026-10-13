const axios = require('axios');
const AI_CONFIG = require('../config/ai');

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

class AIService {
  async complete(prompt) {
    if (!AI_CONFIG.apiKey) {
      const error = new Error('AI is not configured. Add OPENAI_API_KEY to your .env file.');
      error.statusCode = 503;
      throw error;
    }

    try {
      const response = await axios.post(
        OPENAI_URL,
        {
          model: AI_CONFIG.model,
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
          max_tokens: 600
        },
        {
          headers: {
            Authorization: `Bearer ${AI_CONFIG.apiKey}`,
            'Content-Type': 'application/json'
          },
          timeout: 30000
        }
      );

      const content = response.data.choices?.[0]?.message?.content?.trim();
      if (!content) {
        throw new Error('The AI provider returned an empty response.');
      }
      return content;
    } catch (error) {
      const providerMessage = error.response?.data?.error?.message;
      const message = providerMessage || error.message;
      const serviceError = new Error(`AI request failed: ${message}`);
      serviceError.statusCode = error.response ? 502 : 503;
      throw serviceError;
    }
  }

  async fetchContentIdeas(topic) {
    const ideas = await this.complete(
      `Give five distinct, practical social media content ideas about "${topic}". ` +
      'Return one idea per line, without an introduction.'
    );

    return ideas
      .split('\n')
      .map((idea) => idea.replace(/^\s*(?:[-*•]|\d+[.)])\s*/, '').trim())
      .filter(Boolean);
  }

  async generateContent(idea) {
    return this.complete(
      `Create a polished, engaging social media post based on this idea: "${idea}". ` +
      'Return only the post text.'
    );
  }
}

module.exports = AIService;
