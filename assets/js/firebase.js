
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import { getFirestore, collection, addDoc, doc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js"
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-storage.js"
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1WJuRzxe5M5wtvRx-BK6c7mOps4usdR4",
  authDomain: "long-old-live-plus-aab44.firebaseapp.com",
  databaseURL: "https://long-old-live-plus-aab44-default-rtdb.firebaseio.com",
  projectId: "long-old-live-plus-aab44",
  storageBucket: "long-old-live-plus-aab44.appspot.com",
  messagingSenderId: "371071760445",
  appId: "1:371071760445:web:b44da528fddb82bb759254"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//conexion a Firestore
const cloudDB = getFirestore();
//Conexion a Storage
const storage = getStorage();

const auth = getAuth();
//var progress
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
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
        guardarFirestore(downloadURL);
                 
          setTimeout( function(){
           
          },3000);

          setTimeout( function(){
            Swal.close();
            window.location.href="ejerciciosFisicos.html";
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
  .then((userCredential) => {
    const user = userCredential.user;
    console.log("Usuarion logeado")
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode + errorMessage)
  });

}

//export const conf = initializeApp(firebaseConfig);

//export const db = getFirestore();

export const onGetTasks = (callback) =>
  onSnapshot(collection(cloudDB, "Ejercicio"), callback);

export const onGetTasks2 = (callback) =>
  onSnapshot(collection(cloudDB, "Rutinas"), callback);
