var express = require('express');
var router = express.Router();
var quizController = require('../controller/controller_quiz');

router.get('/', function(req, res, next) { res.render('index', { title: 'Bienvenido a Quiz', errors: [] }); });

// Autoload de comandos con :quizID
router.param('quizID', quizController.load); // autoload: quizID

// Nuevas preguntas
router.get('/quizes', 						quizController.index);
router.get('/quizes/:quizID(\\d+)', 		quizController.show);
router.get('/quizes/:quizID(\\d+)/answer', 	quizController.answer);
router.get('/quizes/new', 					quizController.new);
router.post('/quizes/create', 				quizController.create);
router.get('/quizes/:quizID(\\d+)/edit', 	quizController.edit);
router.put('/quizes/:quizID(\\d+)', 		quizController.update);
router.delete('/quizes/:quizID(\\d+)', 		quizController.destroy);
router.get('/author', function(req, res, next) { res.render('author', {autor: 'Mariano J. Obarrio Miles', mail: 'mariano.obarrio@gmail.com', errors: []} ); });

module.exports = router;
