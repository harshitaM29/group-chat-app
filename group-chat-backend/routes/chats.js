const express = require('express');

const router = express.Router();

const chatController = require('../controllers/chats');
const userAuthentication = require('../middlewares/authenticate');

router.post('/sendChat',userAuthentication.authenticate,chatController.postMessages);

module.exports = router;