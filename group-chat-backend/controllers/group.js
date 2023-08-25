const Group = require('../models/group');
const UserGroup = require('../models/user-group');

exports.createGroup = async(req,res,next) => {
    const name = req.body.name;
    const groupUsers = req.body.users;
    if(groupUsers.length < 2) {
        return res.status(400).json('More than 2 people are required to create a group');

    }
    try {
        const group = await Group.create({
            name:name,
            groupAdmin:req.user.id
        });

        let users = [{ userId:req.user.id, groupId:group.id}];
        for (let i = 0; i <groupUsers.length; i++) {
            var user = {
              userId: groupUsers[i],
              groupId: group.id,
            };
            users.push(user);
          }
         
        const groupUsersInfo = await UserGroup.bulkCreate(users);
        res.status(201).json([{groupName:name, groupId:group.id}]);
    } catch (error) {
        res.status(400).json(error);
    }

};

exports.getAllGroups = async(req,res) => {
    const userId = req.user.id;
    const groups = await UserGroup.findAll({
       
        where: {userId: userId},
    });
    const groupIds = groups.map(grp => grp.groupId);

    const groupName = await Group.findAll({
        attributes:["id","name"],
        where: { id: groupIds}
    })
    res.status(200).json(groupName);
}

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

exports.renameGroup = async(req,res) => {
    const groupId = req.body.groupId;
    const name = req.body.name;

    try {
        const updatedGroupName = await Group.update({name:name},{ where: {id:groupId} });
        res.status(200).json({ message: 'Group Name Changed Succeefully'});

    }catch(err) {
        res.status(400).json({ message: 'Something Went Wrong'});
    }
}