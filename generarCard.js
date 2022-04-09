/*let num = 100;  /* select count -> es la cantidad de ejercicios registrados en firebase 
var addCols = function () {
    for (var i = 1; i <= num; i++) {
        var myPanel = $('<div class="container"><div class="row"> <div class="col-3">   </div> <div class="col-6">   <a href="#!" data-bs-toggle="modal" data-bs-target="#modal2">     <div type="button" class="card mb-3 mx-auto w-100mb-4 rounded" style="max-width: 540px;" href="#">   <div class="row g-0 justify-content-center align-items-center"><div class="col-md-4 "><img src="images/logo.jpg" class="img-fluid rounded-start" alt="..." style="max-width: 150px;max-height: 150px;"></div> <div class="col-md-8"><div class="card-body"><h5 class="card-title">Card title</h5><p class="card-text">This is a wider card with supporting text below as a natural lead-in to additionalcontent. This content is a little bit longer.</p> <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>  </div>    </div>   </div>   </div> </a>   <div tabindex="-1" aria-labelledby="modal2" aria-hidden="true" class="modal fade" id="modal2"> <div class="modal-dialog modal-lg modal-dialog-centered">   <div class="modal-content">     <div class="card mx-auto"><img src="images/logo.jpg" class="card-img-top mx-auto"         style="max-width: 400px; max-width: 400px;" alt="...">       <div class="card-body">         <h5 class="card-title">Card title</h5>         <p class="card-text">Some quick example text to build on the card title and make up the bulk of the cards           content</p>         <div class="container text-center"> <button type="button" class="btn btn-primary"             data-bs-dismiss="modal">Cerrar</button></div>       </div>      </div>    </div>  </div> </div> </div><div class="col-3"> </div> </div></div>');
        myPanel.appendTo('#contentPanel');
    }
};*/

import {
    onGetTasks,

} from "./firebase.js";


const tasksContainer = document.getElementById("tasks-container");

window.addEventListener("DOMContentLoaded", async (e) => {
    onGetTasks((querySnapshot) => {
      let i = 1;
        querySnapshot.forEach((doc) => {
          i = i+1;
            const task = doc.data();
            var titulo =task.NombreEjercicio;
            var foto = task.GifURL;
            var desc=task.DescripcionEjercicio;
            var grupo=task.GrupoMuscular;
            var timeMin= task.MinutosEjercicio;
            var timeSeg= task.SegundosEjercicio;
            tasksContainer.innerHTML += `
            <div class="container-fluid">
          <a href="#!" data-bs-toggle="modal" data-bs-target="#modal${i}">
            <div type="button"  href="#" id="boton-modal">
              <div class="card card-body mt-2 border-primary" id="marco">
                <div class="container-fluid" id="card">
                  <div class="row">
                    <div class="col-6" >
                      <img src="${task.GifURL}" alt="imagen" id="img" >
                    </div>
      
                    <div class="col-6" id="nombres">
                      <h1 class="h1">${task.NombreEjercicio}</h1>
                    </div>
                  </div>
                </div>
              </div>   
            </div>
          </a>

          <div tabindex="-1" aria-labelledby="modal${i}" aria-hidden="true" class="modal fade"  id="modal${i}">
            <div class="modal-dialog modal-lg modal-dialog-centered">
              <div class="modal-content" id="modalId">
                <div class="card">
                <br><br>
                <img src="${foto}" class="card-img-top mx-auto"
                    id="imgModal" alt="...">
                  <div class="card-body">
                    <div class="container-fluid" id="letras">
        
                    <div class="row">
                    <h1 class="card-title" id="tituloModal">${titulo}</h1>
                  </div>
        
                        <div class="row">
                       
                        <p>${desc}</p>
                        </div>
                    
                   
                      <div class="row">
                        <div class="col-6">
                          Grupo Muscular: ${grupo}
                        </div>
        
                        <div class="col-6">
                          Tiempo: ${timeMin}:${timeSeg}
                        </div>
                      </div>
                      <br><br>
                      <div class="row" id="btnCerrar">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
                          Cerrar
                        </button>
                      </div>
                    </div>
        
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        `;

        }
        );
       
    });
});

