  // todo: Get Elements from the DOM
  
  const body = document.querySelector("body");
  const icon = document.querySelector("i");
  
  // Obtener boton de Inicio/Parar
  const startStopBtn = document.getElementById("start");
  
  // ! get Ejercicio y descanso
  const datosEjer = document.getElementById("ejercicio");
  const round1 = document.getElementById("round_1");
  const rest1 = document.getElementById("rest_1");
  
  const mins = [0,0,0];
  const segs = [10,25,20];

  let tam = mins.length;
  let i = 0;
  //Funcion llamada por el boton "Start"
  const startTimer = () => {
    // Tiempo en segundos de ronda y rest
    let min;  //Obtener datos de firebase del n-esimo ejercicio?
    let seg; //Obtener datos de firebase del n-esimo ejercicio?
    let restTime = 15;
  

    // aparicion Boton stop y evento solo en preparacion
    startStopBtn.innerHTML = "Stop";
    startStopBtn.style.backgroundColor = "#e24379";
    startStopBtn.onclick = newWorkout;

  

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
      document.querySelector("header").style.display = "none";

      
      
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
          if(i == tam-1){
            clearInterval(rutina);
            body.innerHTML = `
            <h1 class="title" >Terminaste rutina</h1>
            <div class="inputs-container">
              <button class="btn" onclick="newWorkout()">Again</button>
            </div>  
            `;
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
      activity.innerText === "0:10"
        ? (activity.style.color = "#e24379")
        : activity;
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
      let seconds = seg;
      
      datosEjer.innerHTML = `Round ${i+1}`;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      round.innerHTML = `${minutes}:${seconds}`;
      seg--;
      if(seg == 0 && min > 0){
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
  
  const newWorkout = () => {
    window.location.reload();
  };