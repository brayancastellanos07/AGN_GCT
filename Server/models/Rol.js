
const {Model,DataTypes,Sequelize} =  require('Sequelize');
const sequelize = new Sequelize('postgres::memory:');


 const Rol = sequelize.define('Rol',
 {
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
    }
})

/*class Rol extends Model {
    static associate(model){

    }
    static config(sequelize){
        return{
            sequelize,
            tableName: Rol_TABLE,
            modelName: 'Rol',
            timestamps:false
        }
    }
}*/

module.exports = Rol;
