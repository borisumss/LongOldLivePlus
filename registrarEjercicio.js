import {guardarRegistro} from './firebase.js'

const formulario = document.getElementById('formulario');
const input = document.querySelector('input[type="file"]');
var gif = [];
input.addEventListener('change', function (e) {
    gif = input.files;
})

formulario.addEventListener('submit', (e) =>{
    e.preventDefault()
    const nombre = formulario ['nombre']
    const descripcion = formulario ['descripcion']
    const musculo = formulario ['seleccione']
    const minutos = formulario ['min']
    const segundos = formulario ['seg']
    guardarRegistro(nombre.value,descripcion.value,musculo.value,minutos.value,segundos.value,gif[0])
})
