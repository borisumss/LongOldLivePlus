async function registrar() {
    event.preventDefault();
    const { value: test } = await Swal.fire({
        title: "Registro",
        text: "¿Estas seguro de registrar el ejercicio?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Si, guardar",
        cancelButtonText: "No, cancelar",
        closeOnConfirm: false,
        closeOnCancel: false,

    });

    if (test) {
        const { value: test2 } = await Swal.fire({
            title: "¡Datos Guardados!",
            icon: "success",
            timer: 2000
        });
        if (test2) {
            document.regEjer.submit();
        } else {
            document.regEjer.submit();
        }

    } else {
        Swal.fire({
            title: "¡Cancelado!",
            icon: "error",
            timer: 3000
        });

    }

}

async function validarTiempo() {

    var minutos = document.getElementById("min");
    var segundos = document.getElementById("seg");

    if (minutos.value == 0 && minutos.value !="" && segundos.value !="") {

        Swal.fire({
            title: "El tiempo minimo para un ejercicio es de 1 minuto",
            icon: "error",
        });
        minutos.value = "";
        segundos.value = "";
        return false;

    }
}

async function validarGif() {

    var archivoInput = document.getElementById("formGif");
    var archivoRuta = archivoInput.value;
    var extesiones = /(.gif)$/i;

    if (!extesiones.exec(archivoRuta)) {
        Swal.fire({
            title: "¡Solo se permite archivos .gif!",
            icon: "warning",
            timer: 3000
        });
        archivoInput.value = '';
        return false;
    }
}
function validarMinutos(e){
    key=e.keyCode || e.which;
    teclado=String.fromCharCode(key);
    numeros="123456";
   
    if(numeros.indexOf(teclado)==-1 ){
      return false;
    }
  }
  function validarSegundos(e){
    key=e.keyCode || e.which;
    teclado=String.fromCharCode(key);
    numeros="0123456789";
   
    if(numeros.indexOf(teclado)==-1 ){
      return false;
    }
  }
  function dosDigitos(){
    var valor = document.getElementById("seg");
    var aux = ""+valor.value;
    if(valor.value<10 && valor.value >=0 && aux.length<2){
        valor.value="0"+valor.value;
    }
}