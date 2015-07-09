var users = {
	admin: {id: 1, username: 'Administrador', password: '1234'},
	pepe:  {id: 2, username: 'Jose Pedro',    password: '5678'}
};

exports.autenticar = function(login, password, callback){
	if(users[login]){
		if(password === users[login].password){
			callback(null, users[login]);
		} else { 
			callback('Password Incorrecto.');
		}
	} else { 
			callback('No existe el usuario.');
	}
};