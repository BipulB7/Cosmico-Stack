const { OpenAI } = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Internal helper to determine which model to use
 */
async function determineModel(userMessage, summarizePapers) {
  if (summarizePapers) return "gpt-4o"; // always use 4o if summarizing papers

  const routingQuestion = `Determine if the following user message is a simple, general-purpose question or if it requires research-level reasoning or interaction with scientific papers.

Respond only with "SIMPLE" or "RESEARCH".

Message: "${userMessage}"`;

  try {
    const result = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You're a routing assistant. Just respond with SIMPLE or RESEARCH." },
        { role: "user", content: routingQuestion }
      ],
      temperature: 0,
    });

    const classification = result.choices?.[0]?.message?.content?.trim().toUpperCase();
    return classification === "RESEARCH" ? "gpt-4o" : "gpt-3.5-turbo";
  } catch (err) {
    console.warn("Routing fallback: defaulting to gpt-3.5-turbo");
    return "gpt-3.5-turbo";
  }
}

/**
 * Generate a response from OpenAI, optionally including paper summaries.
 * 
 * @param {string} userMessage - The user's question or input.
 * @param {boolean} summarizePapers - Whether to include paper context.
 * @param {Array} papers - Array of arXiv paper objects (title, authors, summary, link).
 * @returns {Promise<string>} - AI-generated response.
 */
async function getSmartResponse(userMessage, summarizePapers = false, papers = []) {
  try {
    const model = await determineModel(userMessage, summarizePapers);

    let systemPrompt = "You are Cosmico, an AI research assistant helping users understand scientific papers.";

    // Prepend paper context if needed
    if (summarizePapers && papers.length > 0) {
      const formatted = papers.map((p, i) =>
        `Paper ${i + 1}:\nTitle: ${p.title}\nAuthors: ${p.authors.join(', ')}\nSummary: ${p.summary}\nLink: ${p.link}`
      ).join("\n\n");

      userMessage = `Here are some papers:\n\n${formatted}\n\nUser wants: "${userMessage}". Please help accordingly.`;
    }

    const response = await openai.chat.completions.create({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      temperature: 0.7,
    });

    return response.choices?.[0]?.message?.content?.trim() || "I couldn't generate a response.";
  } catch (err) {
    console.error("OpenAI API Error:", err.message);
    throw new Error("Cosmico failed to respond. Try again.");
  }
}

module.exports = { getSmartResponse };
