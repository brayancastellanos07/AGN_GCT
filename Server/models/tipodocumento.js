const {Model,DataTypes} = require("sequelize");
const sequelize = require('../database/database');

class Tipo_Doc extends Model{
    id;
    tipo;
    descripcion;
}

Tipo_Doc.init({
    id:{
        allowNull: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        field: 'id_documento',
        primaryKey: true,
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

},{
    sequelize,
    tableName:'tipo_Documento',
    modelName: 'Tipo_Doc',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
})

module.exports = Tipo_Doc;
