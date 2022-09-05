
const {Model,DataTypes} =  require('Sequelize');
const sequelize = require('../database/database');

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
        allowNull: false,
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


module.exports = Rol;
