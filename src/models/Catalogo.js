const { Sequelize } = require("sequelize");
const database = require("../database/db");//importar a conexão com a model

const Jogo = database.sequelize.define(
    //Nome da tabela
    "jogos",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        nome:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        descricao:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        imagem:{
            type: Sequelize.STRING,
            allowNull: false,
        },
    },

    {
        freezeTableName: true, //o nome da tabela seja o mesmo que eu criei no banco
        timestamps: false,//registrar a criação de tempo e data
        createdAt: false,
        updateAt: false,
    }
);

const initTable = async () => {
    await Jogo.sync();
};
initTable();

module.exports = Jogo;