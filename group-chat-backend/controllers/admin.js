const Group = require('../models/group');
const UserGroup = require('../models/user-group');
const { Op } = require('sequelize');

exports.addNewUser= async(req,res) => {
    const groupId = req.body.id;
    const userId = req.body.userId;

    try {
        const addUser = await UserGroup.create({
            groupId:groupId,
            userId:userId
        });
      
        res.status(201).json({user:addUser, message:'User added successfully'});
    }catch(err){
        res.status(400).json({message: 'Something Went Wrong'})
    }
};

exports.removeUser = async(req,res) => {
    const userId = req.body.userId;
    const groupId = req.body.id;

    try {
       await UserGroup.destroy({
        where: {
            userId:userId,
            groupId:groupId
        }

       })
       res.status(201).json({ message: "User Deleted Successfully"});
    } catch (error) {
        res.status(401).json({error:error, message: "User Deleted Successfully"});
    }
}