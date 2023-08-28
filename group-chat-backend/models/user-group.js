const Sequelize = require('sequelize');

const {sequelize} = require('../utils/database');

const UserGroup = sequelize.define('user-group', {
    id: {
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey: true
    },
});

module.exports = UserGroup;