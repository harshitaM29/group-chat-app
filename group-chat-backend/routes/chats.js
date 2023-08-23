const express = require('express');

const router = express.Router();

const chatController = require('../controllers/chats');
const userAuthentication = require('../middlewares/authenticate');

router.post('/sendChat',userAuthentication.authenticate,chatController.postMessages);
router.get('/getChat',userAuthentication.authenticate,chatController.getMessages);

module.exports = router;