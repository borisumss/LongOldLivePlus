// Import the functions you need from the SDKs you need
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js"
//import { getStorage, ref } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBXvg6xzDvDQWO1wOuVD9Dna56RbtVjTYE",
    authDomain: "long-old-live-plus.firebaseapp.com",
    projectId: "long-old-live-plus",
    storageBucket: "long-old-live-plus.appspot.com",
    messagingSenderId: "748115889945",
    appId: "1:748115889945:web:512e691fde54dea7e1bf88"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  //conexion a Firestore
  export const db = getFirestore();
  //Conexion a Storage
  export const storage = getStorage();
  
  //se cambio
  export const guardarRegistro = (nombre,descripcion,seleccione,min,seg,formGif) =>{
    addDoc(collection(db, 'ejercicios'), {nombre,descripcion,seleccione,min,seg})
  }