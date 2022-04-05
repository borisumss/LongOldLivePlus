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
    const minutos = formulario ['min']
    const segundos = formulario ['seg']
    guardarRegistro(nombre.value,descripcion.value,musculo.value,minutos.value,segundos.value)
})