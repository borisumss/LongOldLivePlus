import {
    onGetTasks2

} from "./firebase.js";


const tasksContainer = document.getElementById("tasks-container");
const nombreRutina = document.getElementById("nombreRutina");
var rutina = limpiar(res) ;

function limpiar(palabra){
    var res2="";
    var pos2 = palabra.indexOf("%");
    for (var i = pos2 + 1; i < res.length; i++) {
            res2 += res[i];
          
    }
    return res2;
}

    window.addEventListener("DOMContentLoaded", async (e) => {

        onGetTasks2((querySnapshot) => {
            tasksContainer.innerHTML="";
            nombreRutina.innerHTML=rutina;
    
            querySnapshot.forEach((doc) => {
                if (doc.id == rutina) {
                    const task = doc.data();
    
                    let claves = Object.keys(task);
    
                    for (let i = 0; i < claves.length; i++) {
                        var titulo = claves[i];
                        var nombreEjer = task[titulo].NombreEjercicio;
                        var timeMin = task[titulo].MinutosEjercicio;
                        var timeSeg = task[titulo].SegundosEjercicio;
                        var timeTotal= timeMin +":"+ timeSeg;
                        tasksContainer.innerHTML += `
    
                          <div id="nombres">                         
                            <h1 id="ejer">${nombreEjer}</h1>
                            <h2 id="time">Tiempo: ${timeTotal}</h2>
                          </div>
                        
                     
                    `;
                    }
                    return true;
                }
            }
    
            );
    
        });
    });

(function () {
    "use strict";

    /**
     * Activa menu en header cuando es movil responsive
     */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    /**
     * Event listener para menu en header movil responsive
     */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    /**
     * Easy on scroll event listener menu responsive
     */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
        let position = window.scrollY + 200
        navbarlinks.forEach(navbarlink => {
            if (!navbarlink.hash) return
            let section = select(navbarlink.hash)
            if (!section) return
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active')
            } else {
                navbarlink.classList.remove('active')
            }
        })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)

    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
        let header = select('#header')
        let offset = header.offsetHeight

        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos - offset,
            behavior: 'smooth'
        })
    }

    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
    let selectHeader = select('#header')
    if (selectHeader) {
        const headerScrolled = () => {
            if (window.scrollY > 100) {
                selectHeader.classList.add('header-scrolled')
            } else {
                selectHeader.classList.remove('header-scrolled')
            }
        }
        window.addEventListener('load', headerScrolled)
        onscroll(document, headerScrolled)
    }


    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function (e) {
        select('#navbar').classList.toggle('navbar-mobile')
        this.classList.toggle('bi-list')
        this.classList.toggle('bi-x')
    })

    /**
     * Mobile nav dropdowns activate
     */
    on('click', '.navbar .dropdown > a', function (e) {
        if (select('#navbar').classList.contains('navbar-mobile')) {
            e.preventDefault()
            this.nextElementSibling.classList.toggle('dropdown-active')
        }
    }, true)

    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on('click', '.scrollto', function (e) {
        if (select(this.hash)) {
            e.preventDefault()

            let navbar = select('#navbar')
            if (navbar.classList.contains('navbar-mobile')) {
                navbar.classList.remove('navbar-mobile')
                let navbarToggle = select('.mobile-nav-toggle')
                navbarToggle.classList.toggle('bi-list')
                navbarToggle.classList.toggle('bi-x')
            }
            scrollto(this.hash)
        }
    }, true)

    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash)
            }
        }
    });


})()