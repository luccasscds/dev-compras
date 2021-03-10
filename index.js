const Products = [{
    department: "cueca",
    photo: "./imagens/cueca.png",
    description: "1 kit de 3 Cuecas maculinas",
    price: "R$150,00",
},{
    id: "camisa",
    photo: "./imagens/camisa.png",
    description: "Camisa maculina",
    price: "R$50,00",
}]

const tools = {
    
}

const cep = {
    cepInput: document.querySelector("#input-cep"),
    formatCep(){
        let cep = this.cepInput.value;
        cep = cep.replace(/\D/g,'');
        return cep;
    },

    verificarCep() {
        let cep = this.formatCep();
        if(cep != '') {
            if(cep.length == 8) {
                DOM.removeErroMessage();
                return cep;
            }else {
                DOM.addErroMessage();
            }
        }else {
            DOM.addErroMessage();
        }
    },

    async pesquisarCep() {
        let cep = this.verificarCep();
        let url = `https://viacep.com.br/ws/${cep}/json/`
        let response = await fetch(url);
        let endereco = await response.json();
        if(!endereco.erro){
            this.coletarDadosCep(endereco);
            this.reset();
            DOM.deactiveModal();
        }else {
            DOM.addErroMessage();
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

        let cepInput = document.querySelector('.input-local')
        let html = `<small class="input-local">Enviar para ${cep}</small>`
        cepInput.innerHTML = html;
    },



    reset() {
        document.querySelector('#input-cep').value = '';
    },
}

const DOM = {
    photoContainer: document.querySelector('.container-photos'),

    addINhtml(index) {
        const div = document.createElement('div');
        div.className = "sub-container";
        div.innerHTML = DOM.organizarInformacao(index);

        this.photoContainer.appendChild(div);
    },

    addErroMessage() {
        document.querySelector('#erroMessage').innerHTML = 'cep inválido';
    },

    removeErroMessage() {
        document.querySelector('#erroMessage').innerHTML = '';
    },

    organizarInformacao(index) {
        const {department ,photo, description, price} = Products[index];

        const HTML = `
        <div class="photo">
        <img src=${photo} alt="${department}">
        </div>
        <div class="description-photo">
            <p>${description}</p>
        </div>
        <div class="share-photo">
            <p>compartilhar</p>
        </div>
        <div class="value-photo">
            <small>${price}</small>
        </div>
        `
        return HTML;
    },

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

const App = {
    init() {
        console.log('Dev. luccass');

        //adicionando a foto
        DOM.addINhtml(0)
        DOM.addINhtml(1)
    },
    reload() {
        console.log('reload');
        App.init();
    }
}

App.init();


//OJETIVOS
