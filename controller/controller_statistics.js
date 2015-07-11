var models = require('../models/models');

// /quizes/statistics
/*
 * Nro. de preguntas
 * Nro. de comentarios totales
 * Promedio de comentarios por pregunta
 * Nro. de preguntas sin comentarios
 * Nro. de preguntas con comentarios
 */

exports.statistics = function (req, res) {
	var stats = {};
	models.Quiz.count().then(function(count) {
		stats.npreguntas = count;
		models.Comment.count().then(function(count) {
			stats.ncomentarios = count;
			stats.pcomentarios = Number(stats.ncomentarios / stats.npreguntas).toFixed(2);;
			models.Quiz.findAll({
				include: [{ model: models.Comment }]
			}).then(function(quizes){
				stats.conComm = 0;
				stats.sinComm = 0;
				for(index in quizes){
					if(quizes[index].Comments.length === 0) stats.sinComm++;
					else stats.conComm++;
				}
				res.render('quizes/statistics', { stats: stats, errors: [] });
			});
		});
    });
};
