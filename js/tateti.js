// Caracteres para el tablero
const x = "✖";
const o = "〇";

// Elementos de la página
const cuadrados = document.querySelectorAll(".cuadrado");
const modal = document.querySelector("dialog");
const textoModal = modal.querySelector("h2");
let estadoJuego = "P1"; // P1 | P2 | PAUSA
let puntajeJugador1 = 0;
let puntajeJugador2 = 0;

// Elementos de puntaje
const puntajeElement1 = document.getElementById("puntaje-jugador1");
const puntajeElement2 = document.getElementById("puntaje-jugador2");

cuadrados.forEach((cuadrado, posicion) => {
    cuadrado.addEventListener("click", () => {
        if (estadoJuego === "PAUSA") return;
        if (cuadrado.textContent !== "") return;
        cuadrado.textContent = estadoJuego === "P1" ? x : o;
        estadoJuego = estadoJuego === "P1" ? "P2" : "P1";
        const posicionGanadora = revisarSiHayGanador();

        if (typeof posicionGanadora === "object") {
            ganar(posicionGanadora);
            return;
        }

        if (posicionGanadora === "empate") {
            mostrarModal("Empate");
        }
    });
});

modal.querySelector("button").addEventListener("click", () => {
    cuadrados.forEach((cuadrado) => {
        cuadrado.textContent = "";
        cuadrado.classList.toggle("ganador", false);
    });
    modal.close();
    estadoJuego = "P1";
});

function revisarSiHayGanador() {
    const tablero = Array.from(cuadrados).map((cuadrado) => cuadrado.textContent);

    // Reviso filas
    for (let i = 0; i < 9; i += 3) {
        if (tablero[i] && tablero[i] === tablero[i + 1] && tablero[i] === tablero[i + 2]) {
            return [i, i + 1, i + 2];
        }
    }

    // Reviso columnas
    for (let i = 0; i < 3; i++) {
        if (tablero[i] && tablero[i] === tablero[i + 3] && tablero[i] === tablero[i + 6]) {
            return [i, i + 3, i + 6];
        }
    }

    // Reviso oblicuas
    if (tablero[0] && tablero[0] === tablero[4] && tablero[0] === tablero[8]) return [0, 4, 8];
    if (tablero[2] && tablero[2] === tablero[4] && tablero[2] === tablero[6]) return [2, 4, 6];

    // Reviso empate
    if (tablero.includes("")) return false;
    return "empate";
}

// Marco las posiciones ganadoras y muestro el modal de victoria
function ganar(posicionesGanadoras) {
    posicionesGanadoras.forEach((posicion) => cuadrados[posicion].classList.toggle("ganador", true));

    if (estadoJuego === "P1") {
        puntajeJugador1 += 3;
        puntajeElement1.textContent = `Puntaje Jugador 1: ${puntajeJugador1}`;
    } else {
        puntajeJugador2 += 3;
        puntajeElement2.textContent = `Puntaje Jugador 2: ${puntajeJugador2}`;
    }

    mostrarModal("Ganador jugador " + (estadoJuego === "P1" ? "1" : "2"));
}

function mostrarModal(texto) {
    textoModal.innerText = texto;
    modal.showModal();
    estadoJuego = "PAUSA";
}