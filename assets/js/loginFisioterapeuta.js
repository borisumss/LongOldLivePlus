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


const cloudDB = getFirestore();
const auth = getAuth();
const usuario = document.getElementById('cont');
var name;


window.onload = function () {
    console.log("esta iniciado");
    
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const docRef = doc(cloudDB, "Users", user.uid);
            const docSnap = await getDoc(docRef);
            name = docSnap.data().username;
           
            usuario.innerHTML = `<h1 style="color:white" id="bienvenido">
            Bienvenid@ ${name}
          </h1>`;
        } else {
             window.location = "../../index.html";
        }
    });
};


