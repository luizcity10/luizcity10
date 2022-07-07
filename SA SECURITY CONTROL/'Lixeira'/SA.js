let cadastroUsuario = [] 
let Conta = {}

function Cadastro(){

    cadastroUsuario = JSON.parse(localStorage.getItem(`Logins`))    
   
    if(cadastroUsuario == null){
        
        cadastroUsuario = []
        Conta = {

            usuario: document.getElementById("usuario").value,
            senha:  document.getElementById("senha").value

        }
        if(Conta.usuario != "" && Conta.senha != "")
{        
            cadastroUsuario.push(Conta)
            localStorage.setItem(`Logins`, JSON.stringify(cadastroUsuario))
            alert("e-mail e senha cadastrados!!")

            IrParaLogin()
}  
        else{
            alert("Insira todos os dados!");
        }
}
    else{
        Conta = {
            usuario: document.getElementById("usuario").value,
            senha:  document.getElementById("senha").value
        }

        
        if(Conta.usuario != "" && Conta.senha != ""){
               
                    cadastroUsuario.push(Conta)
                    localStorage.setItem(`Logins`, JSON.stringify(cadastroUsuario))
                    alert("Usuário e senha cadastrados!!")

                    IrParaLogin()
        }  
        
        else{
            alert("Insira todos os dados!");

        }
    }


}

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
            if(usuarioDigitado == cadastroUsuario[i].usuario && senhaDigitada == cadastroUsuario[i].senha){
                alert(`Bem-vindo ${cadastroUsuario[i].usuario}`);
                validacao = true
                localStorage.setItem(`UsuarioAtual`, JSON.stringify(cadastroUsuario[i].usuario))
         }
     }
        if(validacao == true){
            alert("Usuário logado com sucesso!");
            IrParaIndex();
        }
        else{
            alert('aqui');
            alert("Usuário ou senha não encontrado!")
        }
    
    }
}

function IrParaIndex(){
    window.location.href = "index.html";
}

function IrParaLogin(){

    window,location.href = "Tela_de_Login.html";
}

function MostrarUsuarioAtual(){
    document.getElementById("header").innerHTML = "Usuário atual: " + JSON.parse(localStorage.getItem('UsuarioAtual'))
}

function Deslogar(){
    usuarioAtual = JSON.parse(localStorage.getItem('UsuarioAtual'))
    usuarioAtual = null;
    localStorage.setItem(`UsuarioAtual`, JSON.stringify(usuarioAtual))
    alert("Deslogando...")

}