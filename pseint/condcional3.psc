Algoritmo sin_titulo
	Definir identificion, nombre, user, contra, u, c Como Caracter
	Definir estatura, peso, imc Como Real
	user="pepito"
	contra="12345"
	Escribir "Ingrese usuario"
	Leer u
	Escribir "Ingrese su contraseña"
	Leer c
	Si (u == user y contra == c) Entonces
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
	SiNo
		Imprimir "Usted no esta permitido entrar al sistema"
	Fin Si
FinAlgoritmo
