const express = require('express');

const router = express.Router();

const usercontroller = require('../controllers/user');
const userAuthentication = require('../middlewares/authenticate');

router.post('/signup',usercontroller.postUserData);
router.post('/login',usercontroller.postLoginUserData);
router.get('/search',userAuthentication.authenticate,usercontroller.searchUser);
module.exports = router;