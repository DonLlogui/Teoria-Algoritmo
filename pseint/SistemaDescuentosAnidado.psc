Algoritmo SistemaDescuentosAnidado
    // ===== DECLARACIÓN DE VARIABLES =====
    Definir nombre, tipoMembresia Como Caracter
    Definir edad, precioOriginal, descuento, precioFinal Como Real
    
    // ===== ENTRADA DE DATOS =====
    Escribir "??? SISTEMA DE DESCUENTOS INTELIGENTE"
    Escribir "======================================"
    Escribir "Ingrese el nombre del cliente:"
    Leer nombre
    Escribir "Ingrese el precio original del producto:"
    Leer precioOriginal
    Escribir "Ingrese la edad del cliente:"
    Leer edad
    Escribir "Ingrese tipo de membresía (basica/premium/vip):"
    Leer tipoMembresia
    
    // ===== INICIALIZAR DESCUENTO =====
    descuento <- 0
    
    // ===== CONDICIONAL ANIDADO NIVEL 1: Validar precio =====
    Si precioOriginal > 0 Entonces
        
        // ===== CONDICIONAL ANIDADO NIVEL 2: Validar edad =====
        Si edad >= 0 Entonces
            
            // ===== CONDICIONAL ANIDADO NIVEL 3: Categorías por edad =====
            Si edad < 18 Entonces
                // ?? Menor de edad: descuento base 10%
                descuento <- 10
                Escribir "?? Descuento por menor de edad: ", descuento, "%"
                
            SiNo
                // ===== CONDICIONAL ANIDADO NIVEL 4: Adultos =====
                Si edad >= 18 Y edad < 60 Entonces
                    // ????? Adulto: descuento base 5%
                    descuento <- 5
                    Escribir "?? Descuento por adulto: ", descuento, "%"
                    
                SiNo
                    // ?? Adulto mayor: descuento base 20%
                    descuento <- 20
                    Escribir "?? Descuento por adulto mayor: ", descuento, "%"
                FinSi
            FinSi
            
            // ===== CONDICIONAL ANIDADO NIVEL 5: Bonus por membresía =====
            // (Este se anida DENTRO del bloque de edad válida)
            Si tipoMembresia == "vip" Entonces
                descuento <- descuento + 15
                Escribir "? Bonus VIP aplicado: +15%"
                
            SiNo
                Si tipoMembresia == "premium" Entonces
                    descuento <- descuento + 8
                    Escribir "? Bonus Premium aplicado: +8%"
                    
                SiNo
                    Si tipoMembresia == "basica" Entonces
                        descuento <- descuento + 3
                        Escribir "? Bonus Básico aplicado: +3%"
                    SiNo
                        Escribir "?? Tipo de membresía no reconocido. Sin bonus adicional."
                    FinSi
                FinSi
            FinSi
            
            // ===== CÁLCULO FINAL =====
            precioFinal <- precioOriginal * (1 - descuento/100)
            
            Escribir ""
            Escribir "?? RESUMEN DE COMPRA"
            Escribir "===================="
            Escribir "?? Cliente: ", nombre
            Escribir "?? Precio original: $", precioOriginal
            Escribir "?? Descuento total aplicado: ", descuento, "%"
            Escribir "? Precio final a pagar: $", precioFinal
            
        SiNo
            // Edad inválida (negativa)
            Escribir "? Error: La edad no puede ser negativa."
        FinSi
        
    SiNo
        // Precio inválido (cero o negativo)
        Escribir "? Error: El precio debe ser mayor a cero."
    FinSi
    
FinAlgoritmo
