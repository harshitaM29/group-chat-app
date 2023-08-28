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
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const app = express();


app.use(cors({

    credentials:true
}));
const accessLogs = fs.createWriteStream(path.join(__dirname,'access.log'),
{flags: 'a'}
);
app.use(morgan('combined', {stream: accessLogs}));
app.use(helmet({ crossOriginEmbedderPolicy: false, originAgentCluster: true }));
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data: blob:"],
    },
  })
);
app.use(bodyParser.json({ extended: false, limit: '50mb' }));
app.use('/user',userRoutes);
app.use('/group',groupRoutes);
app.use('/admin',adminRoutes);
app.use('/message',messageRoutes);

app.use(express.static(
    path.join(__dirname,"../group-chat-UI/build")));
app.get("*", (req, res) => {
        res.sendFile(
          path.join(__dirname, "../group-chat-UI/build/index.html")
        );
      });

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
