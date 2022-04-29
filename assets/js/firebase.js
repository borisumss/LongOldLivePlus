
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
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js"


//conexion a Firestore
const cloudDB = getFirestore();
//Conexion a Storage
const storage = getStorage();

const auth = getAuth();
var progress
export const guardarRegistro = (nombre, descripcion, musculo, minutos, segundos, gif) => {
  const storageRef = sRef(storage, 'gifs/' + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)+".gif");
  const uploadTask = uploadBytesResumable(storageRef, gif);
  uploadTask.on('state_changed', (snapshot) => {
    progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    if (progress < 100) {
          Swal.fire({

            title: "Guardando registro...",
            icon: "info",
            closeOnConfirm: true,
            closeOnCancel: true,
            allowOutsideClick: false,
            showCancelButton: false,
            showConfirmButton: false,
    
    
          });
        } 
      
    },(error) => {
      alert("error: gif no subido");
      Swal.close();
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
        guardarFirestore(downloadURL);
                 
          setTimeout( function(){
           
          },3000);

          setTimeout( function(){
            Swal.close();
            window.location.href="ejerciciosFisicosFTP.html#Fisioterapeuta";
          },3000);
          
        
      });
    }
    );
    function guardarFirestore(downloadURL){
      addDoc(collection(cloudDB, "Ejercicio"),{
        NombreEjercicio: nombre,
        DescripcionEjercicio: descripcion,
        GrupoMuscular: musculo,
        MinutosEjercicio: minutos,
        SegundosEjercicio: segundos,
        GifURL: downloadURL
      });
    }
  }

export const autenticacion = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
  .then(async (userCredential) => {
    const user = userCredential.user;
    const listausers = doc(cloudDB, "Users", user.uid)
    const docUser = await getDoc(listausers)
    const tipoUser = docUser.data().tipo
    if (tipoUser == "fisioterapeuta"){
      
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          
          window.location = "../html/index.html";
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
      
    }else{
      alert("No es un usuario Fisioterapeuta")
    }
    console.log("Usuario logeado  :")
    console.log(tipoUser == "fisioterapeuta")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode + errorMessage)
  });

}

export const conf = initializeApp(firebaseConfig);

//export const db = getFirestore();

export const onGetTasks = (callback) =>
  onSnapshot(collection(cloudDB, "Ejercicio"), callback);

export const onGetTasks2 = (callback) =>
  onSnapshot(collection(cloudDB, "Rutinas"), callback);
