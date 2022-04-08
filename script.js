
const addDoc=async({collection, data,nom,grup,des}) =>{
  let document={ 
 
    ...data,
    nombreE: nom,
    grupoM: grup,
    descriptonE: des,
    
    //nombre: firebase.firestore.FieldValue.serverTimestamp() || null,
    //Description: firebase.firestore.FieldValue.serverTimestamp() || null,
      
    
  }
  let collectionRef=firebase.firestore().collection(collection);
  return collectionRef.add(document);
}

const publish= async({file,nom,grup,des})=>{
  let storageRef=await upload({file});
  //console.log(storageRef);

  return addDoc({collection: 'files', data: {GIF: storageRef.fullPath},nom,grup,des})
}


const upload =({ file }) => {
  let storageRef=firebase.storage().ref().child(`images/${file.name}`);
 
  storageRef.put(file);
  return storageRef;
}


const queryImages = async()=>{
  let collection=firebase.firestore().collection('files')
  collection.onSnapshot((snapshot)=>{
      snapshot.docChanges().forEach((change) => {
        if(change.type === "added" ){
          showImage(change.doc.data());
        }
      });
      console.log(snapshot.docChanges());
  });
}
const showImage= async (docData)=>{
   let node = document.createElement("div");
   node.classList.add("item");
   node.innerHTML= `
      <p>${docData.path}</p>
      <img class='image' />
     `;

  let contanier = document.querySelector("#images");
  contanier.append(node);

  let url =await firebase.storage().ref(docData.path).getDownloadURL();
  let img= node.querySelector('img');
  img.src=url;

}
async function main(){   
    const firebaseConfig = {
        apiKey: "AIzaSyANGrz8a3QBxsxgGpVGYqKqKhkjqDJPnSU",
        authDomain: "ejercicios-7de73.firebaseapp.com",
        projectId: "ejercicios-7de73",
        storageBucket: "ejercicios-7de73.appspot.com",
        messagingSenderId: "434177030407",
        appId: "1:434177030407:web:5fecdb2a9548c9517b6da2",
        measurementId: "G-5XHQ7ZMHEK"
      };   
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      
      const db=firebase.firestore();

      let form= document.querySelector("#uploader")
      const formulario=document.getElementById("formulario")
      //console.log(formulario)

      formulario.addEventListener("submit",(ev)=>{
        ev.preventDefault();
        let fileInput = formulario.querySelector("#file");
       
        //const description=form['task-description']
       // const title=form['task-title']
       //console.log(description.value);
      //  const l=description.value;
       // console.log(db);
        //console.log(taskform)

        const nombre = formulario ['nombre']
        const descripcion = formulario ['descripcion']
        const musculo = formulario ['seleccione']
       // const gif = formulario ['formGif']
        //const minutos = formulario ['min']
        //const segundos = formulario ['seg']
        const des=descripcion.value;
        const nom=nombre.value;
        const grup=musculo.value;
        let file =fileInput.files[0];       
        //upload({file:file})
        publish({ file,nom,grup,des });
      });

    //queryImages();
}
 main();