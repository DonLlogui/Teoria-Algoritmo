//El sistema debe permitir al usuario visualizar un primer numero
//El sistema debe permitir al usuario visualizar un segundo numero
//El sistema debe permitir al usuario visualizar un tercer numero
//El sistema debe permitir al usuario visualizar cual de tres numeros es mayor
Algoritmo sin_titulo
	Definir n1, n2, n3 Como Entero
	Escribir "Ingrese el primer numero"
	Leer n1
	Escribir "Ingrese el segundo numero"
	Leer n2
	Escribir "Ingrese el tercer numero"
	Leer n3
	Si (n1 > n2 y n1 > n3) Entonces
		Imprimir n1, " Es mayor "
	Fin Si
	Si (n2 > n1 y n2 > n3) Entonces
		Imprimir n2, " Es mayor "
	Fin Si
	Si (n3 > n1 y n3 > n2) Entonces
		Imprimir n3, " Es mayor "
	Fin Si
FinAlgoritmo
