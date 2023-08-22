const Users = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('../utils/database');
require('dotenv').config();

const generateWebToken = (id, isPremium) => {
    return jwt.sign({ userId: id, isPremium}, process.env.SECRET_KEY);
 }
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
    console.log(err);
    await t.rollback();
    return res.status(400).json(err.name)
}
   

}

exports.postLoginUserData = async(req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    const t = await sequelize.transaction();
    const user = await Users.findOne({ where: {
        email : email
    }}, {transaction:t})
    
    if(user) {
        const presentPass = await bcrypt.compare(password, user.password)
       
        if(presentPass) {
            res.status(200).json({ email:email, password:password, token:generateWebToken(user.id, false) });
            await t.commit();
        } else {
            await t.rollback();
            res.status(401).json('Password Does Not Match')
        } 
    } else {
        await t.rollback();
        res.status(404).json('User Does Not Exists')
    }

}
