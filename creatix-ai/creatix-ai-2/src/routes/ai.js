const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// Route to generate content ideas
router.post('/generate-ideas', aiController.generateContentIdeas);

// Route to create AI content
router.post('/create-content', aiController.createContent);

module.exports = router;