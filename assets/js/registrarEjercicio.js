import { guardarRegistro } from './firebase.js'


const formulario = document.getElementById('formulario');
const input = document.querySelector('input[type="file"]');
var gif = [];
input.addEventListener('change', function (e) {
    gif = input.files;
});

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
                    event.preventDefault();
                    registrar();
                }

                form.classList.add('was-validated')
            }, false)
        })
})()

async function registrar() {

    event.preventDefault();
    const { value: test } = await Swal.fire({
        title: "Registro",
        text: "¿Estas seguro de registrar el ejercicio?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#FD7E14",
        confirmButtonText: "Si, guardar",
        cancelButtonText: "No, cancelar",
        cancelButtonColor: "#C4C4C4",
        closeOnConfirm: false,
        closeOnCancel: false,
        

    });

    if (test) {

        const nombre = formulario['nombre']
        const descripcion = formulario['descripcion']
        const musculo = formulario['seleccione']
        const minutos = formulario['min']
        const segundos = formulario['seg']
        

        try {
            Swal.fire({

                title: "Guardando registro...",
                icon: "info",
                closeOnConfirm: true,
                closeOnCancel: true,
                allowOutsideClick: false,
                showCancelButton: false,
                showConfirmButton: false,
        
        
              });
            guardarRegistro(nombre.value,descripcion.value,musculo.value,minutos.value,segundos.value,gif[0])
            
        } catch (error) {
          console.log(error);
        }

        
    } else {

        Swal.fire({
            title: "¡Cancelado!",
            icon: "error",
            timer: 3000
        });

    }


}