let iconos = []
let selecciones = []
let cont=0;

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
    cont=0;
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

    control.style.pointerEvents="none";
    setTimeout(() => {
        control.style.pointerEvents="all";
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
            cont++;
            if(cont == 12){
                document.getElementById("finJuego").innerHTML=`
                <div id="felicidades" class="modal show" tabindex="-1" aria-modal="true" role="dialog" style="display: block;">
                    <div class="modal-dialog modal-dialog-centered">
                         <div class="modal-content">
                            <div class="modal-header">
                                <h3 class="modal-title">¡FELICIDADES!</h3>
                            </div>
                            <div class="modal-footer">
                                <h3 class="modal-title">
                                    <button class="btn btn-primary" data-bs-dismiss="modal" onclick="cerrar()">Cerrar</button>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>`;
            }
        }
    }, 1000);
}

function cerrar(){
    document.getElementById("felicidades").style.display = "none";
}

function redireccionar() {
    var res = "";
    window.location.href = "../html/listaJuegos.html#" + res;
}

function redireccionarJuegoMemorama(){
    var res = "";
    window.location.href = "../html/memorama.html#" + res;
}

function redireccionarMenuMemorama(){
    var res = "";
    window.location.href = "../html/menuMemorama.html#" + res;
}