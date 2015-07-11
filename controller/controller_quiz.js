var models = require('../models/models');

// Autoload - Factoriza el codigo si ruta utiliza quizID
exports.load = function (req, res, next, quizID) {

	models.Quiz.find({
		where: { id: Number(quizID) },
		include: [{ model: models.Comment }]
	}).then(function(quiz){
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
	if(req.query.search){
		var texto = req.query.search.replace(/\s/g, "%")
		models.Quiz.findAll({where: ["pregunta like ?", '%' + texto + '%']}).then(function(quizes){
			res.render('quizes/index', { quizes: quizes, errors: [] });
		});		
	}else{
		models.Quiz.findAll().then(function(quizes){
			res.render('quizes/index', { quizes: quizes, errors: [] });
		});		
	}
};

// /quizes/new
exports.new = function (req, res) {
	var quiz = models.Quiz.build();
	res.render('quizes/new', { quiz: quiz, errors: [] });
};


// /quizes/new
exports.create = function (req, res) {
	var quiz = models.Quiz.build(req.body.quiz);
	quiz.validate().then(function(err){
		if(err){
			res.render('quizes/new',{quiz:quiz, errors: err.errors});
		}else{
			// Guarda en DB la pregunta y respuesta.
			quiz.save({fields: ["pregunta","respuesta","tema"]}).then(function(){
				res.redirect("/quizes"); // Redirecciona a la lista de preguntas
			});
		}
	});
};


// /quizes/:id
exports.show = function (req, res) {
	models.Quiz.findById(req.params.quizID).then(function(quiz){
		res.render('quizes/show', { quiz: req.quiz, errors: [] });
	});
};

// /quizes/:id/answer
exports.answer = function (req, res) {
	var respuesta = req.query.respuesta || "";
	models.Quiz.findById(req.params.quizID).then(function(quiz){
		if(respuesta.toUpperCase() === req.quiz.respuesta.toUpperCase()){
		  res.render('quizes/answer', { quiz: req.quiz, respuesta: 'Correcto', errors: [] });
		}else{
		  res.render('quizes/answer', { quiz: req.quiz, respuesta: 'Incorrecto', errors: [] });
		}
	});
};

// /quizes/:id/edit
exports.edit = function (req, res) {
	var quiz = req.quiz;
	res.render('quizes/edit', { quiz: quiz, errors: [] });
};

// /quizes/:id
exports.update = function (req, res) {
	req.quiz.pregunta = req.body.quiz.pregunta || "";
	req.quiz.respuesta = req.body.quiz.respuesta || "";
	req.quiz.tema = req.body.quiz.tema || "otro";
	req.quiz.validate().then(function(err){
		if(err){
			res.render('quizes/edit',{quiz: req.quiz, errors: err.errors});
		}else{
			// Guarda en DB la pregunta y respuesta.
			req.quiz.save({fields: ["pregunta","respuesta","tema"]}).then(function(){
				res.redirect("/quizes"); // Redirecciona a la lista de preguntas
			});
		}
	});
};

// /quizes/:id
exports.destroy = function (req, res) {
	req.quiz.destroy().then(function(){
		res.redirect("/quizes"); // Redirecciona a la lista de preguntas
	}).catch(function(error){next(error);});
};
