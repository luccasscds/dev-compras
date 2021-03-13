const DOM = {
    photoContainer: document.querySelector('.container-photos'),

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

const productSearch = {
    formatUrl(value) {
        return `./pages/search.html?${value}`
    },
    search(event) {
        let filtro = document.querySelector('#input-buscar-produto').value;
        
        if(event.keyCode == 13 || event.target.id == 'input-submit'){
            window.location.href = this.formatUrl(filtro);
        }
    },
}

const App = {
    init() {
        console.log('init');
    },
    reload() {
        console.log('reload');
        App.init();
    }
}

App.init();


//OJETIVOS
// [] efetuar a compra:
//      [] fazer login
//      [] adicionar endereço
//      [] forma de pagamento
//      [] confira e finalize o seu pedido
// [x] buscar pelo produto
// [x] jogar os dados na url 
// [x] pegar no outro html
// [x] colocar um texto qnd nao achar a pesquisa
// [x] qnd passo um valor vazio ele adicionar varias vezes "pagina nao encontrada"
// [x] qnd tiver uma pesquisa vazia direcionar para page principal
// [] mexer no cep la no search.html
// [] colocar uns post na pagina principal 