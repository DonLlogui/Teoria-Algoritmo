function buscar(){
rs = document.getElementById("rs").value
nfact = document.getElementById("nfact").value
fecha = document.getElementById("fecha").value
id = document.getElementById("id").value
nom = document.getElementById("nom").value
dir = document.getElementById("dir").value
tel = document.getElementById("tel").value
vu = document.getElementById("vu").value
prod = document.getElementById("prod").value
cant = document.getElementById("cant").value
subtotal = vu * cant
iva = subtotal * 0.19
total = subtotal + iva

alert("Razon Social: " + rs +
    "\n # Factura: " + nfact + " Fecha: " + fecha +
    "\n************************************************" + 
    "\n************ Datos del Cliente *****************" +
    "\n************************************************" +
    "\n Id: " + id +
    "\n Cliente: " + nom +
    "\n Dirección: " + dir +
    "\n Teléfono; " + tel +
    "\n************************************************" +
    "\n************ Datos del Producto ****************" +
    "\n************************************************" +
    "\n Producto: " + prod +
    "\nCantidad: " + cant + " KG" +
    "\n Valor Unitario: $" + Number(vu).toLocaleString('es-co') +
    "\n Iva: $" + iva + 
    "\n Subtotal: $" + subtotal.toLocaleString('es-co') +
    "\n************************************************" +
    "\n Total: $" + total.toLocaleString('es-co') + " Pesos" +
    "\n************************************************" + 
    "\n============== GRACIAS POR SU COMPRA ===========" +
    "\n================================================") 
}