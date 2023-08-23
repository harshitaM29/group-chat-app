const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/user');
const chatRoutes = require('./routes/chats');
const sequelize = require('./utils/database');
const User = require('./models/user');
const Chat = require('./models/chats');

const app = express();
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}));
app.use(bodyParser.json({ extended: false }));
app.use('/user',userRoutes);
app.use('/chat',chatRoutes);

User.hasMany(Chat);
Chat.belongsTo(User);

sequelize.sync().then(res => {
    app.listen(4000);
})
.catch(err => console.log(err));