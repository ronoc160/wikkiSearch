const axios = require('axios');
const config = require('../../config');

/**
 * Search Wikipedia for a given query term with pagination support.
 * @param {string} query - The search term.
 * @param {number} page - The page number (for pagination).
 * @param {number} resultsPerPage - Number of results per page.
 * @returns {Promise<object>} - The paginated response from Wikipedia API.
 */
async function searchWikipedia(query, page = 1, resultsPerPage = 10) {
  const offset = (page - 1) * resultsPerPage; 

  try {
    const response = await axios.get(config.WIKIPEDIA_API_URL, {
      params: {
        action: 'query',
        list: 'search',
        srsearch: query,
        format: 'json',
        origin: '*', 
        sroffset: offset, 
        srlimit: resultsPerPage,
      },
    });

    const data = response.data;

    return {
      results: data.query.search,
      totalResults: data.query.searchinfo.totalhits,
      currentPage: page,
      nextPage: page + 1,
      hasMore: data.query.search.length === resultsPerPage,
    };
  } catch (error) {
    console.error('Error fetching data from Wikipedia API:', error);
    throw new Error('Failed to fetch data from Wikipedia API');
  }
}

module.exports = {
  searchWikipedia,
};
