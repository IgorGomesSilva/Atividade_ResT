var app = require('./config/app_config');
var db  = require('./config/db_config');
var User = require('./models/computador');
var computadorController = require('./controllers/computadorController');
var computadores = require('./routes/computadorRouter');
var usuario = require('./routes/usuarioRouter');


app.get('/',function(req,res){
	res.end('Bem-vindo a API de Computadores')
});

//rotas de pcs
app.use('/computadores',computadores);
app.use('/usuarios',usuario);
