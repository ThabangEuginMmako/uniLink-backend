const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('🌐 UniLink Backend is running!');
});

// Listen
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
