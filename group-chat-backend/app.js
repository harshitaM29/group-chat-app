const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/user');
const groupRoutes = require('./routes/group');
const adminRoutes = require('./routes/admin');
const messageRoutes = require('./routes/message');
const sequelize = require('./utils/database');
const User = require('./models/user');
const Group = require('./models/group');
const Messages = require('./models/messages');
const UserGroup = require('./models/user-group');
const app = express();
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}));
app.use(bodyParser.json({ extended: false }));
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

sequelize.sync().then(res => {
    app.listen(4000);
})
.catch(err => console.log(err));