import { registrar } from "./firebasepb.js";

const form = document.getElementById('registro');

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    const nombreEjercicio = form ['nombre ejercicio']
    const img = form ['formGif']
    console.log(nombreEjercicio.value,img.value)
    console.log(img.value.split(/(\\|\/)/g).pop())
    var fl = []
    fl = (img.value.split(/(\\|\/)/g).pop()).split('.')
    
    const imgnombre = fl[0]
    const imgext = fl[1]
    console.log(imgnombre,imgext)
    registrar(nombreEjercicio.value)
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