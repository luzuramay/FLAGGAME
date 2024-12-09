"use strict";

const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/dbConnection");

const Flags = sequelize.define(
    "Flags",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            trim: true,
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            trim: true,
        },
    },
    {
        timestamps: false, // Impede a criação automática dos campos createdAt e updatedAt
    }
);

// Dados das bandeiras para inserção
const flagsData = [
    { name: "Acre", link: "../img/bandeiras/AC.png" },
    { name: "Alagoas", link: "../img/bandeiras/AL.png" },
    { name: "Amapá", link: "../img/bandeiras/AP.png" },
    { name: "Amazonas", link: "../img/bandeiras/AM.png" },
    { name: "Bahia", link: "../img/bandeiras/BA.png" },
    { name: "Ceará", link: "../img/bandeiras/CE.png" },
    { name: "Distrito Federal", link: "../img/bandeiras/DF.png" },
    { name: "Espírito Santo", link: "../img/bandeiras/ES.png" },
    { name: "Goiás", link: "../img/bandeiras/GO.png" },
    { name: "Maranhão", link: "../img/bandeiras/MA.png" },
    { name: "Mato Grosso", link: "../img/bandeiras/MT.png" },
    { name: "Mato Grosso do Sul", link: "../img/bandeiras/MS.png" },
    { name: "Minas Gerais", link: "../img/bandeiras/MG.png" },
    { name: "Pará", link: "../img/bandeiras/PA.png" },
    { name: "Paraíba", link: "../img/bandeiras/PB.png" },
    { name: "Paraná", link: "../img/bandeiras/PR.png" },
    { name: "Pernambuco", link: "../img/bandeiras/PE.png" },
    { name: "Piauí", link: "../img/bandeiras/PI.png" },
    { name: "Rio de Janeiro", link: "../img/bandeiras/RJ.png" },
    { name: "Rio Grande do Norte", link: "../img/bandeiras/RN.png" },
    { name: "Rio Grande do Sul", link: "../img/bandeiras/RS.png" },
    { name: "Rondônia", link: "../img/bandeiras/RO.png" },
    { name: "Roraima", link: "../img/bandeiras/RR.png" },
    { name: "Santa Catarina", link: "../img/bandeiras/SC.png" },
    { name: "São Paulo", link: "../img/bandeiras/SP.png" },
    { name: "Sergipe", link: "../img/bandeiras/SE.png" },
    { name: "Tocantins", link: "../img/bandeiras/TO.png" },
];

// Inserção automática de bandeiras na inicialização
(async () => {
    try {
        await sequelize.sync(); // Sincroniza o banco de dados
        const existingFlags = await Flags.count();
        if (existingFlags === 0) {
            // Insere as bandeiras apenas se a tabela estiver vazia
            await Flags.bulkCreate(flagsData);
            console.log("Bandeiras inseridas com sucesso!");
        }
    } catch (error) {
        console.error("Erro ao inicializar a tabela Flags:", error.message);
    }
})();

module.exports = Flags;
