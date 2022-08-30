const {Model, DataTypes } = require("sequelize");

const USER_TABLE = 'user';
const User = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    field: 'id_usuario',
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'nombre',
  },
  apellido: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'apellido',
  },
  document:{
    allowNull:false,
    type: DataTypes.STRING,
    field: 'documento',
  },
  telefono:{
    allowNull:false,
    type: DataTypes.STRING,
    field: 'telefono',
  },
  correo: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
    field: 'correo',
  },
  contraseña: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
    field: 'contrasena'
  }
};
 module.exports = User;
