const modal = {
    modo: 'deactive',
    active(){
        if(this.modo == 'deactive') {
            document.querySelector('.modal-login').classList.add('on');
            this.modo = 'active'
        }else if (this.modo == 'active') {
        document.querySelector('.modal-login').classList.remove('on');
        this.modo = 'deactive'
        }
    }
}