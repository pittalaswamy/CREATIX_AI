
const express = require('express');
const ContentController = require('../controllers/contentController');

const router = express.Router();
const contentController = new ContentController();

function setRoutes(app) {
    router.post(
        '/generate-ideas',
        contentController.generateContentIdeas.bind(contentController)
    );

    router.post(
        '/create-content',
        contentController.createContent.bind(contentController)
    );

    app.use('/api/content', router);
}

module.exports = setRoutes;
