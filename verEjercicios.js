//alert("Hola");
import {db, storage} from './firebase.js';

/*Variables a actualizar*/
var title = document.getElementById("card-title");
var desc = document.getElementById("card-text");

/*Aparentemente recupera los datos del firebase*/
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
