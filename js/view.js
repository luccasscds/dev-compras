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
        console.log('oi')
        let pesquisa = document.querySelector('#input-buscar-produto').value;
        if(event.keyCode == 13 || 
            event.target.id == 'input-submit'){
            this.clear();
            for (let i = 0; i < Products.length; i++) {
                const element = Products[i];
        
                let conteudo = Products[i].id != undefined ? Products[i].id : '';
                let verificador = conteudo.indexOf(pesquisa) >= 0;
                if(verificador) {
                    DOM.addINhtml(element);
                }
            }
            if(pesquisa == '') {
                window.location.href = '../index.html';
            }
            this.pageNaoEncontrada(pesquisa);
        }
    },
    pageSearch() {
        let pesquisa = this.formartUrl();
        this.clear();
        
        for (let i = 0; i < Products.length; i++) {
            const element = Products[i];
    
            let conteudo = Products[i].id != undefined ? Products[i].id : '';
            let verificador = conteudo.indexOf(pesquisa) >= 0;
            if(verificador) {
                DOM.addINhtml(element);
            }
        }
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