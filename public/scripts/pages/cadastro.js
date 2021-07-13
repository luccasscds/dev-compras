const cadastro = {
    receber() {
        let email = document.querySelector("#email").value;
        let nome = document.querySelector("#name").value;
        let senha = document.querySelector("#password").value;
        let csenha = document.querySelector("#cpassword").value;
        
        return {email,nome,senha,csenha}
    },

    autocomplete() { //função teste
        document.querySelector("#email").value = 'ludimille@gmail.com';
        document.querySelector("#name").value = 'ludimille';
        document.querySelector("#password").value = '123';
        document.querySelector("#cpassword").value = '123';
    },
    
    formatarEmail() {
        let {email} = this.receber();
        let v_email = email.search("@") >= 0;

        if(v_email == true) {
            v_email = email.split("@")[1].length > 0;
            if(v_email == true){
                return email;
            }else {
                return false;
            }
        }else {
            return false;
        }
    },
    formatarNome() {
        let {nome} = this.receber();

        if(nome != "") {
            return nome;
        }else {
            return false;
        }
    },
    formatarSenha() {
        let {senha,csenha} = this.receber();

        if(senha != "" && csenha != "") {
            if(senha == csenha) {
                return senha;
            }else {
                return false;
            }
        }else {
            return false;
        }
    },
    verificar() {
        let email = this.formatarEmail();
        let name = this.formatarNome();
        let password = this.formatarSenha();

        if(email != false && name != false && password != false){
            this.removeErro();
            this.addsubmit();
        }else {
            this.removesubmit();
            this.addErro();
        }
    },

    addsubmit(){
        document.querySelector("#input-button").setAttribute('type','submit');
    },

    removesubmit(){
        document.querySelector("#input-button").setAttribute('type','button');
    },

    addErro(){
        document.querySelector("#erro-mensagem").innerHTML = 'Dado inválido'
    },

    removeErro(){
        document.querySelector("#erro-mensagem").innerHTML = ''
    }
}

const appCadastro = {
    init() {
        cadastro.removesubmit();
    }
}
appCadastro.init();