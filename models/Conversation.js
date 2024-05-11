const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  logs: [{ message: String, timestamp: Date }]
});

module.exports = mongoose.model('Conversation', ConversationSchema);