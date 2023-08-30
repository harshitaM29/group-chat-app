const Group = require('../models/group');
const UserGroup = require('../models/user-group');
const User = require('../models/user');
const { Op } = require('sequelize');

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
        res.status(201).json([{id:group.id, name:name,groupAdmin:req.user.id}]);
    } catch (error) {
        res.status(400).json(error);
    }

};

exports.getAllGroups = async(req,res) => {
    const userId = req.user.id;

    try {
        const groups = await User.findAll({
            attributes:[],
            where: {
                id: userId
            },
            include: [
               {
                model:Group,
                attributes:["id","name","groupAdmin"],
                through: {
                    attributes: [],
                  },
               }

            ]

        });
      
        res.status(200).json(groups);

    } catch (error) {
        res.status(400).json(error);
    }
    // const groups = await UserGroup.findAll({
       
    //     where: {userId: userId},
    // });
    // const groupIds = groups.map(grp => grp.groupId);

    // const groupName = await Group.findAll({
    //     attributes:["id","name","groupAdmin"],
    //     where: { id: groupIds}
    // })
    // res.status(200).json(groupName);
}
exports.getAllUsersGroup = async(req,res) => {
    const userId = req.user.id;
    const groupId = req.params.groupId;
    
    try {
        const users = await Group.findAll({
            attributes: [],
            where: {
                id:groupId
            },
            include: [
                {
                 model:User,
                 attributes:["id","name"],
                 where: {
                    id:{ 
                        [Op.ne]: userId
                    }
                 },
                 through: {
                    attributes: [],
                  },
                }
    
            ]
        });
     
        res.status(201).json(users);
    } catch (error) {
        res.status(401).json(error);
    }
   

}




exports.renameGroup = async(req,res) => {
    const groupId = req.body.id;
    const name = req.body.name;
  
    try {
       const updatedGroupName = await Group.update({
        name:name
    },
    {where: { id: groupId}});
       const group = await Group.findOne({ where: {id : groupId}})
    
        return res.status(200).json({name:group.name,id:group.id,groupAdmin:group.groupAdmin});

    }catch(err) {
        res.status(400).json({ message: 'Something Went Wrong'});
    }
}