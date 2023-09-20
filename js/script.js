document.addEventListener('DOMContentLoaded', function () {
    const contenido = document.getElementById('contenido');
    const aside = document.querySelector('aside');
    let contenidoContacto = null;
    let contenidoAcercaDe = null;

    function cargarContenidoPrincipal() {
        aside.style.display = 'block';
        contenido.innerHTML = `
        <h2 class="inicio">JUEGOS</h2>
            
            <div class="juego-buttons">
                <button class="juego-button" data-juego="tateti">Tateti</button>
                <button class="juego-button" data-juego="ahorcado">Ahorcado</button>
            </div>
        `;
        // Agregar eventos de clic a los botones
        const botonesJuego = document.querySelectorAll('.juego-button');
        botonesJuego.forEach((boton) => {
            boton.addEventListener('click', (event) => {
                const juego = boton.getAttribute('data-juego');
                cargarJuego(juego);
            });
        });
    }

    function cargarContenidoContacto() {
        aside.style.display = 'none';
        if (!contenidoContacto) {
            contenidoContacto = `
                <h2>Contacto</h2>
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
        contenido.innerHTML = contenidoContacto;
    }

    function cargarContenidoAcercaDe() {
        aside.style.display = 'none';
        if (!contenidoAcercaDe) {
            contenidoAcercaDe = `
                <h2>Acerca de</h2>
                <p>Esta página web trata sobre...</p>
            `;
        }
        contenido.innerHTML = contenidoAcercaDe;
    }

    const enlaceContacto = document.querySelector('nav a[href="#contacto"]');
    enlaceContacto.addEventListener('click', (event) => {
        event.preventDefault();
        cargarContenidoContacto();
    });

    const enlaceAcercaDe = document.querySelector('nav a[href="#acercade"]');
    enlaceAcercaDe.addEventListener('click', (event) => {
        event.preventDefault();
        cargarContenidoAcercaDe();
    });

    const enlaceInicio = document.querySelector('nav a[href="#inicio"]');
    enlaceInicio.addEventListener('click', (event) => {
        event.preventDefault();
        cargarContenidoPrincipal();
    });

    cargarContenidoPrincipal();
});
