const round = document.getElementById('round')
const verde = document.getElementById('verde')
const rojo = document.getElementById('rojo')
const amarillo = document.getElementById('amarillo')
const celeste = document.getElementById('celeste')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 15
const MAXIMO_DE_PUNTOS = ULTIMO_NIVEL * 1
var colorPerdido = '';
var circulo = '';
let audio = document.getElementById("clip1");
let audio1 = document.getElementById("clip2");
let audio2 = document.getElementById("clip3");
let audio3 = document.getElementById("clip4");

const circuloCeleste = "https://cdn-icons-png.flaticon.com/512/1281/1281225.png"; //Fab si Rodri no
//(Ni Fab ni Rodri)const circuloCeleste = "https://cdn.icon-icons.com/icons2/215/PNG/256/circle256_25243.png";
//(Rodri si Fab no)const circuloVerde = "https://cdn.icon-icons.com/icons2/210/PNG/256/trafficlight-green256_24943.png";
const circuloVerde = "https://cdn.icon-icons.com/icons2/402/PNG/512/trafficlight-green_40427.png";

class Juego {
    constructor() {
        this.round = 0;
        this.inicializar = this.inicializar.bind(this)
        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.siguienteNivel, 1000)
    }
    inicializar() {
        this.updateRound(1)
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
    updateRound(value) {
        this.round = value;
        round.textContent = `Nivel: ${this.round}`;
    }

    toggleBtnEmpezar() {
        if (btnEmpezar.classList.contains('hide')) {
            btnEmpezar.classList.remove('hide')
        } else {
            btnEmpezar.classList.add('hide')
        }
    }

    generarSecuencia() {
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }
    // this.nombreAtributo = 'valor'
    siguienteNivel() {
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }

    transformarNumeroAColor(numero) {
        switch (numero) {
            case 0:
                return 'verde'
            case 1:
                return 'rojo'
            case 2:
                return 'amarillo'
            case 3:
                return 'celeste'
        }
    }

    transformarColorANumero(COLOR) {
        switch (COLOR) {
            case 'verde':
                return 0
            case 'rojo':
                return 1
            case 'amarillo':
                return 2
            case 'celeste':
                return 3
        }
    }

    iluminarSecuencia() {
        for (let i = 0; i < this.nivel; i++) {
            const COLOR = this.transformarNumeroAColor(this.secuencia[i])
            console.log(COLOR);
            setTimeout(() => this.iluminarColor(COLOR), 1000 * i)
        }
    }

    iluminarColor(COLOR) {
        if (COLOR === 'verde') {
            audio.play();
        } else if (COLOR === 'amarillo') {
            audio1.play();
        } else if (COLOR === 'rojo') {
            audio2.play();
        } else if(COLOR == 'celeste'){
            audio3.play();
        }

        this.colores[COLOR].classList.add('light')
        setTimeout(() => this.apagarColor(COLOR), 350)
      
    }

    apagarColor(COLOR) {
        this.colores[COLOR].classList.remove('light')
    }
    // ej let self= this , entonces eb en .bind(self) , para no perder la ref al this
    agregarEventosClick() {
        this.colores.verde.addEventListener('click', this.elegirColor);
        this.colores.rojo.addEventListener('click', this.elegirColor);
        this.colores.amarillo.addEventListener('click', this.elegirColor);
        this.colores.celeste.addEventListener('click', this.elegirColor);

    }
    eliminarEventosClick() {
        this.colores.verde.removeEventListener('click', this.elegirColor);
        this.colores.rojo.removeEventListener('click', this.elegirColor);
        this.colores.amarillo.removeEventListener('click', this.elegirColor);
        this.colores.celeste.removeEventListener('click', this.elegirColor);
    }

    elegirColor(ev) {
        //console.log(this)
        console.log(ev)
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor)

        if (numeroColor === this.secuencia[this.subnivel]) {
            this.subnivel++
            if (this.subnivel === this.nivel) {
                this.nivel++
                this.eliminarEventosClick()

                if (this.nivel === (ULTIMO_NIVEL + 1)) {
                    this.ganoElJuego()

                } else {
                    setTimeout(this.siguienteNivel, 1500)
                    this.updateRound(this.round + 1)
                }
            }
        } else {
            var numeroPerdido = this.secuencia[this.subnivel]
            colorPerdido = this.transformarNumeroAColor(numeroPerdido)
            if (colorPerdido === 'verde') {
                this.perdioElJuego('verde', circuloVerde)
            } else if (colorPerdido === 'amarillo') {
                this.perdioElJuego('amarillo', 'https://cdn-icons-png.flaticon.com/512/1281/1281188.png')
            } else if (colorPerdido === 'rojo') {
                this.perdioElJuego('rojo', 'https://cdn-icons-png.flaticon.com/512/595/595005.png')
            } else {
                this.perdioElJuego('celeste', circuloCeleste)
            }
        }
    }

    ganoElJuego() {

        Swal.fire({
            title: '??Ganaste! :)',
            text: 'Felicidades, completaste los 15 niveles',
            imageUrl: '../img/iconos/trofeo.png',
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
                var url = "" + window.location.href;
                var pos = url.indexOf("#");
                var res = "";

                for (var i = pos + 1; i < url.length && i > 0; i++) {
                    res += url[i];
                }
                window.location = "menuSD.html#" + res;
            }
        })
    }

    perdioElJuego(colorPerdido, circulo) {
        if(colorPerdido === 'verde'){
            Swal.fire({
                title: '??Perdiste! :(',
                text: 'El color correcto era ' + colorPerdido,
                imageUrl: '../img/iconos/circuloVerde.png',
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
                    var url = "" + window.location.href;
                    var pos = url.indexOf("#");
                    var res = "";
    
                    for (var i = pos + 1; i < url.length && i > 0; i++) {
                        res += url[i];
                    }
                    window.location = "menuSD.html#" + res;
                }
            })
        }else if(colorPerdido === 'celeste'){
            Swal.fire({
                title: '??Perdiste! :(',
                text: 'El color correcto era ' + colorPerdido,
                imageUrl: '../img/iconos/circuloCeleste.png',
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
                    var url = "" + window.location.href;
                    var pos = url.indexOf("#");
                    var res = "";
    
                    for (var i = pos + 1; i < url.length && i > 0; i++) {
                        res += url[i];
                    }
                    window.location = "menuSD.html#" + res;
                }
            })
        }else{
            Swal.fire({
                title: '??Perdiste! :(',
                text: 'El color correcto era ' + colorPerdido,
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
                    var url = "" + window.location.href;
                    var pos = url.indexOf("#");
                    var res = "";
    
                    for (var i = pos + 1; i < url.length && i > 0; i++) {
                        res += url[i];
                    }
                    window.location = "menuSD.html#" + res;
                }
            })
        }
        
    }
}

function empezarJuego() {
    window.juego = new Juego()
}
