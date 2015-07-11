// Definicion de la tabla COMENTS
module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Comment', {
		comentario: {
			type: DataTypes.STRING,
			validate: { notEmpty: {msg: "Falta comentario"} }
		},
		publicado: {
			type: DataTypes.BOOLEAN,
			allowNull: false, 
			defaultValue: false
		}		
	});
};