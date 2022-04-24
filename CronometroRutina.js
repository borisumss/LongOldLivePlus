  // todo: Get Elements from the DOM
  
  const body = document.querySelector("body");
  const icon = document.querySelector("i");
  
  // ! get inputs.
  // Obtener tiempo de cada ejercicio
  const roundTimeInput = document.getElementById("roundTime");
  const restTimeInput = document.getElementById("restTime");
  const startStopBtn = document.getElementById("start");
  
  // ! get Ejercicio y descanso
  const round1 = document.getElementById("round_1");
  const rest1 = document.getElementById("rest_1");
  const round2 = document.getElementById("round_2");
  const rest2 = document.getElementById("rest_2");
  const round3 = document.getElementById("round_3");
  
  const mins = [0,0,0];
  const segs = [10,30,20];

  let tam = mins.length;
  let i = 0;
  //Funcion llamada por ell boton "Start"
  const startTimer = () => {
    // Tiempo en segundos de ronda y rest
    let min;  //Obtener datos de firebase del n-esimo ejercicio
    let seg; //Obtener datos de firebase del n-esimo ejercicio
    let roundTime = (roundTimeInput.value) * 60;
    let restTime = 15;//(restTimeInput.value) * 60;
  
    //  Verification
    if (roundTimeInput.value === "" || restTimeInput.value === "") {
      alert("Input Round & Rest Time!");
      return;
    } else {
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
        <h4 class='title'>Get Ready in</h4>
        <h2 id='seconds' class='active animateSeconds'>${preparacion}</h2>
       </div>
      `;
        preparacion--;
        if(preparacion === 0){
          clearInterval(preparar);
        }
      }, 1000);
  
      // Iniciar rutina (ejercicios) luego de preparacion
      setTimeout(() => {
        // todo: hide header
        document.querySelector("header").style.display = "none";
  
        
  
        // todo: Start First Round
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
    
              
    
              //   ! Reset Round Time
              //resetRoundTime();
            }else if(rest1.innerText === "0:00"){
              i++;
              resetRoundTime(round1);
              resetRestTime(rest1);
              console.log("i es "+i);//2
              console.log("min es "+min+" y seg es "+seg);//2 y 30
              console.log("descanso es "+restTime);
            }
          } /*else if (round2.innerText !== "0:00") {
            //todo: start Round 2
            // ! Toggle Display
            addRemoveActiveClass(rest1, round2);
            //   ! Update Rest
            updateRound(round2);
            //   ! Change Icon
            addRemoveIconClass("fa-chair", "fa-fist-raised");
            //   ! Alert 10 sec
  
            checkFor10Sec(round2);
            // !Alert Stop Round
  
            
  
            //   ! Rest Round Time
            //resetRestTime();
          } /*else if (round2.innerText === "0:00" && rest2.innerText !== "0:00") {
            //todo: start Rest 2
            // ! Toggle Display
            addRemoveActiveClass(round2, rest2);
            //   ! Update Rest
            updateRest(rest2);
            //   ! Change Icon
            addRemoveIconClass("fa-fist-raised", "fa-chair");
            //   ! Alert 10 sec
  
            checkFor10Sec(rest2);
            // !Alert Start next Round
  
            
  
            //   ! Rest Round Time
            resetRoundTime();
          } else if (round3.innerText !== "0:00") {
            //todo: start Round 3
            // ! Toggle Display
            addRemoveActiveClass(rest2, round3);
            //   ! Update Rest
            updateRound(round3);
            //   ! Change Icon
            addRemoveIconClass("fa-chair", "fa-fist-raised");
            //   ! Alert 10 sec
  
            checkFor10Sec(round3);
            // !Alert Stop  Round
  
            
          }*/
          // todo: Stop Workout and Create New Workout
  
          /*if (round2.innerText === "0:00") {
            body.innerHTML = `
              <h1 class="title" >Done</h1>
              <div class="inputs-container">
                <button class="btn" onclick="newWorkout()">Again</button>
              </div>  
              `;
          }*/
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
  
        seconds = seconds < 10 ? "0" + seconds : seconds;
        round.innerHTML = `${minutes}:${seconds}`;
        seg--;
        if(seg == 0 && min > 0){
          min--;
          seg=59;
        }
      }
      //Resetear tiempo de ronda para las otras
      function resetRoundTime(round) {
        min = mins[i];
        seg = segs[i];
        round.innerHTML = `${min}:${seg}`;
        return (roundTime = roundTimeInput.value * 60);
      }
      //* Descanso
      function updateRest(rest) {
        const minutes = 0;//Math.floor(restTime / 60);
        let seconds = restTime;//restTime % 60;
  
        seconds = seconds < 10 ? "0" + seconds : seconds;
        rest.innerHTML = `${minutes}:${seconds}`;
        restTime--;
      }
      //Resetear tiempo de descanso
      function resetRestTime(rest) {
        restTime = 15;
        rest.innerHTML = `${0}:${restTime}`;
      }
  
      
  
    
  
      
    }
  };
  
  // ! Utility Function
  
  // todo: Detiene y renicia la pagina actual (rutina)
  
  const newWorkout = () => {
    window.location.reload();
  };