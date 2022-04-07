// Import the functions you need from the SDKs you need

import { getFirestore, collection, addDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js";    
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