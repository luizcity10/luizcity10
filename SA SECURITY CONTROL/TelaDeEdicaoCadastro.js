let cadastroUsuario = [] 
let Conta = {}
let Seguranca = {}
let listaSeguranca = []
var posicaoAtual
var segurancaAtual
var lista = ""
const url = "http://192.168.43.15"


function MostrarUsuarioAtual(){
    usuarioAtual = JSON.parse(localStorage.getItem('UsuarioAtual'))
    document.getElementById("usuarioAtual").innerHTML = "Usuario Atual: " + usuarioAtual.usuario
    //+'<br><a id="deslogar" onclick="Deslogar()" href="Tela_de_Login.html">Deslogar</a>'
  }

function MostrarCadastroAtual(){
    usuario = JSON.parse(localStorage.getItem('UsuarioAtual'))

    document.getElementById('texto').innerHTML = "<center><br><br>Nome: <input type='text' id='nome' value='"+usuario.usuario+"'placeholder='Nome'><br><br>Sobrenome: <input type='text' id='sobrenome' value='"+usuario.sobrenome+"' placeholder='sobrenome'> <br><br>Data de nascimento: <input type='date' id='nascimento' value='"+usuario.nascimento+"'><br><br> CPF: <input type='text' id='cpf' value='"+usuario.cpf+"'><br><br>Nova senha: <input type='password' id='senha' placeholder='Nova senha'><br><br>Confirmar senha: <input type='password' id='confirmarSenha' placeholder='Confirmar senha'></center>"

}

function EditarCadastro(){

    usuarios = JSON.parse(localStorage.getItem('Logins'))
    posicaoLogin = JSON.parse(localStorage.getItem('PosicaoLogin'))

    resultado = confirm("Confirmar edição?")

    if(resultado == true){
        usuarios[posicaoLogin].usuario = document.getElementById("nome").value
        usuarios[posicaoLogin].sobrenome = document.getElementById("sobrenome").value
        usuarios[posicaoLogin].nascimento = document.getElementById("nascimento").value
        usuarios[posicaoLogin].cpf = document.getElementById("cpf").value
        usuarios[posicaoLogin].senha = document.getElementById("senha").value

        localStorage.setItem(`Logins`, JSON.stringify(usuarios))
        localStorage.setItem(`UsuarioAtual`, JSON.stringify(usuarios[posicaoLogin]))
        
        window,location.href = "Tela_de_Alterar_Cadastro.html";
    }
}

//Função para mostrar logins, para teste
function listarCadastros(){
    usuarios = JSON.parse(localStorage.getItem('Logins'))

    for(var i = 0; i<usuarios.length; i++){
        lista = lista + Object.values(usuarios[i])
    }
    alert(lista)

    lista = ''
    
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
