const App = {
    init() {
        
    },
    reload() {
        console.log('reload');
        App.init();
    }
}

App.init();

/*requisitos:

- buscar produtos
- area do cliente(login ou fazer cadastro)
- carrinho de compras
- acompanhar pedidos
- filtro lateral
- propriedade de cada produto de uma categoria
- sistema de avaliação dos clientes
*/

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
// [x] colocar uns post na pagina principal
// [x] verificar o produto e direcionar pra o local certo
// [x] separa os codigos q se repetem mais de uma vez em arquivos separados
// [x] separando os arquivos q se repetem
// [] usar o localstore do navegador para adicionar o cep
