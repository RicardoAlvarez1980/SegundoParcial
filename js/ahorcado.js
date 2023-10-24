// Variables
const words = ["html", "css", "web", "programacion", "javascript"];
let word = "";
let guessedLetters = [];
let attempts = 6;
let hangmanStep = 0;
let puntajeAcumulado = 0;

// Iniciar juego al cargar la ventana
window.onload = startGame;

// Seleccionar una palabra aleatoria
function selectRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

// Iniciar el juego
function startGame() {
    word = selectRandomWord();
    guessedLetters = [];
    attempts = 6;
    hangmanStep = 0;
    puntajeAcumulado = 0;
    updateUI();
    enableKeyboard();
}

// Actualizar la interfaz de usuario
function updateUI() {
    updateWordContainer();
    updateGuessesContainer();
    updateHangmanImage();
    updateKeyboard();
    updatePuntajeAcumulado();
}

// Actualizar el contenedor de palabras
function updateWordContainer() {
    const wordContainer = document.getElementById("word-container");
    let displayWord = "Palabra a adivinar: ";
    for (const letter of word) {
        if (guessedLetters.includes(letter.toLowerCase()) || !letter.match(/[a-zA-Z]/)) {
            displayWord += letter;
        } else {
            displayWord += "_";
        }
    }
    wordContainer.textContent = displayWord;
}

// Actualizar el contenedor de letras adivinadas
function updateGuessesContainer() {
    const guessesContainer = document.getElementById("guesses");
    guessesContainer.textContent = "Letras adivinadas: " + guessedLetters.join(", ");
}

// Actualizar la imagen del ahorcado
function updateHangmanImage() {
    const hangmanImg = document.getElementById("hangman");
    hangmanImg.src = "../../Assets/ahorcado/hangman" + hangmanStep + ".png";
}

// Actualizar el teclado
function updateKeyboard() {
    const keyboardContainer = document.getElementById("keyboard");
    keyboardContainer.innerHTML = "";
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const button = document.createElement("button");
        button.textContent = letter;
        button.addEventListener("click", () => makeGuess(letter));
        if (guessedLetters.includes(letter.toLowerCase())) {
            button.disabled = true;
        }
        keyboardContainer.appendChild(button);
    }
}

// Actualizar el puntaje acumulado
function updatePuntajeAcumulado() {
    const puntajeAcumuladoElement = document.getElementById("puntaje-container");
    puntajeAcumuladoElement.textContent = "Puntaje acumulado: " + puntajeAcumulado;
}

// Realizar una suposición
function makeGuess(letter) {
    if (!guessedLetters.includes(letter.toLowerCase())) {
        guessedLetters.push(letter.toLowerCase());

        if (!word.toLowerCase().includes(letter.toLowerCase())) {
            attempts--;
            hangmanStep++;
        } else {
            puntajeAcumulado += 10;
        }

        updateUI();
        checkGameOver();
    }

    if (getDisplayedWord().toLowerCase() === word.toLowerCase()) {
        disableKeyboard();
    }
}

// Verificar si el juego ha terminado
function checkGameOver() {
    if (attempts === 0) {
        const lossMessageText = `¡Perdiste! La palabra era '${word}'.`.toUpperCase();
        mostrarModal(lossMessageText, true, false);
        disableKeyboard();
    } else if (getDisplayedWord().toLowerCase() === word.toLowerCase()) {
        const victoryMessageText = `¡Ganaste! Adivinaste la palabra: ${word}.`.toUpperCase();
        mostrarModal(victoryMessageText, true, true);
        disableKeyboard();
    }
}

// Obtener la palabra mostrada
function getDisplayedWord() {
    let displayedWord = "";
    for (const letter of word) {
        if (guessedLetters.includes(letter.toLowerCase()) || !letter.match(/[a-zA-Z]/)) {
            displayedWord += letter;
        } else {
            displayedWord += "_";
        }
    }
    return displayedWord;
}

// Mostrar mensaje de victoria o pérdida
function mostrarModal(texto, mostrarBotonReinicio, esVictoria) {
    const messageElement = esVictoria ? document.getElementById("victory-message") : document.getElementById("loss-message");
    const messageText = esVictoria ? document.getElementById("victory-text") : document.getElementById("loss-text");
    const restartButton = document.getElementById("restart-button");

    messageText.textContent = texto;
    messageElement.style.display = "block";

    if (mostrarBotonReinicio) {
        restartButton.style.display = "block";
        restartButton.addEventListener("click", restartGame);
    } else {
        restartButton.style.display = "none";
    }
}

// Deshabilitar el teclado
function disableKeyboard() {
    const keyboardButtons = document.querySelectorAll("#keyboard button");
    keyboardButtons.forEach((button) => (button.disabled = true));
}

// Habilitar el teclado
function enableKeyboard() {
    const keyboardButtons = document.querySelectorAll("#keyboard button");
    keyboardButtons.forEach((button) => (button.disabled = false));
}

// Reiniciar el juego
function restartGame() {
    startGame();
    hideMessages();
    enableKeyboard();
}

// Ocultar mensajes
function hideMessages() {
    const victoryMessage = document.getElementById("victory-message");
    const lossMessage = document.getElementById("loss-message");

    victoryMessage.style.display = "none";
    lossMessage.style.display = "none";
}
document.addEventListener("DOMContentLoaded", function() {
    const pantallaInicial = document.getElementById("pantalla-inicial");
    const botonComenzar = document.getElementById("comenzar");
    const gameContainer = document.getElementById("game-container");

    botonComenzar.addEventListener("click", function() {
        pantallaInicial.style.display = "none"; // Oculta la pantalla inicial al presionar el botón "Comenzar Juego"
        gameContainer.style.display = "block"; // Muestra el contenedor del juego al presionar el botón "Comenzar Juego"
        startGame(); // Inicia el juego al presionar el botón "Comenzar Juego"
    });
});