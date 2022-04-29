import { autenticacion } from './firebase.js'
let con=true;
function verClave(){
  let ver=document.getElementById("ver");
  let clave=document.getElementById("contraseñaFisioterapeuta")
  let icono=document.getElementById("icono")
  if (con==true) {
    clave.type="text"
    icono.classList.add("fa-eye-slash")
    con=false
}else{
    clave.type="password"
    icono.classList.remove("fa-eye-slash")
    con=true
    }
}



const login = document.getElementById('login');

login.addEventListener('submit', function (e) {
  event.preventDefault();
  const email = document.getElementById('emailFisioterapeuta');
  const pass = document.getElementById('contraseñaFisioterapeuta');
  autenticacion(email.value,pass.value);

});




