const express = require('express');

const router = express.Router();

const groupController = require('../controllers/group');
const userAuthentication = require('../middlewares/authenticate');

router.post('/creategroup',userAuthentication.authenticate,groupController.createGroup);
router.put('/renamegroup', userAuthentication.authenticate,groupController.renameGroup);
router.post('/adduser',userAuthentication.authenticate,groupController.addNewUser);
router.get('/getAllGroups',userAuthentication.authenticate,groupController.getAllGroups);
module.exports = router;