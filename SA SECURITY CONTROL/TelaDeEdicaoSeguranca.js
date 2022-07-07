let cadastroUsuario = [] 
let Conta = {}
let Seguranca = {}
let listaSeguranca = []
var posicaoAtual
var segurancaAtual


function MostrarUsuarioAtual(){
    usuarioAtual = JSON.parse(localStorage.getItem('UsuarioAtual'))
    document.getElementById("header").innerHTML = "<label id='usuarioAtual'>Usuario atual: " + usuarioAtual.usuario +'</label>'
    //+'<br><a id="deslogar" onclick="Deslogar()" href="Tela_de_Login.html">Deslogar</a>'
}


function MostrarDadosSeguranca(){
    segurancaAtual = JSON.parse(localStorage.getItem('SegurancaAtual'))


    document.getElementById('texto').innerHTML = "<center><br><br><input type='text' id='nome' value='"+segurancaAtual.nome+"'placeholder='Nome'><br><br><input type='text' id='cpf' value='"+segurancaAtual.cpf+"' placeholder='CPF'> <br><br>  <input type='tel' id='telefone' value='"+segurancaAtual.telefone+"' placeholder='Telefone'><br><br> Data de nascimento:<br><input type='date' id='nascimento' value='"+segurancaAtual.nascimento+"'placeholder='Data de nascimento'><br><br><input type='text' id='endereco' value='"+segurancaAtual.endereco+"'placeholder='Endereço'><br><br></center>"

}

function EditarSeguranca(){
    listaSeguranca = JSON.parse(localStorage.getItem('Segurancas'))
    posicaoAtual = JSON.parse(localStorage.getItem('PosicaoSeguranca'))

    resultado = confirm("Confirmar edição?")

    if(resultado == true){
        listaSeguranca[posicaoAtual].nome = document.getElementById("nome").value
        listaSeguranca[posicaoAtual].cpf = document.getElementById("cpf").value
        listaSeguranca[posicaoAtual].telefone = document.getElementById("telefone").value
        listaSeguranca[posicaoAtual].endereco = document.getElementById("endereco").value
        listaSeguranca[posicaoAtual].nascimento = document.getElementById("nascimento").value

        localStorage.setItem(`Segurancas`, JSON.stringify(listaSeguranca))
        SalvarSegurancaAtual(posicaoAtual)
        alert("Segurança Alterado!")
        window,location.href = "Tela_de_Informacoes_Seguranca.html";
    }

}

function SalvarSegurancaAtual(i){

    segurancaAtual = null

    idSeguranca = i

    localStorage.setItem(`PosicaoSeguranca`, JSON.stringify(idSeguranca))
    
    listaSeguranca = JSON.parse(localStorage.getItem('Segurancas'))

    segurancaAtual = listaSeguranca[i]

    localStorage.setItem(`SegurancaAtual`, JSON.stringify(segurancaAtual))

}

function Deslogar(){
    usuarioAtual = JSON.parse(localStorage.getItem('UsuarioAtual'))
    usuarioAtual = null;
    localStorage.setItem(`UsuarioAtual`, JSON.stringify(usuarioAtual))
    alert("Deslogando...")
    window.location.href = "Tela_de_Login.html";

}