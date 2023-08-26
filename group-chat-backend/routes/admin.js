const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');
const userAuthentication = require('../middlewares/authenticate');


router.post('/addnewuser',userAuthentication.authenticate,adminController.addNewUser);
router.delete('/removeuser', userAuthentication.authenticate,adminController.removeUser);
router.put('/changeadmin',userAuthentication.authenticate,adminController.changeAdmin);
module.exports = router;