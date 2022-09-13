const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../database/database.js");
const { Rol } = require("./Rol");

class Usuario extends Model {
  id;
  nombre;
  apellido;
  tipodocumento;
  documento;
  telefono;
  rol;
  correo;
  contrasena;
  status;

  static associate(models) {
    Usuario.belongsTo(models.Rol, {
      foreignKey: "id_rol",
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  }
}

Usuario.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: "id_usuario",
    },
    nombre: {
      allowNull: false,
      type: DataTypes.STRING,
      field: "nombre",
    },
    apellido: {
      allowNull: false,
      type: DataTypes.STRING,
      field: "apellido",
    },
    tipodocumento: {
      type: Sequelize.ENUM("Cédula", "Pasaporte"),
      defaultValue: "Cédula",
      field: "tipodocumento",
    },
    documento: {
      allowNull: false,
      type: DataTypes.STRING,
      field: "documento",
    },
    telefono: {
      allowNull: false,
      type: DataTypes.STRING,
      field: "telefono",
    },
    rol: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: "rol",
    },
    correo: {
      allowNull: false,
      type: DataTypes.STRING,
      field: "correo",
    },
    contrasena: {
      allowNull: false,
      type: DataTypes.STRING,
      field: "contrasena",
    },
    status: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      field: "status",
    },
  },
  {
    sequelize,
    tableName: "usuarios",
    modelName: "Usuario",
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);


module.exports = Usuario;
