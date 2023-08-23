const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Chats = sequelize.define('chats', {
    id: {
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey: true
    },
    message: {
        type:Sequelize.STRING,
        allowNull:false
    }
});

module.exports = Chats;