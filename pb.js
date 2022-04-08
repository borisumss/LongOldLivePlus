import { registrar } from "./firebasepb.js";

const form = document.getElementById('registro');
const input = document.querySelector('input[type="file"]');
var gif = [];
input.addEventListener('change', function (e) {
    gif = input.files;
})

form.addEventListener('submit', (e) =>{
    e.preventDefault()
    const nombreEjercicio = form ['nombre ejercicio']
    registrar(nombreEjercicio.value,gif[0])
})

/*window.addEventListener('DOMContentLoaded', ()=>{

})*/



/*const forml = document.getElementById('registro');
const img = [];
//const reader = new FileReader();
//const input = document.createElement('input');
//input.type = 'file';
const nameimg = ""; 
const extimg = "";


/*input.onchange = e =>{
    files = e.target.files;
    reader.readAsDataURL(files[0]);
}

reader.onload = function(){

}*/

/*function GetFileName(imgfile){
    var = imgfile.name.
}
function GetExtName(imgfile){

}*/

/*forml.addEventListener('submit', (e) =>{
    e.preventDefault()
    const nombre = forml ['nombre ejercicio']
    img = forml ['formGif']
    //nameimg = GetFileName(img[0]);
    //extimg = GetExtName(img[0]);

    console.log(img.value)
    savepb(nombre.value,img[0])
})
*/