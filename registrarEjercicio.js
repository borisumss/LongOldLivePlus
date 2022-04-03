import {guardarRegistro} from './firebase.js'
window.addEventListener('DOMContentLoaded' , () => {

});

const formulario = document.getElementById('formulario');

formulario.addEventListener('submit',(e)=>{
    e.preventDefault()
    const nombre = formulario ['nombre']
    const descripcion = formulario ['descripcion']
    const musculo = formulario ['seleccione']
    const gif = formulario ['formGif']
    guardarRegistro(nombre.value,descripcion.value,musculo.value)
})