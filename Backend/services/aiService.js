// services/aiService.js
const { OpenAI } = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
<<<<<<< HEAD
 *  which GPT model to use based on message complexity
 * @param {string} userMessage
 * @param {boolean} summarizePapers
 * @returns {Promise<string>} - Model  
=======
 * Decide which GPT model to use based on message complexity or paper summarization.
 * @param {string} userMessage
 * @param {boolean} summarizePapers
 * @returns {Promise<string>} - Model name to use
>>>>>>> d23eb93d (Front+Backend fully live! Website deployment ready.)
 */
async function determineModel(userMessage, summarizePapers) {
  if (summarizePapers) return "gpt-4o";

  const routingQuestion = `Does this user request involve scientific research, scientific paper access, or academic summarization?

Respond ONLY with "RESEARCH" or "SIMPLE".

Message: "${userMessage}"`;

  try {
    const result = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a classifier. Return only 'SIMPLE' or 'RESEARCH'." },
        { role: "user", content: routingQuestion }
      ],
      temperature: 0
    });

    const answer = result.choices?.[0]?.message?.content?.trim().toUpperCase();
    return answer === "RESEARCH" ? "gpt-4o" : "gpt-3.5-turbo";
  } catch (err) {
    console.warn("Routing failed, using gpt-3.5-turbo as fallback.", err.message);
    return "gpt-3.5-turbo";
  }
}

/**
<<<<<<< HEAD
 *  AI 
=======
 * Generate AI response, injecting arXiv papers if applicable.
>>>>>>> d23eb93d (Front+Backend fully live! Website deployment ready.)
 * @param {string} userMessage
 * @param {boolean} summarizePapers
 * @param {Array} papers
 * @returns {Promise<string>}
 */
async function getSmartResponse(userMessage, summarizePapers = false, papers = []) {
  try {
    const model = await determineModel(userMessage, summarizePapers);

    let systemPrompt = `
You are Cosmico, an advanced AI academic assistant with access to arXiv research paper data.

Instructions:
- ONLY use the paper data provided below.
- NEVER say you can't access arXiv — you already have the relevant information.
- Be accurate, concise, and reference papers by number (e.g., "Paper 2").
- When asked to summarize, generate summaries based on the 'summary' field of each paper.
- If asked to compare or find the best paper, choose based on relevance of the title + summary.

Respond clearly and with helpful scientific insight.
    `.trim();

    if (summarizePapers && papers.length > 0) {
      const formatted = papers.map((p, i) => 
        `Paper ${i + 1}:\nTitle: ${p.title.trim()}\nAuthors: ${p.authors.join(', ')}\nSummary: ${p.summary.trim()}\nLink: ${p.link}`
      ).join("\n\n");

      userMessage = `
You have access to these papers from arXiv:

${formatted}

The user's request is:
"${userMessage}"

Please provide a helpful response based strictly on the provided content.
      `.trim();
    }

    const result = await openai.chat.completions.create({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ],
      temperature: 0.7
    });

    return result.choices?.[0]?.message?.content?.trim() || "I couldn't generate a response.";
  } catch (err) {
    console.error("AI response error:", err.message);
    throw new Error("Cosmico failed to generate a response.");
  }
}

module.exports = { getSmartResponse };
