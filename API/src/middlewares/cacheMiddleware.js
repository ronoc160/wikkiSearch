const cache = {}; 
const CACHE_EXPIRY_MS = 5 * 60 * 1000; 

/**
 * Middleware to cache search results based on query and page parameters.
 */
const cacheMiddleware = (req, res, next) => {
  const query = req.query.q;
  const page = req.query.page || 1;

  if (!query) {
    return next();
  }

  const cacheKey = `${query}-${page}`;
  const cachedResult = cache[cacheKey];
  
  if (cachedResult && Date.now() - cachedResult.timestamp < CACHE_EXPIRY_MS) {
    console.log('Serving from cache');
    return res.json(cachedResult.data);
  }
  
  next();
};

module.exports = {
  cacheMiddleware,
  cache,
};
