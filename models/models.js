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

// Exporta la definicion de la tabla Quiz
exports.Quiz = Quiz;

// Crea e inicializa la tabla de preguntas (Quiz) en la DB
sequelize.sync({force: true}).then(function () {
	// Si la pudo inicializar ejecuta el manejador una vez para cada tabla
	Quiz.count().then(function(count){
		// La tabla se inicializa si esta vacia
		if(count === 0){
			Quiz.create({
				pregunta: 'De que color es el caballo blanco de San Martin?',
				respuesta: 'Blanco'
			});
			Quiz.create({
				pregunta: 'Cual es la capital de Italia?',
				respuesta: 'Roma'
			}).finally(function() {
				console.log("Database Inicializada.");
			});
		};
	});
}).catch(function(e) { console.log (e); });
