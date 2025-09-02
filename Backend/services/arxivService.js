
const axios = require('axios');
const xml2js = require('xml2js');

const ARXIV_API_URL = 'http://export.arxiv.org/api/query';

/**
<<<<<<< HEAD
 * Fetch papers 
 * 
 * @param {string} query - 
 * @param {number} start - 
 * @param {number} max_results - 
 * @returns {Promise<Array>} - 
=======
 * Fetch papers from arXiv based on a user query.
 * 
 * @param {string} query - Search term (e.g. "quantum gravity")
 * @param {number} start - Start index for pagination
 * @param {number} max_results - Max number of results to fetch
 * @returns {Promise<Array>} - Array of formatted paper objects
>>>>>>> d23eb93d (Front+Backend fully live! Website deployment ready.)
 */
async function fetchArxivPapers(query, start = 0, max_results = 5) {
  const encodedQuery = encodeURIComponent(`all:${query}`);
  const url = `${ARXIV_API_URL}?search_query=${encodedQuery}&start=${start}&max_results=${max_results}&sortBy=submittedDate&sortOrder=descending`;

  try {
    const response = await axios.get(url, { timeout: 10000 });
    const parser = new xml2js.Parser({ explicitArray: false });
    const parsed = await parser.parseStringPromise(response.data);

    let entries = parsed.feed?.entry;
    if (!entries) return [];

    if (!Array.isArray(entries)) {
<<<<<<< HEAD
      entries = [entries]; // Normalize 
    }

    return entries.map(entry => {
      //  PDF link
=======
      entries = [entries]; // Normalize to array
    }

    return entries.map(entry => {
      // Find PDF link
>>>>>>> d23eb93d (Front+Backend fully live! Website deployment ready.)
      let pdfLink = '';
      if (Array.isArray(entry.link)) {
        const pdfEntry = entry.link.find(l => l.$.type === 'application/pdf');
        pdfLink = pdfEntry?.$.href || '';
      } else if (entry.link?.$.type === 'application/pdf') {
        pdfLink = entry.link.$.href;
      }

      return {
        id: entry.id,
        title: (entry.title || "Untitled").trim(),
        summary: (entry.summary || "No summary available.").trim(),
        authors: Array.isArray(entry.author)
          ? entry.author.map(a => a.name)
          : [entry.author?.name || "Unknown"],
        link: pdfLink || entry.id,
        published: entry.published || null,
      };
    });
  } catch (err) {
    console.error("ArXiv fetch error:", err.message);
    return [];
  }
}

module.exports = { fetchArxivPapers };
