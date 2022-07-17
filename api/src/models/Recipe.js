const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('recipe', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        summary: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        healthScore: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0,
                max: 100,
            }
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        steps: {
            type: DataTypes.ARRAY(DataTypes.JSON),
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                min: 0,
                max: 10, 
            }
        },
        createdInDB: {
            type: DataTypes.BOOLEAN, 
            allowNull: false,
            defaultValue: true, 
        },
    });
};
