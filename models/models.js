var path = require('path');

// Postgres DATABASE_URL = URLs tomada desde Heroku
// SQLite   DATABASE_URL = URLs tomada desde .env
var url      = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6] || null);
var user     = (url[2] || null);
var pwd      = (url[3] || null);
var protocol = (url[1] || null);
var dialect  = (url[1] || null);
var port     = (url[5] || null);
var host     = (url[4] || null);
var storage  = process.env.DATABASE_STORAGE;

// Carga el modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd, {
						dialect: protocol, 
						protocol: protocol,
						port: port,
						host: host,
						storage: storage, // Solo SQLite (.env)
						omitNull: true, // Solo Postgres
						logging: false // Solo SQLite
					});

// Importa la definicion de la tabla Quiz
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

// Importa la definicion de la tabla Comments
var Comment = sequelize.import(path.join(__dirname,'comment'));

// Indica que un comment pertenece a un quiz.
Comment.belongsTo(Quiz);

// indica que un quiz puede tener muchos comments.
Quiz.hasMany(Comment);

// Nota: La relación añade la columna "QuizId" en la tabla “Comment” que contiene la clave
//       externa (foreign key), que indica que quiz esta asociado al comentario.

// Exporta la definicion de la tabla Quiz
exports.Quiz = Quiz;

// Exporta la definicion de la tabla Comments
exports.Comment = Comment;

// Crea e inicializa la tabla de preguntas (Quiz) en la DB
sequelize.sync({force: false}).then(function () {
	// Si la pudo inicializar ejecuta el manejador una vez para cada tabla
	Quiz.count().then(function(count){
		// La tabla se inicializa si esta vacia
		if(count === 0){
			Quiz.create({
				pregunta: 'De que color es el caballo blanco de San Martin?',
				respuesta: 'Blanco',
				tema: 'ocio'
			});
			Quiz.create({
				pregunta: 'Cual es la capital de Italia?',
				respuesta: 'Roma',
				tema: 'humanidades'
			});
			Quiz.create({
				pregunta: 'Cual es la capital de Portugal?',
				respuesta: 'Lisboa',
				tema: 'humanidades'
			}).finally(function() {
				console.log("Database Inicializada.");
			});
		};
	});
}).catch(function(e) { console.log (e); });
