const {Model,DataTypes} =  require("sequelize");
const sequelize = require('../database/database');

class Carpetas extends Model{
    id;
    nombre;
    descripcion;


    static associate(models){
        Carpetas.hasMany(models.Conceptos,{
            foreignKey:"id_concepto",
            as: 'Conceptos',
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT",
        });
    }
}
Carpetas.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'id_carpeta'
    },
    nombre:{
        allowNull: false,
        type: DataTypes.STRING,
        field: 'nombre',
    },
    descripcion:{
        allowNull: false,
        type: DataTypes.STRING,
        field: 'descripcion',
    }
},{
    sequelize,
    tableName:'carpetas',
    modelName:'Carpetas',
    timestamps:false,
    createdAt: false,
    updatedAt:false,
})

module.exports = Carpetas;