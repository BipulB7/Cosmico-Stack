# Cosmico —  AI Research Assistant

Cosmico is an AI-powered assistant that helps researchers, students, and enthusiasts explore, summarize, and synthesize academic research — starting with arXiv integration and expanding to more sources soon.

>  Ask research questions →  Retrieve relevant papers →  Get intelligent summaries, citations, and insights — all in one place.

---

##  Features

- 🔗 **Real-time arXiv integration**: Pulls top academic papers based on user queries.
- 🧠 **GPT-4o & GPT-3.5 Turbo** logic switching:
  - Smart model selection based on complexity.
- 🧾 **Cite-ready output**: Summary, analysis, and BibTeX-ready citations.
-  **Modern Chat UI** (like ChatGPT):
  - Responsive dark mode
  - Scroll-to-bottom behavior
  - Suggested prompts
  - Animated loading dots
  - Multi-chat tabs (in progress)

---

##  Project Structure

```bash
Cosmico/
├── frontend/           # React + Tailwind UI
│   ├── components/
│   └── pages/
│       └── ChatPage.jsx
├── backend/            # Express.js + OpenAI + arXiv
│   ├── routes/
│       ├── chat.js
│       └── arxiv.js
│   ├── services/
│       ├── aiService.js
│       └── arxivService.js
│   └── server.js
└── .env                # (not committed) stores OpenAI API key
---
```
###  Setup Instructions

###  Backend

Navigate to the `backend/` folder:

```bash
cd backend
npm install
```

Create a `.env` file:

```ini
OPENAI_API_KEY=your-key-here
```

Start server:

```bash
node server.js
```

---

### 🌐 Frontend

Navigate to the `frontend/` folder:

```bash
cd frontend
npm install
npm run dev
```

---

## 📡 API Endpoints

- `POST /api/chat`  
  → Sends a user query, decides whether to fetch arXiv papers, and returns a smart AI response.

- `GET /api/arxiv?query=your+topic`  
  → Fetches academic papers related to a search query from arXiv.

---

##  To-Do / In Progress

- [x] OpenAI + arXiv multi-source pipeline  
- [x] GPT model switching logic  
- [x] Welcome animation + prompt suggestions  
- [ ] Paper viewer & citation exporter  
- [ ] User authentication  
- [ ] Chat history & saved threads  
- [ ] PDF/DOI ingestion  

---

## 💡 Inspiration

Built for researchers who want **fast**, **relevant**, and **actionable** insights — without reading 10 PDFs first.

---

## ⚠ Security Notice

- `.env` files are **never committed**.  
- GitHub Push Protection is enabled to block accidental secret exposure.

---

## 🧠 Powered By

- OpenAI API  
- arXiv API  
- React + Vite  
- Node.js + Express

---

##  Author

**Bipul Banjade**  
📍 NYU Physics & CS  
🌐 [www.bipulpbanjade.com](https://www.bipulpbanjade.com)  
🔗 [LinkedIn](https://linkedin.com/in/bipul77) | [GitHub](https://github.com/BipulB7)
