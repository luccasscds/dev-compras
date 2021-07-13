const login = {
    receber() {
        let email = document.querySelector("#email").value;
        let password = document.querySelector("#password").value;
        return {email, password}
    },

    formatEmail() {
        let {email} = this.receber();

        let emailVerificado = email.indexOf('@') >= 0;
        if(email != '' && email.length > 2 && emailVerificado == true){
            return email
        }else {
            return false;
        }
    },

    formatSenha() {
        let {password} = this.receber();

        if(password != '' && password.length > 0){
            return password
        }else {
            return false;
        }
    },

    autocomplete() {
        document.querySelector("#email").value = "lucas@gmail.com"
        document.querySelector("#password").value = "1"
    },

    
    verificar() {
        let email = this.formatEmail();
        let pass = this.formatEmail();

        let mensagem = document.querySelector("#mensagem")
        if(email != false && pass != false) {
            document.querySelector('#input-submit').setAttribute("type", "submit")
            mensagem.innerHTML = ""
        }else {
            document.querySelector('#input-submit').setAttribute("type", "button")
            mensagem.innerHTML = "Email ou Senha inválidos."
        }
    },
}

const appLogin = {
    init(){
        //
    },
}

appLogin.init();