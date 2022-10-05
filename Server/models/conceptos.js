const {Model, DataTypes, Sequelize} =  require("sequelize");
const sequelize = require("../database/database.js");
const {Carpetas} = require("./carpetas");
class Conceptos extends Model{
    id_concepto;
    nombre;
    descripcion;
    archivo;
    fecha;
    carpeta;

    static associate(models){
        Conceptos.belongsTo(models.Carpetas,{
            foreignKey:"id_carpeta",
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT",
        });
    }
}

 Conceptos.init (
    {
    id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'id_concepto', 

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
    },
    archivo:{
        allowNull: false,
        type: DataTypes.STRING,
        field: 'archivo'
    },
    fecha:{
        allowNull: false,
        type: DataTypes.DATE,
        field: 'fecha',
        defaultValue: sequelize.NOW
    },
    carpeta:{
        allowNull:false,
        type: DataTypes.INTEGER,
        field: "carpeta",
    }
},
{
    sequelize,
    tableName:"conceptos",
    modelName:"Conceptos",
    timestamps: false,
    createdAt: false,
    updatedAt: false,
}
);
module.exports = Conceptos;