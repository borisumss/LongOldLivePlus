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