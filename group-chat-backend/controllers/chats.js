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