const TOTAL_PREGUNTAS = 10;
const TIEMPO_DEL_JUEGO = 60;
const MAX_PASSES = 3;

const bd_juego = [
    { id: 'A', pregunta: "Empresa reconocida que se dedica a los servidores", respuesta: "amazon" },
    { id: 'B', pregunta: "Término en ingles que hace referencia a una copia de seguridad", respuesta: "backup" },
    { id: 'C', pregunta: "Nombre de la memoria que almacena temporalmente los datos de la computadora", respuesta: "cache" },
    { id: 'D', pregunta: "Archivo que controla los periféricos que se conectan a la computadora", respuesta: "driver" },
    { id: 'E', pregunta: "Mezclar los datos para protegerlos como medida de seguridad, es decir, convertir texto normal a texto cifrado", respuesta: "encriptar" },
    { id: 'F', pregunta: "Famosa red social creada por Mark Zuckerberg", respuesta: "facebook" },
    { id: 'G', pregunta: "Lenguaje de programación creado por Google", respuesta: "go" },
    { id: 'H', pregunta: "Lenguaje utilizado para la estructura a las páginas web", respuesta: "html" },
    { id: 'I', pregunta: "Aspecto que presentan los programas tras su ejecución mediante el cual ejercemos la comunicación con éstos", respuesta: "interfaz" },
    { id: 'J', pregunta: "Lenguaje de programación con el cual se diseñó el sistema operativo Android", respuesta: "java" }
];

var estadoPreguntas = Array(TOTAL_PREGUNTAS).fill(0);
var cantidadAcertadas = 0;
var numPreguntaActual = -1;
var timeLeft = TIEMPO_DEL_JUEGO;
var countdown;
var passesLeft = MAX_PASSES;

const timer = document.getElementById("tiempo");
const comenzar = document.getElementById("comenzar");
const respuesta = document.getElementById("respuesta");
const pasar = document.getElementById("pasar");
const silenciar = document.getElementById("silenciar");
const recomenzar = document.getElementById("recomenzar");
const audio = new Audio("Mild High Club - Homage.mp3");

audio.loop = true;
var isAudioPlaying = true;

comenzar.addEventListener("click", function(event) {
    document.getElementById("pantalla-inicial").style.display = "none";
    document.getElementById("pantalla-juego").style.display = "block";
    audio.play();
    largarTiempo();
    cargarPregunta();
});

silenciar.addEventListener("click", function(event) {
    var icon = silenciar.querySelector("i");
    if (isAudioPlaying) {
        audio.muted = true;
        icon.classList.remove("bx-volume-full");
        icon.classList.add("bx-volume-mute");
    } else {
        audio.muted = false;
        icon.classList.remove("bx-volume-mute");
        icon.classList.add("bx-volume-full");
    }
    isAudioPlaying = !isAudioPlaying;
});

const container = document.querySelector(".container");
for (let i = 1; i <= TOTAL_PREGUNTAS; i++) {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    circle.textContent = String.fromCharCode(i + 96);
    circle.id = String.fromCharCode(i + 96).toUpperCase();
    container.appendChild(circle);

    const angle = ((i - 1) / TOTAL_PREGUNTAS) * Math.PI * 2 - (Math.PI / 2);
    const x = Math.round(95 + 120 * Math.cos(angle));
    const y = Math.round(95 + 120 * Math.sin(angle));
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
}

function cargarPregunta() {
    numPreguntaActual++;
    if (numPreguntaActual >= TOTAL_PREGUNTAS) {
        numPreguntaActual = 0;
    }

    if (estadoPreguntas.indexOf(0) >= 0) {
        while (estadoPreguntas[numPreguntaActual] == 1) {
            numPreguntaActual++;
            if (numPreguntaActual >= TOTAL_PREGUNTAS) {
                numPreguntaActual = 0;
            }
        }

        document.getElementById("letra-pregunta").textContent = bd_juego[numPreguntaActual].id;
        document.getElementById("pregunta").textContent = bd_juego[numPreguntaActual].pregunta;
        var letra = bd_juego[numPreguntaActual].id;
        document.getElementById(letra).classList.add("pregunta-actual");
    } else {
        clearInterval(countdown);
        mostrarPantallaFinal();
    }
}

respuesta.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        if (respuesta.value == "") {
            alert("Debe ingresar un valor!!");
            return;
        }
        var txtRespuesta = respuesta.value.toLowerCase();
        controlarRespuesta(txtRespuesta);
    }
});

function controlarRespuesta(txtRespuesta) {
    var letra = bd_juego[numPreguntaActual].id;
    if (txtRespuesta == bd_juego[numPreguntaActual].respuesta) {
        cantidadAcertadas++;
        estadoPreguntas[numPreguntaActual] = 1;
        document.getElementById(letra).classList.remove("pregunta-actual");
        document.getElementById(letra).classList.add("bien-respondida");
    } else {
        estadoPreguntas[numPreguntaActual] = 1;
        document.getElementById(letra).classList.remove("pregunta-actual");
        document.getElementById(letra).classList.add("mal-respondida");
    }
    respuesta.value = "";
    cargarPregunta();
}

pasar.addEventListener("click", function(event) {
    var letra = bd_juego[numPreguntaActual].id;
    document.getElementById(letra).classList.remove("pregunta-actual");

    passesLeft--;
    if (passesLeft <= 0) {
        pasar.disabled = true;
        pasar.textContent = "BLOQUEADO";
    }
    cargarPregunta();
});

function largarTiempo() {
    countdown = setInterval(() => {
        timeLeft--;
        timer.innerText = timeLeft;
        if (timeLeft < 0) {
            clearInterval(countdown);
            mostrarPantallaFinal();
        }
    }, 1000);
}

function mostrarPantallaFinal() {
    document.getElementById("acertadas").textContent = cantidadAcertadas;
    document.getElementById("score").textContent = (cantidadAcertadas * 100) / TOTAL_PREGUNTAS + "% de acierto";
    document.getElementById("pantalla-juego").style.display = "none";
    document.getElementById("pantalla-final").style.display = "block";
}

recomenzar.addEventListener("click", function(event) {
    numPreguntaActual = -1;
    timeLeft = TIEMPO_DEL_JUEGO;
    timer.innerText = timeLeft;
    cantidadAcertadas = 0;
    estadoPreguntas = Array(TOTAL_PREGUNTAS).fill(0);
    passesLeft = MAX_PASSES;
    pasar.disabled = false;
    pasar.textContent = "Pasa Palabra";

    var circulos = document.getElementsByClassName("circle");
    for (let i = 0; i < circulos.length; i++) {
        circulos[i].classList.remove("bien-respondida");
        circulos[i].classList.remove("mal-respondida");
    }

    document.getElementById("pantalla-final").style.display = "none";
    document.getElementById("pantalla-juego").style.display = "block";
    largarTiempo();
    cargarPregunta();
});
