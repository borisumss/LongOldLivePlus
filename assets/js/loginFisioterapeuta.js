import { autenticacion } from './firebase.js'
let con=true;


const login = document.getElementById('login');

login.addEventListener('submit', function (e) {
  event.preventDefault();
  const email = document.getElementById('emailFisioterapeuta');
  const pass = document.getElementById('contraseñaFisioterapeuta');
  autenticacion(email.value,pass.value);

});



