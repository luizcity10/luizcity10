let cadastroUsuario = [] 
let Conta = {}
let Seguranca = {}
let listaSeguranca = []
var segurancaAtual

function MostrarUsuarioAtual(){
    usuarioAtual = JSON.parse(localStorage.getItem('UsuarioAtual'))
    document.getElementById("header").innerHTML = "<label id='usuarioAtual'>Usuario atual: " + usuarioAtual.usuario +'</label>'
    //+'<br><a id="deslogar" onclick="Deslogar()" href="Tela_de_Login.html">Deslogar</a>'
}

function IrParaEdicao(){
    window.location.href = "Tela_De_Edicao_Seguranca.html";
}

function MostrarUsuarioAtual(){
    document.getElementById("header").innerHTML = "<label id='usuarioAtual'>Usuario atual: " + JSON.parse(localStorage.getItem('UsuarioAtual')) +'</label>'
    //+'<br><a id="deslogar" onclick="Deslogar()" href="Tela_de_Login.html">Deslogar</a>'
}