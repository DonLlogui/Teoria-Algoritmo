/ restaurante
// 1 coriente 12.0000
//2  bandeja paisa 25.000
// 3  carne de res asada  18.000 
// 4  carne de cerdo asada  18.000 
Algoritmo sin_titulo
	Escribir "menu restaurante si te la comes"
	Escribir "1 coriente"
	Escribir "2 bandeja paisa"
	Escribir "3 carne de res asada"
	Escribir "4 carne de Cerdo asada"
	Escribir "ingrese el numero del plato a tomar"
	Leer plato
	Segun (plato) Hacer
		opcion 1:
			Escribir "su Comida es: coriente valor $12.000 pesos"  
		opcion 2:
			Escribir "su Comida es: bandeja paisa valor $25.000 pesos"
		opcion 3:
			Escribir "su Comida es: carne de res asada valor $18.000 pesos"
		opcion 4:
			Escribir "su Comida es: carne de Cerdo asada valor $18.000 pesos"	
		De Otro Modo:
			Escribir "No es una opcion valida"
	Fin Segun
FinAlgoritmo
