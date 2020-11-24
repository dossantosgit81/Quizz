const Sequelize = require("sequelize");
const connection = require("./database");

const Resposta = connection.define("respostas", {

    corpo:{
        type: Sequelize.TEXT,
        allownull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allownull: false
    }
});
            //Não recriar a tabela caso ela exista
Resposta.sync({force: false});

module.exports = Resposta;