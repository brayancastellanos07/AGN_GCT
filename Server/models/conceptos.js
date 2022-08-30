const {Model, DataTypes} =  require("sequelize");

const conceptos = {
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
    feha:{
        allowNull: false,
        type: DataTypes.DATE,
        field: 'fecha',
        defaultValue: sequelize.NOW
    }
}
module.exports = conceptos;