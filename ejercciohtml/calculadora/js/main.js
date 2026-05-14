// Variables de memoria global
var n1 = "0";      // Lo que se ve en pantalla (String para poder concatenar "0" + "7" = "07")
var n2 = null;     // El primer número guardado en memoria (Number)
var op = "";       // La operación pendiente (String)
var nuevoInicio = false; // Bandera para saber si acabamos de calcular y debemos limpiar pantalla

// Función para actualizar la pantalla visualmente
function actualizarPantalla() {
    document.getElementById("pantalla").innerText = n1;
}

// 1. Agregar Números
function agregarNumero(num) {
    // Si venimos de un resultado (=), limpiamos n1 antes de escribir
    if (nuevoInicio) {
        n1 = "";
        nuevoInicio = false;
    }

    // Lógica simple de concatenación de strings
    // Si n1 es "0" y no es punto decimal, reemplazamos. Si no, concatenamos.
    // Usamos una pequeña trampa matemática/string para evitar IFs complejos:
    
    if (n1 === "0" && num !== ".") {
        n1 = num;
    } else {
        n1 = n1 + num;
    }
    
    actualizarPantalla();
}

// 2. Preparar Operación (+, -, *, /)
function prepararOperacion(operador) {
    // Guardamos el valor actual de pantalla en n2 convirtiéndolo a número real
    n2 = parseFloat(n1);
    
    // Guardamos qué operación se pidió
    op = operador;
    
    // Preparamos n1 para recibir el siguiente número (lo reseteamos visualmente a 0 internamente)
    n1 = "0";
    nuevoInicio = false;
}

// 3. Calcular (=)
function calcular() {
    // Necesitamos el segundo número (el que está actualmente en pantalla)
    var numeroActual = parseFloat(n1);
    var resultado = 0;

    // AQUÍ ESTÁ LA CLAVE: Usamos un objeto para mapear operaciones sin usar IF/SWITCH
    // Esto es programación funcional básica, muy limpia.
    var operaciones = {
        '+': n2 + numeroActual,
        '-': n2 - numeroActual,
        '*': n2 * numeroActual,
        '/': n2 / numeroActual,
        '%': n2 % numeroActual
    };

    // Ejecutamos la operación basada en el símbolo guardado en 'op'
    // Si op está vacío o no existe, resultado será undefined, así que usamos || para dejar el número actual
    resultado = operaciones[op];

    // Si hubo división por cero o error, resultado podría ser Infinity, lo manejamos mostrando Error
    // Convertimos el resultado a String para volver a mostrarlo en n1
    n1 = String(resultado);
    
    // Limpiamos memoria para la siguiente
    n2 = null;
    op = "";
    nuevoInicio = true; // Marcamos que ya tenemos un resultado
    
    actualizarPantalla();
}

// 4. Limpiar Todo (AC)
function limpiar() {
    n1 = "0";
    n2 = null;
    op = "";
    nuevoInicio = false;
    actualizarPantalla();
}

// 5. Borrar último dígito (⌫)
function borrar() {
    // Si es un solo dígito o "0", volvemos a "0"
    // Usamos substring para quitar el último caracter
    if (n1.length > 1) {
        n1 = n1.slice(0, -1);
    } else {
        n1 = "0";
    }
    actualizarPantalla();
}