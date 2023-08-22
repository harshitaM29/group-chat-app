const express = require('express');

const router = express.Router();

const usercontroller = require('../controllers/user');


router.post('/signup',usercontroller.postUserData);
router.post('/login',usercontroller.postLoginUserData);

module.exports = router;