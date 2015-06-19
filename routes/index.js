var express = require('express');
var router = express.Router();
var quizController = require('../controller/controller_quiz');

router.get('/', function(req, res, next) { res.render('index', { title: 'Quiz' }); });
router.get('/quizes/question', quizController.pregunta);
router.get('/quizes/answer', quizController.respuesta);

module.exports = router;
