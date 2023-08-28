const Sequelize = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASS, {
    dialect:'mysql',
    host:process.env.DB_HOST
});

const connectToDb = async ()=>{
    try{
        await sequelize.sync();
        
    }
    catch(error){
        console.log(error);
    }
}
module.exports = {sequelize, connectToDb};