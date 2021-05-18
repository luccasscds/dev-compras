const addCarrinhoDeCompra = {
    addTamanho(event) {
        let tamanho = event.target.dataset.tamanho;
        let input = document.querySelector('#tamanho');

        if(tamanho != undefined) {
            input.value = input.value == tamanho ? '' : tamanho
        }
        this.verificarinput();
    },

    verificarinput() {
        let qnt = document.querySelector('#quantidade').value;
        let tamanho = document.querySelector('#tamanho').value;

        if(qnt == '' || qnt <= 0 && tamanho == '') {
            this.deactive();
        }else{
            this.active();
        }
        if(tamanho == '') {
            this.deactive();
        }else{
            this.active();
        }
    },
    
    deactive(){
        document.querySelector('#input-carrinho').removeAttribute('onclick');
        document.querySelector('#input-carrinho').setAttribute('type','button');
    },
    active(){
        document.querySelector('#input-carrinho').setAttribute('onclick','addCarrinhoDeCompra.add()');
        document.querySelector('#input-carrinho').setAttribute('type','submit');
    }
}

const appCamisa = {
    init() {
        avaliacao.media();
        addCarrinhoDeCompra.verificarinput();
    }
}
appCamisa.init();