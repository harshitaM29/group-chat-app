const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/user');
const groupRoutes = require('./routes/group');
const adminRoutes = require('./routes/admin');
const messageRoutes = require('./routes/message');
const {sequelize,connectToDb} = require('./utils/database');
const User = require('./models/user');
const Group = require('./models/group');
const Messages = require('./models/messages');
const UserGroup = require('./models/user-group');

const http = require('http');
const socketio = require('socket.io');

const app = express();

// const server = http.createServer(app);
// const io = socketio(server).sockets;

app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}));
app.use(bodyParser.json({ extended: false, limit: '50mb' }));
app.use('/user',userRoutes);
app.use('/group',groupRoutes);
app.use('/admin',adminRoutes);
app.use('/message',messageRoutes);
User.hasMany(Messages);
Messages.belongsTo(User);

User.belongsToMany(Group, {through: UserGroup});
Group.belongsToMany(User, {through:UserGroup});

Group.hasMany(Messages);
Messages.belongsTo(Group);

const server = app.listen(4000 , async ()=>{
   
    await connectToDb();
})


const io = require('socket.io')(server,{
    pingTimeout:60000,
    cors: {
        origin:'http://localhost:3000',
    }
});

io.on("connection", (socket) =>{
  

    socket.on('setup',(userId) => {
      
        // userid.id = userId;
        socket.join(userId);
        
        socket.emit('connected',userId);
    });
 
    socket.on('joinchat',(room) => {
        socket.join(room);
        console.log('User Joined Room ' + room)
       
    });
     
    socket.on('newMessage', (newMessageReceived) => {
       
        
       socket.to(newMessageReceived.groupId).emit("received_message",newMessageReceived)
            
        });
    })
