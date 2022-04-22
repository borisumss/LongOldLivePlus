/*{ Hora actual
    const myTime = setInterval(myTimer, 1000);
    function myTimer() {
      const today = new Date();
      const displayTime = today.toLocaleTimeString();
      document.getElementById("displayTime").innerHTML = displayTime;
    }
}*/
  // todo: Get Elements from the DOM
  
  const body = document.querySelector("body");
  const icon = document.querySelector("i");
  
  // ! get inputs.
  
  const roundTimeInput = document.getElementById("roundTime");
  const restTimeInput = document.getElementById("restTime");
  const startStopBtn = document.getElementById("start");
  
  // ! get Rounds and Rests
  const round1 = document.getElementById("round_1");
  const rest1 = document.getElementById("rest_1");
  const round2 = document.getElementById("round_2");
  const rest2 = document.getElementById("rest_2");
  const round3 = document.getElementById("round_3");
  

  
  const startTimer = () => {
    // todo: Time stemps
    let roundTime = (roundTimeInput.value) * 60;
    let restTime = (restTimeInput.value) * 60;
    let time = "10";
  
    //  todo: Verification 
  
    if (roundTimeInput.value === "" || restTimeInput.value === "") {
      alert("Input Round & Rest Time!");
      return;
    } else {
      //todo: Stop count down
      startStopBtn.innerHTML = "Stop";
      startStopBtn.style.backgroundColor = "#e24379";
      startStopBtn.onclick = newWorkout;
  
    
  
      // todo: Start The Countdown
      const startCountdown = document.querySelector(".title");
      setInterval(() => {
        getReady(startCountdown);
      }, 1000);
  
      // todo: Start Workout
      setTimeout(() => {
        // todo: hide header
        document.querySelector("header").style.display = "none";
  
        
  
        // todo: Start First Round
        setInterval(() => {
          if (round1.innerText !== "0:00") {
            //   console.log("Round 1");
            //   ! Update Round
            updateRound(round1);
            round1.parentElement.classList.add("active");
            //   ! Change Icon
            addRemoveIconClass("fa-heartbeat", "fa-fist-raised");
  
            //   ! Alert 10 sec
            checkFor10Sec(round1);
            
          } else if (round1.innerText === "0:00" && rest1.innerText !== "0:00") {
            //todo: start rest 1
            // ! Toggle Display
            addRemoveActiveClass(round1, rest1);
            //   ! Update Rest
            updateRest(rest1);
            //   ! Change Icon
            addRemoveIconClass("fa-fist-raised", "fa-chair");
            //   ! Alert 10 sec
  
            checkFor10Sec(rest1);
            // !Alert Start next Round
  
            
  
            //   ! Rest Round Time
            resetRoundTime();
          } else if (rest1.innerText === "0:00" && round2.innerText !== "0:00") {
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
            resetRestTime();
          } else if (round2.innerText === "0:00" && rest2.innerText !== "0:00") {
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
  
            
          }
          // todo: Stop Workout and Create New Workout
  
          if (round3.innerText === "0:00") {
            body.innerHTML = `
              <h1 class="title" >Done</h1>
              <div class="inputs-container">
                <button class="btn" onclick="newWorkout()">Again</button>
              </div>  
              `;
          }
        }, 1000);
      }, 11000);
  
      // ! Check for 10 secondes Marker
  
      function checkFor10Sec(activity) {
        activity.innerText === "0:10"
          ? (/*setAlert(alert10sec),*/ (activity.style.color = "#e24379"))
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
        const minutes = Math.floor(roundTime / 60);
        let seconds = roundTime % 60;
  
        seconds = seconds < 10 ? "0" + seconds : seconds;
        round.innerHTML = `${minutes}:${seconds}`;
        roundTime--;
      }
      function resetRoundTime() {
        return (roundTime = roundTimeInput.value * 60);
      }
      //* Rest
      function updateRest(rest) {
        const minutes = Math.floor(restTime / 60);
        let seconds = restTime % 60;
  
        seconds = seconds < 10 ? "0" + seconds : seconds;
        rest.innerHTML = `${minutes}:${seconds}`;
        restTime--;
      }
      function resetRestTime() {
        return (restTime = restTimeInput.value * 60);
      }
      // ! Create Countdown Function
  
      function getReady(element) {
        let seconds = time % 60;
        element.innerHTML = `
      <div class="inputs-container flex">
        <h4 class='title'>Get Ready in</h4>
        <h2 id='seconds' class='active animateSeconds'>${seconds}</h2>
       </div>
      `;
  
        time--;
      }
  
      
  
      
    }
  };
  
  // ! Utility Function
  
  // todo: Stop and Restart the App
  
  const newWorkout = () => {
    window.location.reload();
  };