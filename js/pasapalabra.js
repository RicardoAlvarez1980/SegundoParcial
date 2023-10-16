//total preguntas del juego
const TOTAL_PREGUNTAS = 26;
//tiempo del juego
const TIEMPO_DEL_JUEGO = 180;
//estructura para almacenar las preguntas
const bd_juego = [
  {
      id:'A',
      pregunta:"Empresa reconocida que se dedica a los servidores",
      respuesta:"amazon"
  },
  {
    id:'B',
    pregunta:"Término en ingles que hace referencia a una copia de seguridad",
    respuesta:"backup"
  },
  {
    id:'C',
    pregunta:"Nombre de la memoria que almacena temporalmente los datos de la computadora",
    respuesta:"cache"
  },
  {
    id:'D',
    pregunta:"Archivo que controla los periféricos que se conectan a la computadora",
    respuesta:"driver"
  },
  {
    id:'E',
    pregunta:"Mezclar los datos para protegerlos como medida de seguridad, es decir, convertir texto normal a texto cifrado",
    respuesta:"encriptar"
  },
  {
    id:'F',
    pregunta:"Famosa red social creada por Mark Zuckerberg",
    respuesta:"facebook"
  },
  {
    id:'G',
    pregunta:"Lenguaje de programación creado por Google",
    respuesta:"go"
  },
  {
    id:'H',
    pregunta:"lenguaje utilizado para la estructura a las páginas web",
    respuesta:"html"
  },
  {
    id:'I',
    pregunta:"Aspecto que presentan los programas tras su ejecución mediante el cual ejercemos la comunicación con éstos",
    respuesta:"interfaz"
  },
  {
    id:'J',
    pregunta:"Lenguaje de programación con el cual se diseño el sistema operativo Android",
    respuesta:"java"
  },
  {
    id:'K',
    pregunta:"Lenguaje de programación de código abierto creado por JetBrains para realizar aplicaciones web",
    respuesta:"kotlin"
  },
  {
    id:'L',
    pregunta:"Sistema operativo de código abierto que se utiliza en varios dispositivos, como celulares y sistemas embebidos",
    respuesta:"linux"
  },
  {
    id:'M',
    pregunta:"Proceso de modificar un programa después de que haya sido liberado, con el fin de solucionar errores, agregar características o realizar mejoras",
    respuesta:"mantenimiento"
  },
  {
    id:'N',
    pregunta:"Coloquialmente, un software utilizado para acceder a páginas web en internet.",
    respuesta:"navegador"
  },
  {
    id:'O',
    pregunta:"Conectado a la red o disponible a través de internet.",
    respuesta:"online"
  },
  {
    id:'P',
    pregunta:"Un lenguaje de programación ampliamente utilizado para el desarrollo web.",
    respuesta:"php"
  },
  {
    id:'Q',
    pregunta:"Un diseño de teclado estándar utilizado en la mayoría de los teclados de computadora.",
    respuesta:"qwerty"
  },
  {
    id:'R',
    pregunta:"Un lugar donde se almacenan y gestionan archivos o código fuente, como en un sistema de control de versiones.",
    respuesta:"repositorio"
  },
  {
    id:'S',
    pregunta:"Lenguaje de programación con el cual se diseño el sistema operativo Android",
    respuesta:"java"
  },
  {
    id:'T',
    pregunta:"Lenguaje de programación con el cual se diseño el sistema operativo Android",
    respuesta:"java"
  },
  {
    id:'U',
    pregunta:"Lenguaje de programación con el cual se diseño el sistema operativo Android",
    respuesta:"java"
  },
  {
    id:'V',
    pregunta:"Lenguaje de programación con el cual se diseño el sistema operativo Android",
    respuesta:"java"
  },
  {
    id:'W',
    pregunta:"Lenguaje de programación con el cual se diseño el sistema operativo Android",
    respuesta:"java"
  },
  {
    id:'X',
    pregunta:"Lenguaje de programación con el cual se diseño el sistema operativo Android",
    respuesta:"java"
  },
  {
    id:'Y',
    pregunta:"Lenguaje de programación con el cual se diseño el sistema operativo Android",
    respuesta:"java"
  },
  {
    id:'Z',
    pregunta:"Lenguaje de programación con el cual se diseño el sistema operativo Android",
    respuesta:"java"
  },
]

//preguntas que ya han sido contestadas. Si estan en 0 no han sido contestadas
var estadoPreguntas = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
var cantidadAcertadas = 0;

//variable que mantiene el num de pregunta acual
var numPreguntaActual = -1;

// Obtener el elemento del cronómetro
const timer = document.getElementById("tiempo");
// Establecer el tiempo inicial en 60 segundos
let timeLeft = TIEMPO_DEL_JUEGO;
var countdown;

//boton comenzar
var comenzar = document.getElementById("comenzar");
comenzar.addEventListener("click", function(event) {
  document.getElementById("pantalla-inicial").style.display = "none";
  document.getElementById("pantalla-juego").style.display = "block";
  largarTiempo();
  cargarPregunta();
});

const container = document.querySelector(".container");
const marginBetweenCircles = 40; // Ajusta este valor según tus necesidades
for (let i = 1; i <= TOTAL_PREGUNTAS; i++) {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  circle.textContent = String.fromCharCode(i + 96);
  circle.id = String.fromCharCode(i + 96).toUpperCase();
  container.appendChild(circle);

  const angle = ((i - 1) / TOTAL_PREGUNTAS) * Math.PI * 2 - (Math.PI / 2);
  const radius = 120; // Ajusta el radio según tus necesidades
  const x = Math.round(95 + radius * Math.cos(angle));
  const y = Math.round(95 + radius * Math.sin(angle));
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;

  // Ajusta el margen entre los círculos
  const angleIncrement = (Math.PI * 2) / TOTAL_PREGUNTAS;
  const xMargin = Math.round(marginBetweenCircles * Math.cos(angle + angleIncrement));
  const yMargin = Math.round(marginBetweenCircles * Math.sin(angle + angleIncrement));
  circle.style.margin = `${yMargin}px ${xMargin}px`;
}


//Función que carga la pregunta
function cargarPregunta(){
  numPreguntaActual++;
  //controlo si he llegado al final de las preguntas, para comenzar de nuevo
  if(numPreguntaActual>=TOTAL_PREGUNTAS){
    numPreguntaActual=0;
  }

  if(estadoPreguntas.indexOf(0)>=0){ //Controlo que todavía hallan preguntas por contestar
    while(estadoPreguntas[numPreguntaActual]==1){
      numPreguntaActual++;
      if(numPreguntaActual>=TOTAL_PREGUNTAS){
        numPreguntaActual=0;
      }
    }
  
    document.getElementById("letra-pregunta").textContent = bd_juego[numPreguntaActual].id
    document.getElementById("pregunta").textContent = bd_juego[numPreguntaActual].pregunta
    var letra =  bd_juego[numPreguntaActual].id;
    document.getElementById(letra).classList.add("pregunta-actual");
  }
  else{
    clearInterval(countdown);
    mostrarPantallaFinal();
  }

}

//detecto cada vez que hay un cambio de tecla en el input
var respuesta = document.getElementById("respuesta");
respuesta.addEventListener("keyup", function(event) {
  //detecto si la tecla presionada es ENTER
  if (event.keyCode === 13) {
    if(respuesta.value==""){
      alert("Debe ingresar un valor!!");
      return;
    }
    //obtengo la respuesta ingresada
    var txtRespuesta = respuesta.value;
    controlarRespuesta(txtRespuesta.toLowerCase());
  }
});
//detecto cada vez que se hace clic en el botón de responder
var botonResponder = document.getElementById("responder");
botonResponder.addEventListener("click", function(event) {
  if(respuesta.value==""){
    alert("Debe ingresar un valor!!");
    return;
  }
  var txtRespuesta = respuesta.value;
  controlarRespuesta(txtRespuesta.toLowerCase());
});

//Función que controla la respuesta
function controlarRespuesta(txtRespuesta){
  if(txtRespuesta == bd_juego[numPreguntaActual].respuesta){
    cantidadAcertadas++;

    // Reproducir sonido de respuesta correcta
    var audioCorrecto = document.getElementById("audioCorrecto");
    audioCorrecto.play()

    //actualizo el estado de las pregunta actual a 1, indicando que ya esta respondida
    estadoPreguntas[numPreguntaActual] = 1;
    var letra =  bd_juego[numPreguntaActual].id;
    document.getElementById(letra).classList.remove("pregunta-actual");
    document.getElementById(letra).classList.add("bien-respondida");

  }else{
    //alert("respuesta incorrecta")
        // Reproducir sonido de respuesta incorrecta
        var audioIncorrecto = document.getElementById("audioIncorrecto");
        audioIncorrecto.play()
    //actualizo el estado de las pregunta actual a 1, indicando que ya esta respondida
    estadoPreguntas[numPreguntaActual] = 1;
    var letra =  bd_juego[numPreguntaActual].id;
    //quito l clase del estilo de pregunta actual
    document.getElementById(letra).classList.remove("pregunta-actual");
    //agrego la clase del estilo de pregunta mal respondida
    document.getElementById(letra).classList.add("mal-respondida");

  }
  respuesta.value="";
  cargarPregunta();
}


//botón para pasar de pregunta sin contestar
var pasar = document.getElementById("pasar");
pasar.addEventListener("click", function(event) {
  var letra =  bd_juego[numPreguntaActual].id;

  // Agregar la clase 'pasada' al círculo correspondiente
  document.getElementById(letra).classList.add("pasada");

  cargarPregunta();
});


// Crear la función que se encargará de actualizar el cronómetro cada segundo
function largarTiempo(){
  countdown = setInterval(() => {
    // Restar un segundo al tiempo restante
    timeLeft--;
  
    // Actualizar el texto del cronómetro con el tiempo restante
    timer.innerText = timeLeft;
  
    // Si el tiempo llega a 0, detener el cronómetro
    if (timeLeft < 0) {
      clearInterval(countdown);
      mostrarPantallaFinal();
    }
  }, 1000);
}

//muestro la pantalla final
function mostrarPantallaFinal(){
  const porcentajeAcierto = (cantidadAcertadas / TOTAL_PREGUNTAS) * 100;
  document.getElementById("acertadas").textContent = cantidadAcertadas;
  document.getElementById("score").textContent = porcentajeAcierto.toFixed(2) + "% de acierto";
  document.getElementById("pantalla-juego").style.display =  "none";
  document.getElementById("pantalla-final").style.display =  "block";
}

//boton para recomenzar el juego
var recomenzar = document.getElementById("recomenzar");
recomenzar.addEventListener("click", function(event) {
  numPreguntaActual = -1;
  timeLeft = TIEMPO_DEL_JUEGO;
  timer.innerText = timeLeft;
  cantidadAcertadas = 0;
  estadoPreguntas = new Array(TOTAL_PREGUNTAS).fill(0); // Reiniciar el estado de las preguntas

  // Limpia las clases de los círculos
  var circulos = document.getElementsByClassName("circle");
  for (var i = 0; i < circulos.length; i++) {
    circulos[i].classList.remove("bien-respondida");
    circulos[i].classList.remove("mal-respondida");
    circulos[i].classList.remove("pregunta-actual");
    circulos[i].classList.remove("pasada");
  }

  document.getElementById("pantalla-final").style.display = "none";
  document.getElementById("pantalla-juego").style.display = "block";
  largarTiempo();
  cargarPregunta();
});