const cep = {
    formatCep(){
        let cep = document.querySelector("#cep").value;
        cep = cep.replace(/\D/g,'');
        return cep;
    },

    async verificarCep() {
        let cep = this.formatCep();
        if(cep != '') {
            if(cep.length == 8) {
                this.removeErroMessage();
                await this.pesquisarCep(cep);
            }else {
                this.removesubmit();
                this.addErroMessage();
            }
        }else {
            this.removesubmit();
            this.addErroMessage();
        }
    },

    async pesquisarCep(cep) {
        if(cep != undefined) {
            let url = `https://viacep.com.br/ws/${cep}/json/`
            let response = await fetch(url);
            let endereco = await response.json();
            if(!endereco.erro){
                this.addsubmit();
                this.distribuir(endereco);
            }else {
                this.removesubmit();
                this.addErroMessage();
            }
        }
    },

    distribuir(endereco) {
        document.querySelector("#logradouro").value = endereco.logradouro;
        document.querySelector("#complemento").value = endereco.complemento;
        document.querySelector("#bairro").value = endereco.bairro;
        document.querySelector("#localidade").value = endereco.localidade;
        document.querySelector("#uf").value = endereco.uf;
        document.querySelector("#ibge").value = endereco.ibge;
        document.querySelector("#gia").value = endereco.gia;
        document.querySelector("#ddd").value = endereco.ddd;
        document.querySelector("#siafi").value = endereco.siafi;
    },

    //adicionar no html
    addsubmit(){
        document.querySelector("#submit-cep").setAttribute('type','submit');
    },
    
    removesubmit(){
        document.querySelector("#submit-cep").setAttribute('type','button');
    },

    addErroMessage() {
        document.querySelector('#erroMessage').innerHTML = 'cep inválido';
    },

    removeErroMessage() {
        document.querySelector('#erroMessage').innerHTML = '';
    }
}