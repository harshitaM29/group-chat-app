const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/user');
const sequelize = require('./utils/database');

const app = express();
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}));
app.use(bodyParser.json({ extended: false }));
app.use('/user',userRoutes);

sequelize.sync().then(res => {
    app.listen(4000);
})
.catch(err => console.log(err));