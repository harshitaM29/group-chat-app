const express = require('express');

const router = express.Router();

const usercontroller = require('../controllers/user');

router.post('/signup',usercontroller.postUserData);

module.exports = router;