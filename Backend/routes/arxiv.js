// routes/arxiv.js
const express = require('express');
const router = express.Router();
const { fetchArxivPapers } = require('../services/arxivService');

router.get('/', async (req, res) => {
  const { query, start = 0, max_results = 5 } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Query is required' });
  }

  try {
    const papers = await fetchArxivPapers(query, start, max_results);
    res.json({ papers });
  } catch (error) {
    console.error('Error fetching arXiv papers:', error);
    res.status(500).json({ message: 'Error fetching papers from arXiv' });
  }
});

module.exports = router;
