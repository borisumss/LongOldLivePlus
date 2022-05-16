
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
const firebaseConfig = {
    apiKey: "AIzaSyC1WJuRzxe5M5wtvRx-BK6c7mOps4usdR4",
    authDomain: "long-old-live-plus-aab44.firebaseapp.com",
    projectId: "long-old-live-plus-aab44",
    storageBucket: "long-old-live-plus-aab44.appspot.com",
    messagingSenderId: "371071760445",
    appId: "1:371071760445:web:b44da528fddb82bb759254"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  
  import { getFirestore, collection, addDoc, doc, setDoc, getDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js"
  import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js"
  import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js"
  
  
  const cloudDB = getFirestore();
  //Conexion a Storage
  const storage = getStorage();
  
  const auth = getAuth();

window.onload = function () {
    console.log("esta iniciado");
    
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const uid = user.uid;
            const docRef = doc(cloudDB, "Users", user.uid);
            const docSnap = await getDoc(docRef);
            if(docSnap.data().tipo == "fisioterapeuta"){
                window.location = "../html/home.html#Fisioterapeuta";
            }else if (docSnap.data().tipo == "adulto"){
                window.location = "../html/home.html#AdultoMayor";
            }else{
                await Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Acceso denegado ¡Vuelva a iniciar sesión!',
                    color: '#312d2d',
                    background: '#ffffff',
                    confirmButtonColor: '#ffcc00',
                    timer: 3000
                }).then(async (result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                      await logout("e")
                    } else{
                        window.location = "../../index.html";
                    }
                })
                window.location = "../../index.html";
            }
        } else {
            
        }
    });
};


(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    error();
                    event.stopPropagation();
                   
                } else {
                    event.preventDefault();
                    
                    registrar();
                }

                form.classList.add('was-validated')
               
            }, false)
        })
})()

async function  error(){
    event.preventDefault();
    var username = document.getElementById('nombre');
    var correo = document.getElementById('correo');
    var pass1 = document.getElementById('contraseñaAM');
    var pass2 = document.getElementById('contraseñaAM2');

    if(username.value.length==0||correo.value.length==0||pass1.value.length==0||pass2.value.length==0){
        await Swal.fire({
            title: "Campos Vacios",
            text: "Llene todos los campos",
            icon: "error",
            showCancelButton: false,
            showConfirmButton: false,
            timer:3000        
    
        });
    }else if(validarNombre(username.value)==false){
        await Swal.fire({
            title: "Nombre de Usuario",
            text: "El nombre de usuario debe tener mínimo 5 caracteres y máximo 50 caracteres",
            icon: "error",
            showCancelButton: false,
            showConfirmButton: false,
            timer:5000        
    
        });
    }else if(validarCorreo(correo.value)==false){
        await Swal.fire({
            title: "Correo Electrónico",
            text: "El correo electrónico debe tener mínimo 10 caracteres y máximo 50 caracteres",
            icon: "error",
            showCancelButton: false,
            showConfirmButton: false,
            timer:5000        
    
        });
    }else if(validarCorreo2(correo.value)==false){
        await Swal.fire({
            title: "Correo Electrónico",
            text: "Inserte un correo con formato válido: example@gmail.com",
            icon: "error",
            showCancelButton: false,
            showConfirmButton: false,
            timer:5000        
    
        });
    }else if(correo.checkValidity()==false){
        await Swal.fire({
            title: "Correo Electrónico",
            text: "No se permite caracteres especiales en el dominio del correo",
            icon: "error",
            showCancelButton: false,
            showConfirmButton: false,
            timer:5000        
    
        });
    }else{
        await Swal.fire({
            title: "Nombre de Usuario",
            text: "No se permite Caracteres especiales",
            icon: "error",
            showCancelButton: false,
            showConfirmButton: false,
            timer:5000        
    
        });
    }

}

async function  registrar(){
    event.preventDefault();
    var correo = document.getElementById('correo');
    var pass1 = document.getElementById('contraseñaAM');
    var pass2 = document.getElementById('contraseñaAM2');

    if(validarDominio(correo.value)==false){
        await Swal.fire({
            title: "Correo Electrónico inválido",
            text: "Sólo se permiten los dominios gmail.com y hotmail.com",
            icon: "error",
            showCancelButton: false,
            showConfirmButton: false,
            timer:5000        
    
        });
    }else if(validarContraseñas(pass1.value,pass2.value)==false){
        await Swal.fire({
            title: "Contraseñas Incorrectas",
            text: "Las contraseñas ingresadas no son las mismas",
            icon: "error",
            showCancelButton: false,
            showConfirmButton: false,
            timer:5000        
    
        });
    }

}
function validarNombre(name){
    var res = false;
    if(name.length >=5 && name.length<=20){
        res = true;
    }

    return res;
}

function validarCorreo(correo){
    var res = false;
    if(correo.length >=10 && correo.length<=50){
        res = true;
    }

    return res;
}

function validarCorreo2(correo){
    var res = false;
    if(correo.indexOf("@")!=-1){
        res = true;
    }

    return res;
}

function validarDominio(correo){
    var res = false;
    var pos = correo.indexOf("@");
    var dominio= correo.substring(pos+1,correo.length).toUpperCase();

    if(dominio == "GMAIL.COM"||dominio == "HOTMAIL.COM"){
        res = true;
    }

    return res;
}

function validarContraseñas(pass1,pass2){
    var res = false;
    

    if(pass1 == pass2){
        res = true;
    }

    return res;
}