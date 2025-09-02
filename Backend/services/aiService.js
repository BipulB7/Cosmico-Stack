// services/aiService.js
const { OpenAI } = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/* ========= Formatting helpers ========= */
function latexify(s = "") {
  let out = s.trim();
  // (10^9) or 10^9  -> $10^{9}$
  out = out.replace(/\((\d+)\^(\d+)\)/g, (_m, b, e) => `$${b}^{${e}}$`);
  out = out.replace(/\b(\d+)\^(\d+)\b/g, (_m, b, e) => `$${b}^{${e}}$`);
  // CνB -> $C_{\nu}B$
  out = out.replace(/C\s*ν\s*B/gi, `$C_{\\nu}B$`);
  // >=, <= and unicode
  out = out.replace(/≥/g, `\\(\\ge\\)`).replace(/≤/g, `\\(\\le\\)`)
           .replace(/>=/g, `\\(\\ge\\)`).replace(/<=/g, `\\(\\le\\)`);
  // (Z)-boson -> $Z$-boson
  out = out.replace(/\(Z\)-boson/gi, `$Z$-boson`);
  return out;
}

function buildStructuredFromPaper(paper) {
  const title = paper.title?.trim() || "Untitled";
  const authors = Array.isArray(paper.authors) ? paper.authors.join(", ") : (paper.authors || "—");
  const link = paper.link || paper.id || "";
  const summary = paper.summary?.trim() || "—";

  const md = [
    `## Paper Summary: **${title}**`,
    ``,
    `**Authors:** ${authors}`,
    link ? `**Link:** [arXiv PDF](${link})` : ``,
    ``,
    `---`,
    ``,
    `### Summary`,
    `${summary}`,
  ].join("\n");

  return latexify(md);
}

/* ========= (Optional) model routing for non-paper chats ========= */
async function determineModel(userMessage, summarizePapers) {
  if (summarizePapers) return "gpt-4o";
  try {
    const result = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a classifier. Return only 'SIMPLE' or 'RESEARCH'." },
        {
          role: "user",
          content:
            `Does this user request involve scientific research, scientific paper access, or academic summarization?\n\n` +
            `Respond ONLY with "RESEARCH" or "SIMPLE".\n\nMessage: "${userMessage}"`
        }
      ],
      temperature: 0
    });
    const a = result.choices?.[0]?.message?.content?.trim().toUpperCase();
    return a === "RESEARCH" ? "gpt-4o" : "gpt-3.5-turbo";
  } catch {
    return "gpt-3.5-turbo";
  }
}

function buildSystemPrompt() {
  return `
You are Cosmico, an academic assistant.

OUTPUT RULES:
- ALWAYS STRUCUTRE OUTPUT NICELY (CLEAR SECTIONS, HEADERS, SEPARATION) REGARDLESS OF WETHER USER ASKS FOR IT OR NOT.
- INCLUDE LINKS TO ANY FETCHED PAPERS.
- Use Markdown headers and bold labels when appropriate.
- Use LaTeX for math: $10^{9}\\,\\mathrm{GeV}$, $C_{\\nu}B$, $\\gtrsim$.
- Use standard Markdown links.
`.trim();
}

/* ========= Main orchestrator ========= */
async function getSmartResponse(userMessage, summarizePapers = false, papers = []) {
  // 🔒 HARD GUARANTEE: if we fetched papers, ALWAYS return structured template
  if (summarizePapers && Array.isArray(papers) && papers.length > 0) {
    // Choose Paper 1 by default. (You can add smarter ranking later.)
    const paper = papers[0];
    return buildStructuredFromPaper(paper);
  }

  // Otherwise, normal chat (no papers fetched) -> use model, then latexify
  const model = await determineModel(userMessage, summarizePapers);
  const result = await openai.chat.completions.create({
    model,
    messages: [
      { role: "system", content: buildSystemPrompt() },
      { role: "user", content: userMessage }
    ],
    temperature: 0.6
  });

  const raw = result.choices?.[0]?.message?.content?.trim() || "I couldn't generate a response.";
  return latexify(raw);
}

module.exports = { getSmartResponse };
