const verde = document.getElementById('verde')
const rojo = document.getElementById('rojo')
const amarillo = document.getElementById('amarillo')
const celeste   = document.getElementById('celeste')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 8
const MAXIMO_DE_PUNTOS = ULTIMO_NIVEL * 100

    
class Juego{
    constructor(){
        this.inicializar = this.inicializar.bind(this)
        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.siguienteNivel,1000)
    }
    inicializar(){
        // haciendo ref al this.elegirColor de abajo
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.elegirColor = this.elegirColor.bind(this)
        this.toggleBtnEmpezar()
        //btnEmpezar.classList.add('hide')
        this.nivel = 1
        this.colores = {
            verde,
            rojo,
            amarillo,
            celeste
        }
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
                 }
                }
            }else{
                this.perdioElJuego()
            }
        }
       
        ganoElJuego(){
            swal('NOTIFICACIÓN', '¡¡Ganaste el juego, Felicidades!!','success')
            .then(this.inicializar)
        }

        perdioElJuego(){
          Swal.fire({
            title: '¡Perdiste! :(',
            showDenyButton: true,
            
            confirmButtonText: 'Jugar de nuevo',
            denyButtonText: `Salir del Juego`,
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
    }
