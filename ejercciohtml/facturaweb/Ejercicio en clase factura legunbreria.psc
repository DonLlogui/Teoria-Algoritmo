Algoritmo sin_titulo
	Definir ide, nom, dir, tel, nfact, fecha, rs, prod Como Caracter
	Definir cant, vu, subtotal Como Entero
	Definir iva, total Como Real
	
	Escribir "Ingrese su número de identificación"
	Leer ide	
	Escribir "Ingrese sus nombres y apellidos"
	Leer nom	
	Escribir "Ingrese su dirección"
	Leer dir
	Escribir "Ingrese su número de teléfono"
	Leer ide
	Escribir "Ingrese número de factura"
	Leer nfact
	Escribir "Ingrese feccha de factura"
	Leer fecha
	Escribir "Ingrese razon social"
	Leer rs
	Escribir "Ingrese nombre del producto"
	Leer prod
	Escribir "Ingrese la cantidad del producto"
	Leer cant
	Escribir "Ingrese el valor unitario del producto"
	Leer vu
	subtotal = cant * vu
	iva = subtotal * 0.19
	total = subtotal + iva	
	
	Imprimir "*************************************"
	Imprimir "Tienda Legunbreria " , rs
	Imprimir "*************************************"
	Imprimir "# Factura: ", nfact, "Fecha: " , fecha
	Imprimir "*************************************"
	Imprimir "*********Datos del Cliente***********"
	Imprimir "*************************************"
	Imprimir "Identificación cliente: " , ide
	Imprimir "Cliente: " , nom
	Imprimir "Dirección cliente: " , dir
	Imprimir "Teléfono cliente: " , tel
	Imprimir "*************************************"
	Imprimir "*********Datos del Producto**********"
	Imprimir "*************************************"
	Imprimir "Producto: ", prod
	Imprimir "Cantidad: ", cant, " KG"
	Imprimir "$ Unitario: ", vu
	imprimir "subtotal: $" , subtotal
	Imprimir "Iva: $" , iva , " 19%"
	Imprimir "************************************"
	Imprimir "Total a pagar: $" , total
	Imprimir "*************************************"
FinAlgoritmo
