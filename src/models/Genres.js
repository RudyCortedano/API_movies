const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection'); 
   // En Mayúsculas y singular      // en minúsculas y singular
const Genres = sequelize.define('genres', {
    // Definimos las columnas aquí
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
});

module.exports = Genres;