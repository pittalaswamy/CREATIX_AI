class AIService {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async fetchContentIdeas() {
    try {
      const response = await this.apiClient.get('/ai/content-ideas');
      return response.data;
    } catch (error) {
      throw new Error('Error fetching content ideas: ' + error.message);
    }
  }

  async generateContent(idea) {
    try {
      const response = await this.apiClient.post('/ai/generate-content', { idea });
      return response.data;
    } catch (error) {
      throw new Error('Error generating content: ' + error.message);
    }
  }
}

export default AIService;