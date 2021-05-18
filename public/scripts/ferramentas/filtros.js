const sessionDB = {
    get(key) {
        return sessionStorage.getItem(`${key}`);
    },
    set(key,value) {
        sessionStorage.setItem(`${key}`,`${value}`);
    }
}

const utlis = {
    formatSessionGet(key) {
        let urlDb = sessionDB.get(key)
        if(urlDb != null && urlDb != undefined) {
            let verificar = urlDb.indexOf('so') >= 0;
            if(urlDb !== null && verificar === true) {
                urlDb = urlDb.split('?')[1].replaceAll('=',':').split('&');
                return {
                    marca: urlDb[0].split(':')[1],
                    price:urlDb[1].split(':')[1],
                    so:urlDb[2].split(':')[1],
                    cpu:urlDb[3].split(':')[1],
                    ram:urlDb[4].split(':')[1],
                    hd:urlDb[5].split(':')[1],
                    tela: urlDb[6].split(':')[1]
                }
            }else if(verificar === false) {
                urlDb = urlDb.split('?')[1].replaceAll('=',':').split('&');
                return {
                    marca: urlDb[0].split(':')[1],
                    price:urlDb[1].split(':')[1],
                    cor:urlDb[2].split(':')[1],
                    tamanho:urlDb[3].split(':')[1]
                }
            }else {
                return ''
            }
        }
    }
}

const filtroCamisa = {
    marca: utlis.formatSessionGet('filter')?.marca,
    price: utlis.formatSessionGet('filter')?.price,
    cor: utlis.formatSessionGet('filter')?.cor,
    tamanho: utlis.formatSessionGet('filter')?.tamanho,

    checked() {
        let {marca, price, cor, tamanho } = utlis.formatSessionGet('filter') !== undefined ? utlis.formatSessionGet('filter') : '';
        let array =  [marca, price, cor, tamanho];
        
        array.forEach(index => {
            let check = document.querySelector(`#checkbox-${index}`);
            if(check != null) {
                check.checked = true;
            }
        })
    },

    marcas(event) {
        let modelo = event.target.dataset.marca;
        
        if (modelo != undefined ) {
            this.marca = modelo == this.marca ? '' : modelo;
        }
        this.verificarOpecoesMarcadas();
    },
    prices(event) {
        let price = event.target.dataset.price;
        
        if (price != undefined) {
            this.price = price == this.price ? '' : price;

        }
        this.verificarOpecoesMarcadas();
    },
    cores(event) {
        let cor = event.target.dataset.cor;
        
        if (cor != undefined) {
            this.cor = cor == this.cor ? '' : cor;
        }
        this.verificarOpecoesMarcadas();
    },
    tamanhos(event) {
        let tamanho = event.target.dataset.tamanho;
        
        if (tamanho != undefined) {
            this.tamanho = tamanho == this.tamanho ? '' : tamanho;
        }
        this.verificarOpecoesMarcadas();
    },
    verificarOpecoesMarcadas() {
        let {marca, price, cor, tamanho} = filtroCamisa;

        sessionDB.set('filter',`?marca=${marca}&price=${price}&cor=${cor}&tamanho=${tamanho}`);
        document.location.href = sessionDB.get('filter');
    },
}

const filtroNotebook = {
    marca: utlis.formatSessionGet('filter')?.marca,
    price: utlis.formatSessionGet('filter')?.price,
    so: utlis.formatSessionGet('filter')?.so,
    cpu: utlis.formatSessionGet('filter')?.cpu,
    ram: utlis.formatSessionGet('filter')?.ram,
    hd: utlis.formatSessionGet('filter')?.hd,
    tela: utlis.formatSessionGet('filter')?.tela,

    checked() {
        let {marca, price, so, cpu, ram ,hd ,tela} = utlis.formatSessionGet('filter') !== undefined ? utlis.formatSessionGet('filter') : '';
        let array =  [marca, price, so, cpu, ram ,hd ,tela]
        
        array.forEach(index => {
            let check = document.querySelector(`#checkbox-${index}`);
            if(check != null) {
                check.checked = true;
            }
        })
        
    },

    marcas(event) {
        let modelo = event.target.dataset.marca;
        
        if (modelo != undefined ) {
            this.marca = modelo == this.marca ? '' : modelo;
        }
        this.verificarOpecoesMarcadas();
    },
    prices(event) {
        let pric = event.target.dataset.price;
        
        if (pric != undefined) {
            this.price = pric == this.price ? '' : pric;
        }
        
        this.verificarOpecoesMarcadas();
    },
    SOs(event){
        let sistema = event.target.dataset.so;
        
        if(sistema != undefined) {
            this.so = sistema == this.so ? '' : sistema;
        }
        this.verificarOpecoesMarcadas();
    },
    CPUs(event) {
        let processador = event.target.dataset.cpu;

        if(processador != undefined) {
            this.cpu = processador == this.cpu ? '' : processador;
        }
        this.verificarOpecoesMarcadas();
    },
    RAMs(event) {
        let memoria = event.target.dataset.ram;
        
        if(memoria != undefined) {
            this.ram = memoria == this.ram ? '' : memoria;
        }
        this.verificarOpecoesMarcadas();
    },
    HDs(event) {
        let memoria = event.target.dataset.hd;
        
        if(memoria != undefined) {
            this.hd = memoria == this.hd ? '' : memoria;
        }
        this.verificarOpecoesMarcadas();
    },
    telas(event) {
        let tamanho = event.target.dataset.tela;
        
        if(tamanho != undefined) {
            this.tela = tamanho == this.tela ? '' : tamanho;
        }
        this.verificarOpecoesMarcadas();
    },
    
    verificarOpecoesMarcadas() {
        let {marca, price, so, cpu, ram ,hd ,tela} = filtroNotebook;

        sessionDB.set('filter',`?marca=${marca}&price=${price}&so=${so}&cpu=${cpu}&ram=${ram}&hd=${hd}&tela=${tela}`);
        document.location.href = sessionDB.get('filter');
    }
}

//MAIN
const appFiltros = {
    init() {
        filtroNotebook.checked();
        filtroCamisa.checked();
    }, 
    reload() {}
}

appFiltros.init()