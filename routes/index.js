var express = require('express');
var router = express.Router();
var quizController = require('../controller/controller_quiz');
var commentController = require('../controller/controller_comment');
var sessionController = require('../controller/controller_session');
var statisticsController = require('../controller/controller_statistics');

router.get('/', function(req, res, next) { res.render('index', { title: 'Bienvenido a Quiz', errors: [] }); });

router.param('quizID', 							 quizController.load);    // Autoload de comandos con :quizID
router.param('commentID',						 commentController.load); // Autoload de comandos con :commentID

// Rutas a Login y Logout
router.get('/login', 						     sessionController.new);
router.post('/login', 						     sessionController.create);
router.get('/logout', 						     sessionController.destroy);

// Rutas a Quizes
router.get('/quizes', 						     quizController.index);
router.get('/quizes/:quizID(\\d+)', 		     quizController.show);
router.get('/quizes/:quizID(\\d+)/answer', 	     quizController.answer);
router.get('/quizes/new', 					     quizController.new);
router.post('/quizes/create', 				     quizController.create);
router.get('/quizes/:quizID(\\d+)/edit', 	     quizController.edit);
router.put('/quizes/:quizID(\\d+)', 		     quizController.update);
router.delete('/quizes/:quizID(\\d+)', 		     quizController.destroy);

// Rutas a Comments
router.get('/quizes/:quizID(\\d+)/comments/new', commentController.new); // Accede al formulario de crear comentario, asociado al quiz :id.
router.post('/quizes/:quizID(\\d+)/comments',    commentController.create); // Crea una entrada en la tabla comments, asociada a :quizId en Quiz
router.get('/quizes/:quizID(\\d+)/comments/:commentID(\\d+)/publish', sessionController.loginRequired, commentController.publish);
router.delete('/quizes/:quizID(\\d+)/comments/:commentID(\\d+)', sessionController.loginRequired, commentController.destroy);

// Rutas a estadisticas
router.get('/quizes/statistics', 				 statisticsController.statistics);

// Ruta a los creditos
router.get('/author', function(req, res, next) { res.render('author', {autor: 'Mariano J. Obarrio Miles', mail: 'mariano.obarrio@gmail.com', errors: []} ); });

module.exports = router;
