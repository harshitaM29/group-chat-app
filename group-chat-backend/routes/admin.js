const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');
const userAuthentication = require('../middlewares/authenticate');



module.exports = router;