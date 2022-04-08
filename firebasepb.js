
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

import { getFirestore, collection, addDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js";    

  const cloudDB = getFirestore();
  const storage = getStorage();
  

  export const registrar = (nombreEjercicio,gif) => {
    const storageRef = sRef(storage, 'gifs/'+gif.name);
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
      const datosDoc = {
        NombreEjecicio: nombreEjercicio,
        GifURL: downloadURL
      };
      setDoc(doc(cloudDB, "ejercicio", nombreEjercicio), datosDoc);
    }
    //addDoc(collection(cloudDB, 'prueba2'), {nombreEjercicio});
  }
  /*const db = getFirestore();
  const storage = getStorage();

  function getName(fileimg){
    var temp = fileimg.name.split('.');
    const name = temp.slice(0,-1).join('.');

    temp = fileimg.name.split('.');
    const extName = temp.slice((temp.length-1),(temp.length));
    return name+'.'+extName[0];
  }
export const savepb = (nombre,fileimg) => {
  async function UploadPrecess(){
    var imgToUpload = fileimg;
    var imgname = getName(fileimg);
    const metaData = {
      contentType : imgToUpload.type
    }
    const storageRef = ref(storage, "/images"+imgname);
    const UploadTask = uploadBytesResumable(storageRef, imgToUpload, metaData);
    UploadTask.on('state-changed',(snapshot)=>{

    },
    (error)=>{
      alert("error: imagen no subida");
    },
    ()=>{
      getDownloadURL(UploadTask.snapshot.ref).then((downloadURL)=>{
        guardarURL(downloadURL);
      });
    }
    );
  }
  var url = "";
  async function guardarURL(downloadURL){
    var sref = doc(db, "pruebas/");
    await setDoc(sref,{
      NOMBREIMAGE: nombre, 
      IMAGEURL: downloadURL
    })
  }
  //addDoc(collection(db, 'prueba'), {nombre, url})
}*/