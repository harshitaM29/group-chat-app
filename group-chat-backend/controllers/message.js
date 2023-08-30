const Message = require('../models/messages');
const Group = require('../models/group');
const User = require('../models/user');
const AWS = require('aws-sdk');
require('dotenv').config();
const fs = require('fs');

function uploadToS3(filename,file) {
  
    let s3bucket = new AWS.S3({
        accessKeyId:process.env.IAM_USER_KEY,
        secretAccessKey:process.env.IAM_USER_SECRET,
       
    });
   
    
        var params = {
            Bucket:process.env.BUCKET_NAME,
            Key:filename,
            Body:new Buffer.from(file.replace(/^data:image\/\w+;base64,/, ""), 'base64'),
            ACL:'public-read'
        }
        return new Promise((resolve,reject) => {
            s3bucket.upload(params, (err, response) => {
                if(err) {
                   
                    reject(err);
                } else {
                  
                    resolve(response.Location);
                }
            })
        })
       
   


}
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

exports.sendMedia = async(req,res,next) => {
    try {
    const groupId = req.body.id;
    const base64Image = req.body.file;
    const imageName = req.body.filename;
    const userId = req.user.id;
    const sender = await User.findOne({
           
        where: { id: userId}
    });
    const fileURL = await uploadToS3(imageName,base64Image);
    const sentMediaMessage = await Message.create({
        message:fileURL,
        sender:sender.name,
        userId:userId,
        groupId:groupId
    });
    await Group.update({
        latestMessage:fileURL
    },
    {where: { id: groupId}});
    res.status(200).json({ sentMediaMessage, succues:true})
    
    }catch(err) {
        
        res.status(500).json({ fileURL:'', success:false, err:err})
    }
}