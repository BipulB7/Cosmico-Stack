// services/arxivService.js
const axios = require('axios');
const xml2js = require('xml2js');

const ARXIV_API_URL = 'http://export.arxiv.org/api/query';

async function fetchArxivPapers(query, start = 0, max_results = 5) {
  const url = `${ARXIV_API_URL}?search_query=all:${encodeURIComponent(query)}&start=${start}&max_results=${max_results}`;

  const response = await axios.get(url);
  const parser = new xml2js.Parser({ explicitArray: false });
  const parsed = await parser.parseStringPromise(response.data);

  let entries = parsed.feed.entry;
  if (!entries) return [];

  if (!Array.isArray(entries)) {
    entries = [entries];
  }

  return entries.map(entry => ({
    id: entry.id,
    title: entry.title,
    summary: entry.summary,
    authors: Array.isArray(entry.author) ? entry.author.map(a => a.name) : [entry.author.name],
    link: entry.link?.[0]?.$.href || entry.link?.$.href || '',
    published: entry.published,
  }));
}

module.exports = { fetchArxivPapers };
