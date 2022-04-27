import {
  onGetTasks2

} from "./firebase.js";
var listaNombres = new Array();
var mins = new Array();
var segs = new Array();

var url = ""+window.location.href;
var rutina = limpiar(url) ;

function limpiar(palabra){
    var res ="";
    var bandera = false;
    for(let i=0;i<palabra.length;i++){
        if(palabra[i]=="#"){
            bandera= true;
            i++;
        }

        if(bandera){
            res+=palabra[i];
        }
    }
    return res;
}
let btn = document.querySelector('#start');
//btn.style.visibility = "hidden";

//const formulario = document.getElementById('formulario');
const formulario2 = document.getElementById('formulario2');

window.addEventListener("DOMContentLoaded", async (e) => {

  onGetTasks2((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.id == rutina) {
              const task = doc.data();

              let claves = Object.keys(task);

              for (let i = 0; i < claves.length; i++) {
                  var titulo = claves[i];
                  var nombreEjer = task[titulo].NombreEjercicio;
                  var minutos = task[titulo].MinutosEjercicio;
                  var segundos = task[titulo].SegundosEjercicio;
                  listaNombres.push(nombreEjer);
                  mins.push(minutos);
                  segs.push(segundos);
                  
              }
              btn.style.visibility = "visible";
              
          }
      }

      );

  });
 
  startTimer();
});


// todo: Get Elements from the DOM
 
  const body = document.querySelector("body");
  const icon = document.querySelector("i");
  
  // Obtener boton de Inicio/Parar
  //const startStopBtn = document.getElementById("start");
  
  // ! get Ejercicio y descanso
  const datosEjer = document.getElementById("ejercicio");
  const round1 = document.getElementById("round_1");
  const rest1 = document.getElementById("rest_1");
 
  

  let tam = mins.length;
  let i = 0;

  //Funcion llamada por el boton "Start"
  const startTimer = () => {
    // Tiempo en segundos de ronda y rest
    let min;  //Obtener datos de firebase del n-esimo ejercicio?
    let seg; //Obtener datos de firebase del n-esimo ejercicio?
    let restTime = 1;
  

    // aparicion Boton stop y evento solo en preparacion
    /*startStopBtn.innerHTML = "Stop";      aca aparece un boton
    startStopBtn.style.backgroundColor = "#e24379";
    startStopBtn.onclick = newWorkout;*/

  

    // Tiempo de preparacion 10 seg antes de iniciar rutina
    const startCountdown = document.querySelector(".title");
    let preparacion = 10;
    let preparar = setInterval(() => {
      console.log("Descanso "+preparacion);
      startCountdown.innerHTML = `
    <div class="inputs-container flex">
      <h2 id='seconds' class='active animateSeconds'>${preparacion}</h2>
      <h4 class='title'>¡Prepárate</h4>
      </div>
    `;
      preparacion--;
      if(preparacion === 0){
        clearInterval(preparar);
      }
    }, 1000);

    // Iniciar rutina (ejercicios) luego de preparacion
    setTimeout(() => {
      // Ocultar header
      document.querySelector("headerp").style.display = "none";

      
      
      // Inicio de ejercicios
      min = mins[i];//1
      seg = segs[i];//10
      let rutina = setInterval(() => {
        if (round1.innerText !== "0:00") {
          //   ! Update Round
          updateRound(round1);
          round1.parentElement.classList.add("active");
          //   ! Change Icon
          addRemoveIconClass("fa-heartbeat", "fa-fist-raised");

          //   ! Alert 10 sec
          checkFor10Sec(round1);

        } else if (round1.innerText === "0:00") {
          if(i == mins.length-1){
            clearInterval(rutina);
            
            formulario2.innerHTML = `
            <h1 class="title" >Terminaste rutina</h1>
            <div class="inputs-container">
              
              <button class="btn" type="submit">Again</button>
              
              </div>  
            `;
            document.querySelector("#test").style.display = "none";
            icon.classList.remove("fa-fist-raised");
            icon.classList.remove("fa-chair");
            
          }else if(rest1.innerText !== "0:00"){
            //  start rest 1
            // ! Toggle Display
            addRemoveActiveClass(round1, rest1);
            //   ! Update Rest
            updateRest(rest1);
            //   ! Change Icon
            addRemoveIconClass("fa-fist-raised", "fa-chair");
            //   ! Alert 10 sec
  
            checkFor10Sec(rest1);
            // !Alert Start next Round
  
            console.log("descanso "+restTime+" texto "+rest1.innerText);
  
            //   ! Reset Round Time
            //resetRoundTime();
          }else if(rest1.innerText === "0:00"){
            i++;
            resetRoundTime(round1);
            resetRestTime(rest1);
            rest1.parentElement.classList.remove("active");
            console.log("i es "+i);//2
            console.log("min es "+min+" y seg es "+seg);//2 y 30
            console.log("descanso es "+restTime);
          }
        } 
      }, 1000);
    }, 11000);

    // ! Pinta tiempo en rojo a los 10 segundos

    function checkFor10Sec(activity) {
      activity.innerText <= "0:10"
        ? (activity.style.color = "#e24379")
        : (activity.style.color = '#44de00');
    }

    // ! Create addRemoveIconClass() function

    function addRemoveIconClass(currentIcon, nextIcon) {
      icon.classList.remove(currentIcon);
      icon.classList.add(nextIcon);
    }

    function addRemoveActiveClass(previousActivity, currentActivity) {
      previousActivity.parentElement.classList.remove("active");
      currentActivity.parentElement.classList.add("active");
    }

    //! Create Rounds and Rest Updates functions
    //* Rounds
    function updateRound(round) {
      let minutes = min;
      let seconds = parseInt(seg);
      
      datosEjer.innerHTML = `${listaNombres[i]}`;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      round.innerHTML = `${minutes}:${seconds}`;
      if(seg!=0){
      seg--;
      }
      else if(seg == 0 && min > 0){
        min--;
        seg=59;
      }
    }
    //Resetear tiempo de ronda para las otros ejercicios
    function resetRoundTime(round) {
      min = mins[i];
      seg = segs[i];
      round.innerHTML = `${min}:${seg}`;
      return;
    }
    //* Descanso
    function updateRest(rest) {
      const minutes = 0;
      let seconds = restTime;

      seconds = seconds < 10 ? "0" + seconds : seconds;
      rest.innerHTML = `${minutes}:${seconds}`;
      restTime--;
    }
    //Resetear tiempo de descanso
    function resetRestTime(rest) {
      restTime = 15;
      rest.innerHTML = `${0}:${restTime}`;
    }
  
      
  
    
  
      
    
  };
  
  // ! Utility Function
  
  // todo: Detiene y renicia la pagina actual (rutina)
  export const newWorkout = () => {
    window.location.reload();
  }; 
  

  /*formulario.addEventListener('submit',(e)=>{
    e.preventDefault();
    startTimer();
  });*/

  formulario2.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    newWorkout();
  });