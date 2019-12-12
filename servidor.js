var express = require('express');
var mustache = require('mustache-express');
var app = express();

app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', __dirname + '/jogo da velhar1');

app.get('/', function(req, res) {
    res.render( __dirname + '/html/PROJ.html');
});

app.get('/escolha', function(req, res) {
    res.render( __dirname + '/html/player.html');
});

// TABELA PRA DEIXAR O ARRAY COM 0
var tabela= [
  [0,0,0,0,0],
  [0,0,0,0,0],
  [0,0,0,0,0],
  [0,0,0,0,0],
  [0,0,0,0,0]
];
//VARIAVEIS GLOBAIS DO VALOR
var jogador0 = 'X';
var jogador01 = 'O';
var jogadorDaVez = jogador0;
var gameover=false;
var ganhador;
var deuvelha=0;
var imprimir;
var posicao;

function quemvenceu(){


for(var c=0;c<5;c++){
  if (tabela[c][0]==tabela[c][1] && tabela[c][1]==tabela[c][2]&& tabela[c][2]==tabela[c][3]&&tabela[c][3]==tabela[c][4]&&tabela[c][0]!=0) {
    posicao=c;
    imprimir='linha';
    ganhador=tabela[c][0];
    gameover=true;
    break;


  }else if (tabela[0][c]==tabela[1][c] && tabela[1][c]==tabela[2][c]&& tabela[2][c]==tabela[3][c]&&tabela[3][c]==tabela[4][c]&&tabela[0][c]!=0) {
    posicao=c;
    imprimir='coluna';
    ganhador=tabela[0][c];
    gameover=true;
    break;
  }else if (tabela[0][0]==tabela[1][1]&&tabela[1][1]==tabela[2][2]&&tabela[2][2]==tabela[3][3]&&tabela[3][3]==tabela[4][4]&&tabela[0][0]!=0) {
    imprimir='diagonap';
    ganhador=tabela[0][0];
    gameover=true;
    break;
  }else{
    if (tabela[0][4]==tabela[1][3]&&tabela[1][3]==tabela[2][2]&&tabela[2][2]==tabela[3][1]&&tabela[3][1]==tabela[4][0]&&tabela[0][4]!=0) {
      imprimir='diagonas';
      ganhador=tabela[0][4];
      gameover=true;
      break;
    }
  }

}

}

function verificaretrocar(i, j) {



   if (tabela[i][j]==0) {
   
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
        
}
function paracomeçarcomO(i,j){
	if (tabela[i][j]==0) {
   
        if (jogadorDaVez == jogador01) {
          tabela[i][j] =2;
          jogadorDaVez = jogador0;
        }else{
          tabela[i][j]=1;
          jogadorDaVez=jogador01;
        }

    

     }
      //SE A TABELA FOR IGUAL A 1 ELE VAI ALTERAR PRA JOGADOR0 = X SE NAO VAI ALTERAR PRA JOGARDOR01 QUE E O
        if (tabela[i][j]==1) {
          tabela[i][j]= jogador0;
        }else{
          tabela[i][j] = jogador01;
        }
}


app.get('/jogar', function(req, res) {
     res.setHeader('Content-Type', 'text/html');

     //SE O VALOR DO ARRAY DIFERENTE DE -1 ELE EXECUTA O PROGRAMA
    var i = req.query.i || -1;
    var j = req.query.j || -1;
    if (i != -1 && j != -1){
      //MOSTRAR NO SERVIDOR EM QUAL TABELA CLICOU
      console.log(`clicou  em ${i},${j}`)
     
      //CHAMANDO A VARIAVEL VERICAR E TROCAR
    

     verificaretrocar(i,j);
     quemvenceu();   
   


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
     
        if (gameover==false) {
if (deuvelha==25) {
  res.write('deuvelha,o jogo terminou empatado');
}else{ 

if (jogadorDaVez == jogador0) {
         res.write('vez do jogador: ');
        res.write('jogador 2');
      }else{
        res.write('vez do jogador: ');
        res.write('jogador 1');
      }

}
}
if (gameover==true && ganhador==jogador0) {
  res.write('O jogador 2 ganhou');
}else{
  if (gameover==true && ganhador== jogador01) {
    res.write('jogador 1 ganhou');
  }
}
      res.write('</h1>');
    
      res.write('</div>');
      //CRIANDO A TABELA E LINKANDO DANDO A CLASSE TABULEIRO
  res.write('<table class="tabuleiro">');


       if (gameover==false) {
      
      deuvelha=deuvelha+1;
      
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

    }
        
        res.write('</tr>');
    }else{
    	
      if (imprimir=='linha') {
      
for (var i = 0; i < tabela.length; i++) {
        res.write('<tr>');
        

        for (var j = 0; j < tabela.length; j++) {
         
     if (i==posicao) {
        res.write(`<td class="espaço">${tabela[i][j]}</td>`);
     }else{
      res.write(`<td class="espaço"><a style="text-decoration: none;color:white;font-size:40;text-align: center;" href="/jogar?i=${i}&j=${j}"></a></td>`);      
     }
    
}

    }
        
        res.write('</tr>');

  
      }else if (imprimir=='coluna') {

        for (var j = 0; j < tabela.length; j++) {
        res.write('<tr>');
        
      
        for (var i = 0; i < tabela.length; i++) {
   
    if (i==posicao) {
        
        res.write(`<td class="espaço">${tabela[j][i]}</td>`);
     }else{
      res.write(`<td class="espaço"><a style="text-decoration: none;color:white;font-size:40;text-align: center;" href="/jogar?i=${i}&j=${j}"></a></td>`);      
     }

}

    }
        
        res.write('</tr>');


      }else if (imprimir=='diagonap') {


for (var i = 0; i < tabela.length; i++) {
        res.write('<tr>');
        

        for (var j = 0; j < tabela.length; j++) {
         
     if (i==j) {
        res.write(`<td class="espaço">${tabela[i][j]}</td>`);
     }else{
      res.write(`<td class="espaço"><a style="text-decoration: none;color:white;font-size:40;text-align: center;" href="/jogar?i=${i}&j=${j}"></a></td>`);      
     }
    
}

    }
        
        res.write('</tr>');


      }else{
        
        if (imprimir=='diagonas') {


          for (var i = 0; i < tabela.length; i++) {
        res.write('<tr>');
        

        for (var j = 0; j < tabela.length; j++) {
         
    if (i+j==4) {
      res.write(`<td class="espaço">${tabela[i][j]}</td>`);
    }else{
      res.write(`<td class="espaço"><a style="text-decoration: none;color:white;font-size:40;text-align: center;" href="/jogar?i=${i}&j=${j}"></a></td>`); 
    }
      
}

    }
        
        res.write('</tr>');
        }
      }
    
    }

   //ENCERRA A TABELA
    res.write('</table>');
   res.write('<ul>');
   res.write('<a href="/reset">');
   res.write('JOGAR NOVAMENTE');
    res.write('</a>');
   res.write('</ul>');
   //CRIANDO O VOLTAR PRA ELE VOLTAR PRO MENU
   res.write('<ul>');
   res.write('<a href="/voltar">');
    res.write('VOLTAR');
    res.write('</a>');
   res.write('</ul>');
   
   
    res.write('</body>');
    res.write('</html>');
    
    res.end();
});



      
app.get('/jogar1', function(req, res) {
     res.setHeader('Content-Type', 'text/html');


//FUNÇÃO PRA MUDAR O INDENTIFICADOR PRA DA X OU PRA O; PRA INDENTIFICAR QUEM VAI JOGAR



var i = req.query.i || -1;
    var j = req.query.j || -1;
    if (i != -1 && j != -1){
      //MOSTRAR NO SERVIDOR EM QUAL TABELA CLICOU
      console.log(`clicou  em ${i},${j}`)
        
      paracomeçarcomO(i,j);
     quemvenceu();   
   
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
   
   if (gameover==false) {
if (deuvelha==25) {
  res.write('deuvelha,o jogo terminou empatado');
}else{ 

if (jogadorDaVez == jogador01) {
         res.write('vez do jogador: ');
        res.write('jogador 2');
      }else{
        res.write('vez do jogador: ');
        res.write('jogador 1');
      }

}
}
if (gameover==true && ganhador==jogador0) {
  res.write('O jogador 1 ganhou');
}else{
  if (gameover==true && ganhador== jogador01) {
    res.write('jogador 2 ganhou');
  }
}
      res.write('</h1>');
    
      res.write('</div>');
      //CRIANDO A TABELA E LINKANDO DANDO A CLASSE TABULEIRO
  res.write('<table class="tabuleiro">');

     
       if (gameover==false) {
      
      deuvelha=deuvelha+1;
      
      //CRIANDO UM FOR PRA DA O VALOR DA TABELA
    for (var i = 0; i < tabela.length; i++) {
        res.write('<tr>');
        

        for (var j = 0; j < tabela.length; j++) {
         
     
        //SE A TABELA NO ARRAY FOR 0 ELE VAI DEIXAR EM BRANCO PODENDO MUDAR SENAO ELE VAI MOSTRAR O VALOR DE TABELA[I][J]
        if (tabela[i][j]==0) {
        res.write(`<td class="espaço"><a style="text-decoration: none;color:white;font-size:40;text-align: center;" href="/jogar1?i=${i}&j=${j}">click</a></td>`);

        }else{
          res.write(`<td class="espaço">${tabela[i][j]}</td>`);
        }
}


    }
        
        res.write('</tr>');
    }else{
    
      if (imprimir=='linha') {
      
for (var i = 0; i < tabela.length; i++) {
        res.write('<tr>');
        

        for (var j = 0; j < tabela.length; j++) {
         
     if (i==posicao) {
        res.write(`<td class="espaço">${tabela[i][j]}</td>`);
     }else{
      res.write(`<td class="espaço"><a style="text-decoration: none;color:white;font-size:40;text-align: center;" href="/jogar1?i=${i}&j=${j}"></a></td>`);      
     }
      
}

    }
        
        res.write('</tr>');
}else if (imprimir=='coluna') {

        for (var j = 0; j < tabela.length; j++) {
        res.write('<tr>');
        
      
        for (var i = 0; i < tabela.length; i++) {
   
    if (i==posicao) {
        
        res.write(`<td class="espaço">${tabela[j][i]}</td>`);
     }else{
      res.write(`<td class="espaço"><a style="text-decoration: none;color:white;font-size:40;text-align: center;" href="/jogar?i=${i}&j=${j}"></a></td>`);      
     }

}

    }
        
        res.write('</tr>');


      }else if (imprimir=='diagonap') {


for (var i = 0; i < tabela.length; i++) {
        res.write('<tr>');
        

        for (var j = 0; j < tabela.length; j++) {
         
     if (i==j) {
        res.write(`<td class="espaço">${tabela[i][j]}</td>`);
     }else{
      res.write(`<td class="espaço"><a style="text-decoration: none;color:white;font-size:40;text-align: center;" href="/jogar?i=${i}&j=${j}"></a></td>`);      
     }
     
}

    }
        
        res.write('</tr>');


      }else{
        
        if (imprimir=='diagonas') {


          for (var i = 0; i < tabela.length; i++) {
        res.write('<tr>');
        

        for (var j = 0; j < tabela.length; j++) {
         
    if (i+j==4) {
      res.write(`<td class="espaço">${tabela[i][j]}</td>`);
    }else{
      res.write(`<td class="espaço"><a style="text-decoration: none;color:white;font-size:40;text-align: center;" href="/jogar?i=${i}&j=${j}"></a></td>`); 
    }
       
}

    }
        
        res.write('</tr>');
        }
      }
    

    }

   //ENCERRA A TABELA
    res.write('</table>');
   res.write('<ul>');
   res.write('<a href="/reset">');
   res.write('JOGAR NOVAMENTE');
    res.write('</a>');
   res.write('</ul>');
   //CRIANDO O VOLTAR PRA ELE VOLTAR PRO MENU
   res.write('<ul>');
   res.write('<a href="/voltar">');
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


app.get('/reset', function(req, res) {
  tabela= [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
  ];
  
  jogadorDaVez='';
  jogador0 = 'X';
  jogador01 = 'O';
  gameover=false;
  ganhador='';
  deuvelha=0;
  imprimir='';
   posicao=0;
  res.redirect('/escolha');
})

app.get('/voltar',function(req,res){
  tabela= [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
  ];

jogadorDaVez='';
  jogador0 = 'X';
  jogador01 = 'O';
  gameover=false;
  ganhador='';
  deuvelha=0;
  imprimir='';
   posicao=0;
  res.redirect('/');

});

app.use('/css',express.static(__dirname + '/css'));

app.use(express.static('imagens'));







var port = 3000;
app.listen(port, function() {
    console.log(`Escutando na porta ${port}...`);
})