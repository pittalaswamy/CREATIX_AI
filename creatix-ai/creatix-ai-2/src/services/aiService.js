class AIService {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }

    async generateContentIdeas(topic) {
        try {
            const response = await this.apiClient.post('/generate-ideas', { topic });
            return response.data.ideas;
        } catch (error) {
            throw new Error('Error generating content ideas: ' + error.message);
        }
    }

    async createContent(idea) {
        try {
            const response = await this.apiClient.post('/create-content', { idea });
            return response.data.content;
        } catch (error) {
            throw new Error('Error creating content: ' + error.message);
        }
    }
}

export default AIService;