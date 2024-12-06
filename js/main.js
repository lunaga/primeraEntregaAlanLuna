/**
 * Lista de corredores actuales de Fórmula 1.
 * @constant {string[]}
 */
const corredores = [
    "Max Verstappen",
    "Niko Hulkenberg",
    "Lewis Hamilton",
    "Fernando Alonso",
    "Charles Leclerc",
    "Yuki Tsunoda",
    "Lando Norris",
    "Valtteri Bottas",
    "Franco Colapinto",
    "Pierre Gasly",
];

/**
 * Inicia el simulador de clasificación (Qualy) de Fórmula 1.
 * Controla el flujo principal del simulador, desde la selección del corredor
 * hasta la generación y comparación de tiempos.
 */
function iniciarSimulador() {
    console.clear();
    console.log("Iniciando el simulador de Qualy de F1...");

    alert("¡Bienvenido al Simulador de Qualy de F1!");

    // Muestra la lista de corredores
    let listaCorredores = "Selecciona a tu piloto:\n";
    corredores.forEach((corredor, index) => {
        listaCorredores += `${index + 1}. ${corredor}\n`;
    });

    console.log("Lista de corredores:");
    corredores.forEach((corredor, index) => {
        console.log(`${index + 1}. ${corredor}`);
    });

    let corredorSeleccionado = null;

    // Solicita al usuario que seleccione un corredor
    while (corredorSeleccionado === null) {
        let seleccion = prompt(listaCorredores);

        // Si el usuario cancela
        if (seleccion === null) {
            alert("Gracias por participar en el simulador de Qualy.");
            console.log("El usuario canceló la simulación.");
            return;
        }

        const indiceSeleccionado = parseInt(seleccion) - 1;

        if (!isNaN(indiceSeleccionado) && indiceSeleccionado >= 0 && indiceSeleccionado < corredores.length) {
            corredorSeleccionado = corredores[indiceSeleccionado];
            console.log(`Corredor seleccionado: ${corredorSeleccionado}`);
            alert(`Has seleccionado a: ${corredorSeleccionado}`);
        } else {
            alert("Selección inválida. Por favor, introduce un número válido.");
            console.error("Selección inválida. El usuario ingresó:", seleccion);
        }
    }

    // Genera el tiempo del jugador
    const tiempoJugador = generarTiempoQualy();
    console.log(`Tiempo de ${corredorSeleccionado}: ${tiempoJugador.toFixed(3)} segundos`);

    // Genera los tiempos de los rivales
    const tiemposRivales = generarTiemposRivales(corredorSeleccionado);

    // Muestra el resultado al usuario
    alert(
        `¡Resultado de la Qualy!\nCorredor: ${corredorSeleccionado}\nTiempo: ${tiempoJugador.toFixed(3)} segundos`
    );

    let resultado = `Comparación con otros pilotos:\n`;
    let mejorQueRival = 0;

    // Compara el tiempo del jugador con los de los rivales
    tiemposRivales.forEach((rival) => {
        const esMasRapido = tiempoJugador < rival.tiempo;
        resultado += `- ${rival.nombre}: ${rival.tiempo.toFixed(3)} segundos (${esMasRapido ? "MÁS LENTO" : "MÁS RÁPIDO"})\n`;

        console.log(
            `${rival.nombre}: ${rival.tiempo.toFixed(3)} segundos (${esMasRapido ? "MÁS LENTO" : "MÁS RÁPIDO"})`
        );

        if (esMasRapido) mejorQueRival++;
    });

    alert(resultado);

    // Determina si el jugador pasa a la siguiente ronda
    if (mejorQueRival >= 2) {
        alert(`¡Felicidades! ${corredorSeleccionado} pasa a la siguiente ronda de Qualy.`);
        console.log(`Resultado: ${corredorSeleccionado} pasa a la siguiente ronda.`);
    } else {
        alert(`${corredorSeleccionado} no logró avanzar a la siguiente ronda. ¡Intenta de nuevo!`);
        console.log(`Resultado: ${corredorSeleccionado} no pasa a la siguiente ronda.`);
    }

    // Pregunta si el usuario desea reiniciar el simulador
    const repetir = confirm("¿Quieres intentarlo de nuevo?");
    if (repetir) {
        iniciarSimulador();
    } else {
        alert("¡Gracias por participar en el simulador de Qualy!");
        console.log("El usuario ha terminado el simulador.");
    }
}

/**
 * Genera un tiempo de clasificación aleatorio en un rango establecido.
 * @returns {number} Tiempo de clasificación en segundos.
 */
function generarTiempoQualy() {
    const minTiempo = 80.0; // Tiempo mínimo en segundos
    const maxTiempo = 100.0; // Tiempo máximo en segundos
    return Math.random() * (maxTiempo - minTiempo) + minTiempo;
}

/**
 * Genera los tiempos de clasificación de dos rivales aleatorios.
 * Se asegura de que los rivales no sean el corredor seleccionado ni repetidos.
 * 
 * @param {string} corredorSeleccionado - Nombre del corredor seleccionado por el usuario.
 * @returns {Array<{nombre: string, tiempo: number}>} Lista de rivales con sus tiempos.
 */
function generarTiemposRivales(corredorSeleccionado) {
    const rivales = [];
    while (rivales.length < 2) {
        const indiceAleatorio = Math.floor(Math.random() * corredores.length);
        if (corredores[indiceAleatorio] !== corredorSeleccionado && !rivales.some((r) => r.nombre === corredores[indiceAleatorio])) {
            const tiempoRival = generarTiempoQualy();
            rivales.push({
                nombre: corredores[indiceAleatorio],
                tiempo: tiempoRival,
            });

            console.log(`Rival generado: ${corredores[indiceAleatorio]} (${tiempoRival.toFixed(3)} segundos)`);
        }
    }
    return rivales;
}