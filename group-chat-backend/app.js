const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const sequelize = require('./utils/database');

const app = express();

app.use(bodyParser.json({ extended: false }));
app.use('/user',userRoutes);

sequelize.sync().then(res => {
    app.listen(4000);
})
.catch(err => console.log(err));