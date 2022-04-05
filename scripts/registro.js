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
        const { value:test2}=await Swal.fire({
            title: "¡Datos Guardados!",
            icon: "success",
            timer: 2000
        });
        if(test2){
            document.regEjer.submit();
        }else{
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
          }else{
              registrar();
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()