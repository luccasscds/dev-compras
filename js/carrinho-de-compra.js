const carrinhoDeCompra = {
    getProduto() {
        this.reset();
        for(let i = 0; i < listaDeCompra.length; i++) {
            const element = listaDeCompra[i];
            this.innerhtml(element,i);
        }
    },

    removeitem(event){
        let index = event.target.id;
        listaDeCompra.splice(index,1);
        this.getProduto();
    },

    reset() {
        document.querySelector('.item-products').innerHTML = '';
    },

    innertext(object,i) {
        let {id,photo,description,price,quantidade} = object;

        let html =`
        <div class="intem-left">
            <img src="${photo}" alt="${id}" width="200px" height="200px">
        </div>
        <div class="intem-center">
            <div id="description">${description}</div>
            <div class="">estoque</div>
            <div id="quantidade">quantidade: ${quantidade}</div>
            <input id="${i}" type="button" value="excluir" onclick="carrinhoDeCompra.removeitem(event)">
        </div>
        <div class="intem-rigt">
            <div id="price">R$${price}</div>
        </div>
        `
        return html;
    },

    innerhtml(object,i) {
        const div = document.createElement('div');
        div.className = "item-product";
        div.innerHTML = this.innertext(object,i);
        document.querySelector('.item-products').appendChild(div);
    },
}

const app = {
    init() {
        carrinhoDeCompra.getProduto();
    }
}

app.init();