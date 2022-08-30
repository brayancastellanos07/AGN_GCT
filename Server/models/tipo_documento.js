const {Model,DataTypes} = require("sequelize");

const tipo_Doc={
    id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'id_documento',
    },
    tipo:{
        allowNull:false,
        type: DataTypes.STRING,
        field: 'tipo',
    },
    descripcion:{
        allowNull: false,
        type: DataTypes.STRING,
        field: 'descripcion',
    } 
}

module.exports = tipo_Doc;
