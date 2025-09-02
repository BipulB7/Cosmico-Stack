// routes/chat.js
const express = require('express');
const router = express.Router();
const { getSmartResponse } = require('../services/aiService');
const { fetchArxivPapers } = require('../services/arxivService');

function extractArxivQuery(message) {
  const knownTopics = [
    "quantum gravity", "string theory", "general relativity", "dark matter",
    "black holes", "ai ethics", "cosmology", "quantum computing",
    "particle physics", "neural networks", "language models", "machine learning",
    "higgs boson", "gravitational waves", "entanglement"
  ];
  const lower = message.toLowerCase();
  for (const topic of knownTopics) {
    if (lower.includes(topic)) return topic;
  }
  const match = lower.match(/(?:paper|research|article) on ([\w\s-]+)/i);
  if (match && match[1]) return match[1].trim();
  return "quantum physics";
}

router.post('/', async (req, res) => {
  const { message } = req.body;
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required and must be a string.' });
  }

  try {
    const lower = message.toLowerCase();
    const isResearchIntent = [
      "paper","arxiv","cite","citation","summarize",
      "quantum","relativity","gravity","research","physics","black hole","string theory",
      "cosmology","neutrino","dark matter","higgs","ml","transformer","language model"
    ].some(k => lower.includes(k));

    // Fetch papers when intent looks researchy
    let papers = [];
    if (isResearchIntent) {
      const topic = extractArxivQuery(message);
      papers = await fetchArxivPapers(topic, 0, 5);
    }

    // ✅ Call service with just (message, _, papers)
    const aiReply = await getSmartResponse(message, undefined, papers);

    res.json({ response: aiReply });
  } catch (err) {
    console.error("[Cosmico] Chat error:", err);
    res.status(500).json({ error: 'Failed to generate AI response.' });
  }
});

module.exports = router;
