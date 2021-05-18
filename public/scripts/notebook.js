const addCarrinhoDeCompra = {
    url() {
        let url = document.location.href.split("?")[1]
        url = url.split("=")[1]
        return url
    },

    add() {
        let id = this.url();
        document.querySelector('#IDproduto').value = id
    },

    verificarinput() {
        let qnt = document.querySelector('#quantidade').value;
        if(qnt == '' || qnt <= 0) {
            this.deactive();
        }else {
            this.active();
            return qnt;
        }
    },
    
    deactive(){
        document.querySelector('#input-carrinho').removeAttribute('onclick');
    },
    
    active(){
        document.querySelector('#input-carrinho').setAttribute('onclick','addCarrinhoDeCompra.add()')
    }
}

const appNotebook = {
    init() {
        avaliacao.media();
    }
}
appNotebook.init();