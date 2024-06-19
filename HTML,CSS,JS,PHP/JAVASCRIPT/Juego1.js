let currentMove = 0;
let currentAttempts = 0;
let iconos = [];
let selecciones = [];
let canSelect = true; // Variable para controlar la selección de tarjetas

function cargarIconos() {
    iconos = [
        '<i class="fas fa-star"></i>',
        '<i class="far fa-star"></i>',
        '<i class="fas fa-star-of-life"></i>',
        '<i class="fas fa-star-and-crescent"></i>',
        '<i class="fab fa-old-republic"></i>',
        '<i class="fab fa-galactic-republic"></i>',
        '<i class="fas fa-sun"></i>',
        '<i class="fas fa-stroopwafel"></i>',
        '<i class="fas fa-dice"></i>',
        '<i class="fas fa-chess-knight"></i>',
        '<i class="fas fa-chess"></i>',
        '<i class="fas fa-dice-d20"></i>',
    ];
}

function generarTablero() {
    cargarIconos();
    selecciones = [];
    currentMove = 0;
    currentAttempts = 0;
    document.getElementById("stats").textContent = `${currentAttempts} intentos fallidos`;

    let tablero = document.getElementById("tablero");
    let tarjetas = [];

    for (let i = 0; i < 24; i++) {
        tarjetas.push(`
        <div class="area-tarjeta" onclick="seleccionarTarjeta(${i})">
            <div class="tarjeta" id="tarjeta${i}">
                <div class="cara trasera" id="trasera${i}">
                    ${iconos[i % 12]}
                </div>
                <div class="cara superior">
                    <i class="far fa-question-circle"></i>
                </div>
            </div>
        </div>
        `);
    }

    tarjetas.sort(() => Math.random() - 0.5);
    tablero.innerHTML = tarjetas.join(" ");
}

function seleccionarTarjeta(i) {
    if (!canSelect) return; // Evitar selección durante el tiempo de espera

    let tarjeta = document.getElementById("tarjeta" + i);
    if (tarjeta.style.transform !== "rotateY(180deg)") {
        tarjeta.style.transform = "rotateY(180deg)";
        selecciones.push(i);
    }

    if (selecciones.length === 2) {
        verificarSeleccion();
    }
}

function verificarSeleccion() {
    canSelect = false; // Deshabilitar selección mientras se evalúa

    setTimeout(() => {
        let trasera1 = document.getElementById("trasera" + selecciones[0]);
        let trasera2 = document.getElementById("trasera" + selecciones[1]);

        if (trasera1.innerHTML !== trasera2.innerHTML) {
            let tarjeta1 = document.getElementById("tarjeta" + selecciones[0]);
            let tarjeta2 = document.getElementById("tarjeta" + selecciones[1]);
            tarjeta1.style.transform = "rotateY(0deg)";
            tarjeta2.style.transform = "rotateY(0deg)";
            currentAttempts++;
            document.getElementById("stats").textContent = `${currentAttempts} intentos fallidos`;
        } else {
            trasera1.style.background = "plum";
            trasera2.style.background = "plum";
            currentMove++; // Incrementar el contador de movimientos válidos
        }

        selecciones = [];
        canSelect = true; // Habilitar selección nuevamente
    }, 1000);
}