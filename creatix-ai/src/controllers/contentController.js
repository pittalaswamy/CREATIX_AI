class ContentController {
    constructor(aiService) {
        this.aiService = aiService;
    }

    async generateContentIdeas(req, res) {
        try {
            const ideas = await this.aiService.fetchContentIdeas();
            res.status(200).json({ ideas });
        } catch (error) {
            res.status(500).json({ message: 'Error generating content ideas', error: error.message });
        }
    }

    async createContent(req, res) {
        const { idea } = req.body;
        try {
            const content = await this.aiService.generateContent(idea);
            res.status(200).json({ content });
        } catch (error) {
            res.status(500).json({ message: 'Error creating content', error: error.message });
        }
    }
}

export default ContentController;