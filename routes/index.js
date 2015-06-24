var express = require('express');
var router = express.Router();
var quizController = require('../controller/controller_quiz');

router.get('/', function(req, res, next) { res.render('index', { title: 'Bienvenido a Quiz' }); });
router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);
router.get('/author', function(req, res, next) { res.render('author', {autor: 'Mariano J. Obarrio Miles', mail: 'mariano.obarrio@gmail.com'}); });

module.exports = router;
