const {Model,DataTypes,Sequelize} =  require('Sequelize');
const sequelize = require('../database/database');
const Usuario = require('./user');


class Rol extends Model{
    id;
    nombre;
    descripcion;
    status;
}

  Rol.init({
    id:{
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        field: 'id_rol',
        primaryKey: true,
    },
    nombre:{
        allowNull: false,
        type: DataTypes.STRING,
        field: 'nombre_rol',
    },
    descripcion:{
        allowNull: false,
        type: DataTypes.STRING,
        field: 'descripcion',
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: 'status',
    }
},{ 
    sequelize,
    tableName: 'roles',
    modelName: 'Rol',
    timestamps:false,
    createdAt: false,
    updatedAt: false

})

Rol.hasMany(Usuario,{
    foreignKey: "rol",
    onDelete: "RESTRICT",
})

module.exports = Rol;
