var models = require('../models/models');

// Autoload - Factoriza el codigo si ruta utiliza quizID
exports.load = function (req, res, next, quizID) {
	models.Quiz.findById(quizID).then(function(quiz){
		if(quiz){
			req.quiz = quiz;
			next();
		}else{
			next(new Error("No existe quizID=" + quizID));
		}
	}).catch(function(e) { next(e); });
};


// /quizes
exports.index = function (req, res) {
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index', { quizes: quizes });
	});
};

// /quizes/:id
exports.show = function (req, res) {
	models.Quiz.findById(req.params.quizID).then(function(quiz){
		res.render('quizes/show', { quiz: req.quiz });
	});
};

// /quizes/:id/answer
exports.answer = function (req, res) {
	var respuesta = req.query.respuesta || "";
	models.Quiz.findById(req.params.quizID).then(function(quiz){
		if(respuesta.toUpperCase() === req.quiz.respuesta.toUpperCase()){
		  res.render('quizes/answer', { quiz: req.quiz, respuesta: 'Correcto' });
		}else{
		  res.render('quizes/answer', { quiz: req.quiz, respuesta: 'Incorrecto' });
		}
	});
};
