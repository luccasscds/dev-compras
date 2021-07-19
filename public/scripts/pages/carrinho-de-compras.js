const CarrinhoDeCompra = {
    adicionar(event) {
        let tagForm = event.target.attributes[1].value;
        tagForm = tagForm.split('-')[1];

        document.querySelector(`#somarOUsubtrair-${tagForm}`).value = 1;
    },
    subtrair(event) {
        let tagForm = event.target.attributes[1].value;
        tagForm = tagForm.split('-')[1];

        document.querySelector(`#somarOUsubtrair-${tagForm}`).value = -1;
    }
}