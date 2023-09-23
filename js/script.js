document.addEventListener('DOMContentLoaded', function () {
    const contenido = document.getElementById('contenido');
    const juegoContainer = document.getElementById('game-container');
    const inicioLink = document.querySelector('nav a[href="#inicio"]');
    const contactoLink = document.querySelector('nav a[href="#contacto"]');
    const acercaDeLink = document.querySelector('nav a[href="#acercade"]');

    function cargarContenidoPrincipal() {
        contenido.style.display = 'block';
        juegoContainer.style.display = 'none';
        contenido.innerHTML = `
            <h2 id="inicio">JUEGOS</h2>
            <div class="juego-buttons">
                <button class="juego-button" data-juego="tateti">Iniciar Tateti</button>
                <button class="juego-button" data-juego="ahorcado">Iniciar Ahorcado</button>
            </div>
        `;

        const botonesJuego = document.querySelectorAll('.juego-button');
        botonesJuego.forEach((boton) => {
            boton.addEventListener('click', (event) => {
                const juego = boton.getAttribute('data-juego');
                if (juego === 'tateti') {
                    // Abre una nueva ventana con Tateti.html
                    window.open('./juegos/tateti.html', '_blank');
                } else if (juego === 'ahorcado') {
                    // Abre una nueva ventana con Ahorcado.html
                    window.open('./juegos/ahorcado.html', '_blank');
                }
            });
        });
    }

    function cargarContenidoContacto() {
        contenido.style.display = 'block';
        juegoContainer.style.display = 'none';
        contenido.innerHTML = `
            <h2 id="contacto">Contacto</h2>
            <form>
                <div class="campo">
                    <label for="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" required>
                </div>
                <div class="campo">
                    <label for="apellido">Apellido:</label>
                    <input type="text" id="apellido" name="apellido" required>
                </div>
                <div class="campo">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="campo">
                    <label for="comentarios">Comentarios:</label>
                    <textarea id="comentarios" name="comentarios" rows="4" required></textarea>
                </div>
                <input type="submit" value="Enviar">
            </form>
        `;
    }

    function cargarContenidoAcercaDe() {
        contenido.style.display = 'block';
        juegoContainer.style.display = 'none';
        contenido.innerHTML = `
            <h2 id="acercade">Propósito de La Página</h2>
            <p>Página realizada como exámen para la materia Seminario de Programación.</p>
        `;
    }

    inicioLink.addEventListener('click', (event) => {
        event.preventDefault();
        cargarContenidoPrincipal();
    });

    contactoLink.addEventListener('click', (event) => {
        event.preventDefault();
        cargarContenidoContacto();
    });

    acercaDeLink.addEventListener('click', (event) => {
        event.preventDefault();
        cargarContenidoAcercaDe();
    });

    cargarContenidoPrincipal();
});
