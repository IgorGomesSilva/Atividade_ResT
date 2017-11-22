var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var Schema  = mongoose.Schema;

var UsuarioSchema = new Schema({
	email:String,
	senha:String,
	token:String
});

UsuarioSchema.methods.gerarToken = function(email, senha){
	return jwt.sign({'email':email, 'senha':senha}, 'segredo');
}

UsuarioSchema.methods.gerarSenha= function(senha){
	return bcrypt.hashSync(senha, bcrypt.genSaltSync(9));
}

UsuarioSchema.methods.validarSenha = function(senha){
	return bcrypt.compareSync(senha, this.senha);
}

module.exports = mongoose.model('Usuario', UsuarioSchema);
