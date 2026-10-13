class ContentController {
  constructor(aiService) {
    this.aiService = aiService;
  }

  async generateContentIdeas(req, res) {
    const { topic } = req.body;
    if (typeof topic !== 'string' || !topic.trim()) {
      return res.status(400).json({ message: 'Enter a topic to generate ideas.' });
    }

    try {
      const ideas = await this.aiService.fetchContentIdeas(topic.trim());
      return res.status(200).json({ ideas });
    } catch (error) {
      console.error('Content idea generation failed:', error);
      return res.status(error.statusCode || 502).json({ message: error.message });
    }
  }

  async createContent(req, res) {
    const { idea } = req.body;
    if (typeof idea !== 'string' || !idea.trim()) {
      return res.status(400).json({ message: 'Choose an idea to create content.' });
    }

    try {
      const content = await this.aiService.generateContent(idea.trim());
      return res.status(200).json({ content });
    } catch (error) {
      console.error('Content generation failed:', error);
      return res.status(error.statusCode || 502).json({ message: error.message });
    }
  }
}

module.exports = ContentController;
