
window.onload = function () {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
            if (user) {
                await Swal.fire({
                    icon: 'error',
                    title: 'sucess',
                    text: 'Logueado',
                    color: '#312d2d',
                    background: '#ffffff',
                    confirmButtonColor: '#ffcc00'
                })
    
            } else {
              await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Inicie sesión Primero!',
                color: '#312d2d',
                background: '#ffffff',
                confirmButtonColor: '#ffcc00'
            })
            
            window.location = "index.html"
            }
         
    });
};