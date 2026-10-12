class AIController {
    constructor(aiService) {
        this.aiService = aiService;
    }

    async generateContentIdeas(req, res) {
        try {
            const ideas = await this.aiService.getContentIdeas(req.body);
            res.status(200).json({ success: true, ideas });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async createContent(req, res) {
        try {
            const content = await this.aiService.createContent(req.body);
            res.status(201).json({ success: true, content });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

export default AIController;