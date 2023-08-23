const Chats = require('../models/chats');

exports.postMessages = async(req,res,next) => {
    const userId = req.user.id;
    const message = req.body.message;
    try {
        const messageData = await Chats.create({
            message:message,
            userId:userId
        })
        res.status(201).json(messageData); 
    }
    catch(err) {
        res.status(400).json(err);
        throw new Error(err);
    }
}

exports.getMessages = async(req,res,next) => {
    const lastMessageId = req.query.lastMessageId;
    let messages;
    try {
    if(lastMessageId === undefined) {
        messages = await Chats.findAll();
    }
    else {
     messages = await Chats.findAll({ where: { id: id > lastMessageId}});
     console.log(messages);
    }
    res.status(200).json(messages);
    }catch(err) {
        res.status(401).json(err);
    }

}