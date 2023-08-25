const Message = require('../models/messages');
const Group = require('../models/group');
const User = require('../models/user');


exports.fetchAllMessages = async(req,res) => {
    const groupId = req.params.groupId;
try {
    const Messages = await Message.findAll({
        where: { groupId: groupId}
    });
    res.status(200).json(Messages);
} catch (error) {
    res.status(400).json(error)
}
  

}

exports.sendMessage = async(req,res) => {
    const userId = req.user.id;
    const groupId = req.body.id;
    const message = req.body.message;

    try {
        
        const sender = await User.findOne({
           
            where: { id: userId}
        });
        const messageObj = {
            message:message,
            sender:sender.name,
            userId:userId,
            groupId:groupId
        }
        const sentMessage = await Message.create(messageObj);
        await Group.update({
            latestMessage:message
        },
        {where: { id: groupId}});
        
        res.status(201).json(sentMessage);
    } catch (error) {
        res.status(400).json(error)
       
    }
  
};

