//alert("Hola");

// Initialize Cloud Firestore through Firebase --- Este es de otra base de datos

/*
import {db, storage} from './firebase.js';

firebase.initializeApp({
  apiKey: "AIzaSyD85qYxh4zulnhtWy2jSYrnov5i2oRQcY8",
  authDomain: "database-6e811.firebaseapp.com",
  projectId: "database-6e811",
  storageBucket: "database-6e811.appspot.com",
  messagingSenderId: "975657922755",
  appId: "1:975657922755:web:b4a5655528e44aaadc7276"
});

var db = firebase.firestore();

function ver() {
   // body...
   db.collection("ejercicio").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
         document.getElementById("contentPanel").innerHTML=`${doc.data().nombre}`
        //console.log(`${doc.id} => ${doc.data()}`);
      });
   });
}

//Variables a actualizar
var title = document.getElementById("card-title");
var desc = document.getElementById("card-text");

//Aparentemente recupera los datos del firebase
const addEjercicio = ejercicio => {
    title.innerHTML = `
        <li>
            <div>${ejercicio.nombre}</div>
        </li>
    `;
}    
db.collection('ejercicio').get()
   .then(snapshot =>{
      //console.log(snapshot.docs[0].data());
      snapshot.forEach(doc => {
         //console.log(doc.data());
         addEjercicio(doc.data());
      }) 
   });
   .catch(err => console.log(err));

*/
/*
function ver() {
   // body...
   db.collection("ejercicio").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
         document.getElementById("imprimir").innerHTML=`${doc.data().nombre}`
        //console.log(`${doc.id} => ${doc.data()}`);
      });
   });
}
*/