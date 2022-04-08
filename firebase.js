// Import the functions you need from the SDKs you need
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js"
import { getStorage, ref } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
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
export const db = getFirestore();
//Conexion a Storage
export const storage = getStorage();

//se cambio
export const guardarRegistro = (nombre, descripcion, seleccione, min, seg, formGif) => {
  addDoc(collection(db, 'ejercicios'), { nombre, descripcion, seleccione, min, seg })
}