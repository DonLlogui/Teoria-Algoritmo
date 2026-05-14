function generarFactura() {
    // 1. Pedir datos con Prompts
    // Nota: El orden es importante para la experiencia de usuario
    let rs = prompt("Ingrese Razón Social:");
    if (!rs) return; // Si cancela, sale

    let nfact = prompt("Ingrese Número de Factura:");
    let fecha = prompt("Ingrese Fecha (DD/MM/AAAA):");
    
    let id = prompt("Ingrese ID del Cliente:");
    let nom = prompt("Ingrese Nombre del Cliente:");
    let dir = prompt("Ingrese Dirección:");
    let tel = prompt("Ingrese Teléfono:");
    
    let prod = prompt("Ingrese Nombre del Producto:");
    
    // Validación numérica simple
    let cant = parseFloat(prompt("Ingrese Cantidad (Kg):"));
    let vu = parseFloat(prompt("Ingrese Valor Unitario ($):"));

    // Si cancela o deja vacío los números, asumimos 0
    if (isNaN(cant)) cant = 0;
    if (isNaN(vu)) vu = 0;

    // 2. Cálculos
    let subtotal = cant * vu;
    let iva = subtotal * 0.19;
    let total = subtotal + iva;

    // Formateador de moneda
    const formatoCOP = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    });

    // 3. Inyectar datos en el HTML (Manipulación del DOM)
    document.getElementById('f_rs').innerText = rs;
    document.getElementById('f_nfact').innerText = "N° " + (nfact || "S/N");
    document.getElementById('f_fecha').innerText = fecha || new Date().toLocaleDateString();
    
    document.getElementById('f_id').innerText = id || "N/A";
    document.getElementById('f_nom').innerText = nom || "Consumidor Final";
    document.getElementById('f_dir').innerText = dir || "N/A";
    document.getElementById('f_tel').innerText = tel || "N/A";

    document.getElementById('f_prod').innerText = prod || "Servicio General";
    document.getElementById('f_cant').innerText = cant + " Kg";
    document.getElementById('f_vu').innerText = formatoCOP.format(vu);
    document.getElementById('f_subtotal').innerText = formatoCOP.format(subtotal);

    // Totales
    document.getElementById('t_subtotal').innerText = formatoCOP.format(subtotal);
    document.getElementById('t_iva').innerText = formatoCOP.format(iva);
    document.getElementById('t_total').innerText = formatoCOP.format(total);

    // 4. Cambiar de vista (Ocultar inicio, mostrar factura)
    document.getElementById('vista-inicial').classList.add('oculto');
    document.getElementById('vista-factura').classList.remove('oculto');
}

function reiniciar() {
    // Limpiar campos si deseas (opcional)
    // Volver a la vista inicial
    document.getElementById('vista-factura').classList.add('oculto');
    document.getElementById('vista-inicial').classList.remove('oculto');
}