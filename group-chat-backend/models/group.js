const Sequelize = require('sequelize');

const {sequelize} = require('../utils/database');

const Group = sequelize.define('groups', {
    id: {
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey: true
    },
    name: {
        type:Sequelize.STRING,
        allowNull:false,
    },
    groupAdmin: {
        type: Sequelize.STRING,
        allowNull:false
    },
    latestMessage: {
        type: Sequelize.STRING
    }
    // users:{
       
    //         type:Sequelize.ARRAY(Sequelize.TEXT),
    //         references: {
    //         model:'Users',
    //         key:"id"
    //     }
        
    // },
    // isGroupChat: {
    //     type:Sequelize.BOOLEAN,
    //     defaultValue:false
    // },
    // latestMessage: {
    //     type:Sequelize.DataTypes.UUID,
    //         references: {
    //         model:'Messages',
    //         key:"id"
    // }
    // },
    // groupAdmin: {
    //     type:Sequelize.DataTypes.UUID,
    //         references: {
    //         model:'Users',
    //         key:"id"
    // }
    //}
})

module.exports = Group;