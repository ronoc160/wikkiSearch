const express = require('express');
const app = express();
const wikipediaRoutes = require('./routes/wikipediaRoutes');
const { cacheMiddleware } = require('./middlewares/cacheMiddleware');
const rateLimiter = require('./middlewares/rateLimiter');

app.use(express.json());

app.use('/api/wikipedia', rateLimiter);

app.use('/api/wikipedia/search', cacheMiddleware);

app.use('/api/wikipedia', wikipediaRoutes);

module.exports = app;
