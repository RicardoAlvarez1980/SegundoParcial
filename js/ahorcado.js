const words = ["html", "css", "web"];
let word = "";
let guessedLetters = [];
let attempts = 6;
let hangmanStep = 0;

// Función para seleccionar una palabra al azar
function selectRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

// Función para iniciar el juego
function startGame() {
    word = selectRandomWord();
    guessedLetters = [];
    attempts = 6;
    hangmanStep = 0;
    updateUI();
}

// Función para actualizar la interfaz de usuario
function updateUI() {
    const wordContainer = document.getElementById("word-container");
    const guessesContainer = document.getElementById("guesses");
    const attemptsContainer = document.getElementById("attempts");
    const keyboardContainer = document.getElementById("keyboard");
    const hangmanImg = document.getElementById("hangman");

    // Actualizar la palabra oculta
    let displayWord = "Palabra a adivinar: ";
    for (const letter of word) {
        if (guessedLetters.includes(letter.toLowerCase()) || !letter.match(/[a-zA-Z]/)) {
            displayWord += letter;
        } else {
            displayWord += "_";
        }
    }
    wordContainer.textContent = displayWord;

    // Actualizar las letras adivinadas
    guessesContainer.textContent = "Letras adivinadas: " + guessedLetters.join(", ");

    // Actualizar los intentos restantes
    attemptsContainer.textContent = "Intentos restantes: " + attempts;

    // Actualizar la imagen del ahorcado
    hangmanImg.src = "../img/ahorcado/hangman" + hangmanStep + ".png";

    // Crear el teclado virtual
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

// Función para hacer una suposición
function makeGuess(letter) {
    if (!guessedLetters.includes(letter.toLowerCase())) {
        guessedLetters.push(letter.toLowerCase());

        if (!word.toLowerCase().includes(letter.toLowerCase())) {
            attempts--;
            hangmanStep++;
        }

        updateUI();
        checkGameOver();
    }

    if (getDisplayedWord().toLowerCase() === word.toLowerCase()) {
        disableKeyboard();
    }
}

// Función para verificar si el juego ha terminado
function checkGameOver() {
    if (attempts === 0) {
        const lossMessageText = `¡Perdiste! La palabra era '${word}'.`;
        mostrarModal(lossMessageText, true, false);
        // startGame(); // Comenta o elimina esta línea para que no se reinicie automáticamente
    } else if (getDisplayedWord().toLowerCase() === word.toLowerCase()) {
        const victoryMessageText = `¡Ganaste! Adivinaste la palabra: ${word}.`;
        mostrarModal(victoryMessageText, true, true);
    }
}

// Función para obtener la palabra oculta con las letras adivinadas
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

// Función para mostrar el mensaje de victoria y el botón de reinicio
function mostrarModal(texto, mostrarBotonReinicio, esVictoria) {
    const messageElement = esVictoria ? document.getElementById("victory-message") : document.getElementById("loss-message");
    const messageText = esVictoria ? document.getElementById("victory-text") : document.getElementById("loss-text");
    const restartButton = document.getElementById("restart-button");

    messageText.textContent = texto;
    messageElement.style.display = "block";

    if (mostrarBotonReinicio) {
        restartButton.style.display = "block";
        restartButton.addEventListener("click", restartGame); // Agregamos el evento de reinicio aquí
    } else {
        restartButton.style.display = "none";
    }

    disableKeyboard(); // Llama a la función para deshabilitar el teclado y cambiar el color de fondo de los botones a gris
}

// Función para deshabilitar el teclado y hacer que los botones queden en gris
function disableKeyboard() {
    const keyboardButtons = document.querySelectorAll("#keyboard button");
    keyboardButtons.forEach((button) => {
        button.disabled = true;
        button.style.backgroundColor = "#cccccc"; // Cambia el color de fondo a gris
    });
}

// Función para reiniciar el juego
function restartGame() {
  startGame();
  hideMessages(); // Agregamos esta línea para ocultar los mensajes al reiniciar
}

// Función para ocultar los mensajes de victoria y pérdida
function hideMessages() {
  const victoryMessage = document.getElementById("victory-message");
  const lossMessage = document.getElementById("loss-message");
  
  victoryMessage.style.display = "none";
  lossMessage.style.display = "none";
}

// Iniciar el juego cuando se carga la página
window.onload = startGame;