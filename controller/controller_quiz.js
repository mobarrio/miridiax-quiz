exports.pregunta = function (req, res) {
  res.render('quizes/preguntas', { pregunta: 'Que color es el caballo blanco de San Martin?' });
};

exports.respuesta = function (req, res) {
  if(req.query.respuesta.toUpperCase() === "BLANCO"){
      res.render('quizes/respuesta', { respuesta: 'Correcto' });
  }else{
      res.render('quizes/respuesta', { respuesta: 'Incorrecto' });
  }
};

