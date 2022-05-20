let iconos = []
let selecciones = []

generarTablero()

function cargarIconos() {
    iconos = [
        '<i class="bi bi-star-fill"></i>',
        '<i class="bi bi-star"></i>',
        '<i class="bi bi-gem"></i>',
        '<i class="bi bi-stars"></i>',
        '<i class="bi bi-moon-fill"></i>',
        '<i class="bi bi-flower1"></i>',
        '<i class="bi bi-layers-fill"></i>',
        '<i class="bi bi-hourglass-top"></i>',
        '<i class="bi bi-dice-6-fill"></i>',
        '<i class="bi bi-hammer"></i>',
        '<i class="bi bi-gift-fill"></i>',
        '<i class="bi bi-emoji-smile"></i>',
    ]
}

function generarTablero() {
    let control = document.body;
    // control.style.pointerEvents="none";

    cargarIconos()
    selecciones = []
    let tablero = document.getElementById("tablero")
    let tarjetas = []
    for (let i = 0; i < 24; i++) {
        tarjetas.push(`
        <div class="area-tarjeta" onclick="seleccionarTarjeta(${i})">
            <div class="tarjeta" id="tarjeta${i}">
                <div class="cara trasera" id="trasera${i}">
                    ${iconos[0]}
                </div>
                <div class="cara superior">
                    <i class="bi bi-question-circle"></i>
                </div>
            </div>
        </div>        
        `)
        if (i % 2 == 1) {
            iconos.splice(0, 1)
        }
    }
    tarjetas.sort(() => Math.random() - 0.5)
    tablero.innerHTML = tarjetas.join(" ")

    // bloquear solo fichas sin boton salir
    tablero.style.pointerEvents="none";
    setTimeout(() => {
        tablero.style.pointerEvents="all";
    }
    , 5000);
    
}

function rendirse() {
    let tarjeta;
    for (let i = 0; i < 24; i++) {
        tarjeta = document.getElementById("tarjeta" + i);
        if (tarjeta.style.transform != "rotateY(180deg)") {
            tarjeta.style.transform = "rotateY(180deg)"
            selecciones.push(i)
        }
    }
}

function ayuda() {

}

function seleccionarTarjeta(i) {
    let tarjeta = document.getElementById("tarjeta" + i)
    if (tarjeta.style.transform != "rotateY(180deg)") {
        tarjeta.style.transform = "rotateY(180deg)"
        selecciones.push(i)
    }
    if (selecciones.length == 2) {
        deseleccionar(selecciones)
        selecciones = []
    }
}

function deseleccionar(selecciones) {
    setTimeout(() => {
        let trasera1 = document.getElementById("trasera" + selecciones[0])
        let trasera2 = document.getElementById("trasera" + selecciones[1])
        if (trasera1.innerHTML != trasera2.innerHTML) {
            let tarjeta1 = document.getElementById("tarjeta" + selecciones[0])
            let tarjeta2 = document.getElementById("tarjeta" + selecciones[1])
            tarjeta1.style.transform = "rotateY(0deg)"
            tarjeta2.style.transform = "rotateY(0deg)"
        } else {
            trasera1.style.background = "plum"
            trasera2.style.background = "plum"
        }
    }, 1000);
}

function redireccionar() {
    var url = "" + window.location.href;
    var pos = url.indexOf("#");
    var res = "";

    for (var i = pos + 1; i < url.length && i > 0; i++) {
      res += url[i];
    }
    
    window.location.href = "../html/listaJuegos.html#" + res;
}
