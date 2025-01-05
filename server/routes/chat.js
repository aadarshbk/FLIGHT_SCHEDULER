const express = require('express');
const { handleChat } = require('../controller/chatController'); // Make sure this function exists in the controller
const router = express.Router();

// POST route for handling chat messages
router.post('/api/chat', handleChat);

module.exports = router;
