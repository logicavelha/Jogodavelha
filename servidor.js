var express = require('express');
var mustache = require('mustache-express');
var app = express();

app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', __dirname + '/jogo da velhar1');

app.get('/', function(req, res) {
    res.render( __dirname + '/html/PROJ.html');
});

// TABELA PRA DEIXAR O ARRAY COM 0
const tabela= [
  [0,0,0,0,0],
  [0,0,0,0,0],
  [0,0,0,0,0],
  [0,0,0,0,0],
  [0,0,0,0,0]
];
//VARIAVEIS GLOBAIS DO VALOR
var jogadorDaVez = jogador0;
var jogador0 = 'X';
var jogador01 = 'O';


app.get('/jogar', function(req, res) {
     res.setHeader('Content-Type', 'text/html');
//FUNÇÃO PRA VER SE PODE USAR O CLICK E MUDAR O VALOR
   
function verificaretrocar() {

//VERIFICA SE A O ESPAÇO TA VAZIO PRA TROCA O ARRAY PRA 1 OU PRA 2 E MUDAR O JOGADOR DA VEZ
   if (tabela[i][j]==0) {
    //SE O JOGADORDAVEZ = JOGADOR0 VAI ALTERAR PRA 1 SE NAO VAI ALTERAR PRA 2
        if (jogadorDaVez == jogador0) {
          tabela[i][j] =1;
          jogadorDaVez = jogador01;
        }else{
          tabela[i][j]=2;
          jogadorDaVez=jogador0;
        }

    

     }
      //SE A TABELA FOR IGUAL A 1 ELE VAI ALTERAR PRA JOGADOR0 = X SE NAO VAI ALTERAR PRA JOGARDOR01 QUE E O
        if (tabela[i][j]==1) {
          tabela[i][j]= jogador0;
        }else{
          tabela[i][j] = jogador01;
        }
        
  return;
}

//FUNÇÃO PRA MUDAR O INDENTIFICADOR PRA DA X OU PRA O; PRA INDENTIFICAR QUEM VAI JOGAR
function vezdojogador(){
if (jogadorDaVez == jogador0) {
        res.write('X');
      }else{
        res.write('O');
      }

      return;

}


    //SE O VALOR DO ARRAY DIFERENTE DE -1 ELE EXECUTA O PROGRAMA
    var i = req.query.i || -1;
    var j = req.query.j || -1;
    if (i != -1 && j != -1){
      //MOSTRAR NO SERVIDOR EM QUAL TABELA CLICOU
      console.log(`clicou  em ${i},${j}`)
     
      //CHAMANDO A VARIAVEL VERICAR E TROCAR
     verificaretrocar();
        



    }
      //COMEÇANDO O HTML
    res.write('<html>');
    res.write('<head>');
        //MOSTRANDO O TITULO E LINKANDO O CSS
        res.write('<meta charset="utf-8">');
        res.write('<title>jogo da velha</title>');
    res.write('<link rel="stylesheet" type="text/css" href="/css/jogar.css">');       


     res.write('</head>');
    //COLOCANDO A IMAGEM DE FUNDO
    res.write('<body style="background-image: url(000.jpg);">');
  //CRIANDO UMA DIV INDENTIFICADOR PRA MOSTRAR A VEZ DE QUEM JOGOU E CHAMANDO A FUNÇÃO VEZDOJOGADOR
  res.write('<div class="indentificador">');
      res.write('<h1>');
      res.write('vez do jogador: ');
        vezdojogador();
      res.write('</h1>');
    
      res.write('</div>');
      //CRIANDO A TABELA E LINKANDO DANDO A CLASSE TABULEIRO
  res.write('<table class="tabuleiro">');

      
      
       
      //CRIANDO UM FOR PRA DA O VALOR DA TABELA
    for (var i = 0; i < tabela.length; i++) {
        res.write('<tr>');
        

        for (var j = 0; j < tabela.length; j++) {
         
     
        //SE A TABELA NO ARRAY FOR 0 ELE VAI DEIXAR EM BRANCO PODENDO MUDAR SENAO ELE VAI MOSTRAR O VALOR DE TABELA[I][J]
        if (tabela[i][j]==0) {
        res.write(`<td class="espaço"><a style="text-decoration: none;color:white;font-size:40;text-align: center;" href="/jogar?i=${i}&j=${j}">click</a></td>`);
        
        }else{
          res.write(`<td class="espaço">${tabela[i][j]}</td>`);
        }

    }
        
        res.write('</tr>');
    }

   //ENCERRA A TABELA
    res.write('</table>');
   //CRIANDO O VOLTAR PRA ELE VOLTAR PRO MENU
   res.write('<ul>');
   res.write('<a href="/">');
    res.write('VOLTAR');
    res.write('</a>');
   res.write('</ul>');
   
   
    res.write('</body>');
    res.write('</html>');
    
    res.end();
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