Algoritmo SignoZodiacal
	// ===== DECLARACIÓN DE VARIABLES =====
	Definir nombre Como Caracter
	Definir dia, mes, anio Como Entero
	Definir signo Como Caracter
	
	// ===== ENTRADA DE DATOS =====
	Escribir "🔮 SISTEMA DE SIGNOS ZODIACALES 🔮"
	Escribir "================================"
	Escribir "Ingrese el nombre de la persona:"
	Leer nombre
	Escribir "Ingrese el día de nacimiento (1-31):"
	Leer dia
	Escribir "Ingrese el mes de nacimiento (1-12):"
	Leer mes
	Escribir "Ingrese el año de nacimiento:"
	Leer anio
	
	// ===== INICIALIZAR VARIABLE DE RESULTADO =====
	signo = "Fecha no válida"
	
	// ===== CONDICIONALES SIMPLES E INDEPENDIENTES =====
	// ♈ Aries: 21 marzo - 19 abril
	Si (mes == 3 Y dia >= 21) O (mes == 4 Y dia <= 19) Entonces
		signo = "♈ Aries"
	FinSi
	
	// ♉ Tauro: 20 abril - 20 mayo
	Si (mes == 4 Y dia >= 20) O (mes == 5 Y dia <= 20) Entonces
		signo = "♉ Tauro"
	FinSi
	
	// ♊ Géminis: 21 mayo - 20 junio
	Si (mes == 5 Y dia >= 21) O (mes == 6 Y dia <= 20) Entonces
		signo = "♊ Géminis"
	FinSi
	
	// ♋ Cáncer: 21 junio - 22 julio
	Si (mes == 6 Y dia >= 21) O (mes == 7 Y dia <= 22) Entonces
		signo = "♋ Cáncer"
	FinSi
	
	// ♌ Leo: 23 julio - 22 agosto
	Si (mes == 7 Y dia >= 23) O (mes == 8 Y dia <= 22) Entonces
		signo = "♌ Leo"
	FinSi
	
	// ♍ Virgo: 23 agosto - 22 septiembre
	Si (mes == 8 Y dia >= 23) O (mes == 9 Y dia <= 22) Entonces
		signo = "♍ Virgo"
	FinSi
	
	// ♎ Libra: 23 septiembre - 22 octubre
	Si (mes == 9 Y dia >= 23) O (mes == 10 Y dia <= 22) Entonces
		signo = "♎ Libra"
	FinSi
	
	// ♏ Escorpio: 23 octubre - 21 noviembre
	Si (mes == 10 Y dia >= 23) O (mes == 11 Y dia <= 21) Entonces
		signo = "♏ Escorpio"
	FinSi
	
	// ♐ Sagitario: 22 noviembre - 21 diciembre
	Si (mes == 11 Y dia >= 22) O (mes == 12 Y dia <= 21) Entonces
		signo = "♐ Sagitario"
	FinSi
	
	// ♑ Capricornio: 22 diciembre - 19 enero
	Si (mes == 12 Y dia >= 22) O (mes == 1 Y dia <= 19) Entonces
		signo = "♑ Capricornio"
	FinSi
	
	// ♒ Acuario: 20 enero - 18 febrero
	Si (mes == 1 Y dia >= 20) O (mes == 2 Y dia <= 18) Entonces
		signo = "♒ Acuario"
	FinSi
	
	// ♓ Piscis: 19 febrero - 20 marzo
	Si (mes == 2 Y dia >= 19) O (mes == 3 Y dia <= 20) Entonces
		signo = "♓ Piscis"
	FinSi
	
	// ===== SALIDA DE RESULTADOS =====
	Escribir ""
	Escribir "✨***********************************************✨"
	Escribir "  📋 REPORTE ASTROLÓGICO"
	Escribir "✨***********************************************✨"
	Escribir "  👤 Nombre: ", nombre
	Escribir "  🎂 Fecha de nacimiento: ", dia, "/", mes, "/", anio
	Escribir "  🔮 Signo zodiacal: ", signo
	Escribir "✨***********************************************✨"
	
FinAlgoritmo
