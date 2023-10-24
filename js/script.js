document.addEventListener("DOMContentLoaded", function () {
        var inicio = document.querySelector('a[href="index.html"]');
        var quienesSomos = document.querySelector('a[href="#quiensomos"]');
        var contacto = document.querySelector('a[href="#contacto"]');
        var divQuienesSomos = document.querySelector('.quiensomos');
        var divContacto = document.querySelector('.contacto');
        var sectionHero = document.querySelector('.hero');
        var sectionContenedorJuegos = document.querySelector('.contenedorjuegos');

        inicio.addEventListener('click', function () {
            divQuienesSomos.style.display = 'none';
            divContacto.style.display = 'none';
            sectionHero.style.display = 'block';
            sectionContenedorJuegos.style.display = 'block';
        });

        quienesSomos.addEventListener('click', function () {
            divQuienesSomos.style.display = 'block';
            divContacto.style.display = 'none';
            sectionHero.style.display = 'none';
            sectionContenedorJuegos.style.display = 'none';
        });

        contacto.addEventListener('click', function () {
            divQuienesSomos.style.display = 'none';
            divContacto.style.display = 'block';
            sectionHero.style.display = 'none';
            sectionContenedorJuegos.style.display = 'none';
        });
    });