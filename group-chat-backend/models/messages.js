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
    isRead: {
        type:Sequelize.BOOLEAN,
        defaultValue:false
    }
});

module.exports = Messages;