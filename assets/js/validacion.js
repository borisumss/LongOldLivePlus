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


//conexion a Firestore
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
               // window.location = "../html/home.html#Fisioterapeuta";

               if((window.location.href).includes("AdultoMayor")){
                window.location = "../html/home.html#Fisioterapeuta";
               }
            }else if (docSnap.data().tipo == "adulto"){
                if((window.location.href).includes("Fisioterapeuta")||(window.location.href).includes("ejerciciosFisicosftp")||(window.location.href).includes("registrarejercicio")){
                    window.location = "../html/home.html#AdultoMayor";
                }
               // window.location = "../html/home.html#AdultoMayor";
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
             window.location = "../../index.html";
        }
    });
};
  const btnLogout = document.getElementById('logout');
  if (btnLogout != null) {
    btnLogout.addEventListener('click', e => logout(e));
  }
  async function logout(e) {
    await signOut(auth);
    window.location = "../../index.html"
  }