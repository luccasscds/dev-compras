const localstorage = {
    set(value) {
        localStorage.setItem('CEP',value);
    },
    get(value) {
        return localStorage.getItem(value);
    },
}

const cep = {
    formatCep(){
        let cep = document.querySelector("#input-cep").value;
        cep = cep.replace(/\D/g,'');
        return cep;
    },

    verificarCep() {
        let cep = this.formatCep();
        if(cep != '') {
            if(cep.length == 8) {
                this.removeErroMessage();
                return cep;
            }else {
                this.addErroMessage();
            }
        }else {
            this.addErroMessage();
        }
    },

    async pesquisarCep() {
        let cep = this.verificarCep();
        let url = `https://viacep.com.br/ws/${cep}/json/`
        let response = await fetch(url);
        let endereco = await response.json();
        if(!endereco.erro){
            this.coletarDadosCep(endereco);
            this.deactiveModal();
        }else {
            this.addErroMessage();
        }
    },

    coletarDadosCep(endereco) {
        let cep = endereco.cep
        let logradouro = endereco.logradouro;
        let complemento = endereco.complemento;
        let bairro = endereco.bairro;
        let localidade = endereco.localidade;
        let uf = endereco.uf;
        let ddd = endereco.ddd;
        console.log(cep,logradouro,complemento,bairro,localidade,uf,ddd);

        localstorage.set(cep);
        this.getcep();
    },

    //localstorage
    getcep() {
        let cep = localstorage.get('CEP');
        if(cep != '') {
            this.innerhtml(cep);
        }else {
            this.innerhtml('');
        }
    },

    //adicionar no html
    innerhtml(value) {
        let cepInput = document.querySelector('.input-local')
        let html = value != null ? `<small class="input-local">Enviar para ${value}</small>` : `<small class="input-local">Selecione o endereço</small>`
        cepInput.innerHTML = html;
    },

    addErroMessage() {
        document.querySelector('#erroMessage').innerHTML = 'cep inválido';
    },

    removeErroMessage() {
        document.querySelector('#erroMessage').innerHTML = '';
    },

    addevent(){
        document.querySelector('#a-cep').setAttribute('onclick','cep.activeModal()');
        document.querySelector('#modal-cep').setAttribute('onclick','cep.deactiveModal(event)');
    },

    //modal
    activeModal() {
        document.querySelector('.container-background').classList.add('active');
    },

    deactiveModal(event) {
        const classClose = event == undefined ? 'container-background active' : event.target.className;

        if(classClose == 'container-background active'){
            document.querySelector('.container-background').classList.remove('active');
        }
    },
}

cep.addevent();
cep.getcep();