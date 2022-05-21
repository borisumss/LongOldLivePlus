const round = document.getElementById('round')
const verde = document.getElementById('verde')
const rojo = document.getElementById('rojo')
const amarillo = document.getElementById('amarillo')
const celeste   = document.getElementById('celeste')

const ULTIMO_NIVEL = 3
const MAXIMO_DE_PUNTOS = ULTIMO_NIVEL * 1
var colorPerdido = '';
var circulo = '';

class Juego{
    constructor(){
        let audio = document.getElementById("clip2");
      audio.play();
        this.round = 0;
        this.inicializar = this.inicializar.bind(this)
        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.siguienteNivel,1000)
    }
    inicializar(){
        this.updateRound(0)
        
        // haciendo ref al this.elegirColor de abajo
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.elegirColor = this.elegirColor.bind(this)
        //this.toggleBtnEmpezar()
        //btnEmpezar.classList.add('hide')
        this.nivel = 1
        this.colores = {
            verde,
            rojo,
            amarillo,
            celeste
        }
     } 
     updateRound(value) {

        this.round = value;
        round.textContent = `Puntaje: ${this.round}`;
    }
    
     toggleBtnEmpezar(){
         if(btnEmpezar.classList.contains('hide')){
             btnEmpezar.classList.remove('hide')
         }else {
            btnEmpezar.classList.add('hide')
         }
     }

     generarSecuencia(){
         this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random()*4))
     }  
     // this.nombreAtributo = 'valor'
     siguienteNivel(){
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClick()
     }

     transformarNumeroAColor(numero){
        switch( numero){
            case 0 :
                return 'verde'
            case 1:
                return 'rojo'
            case 2:
                return 'amarillo'
            case 3:
                return  'celeste'
        }
     }

     transformarColorANumero(COLOR){
        switch(COLOR){
            case 'verde' :
                return 0
            case 'rojo':
                return 1
            case 'amarillo':
                return 2
            case 'celeste':
                return 3
        }
     }

     iluminarSecuencia(){
         
         for(let i = 0 ; i< this.nivel; i++) {
             const COLOR = this.transformarNumeroAColor(this.secuencia[i])
             setTimeout(() => this.iluminarColor(COLOR), 1000 * i)
            }
        }

     iluminarColor(COLOR){
      let audio = document.getElementById("clip2");
      audio.play();
            this.colores[COLOR].classList.add('light')
            setTimeout(() => this.apagarColor(COLOR),350)
      
        }
  
     apagarColor(COLOR) {
            this.colores[COLOR].classList.remove('light')
        }
// ej let self= this , entonces eb en .bind(self) , para no perder la ref al this
     agregarEventosClick(){
            this.colores.verde.addEventListener('click', this.elegirColor);
            this.colores.rojo.addEventListener('click', this.elegirColor);
            this.colores.amarillo.addEventListener('click', this.elegirColor);
            this.colores.celeste.addEventListener('click', this.elegirColor);
           
        }
        eliminarEventosClick(){
            this.colores.verde.removeEventListener('click', this.elegirColor);
            this.colores.rojo.removeEventListener('click', this.elegirColor);
            this.colores.amarillo.removeEventListener('click', this.elegirColor);
            this.colores.celeste.removeEventListener('click', this.elegirColor);    
        }

    elegirColor(ev){
      let audio = document.getElementById("clip2");
      audio.play();
        //console.log(this)
            console.log(ev)
            const nombreColor = ev.target.dataset.color
            const numeroColor = this.transformarColorANumero(nombreColor)
            this.iluminarColor(nombreColor)
           
            if(numeroColor === this.secuencia[this.subnivel]){
                this.subnivel++
                if(this.subnivel === this.nivel){
                    this.nivel++ 
                    this.eliminarEventosClick()
                 
                 if (this.nivel ===(ULTIMO_NIVEL + 1)){
                     this.ganoElJuego()
                     
                 }else{
                    setTimeout(this.siguienteNivel,1500)     
                    this.updateRound(this.round+1)            
                 }
                }
            }else{
                var numeroPerdido = this.secuencia[this.subnivel]
                colorPerdido = this.transformarNumeroAColor(numeroPerdido)
                if(colorPerdido === 'verde'){
                    this.perdioElJuego('verde', 'https://cdn.icon-icons.com/icons2/402/PNG/512/trafficlight-green_40427.png')
                }else if(colorPerdido === 'amarillo'){
                    this.perdioElJuego('amarillo', 'https://cdn.icon-icons.com/icons2/77/PNG/128/button_blank_yellow_14988.png')
                }else if(colorPerdido === 'rojo'){
                    this.perdioElJuego('rojo', 'https://cdn.icon-icons.com/icons2/402/PNG/512/trafficlight-red_40428.png')
                }else{
                    this.perdioElJuego('celeste', 'https://cdn.icon-icons.com/icons2/321/PNG/512/Circle_34541.png')
                }
            }
        }
       
        ganoElJuego(){
            Swal.fire({
                title: '¡Ganaste! :)',
                text: 'Felicidades, lograste los 15 puntos',
                imageUrl: 'https://cdn.icon-icons.com/icons2/2055/PNG/512/trophy_icon_124465.png',
                imageWidth: 60,
                imageHeight: 60,
                showDenyButton: true,      

                confirmButtonText: 'Jugar de nuevo',
                denyButtonText: `Salir del juego`,
              }).then((result) => {
                if (result.isConfirmed) {
                  this.eliminarEventosClick()
                  this.inicializar()
                } else if (result.isDenied) {
                  window.location = "menuSD.html";
                }
            })                             
        }

        perdioElJuego(colorPerdido, circulo){
          Swal.fire({
            title: '¡Perdiste! :(',
            text: 'El color correcto era: '+colorPerdido,
            imageUrl: circulo,
            imageWidth: 50,
            imageHeight: 50,
            showDenyButton: true,
            
            confirmButtonText: 'Jugar de nuevo',
            denyButtonText: `Salir del juego`,
          }).then((result) => {
            if (result.isConfirmed) {
              this.eliminarEventosClick()
              this.inicializar()
            } else if (result.isDenied) {
              window.location = "menuSD.html";
            }
          })
        }
    }

    function empezarJuego(){
     window.juego= new Juego()
     let audio = document.getElementById("clip2");
      audio.play();
    }
    empezarJuego()
