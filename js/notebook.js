const verificarUrl = {
    url(){
        let url = window.location.href.split('?')[1];
        return url;
    },
    format() {
        let url = this.url();
        let idproduto;

        idproduto = url.split('&')[0];
        idproduto = idproduto.split('pro=')[1];
        idproduto = idproduto.split('%20');

        let id='';
        idproduto.forEach(index => {
            id = `${id} ${index}`;
        })

        id = id.slice(1);
        return {
            id,
        }
    },
    verificarproduto() {
        let {id} = verificarUrl.format();

        for (let i = 0; i < Products.length; i++) {
            const element = Products[i];
            
            let conteudo = Products[i].id != undefined ? Products[i].id : '';
            let verificador = conteudo.indexOf(id) >= 0;
            if(verificador) {
                DOM.addINhtml(element);
            }
        }
    },
}
const DOM = {
    addINhtml(object) {
        const div = document.createElement('div');
        div.innerHTML = DOM.organizarInformacao(object);

        document.querySelector('#info-card').appendChild(div);
    },
    organizarInformacao(object) {
        const {id ,photo, description, price} = object;

        const HTML = `
        <div class="display-left">
            <img id="foto-produto" src="${photo}" 
            alt="${id}" width="500px">
        </div>
        <div class="display-center">
            <p id="description">${description}</p>
            <p>avaliação * * * * *</p>
            <p>preço do produto</p>
            <p>parcelas</p>
            <p>informaçao geral</p>
        </div>
        <div class="display-right">
            <div>
                R$<span id="price">${price}</span>
            </div>
            <p>estimar a entrega do produto</p>
            <p>selicionar o endereço</p>
            <p>verificar o estoque</p>
            <label for="quantidade">quantidade</label>
            <input id="quantidade" name="quantidade" 
            type="number" min="1" value="1" onkeyup="addCarrinhoDeCompra.verificarinput()">

            <input id="input-carrinho" type="button" 
            value="adicionar ao carrinho" onclick="addCarrinhoDeCompra.add()">
        </div>
        `
        return HTML;
    },
}

const addCarrinhoDeCompra = {
    add() {
        let {id} = verificarUrl.format();
        let quantidade = this.verificarinput();
        
        Products.forEach(index => {
            if(index.id == id) {
                //ver depois
                index.quantidade = index.quantidade > 0 ? index.quantidade - quantidade : 0
                listaDeCompra.push(index);
            }
        })
        url = `../pages/carrinho-de-compra.html`;
        window.location.href = url;
    },
    verificarinput() {
        let qnt = document.querySelector('#quantidade').value;
        if(qnt == '' || qnt == 0) {
            this.deactive();
        }else {
            this.active();
            return qnt;
        }
    },deactive(){
        document.querySelector('#input-carrinho').removeAttribute('onclick');
    },active(){
        document.querySelector('#input-carrinho').setAttribute('onclick','addCarrinhoDeCompra.add()')
    },
}

const app = {
    init() {
        verificarUrl.verificarproduto();
    }
}
app.init();