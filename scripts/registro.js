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

    if (minutos.value == 0 && segundos.value < 15 && minutos.value !="" && segundos.value !="") {

        Swal.fire({
            title: "El tiempo minimo para un ejercicio es de 15 segundos",
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

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                } else {
                    registrar();
                }

                form.classList.add('was-validated')
            }, false)
        })
})()