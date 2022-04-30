


let con = true
function verClave() {
  let ver = document.getElementById("ver_clave");
  let clave = document.getElementById("contraseñaAM")
  let icono = document.getElementById("icono")
  if (con == true) {
    clave.type = "text"
    icono.classList.add("fa-eye-slash")
    con = false
  } else {
    clave.type = "password"
    icono.classList.remove("fa-eye-slash")
    con = true
  }

}


function ingreso() {

  var email2 = document.getElementById('email2').value;
  var contrasena2 = document.getElementById('contraseñaAM').value;

  firebase.auth().signInWithEmailAndPassword(email2, contrasena2)
    .then(async (userCredential) => {
      var aux =""+ email2;
      aux.toUpperCase();
      if (aux == "JUANPE@GMAIL.COM"){
        
        observador();
      }else{
        swal("No es un usuario Adulto Mayor","","error");
      }
      
    })
    .catch(function (error) {

      if (email2 == "" && contrasena2 == "") {
        swal('Ingrese su correo y contraseña', '', 'error');
      } else if (contrasena2 == "") {
        swal('Ingrese su contraseña', '', 'error');
      }
      else if (email2 == "") {
        swal('Ingrese su Correo', '', 'error');
      }
      else {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        swal('Datos Incorrectos', '', 'error')

      }
    });
  
}

function observador() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log('existe usuario activo')

      // User is signed in.
      var displayName = user.displayName;

      // console.log(user);
      correo = user.email;
      aparece(user);
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


function aparece(user) {
  var user = user;
  var contenido = document.getElementById('contenido');
  if (user.emailVerified) {
    ///   contenido.innerHTML = `
    // <p>Bienvenido!</p>
    //<button onclick="cerrar()">Cerrar sesión</button> 
    //<a href="userName.html" >
    //`
    window.location.href = "home.html#AdultoMayor";
  }
}

function cerrar() {
  firebase.auth().signOut()
    .then(function () {
      console.log('Saliendo...')
      window.location = "../../index.html";
    })
    .catch(function (error) {
      console.log(error)
    })
}



function link() {
  var url = "" + window.location.href;
  var pos = url.indexOf("#");
  var res = "";

  for (var i = pos + 1; i < url.length && i > 0; i++) {
    res += url[i];
  }

  return res;

}

/*const tasksContainer = document.getElementById("cont");

firebase.auth().onAuthStateChanged(function (user) {


  tasksContainer.innerHTML = `
        <h1><a href="${window.location.href}" style="font-size: 28px;
        margin: 0;
        padding: 0;
        line-height: 1;
        font-weight: 700;
        letter-spacing: 1px;">Bienvenido ${user.email}</a></h1>
           
         
        `;

});*/