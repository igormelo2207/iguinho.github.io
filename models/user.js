const db = require('./db');

const user = db.sequelize.define('users', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_name: {
        type: db.Sequelize.STRING,
    },
    user_password: {
        type: db.Sequelize.STRING
    }
});

//Criando a tabela
//Pagamento.sync({ force: true });

module.exports = user;