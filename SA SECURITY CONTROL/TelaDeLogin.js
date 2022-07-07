let cadastroUsuario = [] 
let Conta = {}
const url = "http://192.168.43.15"

function Login(){

    cadastroUsuario = JSON.parse(localStorage.getItem(`Logins`));
    usuarioDigitado = document.getElementById("usuario").value;
    senhaDigitada = document.getElementById("senha").value;
    validacao = false;

    if(cadastroUsuario == null){
            alert("Usuário ou senha não encontrado!")
        }
    
    else{
        for(var i = 0; cadastroUsuario[i]; i++){
            if(usuarioDigitado == cadastroUsuario[i].usuario && senhaDigitada == cadastroUsuario[i].senha)
            {
                alert(`Bem-vindo ${cadastroUsuario[i].usuario}`);
                validacao = true
                localStorage.setItem(`UsuarioAtual`, JSON.stringify(cadastroUsuario[i]))
                localStorage.setItem(`PosicaoLogin`, JSON.stringify(i))
            }
        }
        if(validacao == true)
        {
            alert("Usuário logado com sucesso!");

            IrParaIndex();
        }
        else
        {
           alert("Usuário ou senha não encontrado!")
        }
    
    }
}

function IrParaIndex(){
    window.location.href = "index.html";
}

function IrParaCadastro(){
    window.location.href = "Tela_de_cadastro_de_usuário.html";
}

setInterval(function ( ) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {	
      //caso receba alguma informação 
      if(this.responseText){
      //document.getElementById("tag").innerHTML = this.responseText;
      salvarPonto(this.responseText)
      }
    }
  };
  xhttp.open("GET", url+"/rfid", true);    
  xhttp.send();
}, 3000 ) ;


function salvarPonto(tag){

alert("Tag passada")

  listaHistorico = JSON.parse(localStorage.getItem('HistoricoTags'))
  var dataAtual = new Date();
  var dia = dataAtual.getDate();
  var mes = (dataAtual.getMonth() + 1);
  var ano = dataAtual.getFullYear();
  var horas = dataAtual.getHours();
  var minutos = dataAtual.getMinutes();
  // saída: Hoje é dia 15/7 de 2020. Agora são 14:59h.
   
  if(listaHistorico == null){

      listaHistorico = []
      historico = {

          tagID: tag,
          ano: ano,
          mes: mes,
          dia: dia,
          hora: horas,
          minuto: minutos,
          
      }       
          listaHistorico.push(historico)
          localStorage.setItem(`HistoricoTags`, JSON.stringify(listaHistorico))
  }

  else{
      
    historico = {

          tagID: tag,
          ano: ano,
          mes: mes,
          dia: dia,
          hora: horas,
          minuto: minutos,
      
    }
      
      listaHistorico.push(historico)
      localStorage.setItem(`HistoricoTags`, JSON.stringify(listaHistorico))

  }
}
