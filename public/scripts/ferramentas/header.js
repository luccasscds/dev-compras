const modal = {
    login: 'deactive',
    menu: 'deactive',

    loginActive(){
        if(this.login == 'deactive') {
            document.querySelector('.modal-login').classList.add('on');
            this.login = 'active'
        }else if (this.login == 'active') {
        document.querySelector('.modal-login').classList.remove('on');
        this.login = 'deactive'
        }
    },

    menuActive(){
        if(this.menu === 'deactive') {

            document.querySelector('.nav-container-top').classList.add('on');

            this.menu = 'active'
        }else {
            document.querySelector('.nav-container-top').classList.remove('on');

            this.menu = 'deactive'
        }
    }
}