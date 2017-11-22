var Computador = require('../models/computador');


exports.save =  function(nome,descricao, valor, callback){
	new Computador({
		'nome': nome,
		'descricao':descricao,
		'valor':valor
	}).save(function(error, computador){
		if(error){
			callback({error: 'Não foi possivel salvar'})
		}else{
			callback(computador);
		}
	});
}

exports.list = function(callback){
	Computador.find({}, function(error, computadores){
		if(error){
			callback({error: 'Não foi possivel encontrar os computadores'});
		}else{
			callback(computadores);
		}
	});
}

exports.delete = function(id, callback){
	Computador.findById(id, function(error, computador){
		if (error){
			callback({error:'Não foi possivel excluir'});
		}else{
			computador.remove(function(error){
				if(!error){
					callback({resposta:"Computador excluido com sucesso"});
				}
			});
		}
	})
}
