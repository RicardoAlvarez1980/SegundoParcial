const words = ["html", "css", "web", "programacion", "javascript"];
let word = "";
let guessedLetters = [];
let attempts = 6;
let hangmanStep = 0;
let puntajeAcumulado = 0;

function selectRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

function startGame() {
    word = selectRandomWord();
    guessedLetters = [];
    attempts = 6;
    hangmanStep = 0;
    puntajeAcumulado = 0; // Reiniciar el puntaje acumulado al iniciar el juego
    updateUI();
    enableKeyboard(); // Habilitar el teclado al iniciar el juego
}

function updateUI() {
    const wordContainer = document.getElementById("word-container");
    const guessesContainer = document.getElementById("guesses");
    const attemptsContainer = document.getElementById("attempts");
    const keyboardContainer = document.getElementById("keyboard");
    const hangmanImg = document.getElementById("hangman");
    const puntajeAcumuladoElement = document.getElementById("puntaje-container");
    puntajeAcumuladoElement.textContent = "Puntaje acumulado: " + puntajeAcumulado;

    let displayWord = "Palabra a adivinar: ";
    for (const letter of word) {
        if (guessedLetters.includes(letter.toLowerCase()) || !letter.match(/[a-zA-Z]/)) {
            displayWord += letter;
        } else {
            displayWord += "_";
        }
    }
    wordContainer.textContent = displayWord;

    guessesContainer.textContent = "Letras adivinadas: " + guessedLetters.join(", ");
    attemptsContainer.textContent = "Intentos restantes: " + attempts;
    hangmanImg.src = "../img/ahorcado/hangman" + hangmanStep + ".png";

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

    puntajeAcumuladoElement.textContent = "Puntaje acumulado: " + puntajeAcumulado;
}

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

function checkGameOver() {
    if (attempts === 0) {
        const lossMessageText = `¡Perdiste! La palabra era '${word}'.`.toUpperCase();
        mostrarModal(lossMessageText, true, false);
        disableKeyboard(); // Inhabilitar el teclado al perder
    } else if (getDisplayedWord().toLowerCase() === word.toLowerCase()) {
        const victoryMessageText = `¡Ganaste! Adivinaste la palabra: ${word}.`.toUpperCase();
        mostrarModal(victoryMessageText, true, true);
        disableKeyboard(); // Inhabilitar el teclado al ganar
    }
}

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

function disableKeyboard() {
    const keyboardButtons = document.querySelectorAll("#keyboard button");
    keyboardButtons.forEach((button) => (button.disabled = true));
}

function enableKeyboard() {
    const keyboardButtons = document.querySelectorAll("#keyboard button");
    keyboardButtons.forEach((button) => (button.disabled = false));
}

function restartGame() {
    startGame();
    hideMessages();
    enableKeyboard(); // Habilitar el teclado al reiniciar el juego
}

function hideMessages() {
    const victoryMessage = document.getElementById("victory-message");
    const lossMessage = document.getElementById("loss-message");

    victoryMessage.style.display = "none";
    lossMessage.style.display = "none";
}

window.onload = startGame;
