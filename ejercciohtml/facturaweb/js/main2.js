function buscar() {
    // 1. Obtener valores
    let rs = document.getElementById("rs").value;
    let nfact = document.getElementById("nfact").value;
    let fecha = document.getElementById("fecha").value;
    let id = document.getElementById("id").value;
    let nom = document.getElementById("nom").value;
    let dir = document.getElementById("dir").value;
    let tel = document.getElementById("tel").value;
    
    // Convertimos a números. Si está vacío, asume 0 para evitar errores
    let vu = parseFloat(document.getElementById("vu").value) || 0;
    let cant = parseFloat(document.getElementById("cant").value) || 0;
    let prod = document.getElementById("prod").value;

    // Validación básica
    if(nom.trim() === "" || vu === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Datos Incompletos',
            text: 'Por favor, ingrese al menos el nombre del cliente y el valor unitario.',
            confirmButtonColor: '#3498db' // Azul para advertencia/informativo
        });
        return;
    }

    // 2. Cálculos
    let subtotal = vu * cant;
    let iva = subtotal * 0.19;
    let total = subtotal + iva;

    // Formateador de moneda (Pesos Colombianos)
    const formatoMoneda = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    });

    // 3. Construir el HTML de la factura (Diseño limpio tipo ticket)
    let contenidoFactura = `
        <div style="text-align: left; font-family: 'Helvetica', sans-serif; font-size: 14px; color: #333;">
            
            <!-- Encabezado -->
            <div style="border-bottom: 2px solid #2c3e50; padding-bottom: 10px; margin-bottom: 10px;">
                <h3 style="margin: 0; color: #2c3e50; text-transform: uppercase;">${rs || 'Sin Razón Social'}</h3>
                <small style="color: #7f8c8d;">NIT: ${id || 'N/A'} | Factura: ${nfact}</small>
            </div>

            <!-- Datos Cliente -->
            <p style="margin: 5px 0;"><strong>Cliente:</strong> ${nom}</p>
            <p style="margin: 5px 0;"><strong>Dirección:</strong> ${dir}</p>
            <p style="margin: 5px 0;"><strong>Teléfono:</strong> ${tel}</p>
            <p style="margin: 5px 0;"><strong>Fecha:</strong> ${fecha}</p>

            <hr style="border: 0; border-top: 1px dashed #ccc; margin: 15px 0;">

            <!-- Detalle Producto -->
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 10px;">
                <tr>
                    <td style="text-align: left;"><strong>Producto:</strong></td>
                    <td style="text-align: right;">${prod}</td>
                </tr>
                <tr>
                    <td style="text-align: left;">Cantidad:</td>
                    <td style="text-align: right;">${cant} Kg</td>
                </tr>
                <tr>
                    <td style="text-align: left;">V. Unitario:</td>
                    <td style="text-align: right;">${formatoMoneda.format(vu)}</td>
                </tr>
            </table>

            <hr style="border: 0; border-top: 1px dashed #ccc; margin: 15px 0;">

            <!-- Totales -->
            <div style="background-color: #f9f9f9; padding: 10px; border-radius: 4px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <span>Subtotal:</span>
                    <span>${formatoMoneda.format(subtotal)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px; color: #7f8c8d;">
                    <span>IVA (19%):</span>
                    <span>${formatoMoneda.format(iva)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-top: 10px; font-weight: bold; font-size: 18px; color: #27ae60;">
                    <span>TOTAL A PAGAR:</span>
                    <span>${formatoMoneda.format(total)}</span>
                </div>
            </div>
            
            <p style="text-align: center; margin-top: 15px; font-size: 12px; color: #aaa;">
                Gracias por su confianza
            </p>
        </div>
    `;

    // 4. Mostrar SweetAlert SIN el gato y SIN morado
    Swal.fire({
        title: 'Factura Generada',
        html: contenidoFactura,
        width: 450, // Un poco más ancho para que se vea bien la tabla
        backdrop: `
            rgba(44, 62, 80, 0.7) 
            url("") 
            left top 
            no-repeat
        `, // Fondo oscuro serio, sin imágenes
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#27ae60', // Verde éxito
        buttonsStyling: true,
        customClass: {
            popup: 'animated fadeInDown faster'
        }
    });
}