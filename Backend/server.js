const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Mount both route files
const chatRoutes = require('./routes/chat');
const arxivRoutes = require('./routes/arxiv'); // <- this line is CRUCIAL

app.use('/api/chat', chatRoutes);
app.use('/api/arxiv', arxivRoutes); // <- this line is CRUCIAL

app.get('/', (req, res) => {
  res.send('✅ Cosmico Backend is running...');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
