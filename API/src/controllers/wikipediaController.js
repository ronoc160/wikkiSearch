const wikipediaService = require('../services/wikipediaService');
const { cache } = require('../middlewares/cacheMiddleware');

exports.searchWikipedia = async (req, res) => {
  const query = req.query.q;
  const page = parseInt(req.query.page) || 1;
  const cacheKey = `${query}-${page}`;

  if (!query) {
    return res.status(400).json({ error: 'Search query parameter "q" is required.' });
  }

  try {
    const data = await wikipediaService.searchWikipedia(query, page);

    cache[cacheKey] = {
      timestamp: Date.now(),
      data: data,
    };

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching data from Wikipedia.' });
  }
};
