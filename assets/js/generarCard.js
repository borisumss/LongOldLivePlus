import {
    onGetTasks,

} from "./firebase.js";


const tasksContainer = document.getElementById("tasks-container");


window.addEventListener("DOMContentLoaded", async (e) => {
    
  onGetTasks((querySnapshot) => {
    tasksContainer.innerHTML ="";
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
            var segValid = timeSeg;
            var aux = ""+segValid
            if(timeSeg < 10 && aux.length<2){
              segValid = '0'+timeSeg; 
            }
            tasksContainer.innerHTML += `
            <div class="container-fluid">
          <a href="#!" data-bs-toggle="modal" data-bs-target="#modal${i}">
            <div type="button"  href="#" id="boton-modal">
              <div class="card card-body mt-2 border-primary" id="marco">
                <div class="container-fluid" id="card">
                  <div class="row" id="cont">
                    <div class="col-6" >
                      <img src="${task.GifURL}" alt="imagen" id="img" >
                    </div>
      
                    <div class="col-6" id="nombres">
                   
                    <div>${task.NombreEjercicio}</div>
                   
                    
 
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
        
                        <div class="col-6 text-center">
                          Tiempo: ${timeMin}:${segValid}
                        </div>
                      </div>
                      <br><br>
                      <div class="row" >
                        <button type="button" id="btnCerrar" class="btn btn-primary" data-bs-dismiss="modal">
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

