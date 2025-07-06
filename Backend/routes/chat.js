
const express = require('express');
const router = express.Router();
const { getSmartResponse } = require('../services/aiService');
const { fetchArxivPapers } = require('../services/arxivService');

//  probable research topic from user message
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

  return "quantum physics"; // default fallback
}

// POST /api/chat
router.post('/', async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required and must be a string.' });
  }

  try {
    const lower = message.toLowerCase();
    const isResearchPrompt = [
      "paper", "arxiv", "cite", "citation", "summarize",
      "quantum", "relativity", "gravity", "research", "physics", "black hole", "string theory"
    ].some(keyword => lower.includes(keyword));

    console.log("\n[Cosmico] Incoming:", message);
    console.log("[Cosmico] Is research-related:", isResearchPrompt);

    // Fetch arXiv papers if it's research-related
    let papers = [];
    if (isResearchPrompt) {
      const topic = extractArxivQuery(message);
      console.log("[Cosmico] Querying arXiv with:", topic);
      papers = await fetchArxivPapers(topic, 0, 5);
      console.log(`[Cosmico] Found ${papers.length} papers`);
      papers.forEach((p, i) =>
        console.log(`  ${i + 1}. ${p.title} (${p.link})`)
      );
    }

    // Get AI response
    const aiReply = await getSmartResponse(message, isResearchPrompt, papers);

    res.json({ response: aiReply });
  } catch (err) {
    console.error("[Cosmico] Chat error:", err.message);
    res.status(500).json({ error: 'Failed to generate AI response.' });
  }
});

module.exports = router;
