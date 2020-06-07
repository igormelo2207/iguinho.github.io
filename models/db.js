const Sequelize = require('sequelize');

const sequelize = new Sequelize('informations','ilionroot','marina2207',{
    host: 'mysql669.umbler.com',
    port: 41890,
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