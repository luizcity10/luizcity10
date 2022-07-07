let cadastroUsuario = [] 
let Conta = {}
let Seguranca = {}
let listaSeguranca = []
var nomes = ""
var cpfs = ""
var segurancaAtual
var idSeguranca
var listaHistorico = []
const url = "http://192.168.43.15"
var historicoSeguranca = ""

function MostrarSegurancaAtual(){
    segurancaAtual = JSON.parse(localStorage.getItem('SegurancaAtual'))

    document.getElementById('seguranca').innerHTML = "Nome: "+segurancaAtual.nome + "<br>" +"CPF: "+ segurancaAtual.cpf + "<br>" +"Endereço: "+segurancaAtual.endereco + "<br>" + "Data de nascimento: "+segurancaAtual.nascimento + "<br>" + "Telefone: "+segurancaAtual.telefone + "<br>"
    document.getElementById('botao').innerHTML = `<button onclick=''>Histórico</a>`

    document.getElementById('edicaoDentro').innerHTML = ""
}

function SalvarSegurancaAtual(i){   

    segurancaAtual = null

    idSeguranca = i

    localStorage.setItem(`PosicaoSeguranca`, JSON.stringify(idSeguranca))
    
    listaSeguranca = JSON.parse(localStorage.getItem('Segurancas'))

    segurancaAtual = listaSeguranca[i]

    localStorage.setItem(`SegurancaAtual`, JSON.stringify(segurancaAtual))

}

function MostrarUsuarioAtual(){
    usuarioAtual = JSON.parse(localStorage.getItem('UsuarioAtual'))
    document.getElementById("usuarioAtual").innerHTML = "Usuario Atual: " + usuarioAtual.usuario
    //+'<br><a id="deslogar" onclick="Deslogar()" href="Tela_de_Login.html">Deslogar</a>'
  }

function ListarSeguranca(){
    
    listaSeguranca = JSON.parse(localStorage.getItem('Segurancas'))
       
    for(var i=0; i<listaSeguranca.length; i++){

        nomes += "<a onclick='SalvarSegurancaAtual("+i+"),MostrarHistorico()' id='Seguranca'>" + listaSeguranca[i].nome + "</a><br>"
        cpfs += "<a onclick='SalvarSegurancaAtual("+i+"),MostrarHistorico()' id='Seguranca'>" + listaSeguranca[i].cpf + "</a><br>"

        document.getElementById('listaNomes').innerHTML = nomes
        document.getElementById('listaCPF').innerHTML = cpfs

    }

}

function MostrarHistorico(){

    listaHistorico = JSON.parse(localStorage.getItem('HistoricoTags'))
    segurancaAtual = JSON.parse(localStorage.getItem('SegurancaAtual'))
    historicoSeguranca = ""

    if(listaHistorico == null){
        document.getElementById('historico').innerHTML = "Nenhum ponto encontrado"
    }
    else{

        for(var i=0; i<listaHistorico.length; i++){
        
            if(listaHistorico[i].tagID == segurancaAtual.tag){
            
                historicoSeguranca += "Data: "+ listaHistorico[i].dia + "/"+ listaHistorico[i].mes + "/"+listaHistorico[i].ano + "<br>" + "Horário: "+listaHistorico[i].hora  + ":"+listaHistorico[i].minuto + "<br><br>"
            }  
        }
            if(historicoSeguranca == ""){
                document.getElementById('historico').innerHTML = "Nenhum ponto encontrado"
            }else{
                document.getElementById('historico').innerHTML = historicoSeguranca
            }
    }
}

function Deslogar(){
    usuarioAtual = JSON.parse(localStorage.getItem('UsuarioAtual'))
    usuarioAtual = null;
    localStorage.setItem(`UsuarioAtual`, JSON.stringify(usuarioAtual))
    alert("Deslogando...")
    window.location.href = "Tela_de_Login.html";

}

function VoltarIndex(){
    window.location.href = "index.html";
}

setInterval(function ( ) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {	
        //caso receba alguma informação 
        if(this.responseText){
        //document.getElementById("tag").innerHTML = this.responseText;
        salvarPonto(this.responseText)
        window.location.href = "Tela_De_Desempenho_Segurancas.html";
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
