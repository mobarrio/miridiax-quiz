var express = require('express');
var router = express.Router();
var quizController = require('../controller/controller_quiz');

router.get('/', function(req, res, next) { res.render('index', { title: 'Bienvenido a Quiz' }); });
router.get('/quizes/question', quizController.pregunta);
router.get('/quizes/answer', quizController.respuesta);
router.get('/quizes/preguntas', quizController.pregunta);
router.get('/quizes/respuestas', quizController.respuesta);

module.exports = router;
