const Sequelize = require('sequelize');

const sequelize = new Sequelize('id13974850_ilion','id13974850_users','QAG0BlgnZ_Of{}6!',{
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}