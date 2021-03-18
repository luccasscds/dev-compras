const Search = {
    formatUrl(value) {
        let page = window.location.href.indexOf('pages') >= 0;
        if(page == true){
            return `./view.html?${value}`
        }else {
            return `./pages/view.html?${value}`
        }
    },
    search(event) {
        let filtro = document.querySelector('#input-buscar-produto').value;
        
        if(event.keyCode == 13 || event.target.id == 'input-submit'){
            window.location.href = this.formatUrl(filtro);
        }
    },
    innerhtml() {
        document.querySelector('#input-buscar-produto').setAttribute('onkeyup','Search.search(event)')
        document.querySelector('#input-submit').setAttribute('onclick','Search.search(event)')
    },
}

Search.innerhtml();