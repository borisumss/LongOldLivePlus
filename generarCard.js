firebase.initializeApp({
  apiKey: "AIzaSyD85qYxh4zulnhtWy2jSYrnov5i2oRQcY8",
  authDomain: "database-6e811.firebaseapp.com",
  projectId: "database-6e811",
  storageBucket: "database-6e811.appspot.com",
  messagingSenderId: "975657922755",
  appId: "1:975657922755:web:b4a5655528e44aaadc7276"
});

var db = firebase.firestore();

var title = "";

function ver() {
   // body...
   db.collection("ejercicio").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        title = `${doc.data().nombre}`
        document.getElementById("contentPanel").innerHTML=title
        //console.log(`${doc.id} => ${doc.data()}`);
      });
   });
}


let num = 100;  /* select count -> es la cantidad de ejercicios registrados en firebase */
var addCols = function () {
    for (var i = 1; i <= num; i++) {
        var myPanel = $('<a href="#!" data-bs-toggle="modal" data-bs-target="#modal2"> <div type="button" class="card mb-3 mx-auto w-100mb-4 rounded" style="max-width: 540px;" href="#"> <div class="row g-0 justify-content-center align-items-center"><div class="col-md-4 "><img src="images/logo.jpg" class="img-fluid rounded-start" alt="..."style="max-width: 150px;max-height: 150px;"></div><div class="col-md-8"><div class="card-body"><h5 class="card-title">{title}</h5><p class="card-text">This is a wider card with supporting text below as a natural lead-in to additionalcontent. This content is a little bit longer.</p><p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p></div></div></div></div></a><div tabindex="-1" aria-labelledby="modal2" aria-hidden="true" class="modal fade" id="modal2"><div class="modal-dialog modal-lg modal-dialog-centered"><div class="modal-content"><div class="card mx-auto"><img src="images/logo.jpg" class="card-img-top mx-auto" style="max-width: 400px; max-width: 400px;" alt="..."><div class="card-body"><h5 class="card-title">Card title</h5><p class="card-text">Some quick example text to build on the card title and make up the bulk of the cards content</p><div class="container text-center">      <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cerrar</button></div></div></div></div></div></div>');
        myPanel.appendTo('#contentPanel');
    }
};