// routes/chat.js
const express = require('express');
const router = express.Router();
const { getSmartResponse } = require('../services/aiService');
const { fetchArxivPapers } = require('../services/arxivService');

// POST /api/chat
router.post('/', async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required and must be a string.' });
  }

  try {
    // Step 1: Ask GPT if it needs to pull papers
    const gptQuery = `Does the following message ask for scientific papers or research content? Reply only "YES" or "NO".\n\nMessage: "${message}"`;
    const needsArxivRaw = await getSmartResponse(gptQuery, false);
    const needsArxiv = needsArxivRaw.trim().toUpperCase().startsWith("YES");

    // Step 2: Conditionally fetch papers
    const papers = needsArxiv ? await fetchArxivPapers(message, 0, 5) : [];

    // Step 3: Ask GPT for final response
    const aiReply = await getSmartResponse(message, needsArxiv, papers);

    res.json({ response: aiReply });
  } catch (err) {
    console.error("Chat error:", err.message);
    res.status(500).json({ error: 'Failed to generate AI response.' });
  }
});

module.exports = router;
