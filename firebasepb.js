// Import the functions you need from the SDKs you need

import { getFirestore, collection, addDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js";    

  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAMISQz6M33tBYJ3SPMzvncgzYB_xTv9es",
    authDomain: "prueba2-ccd00.firebaseapp.com",
    projectId: "prueba2-ccd00",
    storageBucket: "prueba2-ccd00.appspot.com",
    messagingSenderId: "1060273787837",
    appId: "1:1060273787837:web:4a723fa3246d2d56fbb8d4"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const cloudDB = getFirestore();
  const storage = getStorage();
  const storageRef = sRef(storage);

  export const registrar = (nombreEjercicio) => {
    const datosDoc = {
      NombreEjecicio: nombreEjercicio
    };
    addDoc(collection(cloudDB, 'prueba2'), {nombreEjercicio});
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