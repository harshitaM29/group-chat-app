const express = require('express');

const router = express.Router();
const messageController = require('../controllers/message');
const userAuthentication = require('../middlewares/authenticate');

router.post('/sendMessage', userAuthentication.authenticate, messageController.sendMessage);
router.get('/fetchMessages/:groupId',userAuthentication.authenticate,messageController.fetchAllMessages);

module.exports = router;