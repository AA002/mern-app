const express = require('express');
const router = express.Router();
const MessagesController = require('../../controllers/messages');


router.get('/', (req, res) => {
    res.json('Message list');
});

module.exports = router;