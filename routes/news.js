var express = require('express');
var router = express.Router();
const axios = require('axios');
const config = require('config');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 3600 }); // Cache articles for 1 hour
const GNEWS_API_KEY = config.get('GNEWS_API_KEY');

// Fetch N news articles
router.get('/articles/:count', async (req, res) => {
    const count = req.params.count;
    if(count == undefined)
        return res.status(400).json({ error: 'count is a mandatory field' });
    if(count <= 0)
        return res.status(400).json({ error: 'count needs to be a positive number' });

    const cacheKey = `articles_${count}`;
  
    // Check if the data is cached
    if (cache.has(cacheKey)) {
      const cachedData = cache.get(cacheKey);
      return res.json(cachedData);
    }
  
    try {
      const response = await axios.get(
        `https://gnews.io/api/v4/top-headlines?token=${GNEWS_API_KEY}&max=${count}`
      );
      const articles = response.data.articles;
      cache.set(cacheKey, articles);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
// Find articles by keyword
router.get('/search', async (req, res) => {
    const { query, count } = req.query;
    if(count== undefined)
        return res.status(400).json({ error: 'count is a mandatory field' });
    if(count <= 0)
        return res.status(400).json({ error: 'count needs to be a positive number' });

    if(query == undefined)
        return res.status(400).json({ error: 'query is a mandatory field' });

    const cacheKey = `search_${count}_${query}`;
  
    if (cache.has(cacheKey)) {
      const cachedData = cache.get(cacheKey);
      return res.json(cachedData);
    }
  
    try {
      const response = await axios.get(
        `https://gnews.io/api/v4/search?q=${query}&max=${count}&token=${GNEWS_API_KEY}`
      );
      const articles = response.data.articles;
      cache.set(cacheKey, articles);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Find articles by keyword
router.get('/search_title', async (req, res) => {
    const { query, count } = req.query;
    if(count== undefined)
        return res.status(400).json({ error: 'count is a mandatory field' });
    
    if(count <= 0)
        return res.status(400).json({ error: 'count needs to be a positive number' });

    if(query == undefined)
        return res.status(400).json({ error: 'query is a mandatory field' });

    const cacheKey = `search_${count}_title_${query}`;
  
    if (cache.has(cacheKey)) {
      const cachedData = cache.get(cacheKey);
      return res.json(cachedData);
    }
  
    try {
      const response = await axios.get(
        `https://gnews.io/api/v4/search?q=${query}&in=title&max=${count}&token=${GNEWS_API_KEY}`
      );
      const articles = response.data.articles;
      cache.set(cacheKey, articles);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/top_headlines', async (req, res) => {
    const { category, count } = req.query;
    const validCategory = ["general", "world", "nation", "business", "technology", "entertainment", "sports", "science", "health"]

    if(count== undefined)
        return res.status(400).json({ error: 'count is a mandatory field' });
    
    if(count <= 0)
        return res.status(400).json({ error: 'count needs to be a positive number' });

    if(category== undefined)
        return res.status(400).json({ error: 'category is a mandatory field' });

    if(!validCategory.includes(category))
        return res.status(400).json({ error: 'kindly add a valid Category; check the readme for more info' });
        
    const cacheKey = `search_${count}_${category}`;

    if (cache.has(cacheKey)) {
      const cachedData = cache.get(cacheKey);
      return res.json(cachedData);
    }
  
    try {
      const response = await axios.get(
        `https://gnews.io/api/v4/top-headlines?category=${category}&max=${count}&token=${GNEWS_API_KEY}`
      );
      const articles = response.data.articles;
      cache.set(cacheKey, articles);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/top_headlines_categories', async (req, res) => {
    const validCategory = ["general", "world", "nation", "business", "technology", "entertainment", "sports", "science", "health"]
    res.json(validCategory);
});

module.exports = router;
