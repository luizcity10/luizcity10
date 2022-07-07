let cadastroUsuario = [] 
let Conta = {}
const url = "http://192.168.43.15"

function Cadastro(){

    cadastroUsuario = JSON.parse(localStorage.getItem(`Logins`))   
    confirmarSenha = document.getElementById("confirmarSenha").value 
   
    if(cadastroUsuario == null){
        
        cadastroUsuario = []
        
        Conta = {

            usuario: document.getElementById("usuario").value,
            sobrenome: document.getElementById("sobrenome").value,
            nascimento: document.getElementById("nascimento").value,
            cpf: document.getElementById("cpf").value,
            senha:  document.getElementById("senha").value

        }
        if(Conta.usuario != "" && Conta.sobrenome != "" && Conta.cpf != "" && Conta.nascimento != "" && Conta.senha != "" )
        {        
            if(Conta.senha != confirmarSenha){
                alert("Erro na confirmação da senha")
            }
            else{
            cadastroUsuario.push(Conta)
            localStorage.setItem(`Logins`, JSON.stringify(cadastroUsuario))
            alert("Usuário cadastrado!")

            IrParaLogin()
            }
}  
        else{
            alert("Insira todos os dados!");
        }
}
    else{
        Conta = {
            usuario: document.getElementById("usuario").value,
            sobrenome: document.getElementById("sobrenome").value,
            nascimento: document.getElementById("nascimento").value,
            cpf: document.getElementById("cpf").value,
            senha:  document.getElementById("senha").value
        }

        
        if(Conta.usuario != "" && Conta.sobrenome != "" && Conta.cpf != "" && Conta.nascimento != "" && Conta.senha != "" ){
            if(Conta.senha != confirmarSenha){
                alert("Erro na confirmação da senha")
            }
            else{
                    cadastroUsuario.push(Conta)
                    localStorage.setItem(`Logins`, JSON.stringify(cadastroUsuario))
                    alert("Usuário e senha cadastrados!!")

                    IrParaLogin()
            }
        }  
        
        else{
            alert("Insira todos os dados!");

        }
    }


}

function IrParaLogin(){

    window,location.href = "Tela_de_Login.html";
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