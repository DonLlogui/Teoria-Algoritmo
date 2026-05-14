
	//Llega un cliente y necesita de un programa que calcule la masa corporal de los humanos que detalle identificación del paciente, nombre del paciente, la estatura, el peso en kilos y resultado de su masa corporal.
	Algoritmo Calculadora_de_Masa_Corporal
		Definir identificion, nombre Como Caracter
		Definir estatura, peso, imc Como Real
		Escribir "Ingrese la identificación del paciente"
		Leer identificion
		Escribir "Ingrese el nombre del paciente"
		Leer nombre
		Escribir "Ingrese la estatura del paciente en metros"
		Leer estatura
		Escribir "Ingrese el peso del paciente en kilos"
		Leer peso
		Imprimir "***********************************************"
		imc = peso / (estatura * estatura)
		Imprimir "La identificación del paciente es: ", identificion
		Imprimir "El nombre del paciente es: ", nombre
		Imprimir "La estatura del paciente es: ", estatura " Metros"
		Imprimir "El peso del paciente es: ", peso " Kilos"
		Imprimir "***********************************************"
		Imprimir "La masa corporal del pacinete es: ", imc
		Imprimir "***********************************************"
FinAlgoritmo

