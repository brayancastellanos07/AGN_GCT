const {Model,DataTypes,Sequelize} =  require("sequelize");
const Rol_TABLE = 'rol';
const RolSchema = {
    id:{
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        field: 'id_rol',
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
    }
}

class Rol extends Model {
    static associate(models){

    }
    static config(sequelize){
        return{
            sequelize,
            tableName: Rol_TABLE,
            modelName: 'Rol',
            timestamps:false
        }
    }
}

module.exports = {Rol_TABLE, RolSchema,Rol};