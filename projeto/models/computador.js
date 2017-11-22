var mongoose = require('mongoose');
var Schema  = mongoose.Schema;

var ComputadorSchema = new Schema({
	nome: String,
	descricao: String,
	valor:Number
});

module.exports = mongoose.model('Computador', ComputadorSchema);
