const Group = require('../models/group');
const Users = require('../models/user');
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
        const user = await Users.findOne({ where: { id: userId }})
        res.status(201).json({id:user.id, name:user.name});
    }catch(err){
        res.status(400).json({message: 'Something Went Wrong'})
    }
};

exports.removeUser = async(req,res) => {
    const userId = req.query.userId;
    const groupId = req.query.id;

    try {
       await UserGroup.destroy({
        where: {
            userId:userId,
            groupId:groupId
        }

       })
       res.status(201).json({groupId:groupId, message: "User Deleted Successfully"});
    } catch (error) {
        res.status(401).json({error:error, message: "Something Went Wrong"});
    }
}

exports.changeAdmin = async(req,res) => {
    const userId = req.body.userId;
    const groupId = req.body.id;
   
    try {
        await Group.update( {groupAdmin:userId}, {where: {
       id:groupId
    }
    });
    const group = await Group.findOne({ where: {id : groupId}})
       return res.status(200).json({id:group.id,name:group.name,groupAdmin:group.groupAdmin});
    } catch (error) {
       
        res.status(400).json({error:error, message: 'Something Went Wrong'});
    }
}