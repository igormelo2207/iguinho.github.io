const db = require('./db');

const user = db.sequelize.define('users', {
    id_user: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome_user: {
        type: db.Sequelize.STRING
    },
    email_user: {
        type: db.Sequelize.STRING
    },
    senha_user: {
        type: db.Sequelize.STRING
    }
});

//Criando a tabela
//Pagamento.sync({ force: true });

module.exports = user;