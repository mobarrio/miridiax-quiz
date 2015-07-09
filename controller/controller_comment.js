var models = require('../models/models');

// /quizes/:quizID/comments/new
exports.new = function (req, res) {
	res.render('comments/new', { quizid: req.params.quizID, errors: [] });
};

// /quizes/:quizID/comments
exports.create = function (req, res) {
	var comment = models.Comment.build({
		comentario: req.body.comment.comentario,
		QuizId: req.params.quizID // (X)
	});
	/*
		(X) La relación belongsTo(…) de Comment a Quiz añade un parámetro :quizId adicional en
		cada elemento de la tabla Comments que indica el quiz asociado. Se utiliza el nombre :quizId 
		definido en la ruta en routes/index.js, salvo que se indique otro nombre.
	*/
	comment.validate().then(function(err){
		if(err){
			res.render('comments/new', { comment: comment, quizid: req.params.quizID, errors: err.errors });
		}else{
			// Guarda en DB la pregunta y respuesta.
			comment.save().then(function(){
				res.redirect("/quizes/"+req.params.quizID); // Redirecciona a la lista de preguntas
			});
		}
	}).catch(function(error){next(error); });
};
