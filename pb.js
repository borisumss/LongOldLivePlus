import { savepb } from "./firebasepb.js";
window.addEventListener('DOMContentLoaded', ()=>{

})

const forml = document.getElementById('registro');

forml.addEventListener('submit', (e) =>{
    e.preventDefault()
    const nombre = forml ['nombre ejercicio']
    savepb(nombre.value)
    console.log(nombre)
})