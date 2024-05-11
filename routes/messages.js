const express = require('express');
const router = express.Router();
const Conversation = require('../models/Conversation');

router.post('/log', async (req, res) => {
  try {
    const { userId, message } = req.body;
    const conversation = await Conversation.findOne({ userId });
    if (!conversation) {
      const newConversation = new Conversation({ userId, logs: [{ message, timestamp: new Date() }] });
      await newConversation.save();
    } else {
      conversation.logs.push({ message, timestamp: new Date() });
      await conversation.save();
    }
    res.status(201).send('Log saved');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/logs/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const conversation = await Conversation.findOne({ userId });
    if (!conversation) return res.status(404).send('No logs found');
    res.json(conversation.logs);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;