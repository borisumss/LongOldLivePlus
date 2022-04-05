// Import the functions you need from the SDKs you need
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAaV8Dh_vmrznM9_XxzmYZbl35UUIzueGI",
    authDomain: "prueba-110b4.firebaseapp.com",
    projectId: "prueba-110b4",
    storageBucket: "prueba-110b4.appspot.com",
    messagingSenderId: "521639208729",
    appId: "1:521639208729:web:e304037bcf3708c7dc4788"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore();
export const savepb = (nombre) => {
  addDoc(collection(db, 'prueba'), {nombre})
}