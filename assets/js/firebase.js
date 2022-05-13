
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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

const formulario = document.getElementById('formulario');
//conexion a Firestore
const cloudDB = getFirestore();
//Conexion a Storage
const storage = getStorage();

//const auth = getAuth();
var progress
var activo= false;
export const guardarRegistro = (nombre, descripcion, musculo, minutos, segundos, gif) => {
  const storageRef = sRef(storage, 'gifs/' + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)+".gif");
  const uploadTask = uploadBytesResumable(storageRef, gif);
  uploadTask.on('state_changed', (snapshot) => {
    progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
   /* if (progress < 100 && activo==false) {
          activo = true;
          Swal.fire({

            title: "Guardando registro...",
            icon: "info",
            closeOnConfirm: true,
            closeOnCancel: true,
            allowOutsideClick: false,
            showCancelButton: false,
            showConfirmButton: false,
    
    
          });
        }*/ 
      
    },(error) => {
      alert("error: gif no subido");
      Swal.close();
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
        guardarFirestore(downloadURL);
        Swal.fire({

          title: "Registro exitoso",
          icon: "success",
          closeOnCancel: true,
          closeOnConfirm: true,
          allowOutsideClick: false,
          showCancelButton: false,
          showConfirButton: false,
        });

        setTimeout( function(){
          Swal.close(); 
          formulario.reset();
        },2000);
        
      
          /*setTimeout( function(){
           
          },3000);

          setTimeout( function(){
            Swal.close();
            window.location.href="ejerciciosFisicosFTP.html#Fisioterapeuta";
          },3000);*/
          
        
      });
    }
    );
    function guardarFirestore(downloadURL){
      addDoc(collection(cloudDB, "test"),{
        NombreEjercicio: nombre,
        DescripcionEjercicio: descripcion,
        GrupoMuscular: musculo,
        MinutosEjercicio: minutos,
        SegundosEjercicio: segundos,
        GifURL: downloadURL
      });
     
    }
  }

/*export const autenticacion = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
  .then(async (userCredential) => {
    const user = userCredential.user;

    const listausers = doc(cloudDB, "Users", user.uid)
    const docUser = await getDoc(listausers)
    const tipoUser = docUser.data().tipo
    if (tipoUser == "fisioterapeuta"){
      
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          window.location = "../html/home.html#Fisioterapeuta";

        } else {
          
        }
      });
      
    }else{
      swal('No es un usuario Fisioterapeuta','','error');
    }
    console.log("Usuario logeado  :")
    console.log(tipoUser == "fisioterapeuta")
  })
  .catch((error) => {
    if (email == "" && password == "") {
      swal('Ingrese su correo y contraseña', '', 'error');
    } else if (password == "") {
      swal('Ingrese su contraseña', '', 'error');
    }
    else if (email == "") {
      swal('Ingrese su Correo', '', 'error');
    }
    else {
      swal('Datos Incorrectos', '', 'error');
      
    }
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode + errorMessage)
  });

}*/

export const conf = initializeApp(firebaseConfig);

//export const db = getFirestore();

export const onGetTasks = (callback) =>
  onSnapshot(collection(cloudDB, "test"), callback);

export const onGetTasks2 = (callback) =>
  onSnapshot(collection(cloudDB, "Rutinas"), callback);
