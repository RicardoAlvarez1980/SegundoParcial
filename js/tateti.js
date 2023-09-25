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
          }
        }
      }, 1500); // Retraso de 1.5 segundos (1500 milisegundos)
    }
  
    // Devuelve un objeto que expone solo las funciones y variables necesarias
    return {
      reiniciarJuego: reiniciarJuego,
    };
  })();

  