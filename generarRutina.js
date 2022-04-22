import {
    onGetTasks2, onGetTasks3

} from "./firebase.js";


const tasksContainer = document.getElementById("tasks-container");


window.addEventListener("DOMContentLoaded", async (e) => {
    
  onGetTasks2((querySnapshot) => {
    tasksContainer.innerHTML ="";
      let i = 1;
        querySnapshot.forEach((collection) => {
          i = i+1;
            //const task = collection.data(); para obtener los datos de la collection
            var titulo = collection.id;
                 
            
            tasksContainer.innerHTML += `
            <div class="container-fluid">
            <a href="#!">
              <button>                         
                <h1>${titulo}</h1>
              </button>
            </a>
          </div>
        `;
          
        }
       
        );
      
    });
});

