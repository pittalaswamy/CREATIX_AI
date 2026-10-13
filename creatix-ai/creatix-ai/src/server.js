require('dotenv').config();

const express = require('express');
const path = require('path');
const contentRoutes = require('./routes/contentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const publicDirectory = path.join(__dirname, '..', 'public');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/content', contentRoutes);
app.use(express.static(publicDirectory));

app.listen(PORT, () => {
  console.log(`Creatix AI is running at http://localhost:${PORT}`);
});
