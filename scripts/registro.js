
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

        Swal.fire({
            titlle: "¡Cambios Guardados!",
            icon: "success",
            
        });
        document.regEjer.submit();
    } else {
        Swal.fire({
            title: "¡Cancelado!",
            icon: "error",
            timer: 3000
        });
        
    }

}