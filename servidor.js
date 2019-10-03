var express = require('express');
var mustache = require('mustache-express');
var app = express();

app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', __dirname + '/jogo da velhar1');

app.get('/', function(req, res) {
    res.render( __dirname + '/html/PROJ.html');
});

app.get('/jogar', function(req, res) {
    res.render( __dirname + '/html/jogar.html');
});

app.get('/ajuda', function(req, res) {
    res.render( __dirname + '/html/ajuda.html');
});

app.get('/sobre', function(req, res) {
    res.render( __dirname + '/html/sobre.html');
});

app.use('/css',express.static(__dirname + '/css'));

app.use(express.static('imagens'));







var port = 3000;
app.listen(port, function() {
    console.log(`Escutando na porta ${port}...`);
})