const express = require('express');
const ContentController = require('../controllers/contentController');
const AIService = require('../services/aiService');

const router = express.Router();
const contentController = new ContentController(new AIService());

router.post('/generate-ideas', contentController.generateContentIdeas.bind(contentController));
router.post('/create-content', contentController.createContent.bind(contentController));

module.exports = router;
