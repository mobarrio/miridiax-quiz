exports.new = function (req, res) {
	var errors = req.session.errors || {};
	req.session.errors = {};
	res.render('session/new', { errors: errors });
};

exports.create = function (req, res) {
	var login = req.body.login;
	var password = req.body.password;
	var userController = require(__dirname + '/controller_user');
	userController.autenticar(login, password, function(error, user){
		if(error){
			req.session.errors = [{"message" : error}];
			res.redirect("login");
			return;
		}
		req.session.user = { id: user.id, username: user.username };
		res.redirect(req.session.redir.toString());
	});
};

exports.destroy = function (req, res) {
	delete req.session.user;
	res.redirect(req.session.redir.toString());
};