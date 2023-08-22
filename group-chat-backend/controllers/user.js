const Users = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.postUserData = async(req,res,next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const phoneNumber = req.body.phoneNumber;
    const t = await sequelize.transaction();
    try {
    const salt = await bcrypt.genSalt(10);
    const userData = await Users.create({
        name:name,
        email:email,
        phoneNumber:phoneNumber,
        password: await bcrypt.hash(password, salt)
    }, {transaction:t});
    await t.commit();
    return res.status(201).json(userData);
} catch(err) {
    await t.rollback();
    return res.status(400).json(err.name)
}
   

}