import { autenticacion, aux } from './firebase.js'

const login = document.getElementById('login');

if(login!=null){
    login.addEventListener('submit', function (e) {
    
        event.preventDefault();
        const email = document.getElementById('emailFisioterapeuta');
        const pass = document.getElementById('contraseñaFisioterapeuta');
        autenticacion(email.value,pass.value);
    });
}





