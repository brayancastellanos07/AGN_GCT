const {Model,DataTypes} =  require("sequelize");


const carpetas = {
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
}

module.exports = carpetas;