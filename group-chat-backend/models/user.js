const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Users = sequelize.define('users' , {
    id: {
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey: true
    },
    name: {
        type:Sequelize.STRING,
        allowNull:false
    },

    email: {
        type:Sequelize.STRING,
        allowNull: false,
        unique:true
    },
    password: {
        type:Sequelize.STRING,
        allowNull:false
    },
    phoneNumber: {
        type:Sequelize.INTEGER,
        allowNull:false
    }
    
});

module.exports = Users;