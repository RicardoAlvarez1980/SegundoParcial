document.addEventListener('DOMContentLoaded', function () {
    // Obtén la referencia al elemento de contenido y aside
    const contenido = document.getElementById('contenido');
    const aside = document.querySelector('aside');

    // Agrega un evento de clic al enlace de "Contacto" en la barra de navegación
    const enlaceContacto = document.querySelector('nav a[href="#contacto"]');
    enlaceContacto.addEventListener('click', (event) => {
        event.preventDefault();
        console.log("Evento de clic activado");
        // Oculta el aside
        aside.style.display = 'none';
        // Cambia el contenido de la sección al formulario de contacto
        contenido.innerHTML = `
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
        <!-- Botón de Enviar -->
        <input type="submit" value="Enviar">
        </form>`;
    });

    // Agrega un evento de clic al enlace de "Inicio" en la barra de navegación
    const enlaceInicio = document.querySelector('nav a[href="#inicio"]');
    enlaceInicio.addEventListener('click', (event) => {
        event.preventDefault();
        console.log("Evento de clic activado");
        // Muestra el aside nuevamente
        aside.style.display = 'block';
        // Cambia el contenido de la sección al contenido principal
        contenido.innerHTML = `
            <h2>Inicio</h2>
            <p>Este es el contenido principal.</p>
        `;
    });
});
