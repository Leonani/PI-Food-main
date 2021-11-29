const { DataTypes } = require('sequelize');

//conexion a sequelize.
module.exports = (sequelize) => {
  // modelo
  sequelize.define('diet', {
 
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  })
}