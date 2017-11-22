var Usuario = require('../models/Usuario');

exports.save = function(email, senha, callback){
	Usuario.findOne({'email':email}, function(erro, usuario){
		if(erro){
			callback('Deu erro');
		}else{
			var novoUsuario = new Usuario();
			novoUsuario.email= email;
			novoUsuario.senha = novoUsuario.gerarSenha(senha);
			novoUsuario.token = novoUsuario.gerarToken(email, senha);
			novoUsuario.save(function(erro, usuario){
				if(erro){
					callback('deu erro');
				}else{
					callback(usuario);
				}
			});
		}
	})
}

exports.login = function(email, senha, callback){
	Usuario.findOne({'email':email}, function(erro, usuario){
		if(erro){
			callback('Deu erro');
		}else if(usuario){
			if(usuario.validarSenha(senha)){
				callback(usuario.token);
			}else{
				callback('Senha incorreta');
			}
		}else{
			callback('Usuario inexistente');
		}
	})

}


exports.list = function(token, callback){
	Usuario.findOne({'token':token}, function(erro, usuario){
		if(erro){
			callback('Deu erro');
		}else if(usuario){
			callback({'email':usuario.email});
		}else{
			callback('Usuario não encontrado');
		}
	});
}

exports.authorize = function(token, callback){
	Usuario.findOne({'token':token}, function(erro, usuario){
		if(erro){
			callback(false);
		}else if(usuario){
			callback(true);
		}else{
			callback(false);
		}
	});
}
