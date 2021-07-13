const url_avaliacao = {
    url(){
        let url = window.location.href.split('?')[1];
        return url;
    },
    format() {
        let url = this.url();
        let idproduto;

        idproduto = url.split('&')[0];
        idproduto = idproduto.split('id=')[1];
        idproduto = idproduto.split('%20');

        let id='';
        idproduto.forEach(index => {
            id = `${id} ${index}`;
        })

        id = id.slice(1);
        return id
    },
}

const avaliacao = {
    estrelas: '',

    avaliar(event) {
        let estrelas = event.target.dataset.star;
        let id = url_avaliacao.format();
        
        if(estrelas != undefined) {
            estrelas = estrelas == this.estrelas ? "" : estrelas;
            this.innerEstrela(estrelas);
            this.estrelas = estrelas;
            this.setInput(id,estrelas);
        }
    },
    media() {
        let media = document.querySelectorAll('#mediaStar');
        
        media.forEach(div => {
            if(parseInt(div.innerHTML) >= 0){
                let num = parseInt(div.innerHTML);
                if(num == 1) {
                    this.innerEstrela('s1');
                }else if(num == 2) {
                    this.innerEstrela('s2');
                }else if(num == 3) {
                    this.innerEstrela('s3');
                }else if(num == 4) {
                    this.innerEstrela('s4');
                }else if(num == 5) {
                    this.innerEstrela('s5');
                }
            }
        })
    },

    setInput(id,stars) {
        document.querySelector('#id').value = id;
        document.querySelector('#avaliacao').value = stars;
    },

    innerEstrela(value) {
        if(value == ''){
            document.querySelector('#star1').setAttribute('src','images/icons/star0.svg');
            document.querySelector('#star2').setAttribute('src','images/icons/star0.svg');
            document.querySelector('#star3').setAttribute('src','images/icons/star0.svg');
            document.querySelector('#star4').setAttribute('src','images/icons/star0.svg');
            document.querySelector('#star5').setAttribute('src','images/icons/star0.svg');
        }else if(value == 's1'){
            document.querySelector('#star1').setAttribute('src','images/icons/star1.svg');
            document.querySelector('#star2').setAttribute('src','images/icons/star0.svg');
            document.querySelector('#star3').setAttribute('src','images/icons/star0.svg');
            document.querySelector('#star4').setAttribute('src','images/icons/star0.svg');
            document.querySelector('#star5').setAttribute('src','images/icons/star0.svg');
        }else if(value == 's2'){  
            document.querySelector('#star1').setAttribute('src','images/icons/star1.svg');
            document.querySelector('#star2').setAttribute('src','images/icons/star1.svg');
            document.querySelector('#star3').setAttribute('src','images/icons/star0.svg');
            document.querySelector('#star4').setAttribute('src','images/icons/star0.svg');
            document.querySelector('#star5').setAttribute('src','images/icons/star0.svg');
        }else if(value == 's3'){
            document.querySelector('#star1').setAttribute('src','images/icons/star1.svg');
            document.querySelector('#star2').setAttribute('src','images/icons/star1.svg');
            document.querySelector('#star3').setAttribute('src','images/icons/star1.svg');
            document.querySelector('#star4').setAttribute('src','images/icons/star0.svg');
            document.querySelector('#star5').setAttribute('src','images/icons/star0.svg');
        }else if(value == 's4'){
            document.querySelector('#star1').setAttribute('src','images/icons/star1.svg');
            document.querySelector('#star2').setAttribute('src','images/icons/star1.svg');
            document.querySelector('#star3').setAttribute('src','images/icons/star1.svg');
            document.querySelector('#star4').setAttribute('src','images/icons/star1.svg');
            document.querySelector('#star5').setAttribute('src','images/icons/star0.svg');
        }else if(value == 's5'){
            document.querySelector('#star1').setAttribute('src','images/icons/star1.svg');
            document.querySelector('#star2').setAttribute('src','images/icons/star1.svg');
            document.querySelector('#star3').setAttribute('src','images/icons/star1.svg');
            document.querySelector('#star4').setAttribute('src','images/icons/star1.svg');
            document.querySelector('#star5').setAttribute('src','images/icons/star1.svg');
        }
    },
}