const express = require('express');

const router = express.Router();
const messageController = require('../controllers/message');
const userAuthentication = require('../middlewares/authenticate');

router.post('/sendMessage', userAuthentication.authenticate, messageController.sendMessage);
router.get('/fetchMessages/:groupId',userAuthentication.authenticate,messageController.fetchAllMessages);
router.post('/sendMediaFiles',userAuthentication.authenticate,messageController.sendMedia);

module.exports = router;