
let con=true

function verClave(){
  let ver=document.getElementById("ver");
  let clave=document.getElementById("clave")
  let icono=document.getElementById("icono")
  if (con==true) {
    clave.type="text"
    icono.classList.add("fa-eye-slash")
    con=false
} else {
    clave.type="password"
    icono.classList.remove("fa-eye-slash")
    con=true
}
  
}


function ingreso(){
    
  var email2 = document.getElementById('email2').value;
  var contrasena2 = document.getElementById('clave').value;
  
    firebase.auth().signInWithEmailAndPassword(email2, contrasena2)
    .catch(function(error ){
      
      if (email2=="" && contrasena2=="" ){
        swal('Ingrese su correo y contraseña','','error');
      }else if (contrasena2==""){
        swal('Ingrese su contraseña','','error');
      }
      else if (email2==""){
        swal('Ingrese su Correo','','error');
      }
      else{
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        swal('Datos Incorrectos','','error')
    
      }
    });
    //observador();
}
observador();
function observador(){
  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          console.log('existe usuario activo')
          aparece(user);
        // User is signed in.
        var displayName = user.displayName;
       // console.log(user);
        var email = user.email;

        console.log('*****************');
        console.log(user.emailVerified)
        console.log('*****************');
        
    
      } else {
        // User is signed out.
        console.log('no existe usuario activo')
        
        // ...
      }
    });
}


function aparece(user){
  var user = user;
  var contenido = document.getElementById('contenido');
  if(user.emailVerified){
   ///   contenido.innerHTML = `
     // <p>Bienvenido!</p>
      //<button onclick="cerrar()">Cerrar sesión</button> 
      //<a href="userName.html" >
        //`
      window.location="userName.html";
  }
}

function cerrar(){
  firebase.auth().signOut()
  .then(function(){
      console.log('Saliendo...')
      window.location="loginAdulto.html";
  })
  .catch(function(error){
      console.log(error)
  })
}

