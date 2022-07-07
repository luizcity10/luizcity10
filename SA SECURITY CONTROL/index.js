let cadastroUsuario = [] 
let Conta = {}
let Seguranca = {}
let listaSeguranca = []
const url = "http://192.168.43.15"
var historico = {}
var listaHistorico = []


function Deslogar(){
    usuarioAtual = JSON.parse(localStorage.getItem('UsuarioAtual'))
    usuarioAtual = null;
    localStorage.setItem(`UsuarioAtual`, JSON.stringify(usuarioAtual))
    alert("Deslogando...")
    window.location.href = "Tela_de_Login.html";

}

function MostrarUsuarioAtual(){
  usuarioAtual = JSON.parse(localStorage.getItem('UsuarioAtual'))
  document.getElementById("usuarioAtual").innerHTML = "Usuario Atual: " + usuarioAtual.usuario
  //+'<br><a id="deslogar" onclick="Deslogar()" href="Tela_de_Login.html">Deslogar</a>'
}

function cadastrarSegurança(){
     
    listaSeguranca = JSON.parse(localStorage.getItem('Segurancas'))
     
    if(listaSeguranca == null){
        

    }

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

  function IrParaCadastroSeguranca(){
    window.location.href = "Tela_de_cadastro_de_segurança.html";
  }

  function IrParaListaSeguranca(){
    window.location.href = "Tela_De_Listar_Segurancas.html";
  }


  function IrParaAlterarCadastro(){
    window.location.href = "Tela_de_Alterar_Cadastro.html";
  }

  function IrParaCadastroSeguranca(){
    window.location.href = "Tela_de_cadastro_de_segurança.html";
  }

  function irParaDesempenho(){
    
    window.location.href = "Tela_De_Desempenho_Segurancas.html";
}