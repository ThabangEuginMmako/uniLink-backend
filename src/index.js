const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
console.log('🔍 Loading routes...');
const authRoutes = require('./routes/authRoutes');
const internshipRoutes = require('./routes/internshipRoutes');
const businessAuthRoutes = require('./routes/businessAuthRoutes');
console.log('✅ authRoutes loaded');




// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('🌐 UniLink Backend is running!');
});
app.use('/api/auth', authRoutes);
console.log('✅ /api/auth routes are mounted');

app.post('/ping', (req, res) => {
  console.log('🔥 /ping route hit!');
  res.status(200).send('pong');
});

app.use('/api/internships', internshipRoutes);
app.use('/api/business/auth', businessAuthRoutes);



// Listen
app.listen(PORT, '127.0.0.1', () => {
  console.log(`🚀 Server running on http://127.0.0.1:${PORT}`);
});

// Add this right after
console.log('🧠 This line runs after app.listen');

