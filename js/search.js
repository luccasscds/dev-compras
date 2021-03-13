const Products = [{
    department: "cueca",
    photo: "../image/cueca.png",
    description: "1 kit de 3 Cuecas maculinas",
    price: "R$150,00",
},{
    id: "camisa",
    photo: "../image/camisa.png",
    description: "Camisa maculina",
    price: "R$250,00",
},{
    id: "camisa",
    photo: "../image/camisa-2.jpg",
    description: "Camisa maculina",
    price: "R$150,00",
},{
    id: "camisa",
    photo: "../image/camisa-3.png",
    description: "Camisa maculina",
    price: "R$40,00",
},{
    id: "caneca",
    photo: "../image/caneca.png",
    description: "Caneca dev",
    price: "R$200,00",
},{
    id: "sapato",
    photo: "../image/tenis.png",
    description: "Tenis Nike",
    price: "R$300,00",
}]

const DOM = {
    photoContainer: document.querySelector('.container-photos'),

    addINhtml(object) {
        const div = document.createElement('div');
        div.className = "sub-container";
        div.innerHTML = DOM.organizarInformacao(object);

        this.photoContainer.appendChild(div);
    },

    addHtmlpagenaoencontrada(value) {
        let html =`
        <div class="container-pesquisa">
            <h1>
                Nenhum resultado para ${value}.
            </h1>
            <h3>
                Tente verificar a ortografia ou usar termos mais genéricos
            </h3>
        </div>
        `

        const div = document.querySelector('.pesquisa-nao-encontrada');
        div.innerHTML = html;
    },

    addErroMessage() {
        document.querySelector('#erroMessage').innerHTML = 'cep inválido';
    },

    removeErroMessage() {
        document.querySelector('#erroMessage').innerHTML = '';
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

    addPagenaoEncontrada(value) {
        this.addHtmlpagenaoencontrada(value);
        document.querySelector('.pesquisa-nao-encontrada').classList.add('active');
    },

    removePagenaoEncontrada() {
        document.querySelector('.pesquisa-nao-encontrada').classList.remove('active');
    },

    organizarInformacao(object) {
        const {department ,photo, description, price} = object;

        const HTML = `
        <a href="#">
            <div class="product">
                <img src=${photo} alt="${department}">
            </div>
            <div class="description-product">
                <p>${description}</p>
            </div>
            <div class="share-product">
                <p>compartilhar</p>
            </div>
            <div class="value-product">
                <small>${price}</small>
            </div>
        </a>
        `
        return HTML;
    },
}

const productSearch = {
    receberUrl() {
        let url = window.location.href;

        if(url.search(/[?]/) != -1) {
            url = url.split('?')[1];
            return url;
        }else {
            window.location.href = '../index.html';
        }
    },
    formartUrl() {
        let url = this.receberUrl();
        url = url.split('%20');

        let textFormatado = '';
        
        url.forEach(index => {
            textFormatado = `${textFormatado} ${index}`;
        })
        textFormatado = textFormatado.slice(1).toLocaleLowerCase();
        return textFormatado;
    },
    inputSearch(event) {
        let pesquisa = document.querySelector('#input-buscar-produto').value;
        if(event.keyCode == 13 || 
            event.target.id == 'input-submit'){
            this.clear();
            Products.forEach(index => {
                if(pesquisa == index.id) {
                    DOM.addINhtml(index);
                }
            })
            if(pesquisa == '') {
                window.location.href = '../index.html';
            }
            this.pageNaoEncontrada(pesquisa);
        }
    },
    pageSearch() {
        let pesquisa = this.formartUrl();
        this.clear();
        Products.forEach(index => {
            if(pesquisa == index.id) {
                DOM.addINhtml(index);
            }
        })
        if(pesquisa == '') {
            window.location.href = '../index.html';
        }
        this.pageNaoEncontrada(pesquisa);
    },
    pageNaoEncontrada(value) {
        let conteudo = DOM.photoContainer.innerText;
        if(conteudo == ''){
            DOM.addPagenaoEncontrada(value);
        }else {
            DOM.removePagenaoEncontrada();
        }
    },
    clear() {
        DOM.photoContainer.innerHTML = '';
    },
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
}

const App = {
    init() {
        //ativar qmd a pagina carregar
        productSearch.pageSearch();
    },
    reload() {
        console.log('reload');
        App.init();
    }
}

App.init();