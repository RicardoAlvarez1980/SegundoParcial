// Función para mostrar contenido
function showContent() {
    const content = document.querySelector('main');
    content.classList.remove('hidden');
}

// Función para ocultar contenido
function hideContent() {
    const content = document.querySelector('main');
    content.classList.add('hidden');
}

// Mostrar contenido por defecto
showContent();

// Evento para mostrar/ocultar contenido al hacer clic en el encabezado
const header = document.querySelector('header');
header.addEventListener('click', function () {
    const content = document.querySelector('main');
    if (content.classList.contains('hidden')) {
        showContent();
    } else {
        hideContent();
    }
});
