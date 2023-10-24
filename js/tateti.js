const juegoTresEnLinea = (function () {
    // Caracteres para el tablero
    const x = "✖";
    const o = "〇";
  
    // Elementos de la página
    const cuadrados = document.querySelectorAll(".cuadrado");
    const modal = document.querySelector("dialog");
    const textoModal = modal.querySelector("h2");
    let estadoJuego = "P1"; // P1 (Usuario) | P2 (Computadora) | PAUSA
    let puntajeJugador1 = 0;
    let puntajeJugador2 = 0;
  
    // Elementos de puntaje
    const puntajeElement1 = document.getElementById("puntaje-jugador1");
    const puntajeElement2 = document.getElementById("puntaje-jugador2");
  
    // Función para actualizar el indicador de turno y ficha
    function actualizarIndicador() {
      const jugadorActualElement = document.getElementById("jugador-actual");
      const fichaActualElement = document.getElementById("ficha-actual");
  
      if (estadoJuego === "P1") {
        jugadorActualElement.textContent = "Jugador 1";
        fichaActualElement.textContent = x;
      } else {
        jugadorActualElement.textContent = "Computadora";
        fichaActualElement.textContent = o;
      }
    }
  
    cuadrados.forEach((cuadrado, posicion) => {
      cuadrado.addEventListener("click", () => {
        if (estadoJuego === "PAUSA" || estadoJuego === "P2") return;
        if (cuadrado.textContent !== "") return;
        cuadrado.textContent = x;
        const posicionGanadora = revisarSiHayGanador();
  
        if (typeof posicionGanadora === "object") {
          ganar(posicionGanadora, "P1");
          return;
        }
  
        if (posicionGanadora === "empate") {
          mostrarModal("Empate");
        } else {
          // Cambiar al siguiente jugador solo si no hay empate ni ganador
          estadoJuego = "P2";
          actualizarIndicador(); // Actualizar el indicador de turno y ficha
          // Llamar a la función que permite a la computadora jugar
          jugarComputadora();
        }
      });
    });
  
    modal.querySelector("button").addEventListener("click", reiniciarJuego);
  
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
  
    function ganar(posicionesGanadoras, jugador) {
      posicionesGanadoras.forEach((posicion) => cuadrados[posicion].classList.toggle("ganador", true));
  
      if (jugador === "P1") {
        puntajeJugador1 += 3;
        puntajeElement1.textContent = `Puntaje Jugador 1: ${puntajeJugador1}`;
        mostrarModal("Gano el jugador 1");
      } else {
        puntajeJugador2 += 3;
        puntajeElement2.textContent = `Puntaje Computadora: ${puntajeJugador2}`;
        mostrarModal("Gano la computadora");
      }
    }
  
    function mostrarModal(texto) {
      textoModal.innerText = texto;
      modal.showModal();
      estadoJuego = "PAUSA";
    }
  
    function reiniciarJuego() {
      cuadrados.forEach((cuadrado) => {
        cuadrado.textContent = "";
        cuadrado.classList.toggle("ganador", false);
      });
      modal.close();
      estadoJuego = "P1";
      actualizarIndicador(); // Restablecer el indicador de turno y ficha
    }
  
    function jugarComputadora() {
      if (estadoJuego !== "P2") return;
  
      // Simulamos un retraso para que parezca que la computadora está pensando
      setTimeout(() => {
        const casillasVacias = Array.from(cuadrados).filter((cuadrado) => cuadrado.textContent === "");
        if (casillasVacias.length > 0) {
          const indiceAleatorio = Math.floor(Math.random() * casillasVacias.length);
          const casillaAleatoria = casillasVacias[indiceAleatorio];
          casillaAleatoria.textContent = o;
  
          const posicionGanadora = revisarSiHayGanador();
          if (typeof posicionGanadora === "object") {
            ganar(posicionGanadora, "P2");
            return;
          }
  
          if (posicionGanadora === "empate") {
            mostrarModal("Empate");
          } else {
            estadoJuego = "P1";
            actualizarIndicador(); // Actualizar el indicador de turno y ficha
          }
        }
      }, 1500); // Retraso de 1.5 segundos (1500 milisegundos)
    }
  
    // Llamamos a la función para iniciar el juego
    actualizarIndicador();
  
    // Devuelve un objeto que expone solo las funciones y variables necesarias
    return {
      reiniciarJuego: reiniciarJuego,
    };
  })();
  document.addEventListener("DOMContentLoaded", function() {
    const pantallaInicial = document.getElementById("pantalla-inicial");
    const botonComenzar = document.getElementById("comenzar");
    const principaljuego = document.getElementById("principaljuego");

    botonComenzar.addEventListener("click", function() {
        pantallaInicial.style.display = "none"; // Oculta la pantalla inicial al presionar el botón "Comenzar Juego"
        principaljuego.style.display = "block"; // Muestra el contenedor del juego al presionar el botón "Comenzar Juego"
        startGame(); // Inicia el juego al presionar el botón "Comenzar Juego"
    });
});