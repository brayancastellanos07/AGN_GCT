const {Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database.js');
const Rol = require("./Rol.js");
const Tipo_Doc = require("./tipodocumento.js");

class Usuario extends Model {
  id;
  nombre;
  apellido;
  id_documento;
  documento;
  telefono;
  id_rol;
  correo;
  contrasena;
  status;

}

Usuario.init({
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
  id_documento:{
    allowNull: false,
    type: DataTypes.INTEGER,
    field:'id_documento',

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
  id_rol:{
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'rol',
  },
  correo: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'correo',
  },
  contrasena: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'contrasena'
  },
  status:{
    allowNull: false,
    type: DataTypes.BOOLEAN,
    field: 'status',
  }
},{
  sequelize,
  tableName:'usuarios',
  modelName: 'Usuario',
  timestamps: false,
  createdAt: false,
  updatedAt:false,
})

// Usuario.belongsTo(Tipo_Doc,{
//   foreignKey: 'id_documento',
//   onDelete: 'RESTRICT',
// })

// Usuario.belongsTo(Rol,{
//   foreignKey:'id_rol',
//   onDelete: 'RESTRICT',
// })
 module.exports = Usuario;
