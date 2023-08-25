const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Messages = sequelize.define('messages', {
    id: {
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey: true
    },
    message:{
        type:Sequelize.STRING,
    },
    sender: {
        type:Sequelize.STRING,
      
    }
});

module.exports = Messages;