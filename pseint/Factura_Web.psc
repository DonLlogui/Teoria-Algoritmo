Algoritmo Factura_Web
	Definir ide, nom, dir, tel, nfac, fecha, rs, p Como Caracter
	Definir cant, vu, subtotal Como Entero
	Definir iva, total Como Real
	Escribir "Ingrese su identificación"
	Leer ide
	Escribir "Ingrese sus nombres y apellidos"
	Leer nom
	Escribir "Ingrese su dirección"
	Leer dir
	Escribir "Ingrese su número de teléfono"
	Leer tel
	Escribir "Ingrese el número de la factura"
	Leer nfac
	Escribir "Ingrese la fecha de la factura"
	Leer fecha
	Escribir "Ingrese la razón social"
	Leer rs
	Escribir "Ingrese el producto"
	Leer p
	Escribir "Ingrese la cantidad del producto"
	Leer cant
	Escribir "Ingrese el valor unitario del producto"
	Leer vu
	subtotal = cant * vu
	iva = subtotal * 0.19  // subtotal * 19 / 100 subtotal * 0,19
	total = subtotal + iva
	Imprimir "***********************************"
	Imprimir "Tienda Legumbrería" , rs
	Imprimir "***********************************"
	Imprimir "# Factura: " , nfac, " fecha: " ,fecha 
	Imprimir "***********************************"
	Imprimir "********Datos del cliente**********"
	Imprimir "***********************************"
	Imprimir "Identificación: " , ide
	Imprimir "Cliente: " , nom
	Imprimir "Dirección: " , dir
	Imprimir "Teléfono: " , tel
	Imprimir "***********************************"
	Imprimir "********Datos del producto*********"
	Imprimir "***********************************"
	Imprimir "Descripción: ", p
	Imprimir "Cantidad: ", cant
	Imprimir "Valor unitario: ", vu
	Imprimir "Subtotal: $: ", subtotal
	Imprimir "Iva: $" , iva , " 19%"
	Imprimir "***********************************"
	Imprimir "Total a pagar: $" , total , " Pesos"
	Imprimir "***********************************"	
FinAlgoritmo