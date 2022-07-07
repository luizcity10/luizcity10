let cadastroUsuario = [] 
let Conta = {}
let Seguranca = {}
let listaSeguranca = []
var nomes = ""
var cpfs = ""
var segurancaAtual
var idSeguranca


function MostrarUsuarioAtual(){
    document.getElementById("header").innerHTML = "<label id='usuarioAtual'>Usuario atual: " + JSON.parse(localStorage.getItem('UsuarioAtual')) +'</label>'
    //+'<br><a id="deslogar" onclick="Deslogar()" href="Tela_de_Login.html">Deslogar</a>'
}


function ListarSeguranca(){
    
    listaSeguranca = JSON.parse(localStorage.getItem('Segurancas'))
       
    for(var i=0; i<listaSeguranca.length; i++){

        nomes += "<a onclick='SalvarSegurancaAtual("+i+"),MostrarSegurancaAtual()' id='Seguranca'>" + listaSeguranca[i].nome + "</a><br>"
        cpfs += "<a onclick='SalvarSegurancaAtual("+i+"),MostrarSegurancaAtual()' id='Seguranca'>" + listaSeguranca[i].cpf + "</a><br>"

        document.getElementById('listaNomes').innerHTML = nomes
        document.getElementById('listaCPF').innerHTML = cpfs

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

function MostrarSegurancaAtual(){
    segurancaAtual = JSON.parse(localStorage.getItem('SegurancaAtual'))

    document.getElementById('seguranca').innerHTML = "Nome: "+segurancaAtual.nome + "<br>" +"CPF: "+ segurancaAtual.cpf + "<br>" +"Endereço: "+segurancaAtual.endereco + "<br>" + "Data de nascimento: "+segurancaAtual.nascimento + "<br>" + "Telefone: "+segurancaAtual.telefone + "<br>"
    document.getElementById('botao').innerHTML = `<button onclick='MostrarEdicao()'>Editar</a> <button onclick='ExcluirSeguranca(${segurancaAtual.cpf})'>Excluir</a>`

    document.getElementById('edicaoDentro').innerHTML = ""
}

function MostrarEdicao(){
    segurancaAtual = JSON.parse(localStorage.getItem('SegurancaAtual'))


    document.getElementById('edicaoDentro').innerHTML = "<center><div id='tituloEdicao'>Edição de colaborador</div></center><center><br><br>Nome: <input type='text' id='nome' value='"+segurancaAtual.nome+"'placeholder='Nome'><br><br>CPF: <input type='text' id='cpf' value='"+segurancaAtual.cpf+"' placeholder='CPF'> <br><br>Telefone: <input type='tel' id='telefone' value='"+segurancaAtual.telefone+"' placeholder='Telefone'><br><br>Data de nascimento:<input type='date' id='nascimento' value='"+segurancaAtual.nascimento+"'placeholder='Data de nascimento'><br><br>Endereço: <input type='text' id='endereco' value='"+segurancaAtual.endereco+"'placeholder='Endereço'><br><br><button id='botaoEditar' onclick='EditarSeguranca()'>Alterar</button></center>"

}

function ExcluirSeguranca(cpf){
    const listaSeguranca = JSON.parse(localStorage.getItem('Segurancas'))
    const deletarSeguranca = listaSeguranca.map(seguranca => {
        if(seguranca.cpf === cpf.toString()){
           return null
        }else{
           return seguranca
        }
    })

    const listaFiltrada = deletarSeguranca.filter(function (elem) {
        return elem != null;
    });

    localStorage.setItem(`Segurancas`, JSON.stringify(listaFiltrada))
    document.location.reload()
}

function EditarSeguranca(){
    //window.location.href = "Tela_De_Edicao_Seguranca.html";
   
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
            window,location.href = "Tela_de_Listar_Segurancas.html";
        }
    
    }

function MostrarUsuarioAtual(){
    document.getElementById("header").innerHTML = "<label id='usuarioAtual'>Usuario atual: " + JSON.parse(localStorage.getItem('UsuarioAtual')) +'</label>'
    //+'<br><a id="deslogar" onclick="Deslogar()" href="Tela_de_Login.html">Deslogar</a>'
}