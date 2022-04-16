
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
import { getFirestore, collection, addDoc, doc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js"
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js"
  //conexion a Firestore
  const cloudDB = getFirestore();
  //Conexion a Storage
  const storage = getStorage();

  export const guardarRegistro = (nombre,descripcion,musculo,minutos,segundos,gif) =>{
    const storageRef = sRef(storage, 'gifs/'+Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)+".gif");
    const uploadTask = uploadBytesResumable(storageRef,gif);
    uploadTask.on('state_changed', (snapshot)=>{
      
    },(error) => {
      alert("error: gif no subido");
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
        guardarFirestore(downloadURL);
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


export const conf = initializeApp(firebaseConfig);

export const db = getFirestore();

export const onGetTasks = (callback) =>
 onSnapshot(collection(db, "Ejercicio"), callback);
