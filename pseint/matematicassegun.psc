Algoritmo MenuCalculadoraSegun
		// ===== DECLARACIÓN DE VARIABLES =====
		Definir opcion Como Entero
		Definir num1, num2, resultado Como Real
		
		// ===== MENÚ DE OPCIONES =====
		Escribir "?? MENÚ DE OPERACIONES MATEMÁTICAS"
		Escribir "=================================="
		Escribir "1  Sumar"
		Escribir "2  Restar"
		Escribir "3  Multiplicar"
		Escribir "4  Dividir"
		Escribir "-->Ingrese el número de la opción (1-4):"
		Leer opcion
		
		// ===== ESTRUCTURA SEGUN (SWITCH/CASE) =====
		Segun opcion Hacer
			1:
				Escribir " Ingrese primer número:"
				Leer num1
				Escribir " Ingrese segundo número:"
				Leer num2
				resultado <- num1 + num2
				Escribir " Resultado: ", num1, " + ", num2, " = ", resultado
				
			2:
				Escribir " Ingrese primer número:"
				Leer num1
				Escribir " Ingrese segundo número:"
				Leer num2
				resultado <- num1 - num2
				Escribir "? Resultado: ", num1, " - ", num2, " = ", resultado
				
			3:
				Escribir " Ingrese primer número:"
				Leer num1
				Escribir " Ingrese segundo número:"
				Leer num2
				resultado <- num1 * num2
				Escribir " Resultado: ", num1, " × ", num2, " = ", resultado
				
			4:
				Escribir " Ingrese primer número:"
				Leer num1
				Escribir " Ingrese segundo número:"
				Leer num2
				Si num2 <> 0 Entonces
					resultado <- num1 / num2
					Escribir " Resultado: ", num1, " ÷ ", num2, " = ", resultado
				SiNo
					Escribir " Error matemático: No se puede dividir por cero."
				FinSi
				
			De Otro Modo:
				Escribir " Opción no válida. Por favor, seleccione entre 1 y 4."
		FinSegun

FinAlgoritmo
