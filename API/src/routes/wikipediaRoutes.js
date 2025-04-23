const express = require('express');
const router = express.Router();
const wikipediaController = require('../controllers/wikipediaController');

router.get('/search', wikipediaController.searchWikipedia);

module.exports = router;
