



function ingreso(){
    
  var email2 = document.getElementById('email2').value;
  var contrasena2 = document.getElementById('contrasena2').value;
  try {
    firebase.auth().signInWithEmailAndPassword(email2, contrasena2)
    observador();
  
  }   
  catch(error ){
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // ...
    }
    console.log("hola");
}

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
      //contenido.innerHTML = `
      //<p>Bienvenido!</p>
     // <button onclick="cerrar()">Cerrar sesión</button> 
     // <a href="userName.html" >
      
    //  `
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

