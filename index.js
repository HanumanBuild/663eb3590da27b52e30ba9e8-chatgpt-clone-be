const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// START Import routes
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
// END Import and Use routes

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));