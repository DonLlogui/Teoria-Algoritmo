video sesion 24-04-2026 https://youtu.be/EKT0_7pOx_s
video sesion 30-04-2026 https://youtu.be/LHrNKr7o09E   
video secion 09/05/2026 https://youtu.be/RIRQUVZ_5M8  mañana
****************************************************************************************
pagina web https://guillodelapena.xo.je/#
****************************************************************************************
youtube
Tema Que es algortimo ---> caracteristica Pasos Logicos ---> https://youtu.be/X1hzoiA9Ck4



# 🔐 Sistema de Acceso a Sala de Servidores

## 📖 Descripción
Ejercicio práctico de programación orientado a la **validación secuencial de condiciones**. Simula un sistema de autenticación por niveles para el acceso a una sala de servidores, donde cada capa depende del éxito de la anterior.

## 📝 Enunciado
Un centro de datos requiere autenticación en múltiples capas. Escribe un algoritmo que valide secuencialmente:
1. Si el **ID de empleado** es válido (longitud exacta de 6 dígitos).
2. Si la **contraseña** ingresada coincide con la registrada.
3. Si el **escáner biométrico** reporta `"aprobado"`.
4. Si la **hora actual** está dentro del horario permitido (`08:00` a `18:00`).

✅ Solo si **todas** las condiciones se cumplen, el sistema debe mostrar `"✅ Acceso concedido"`. De lo contrario, debe indicar **en qué nivel específico falló** y detener la validación.

## 🔑 Entradas y 📤 Salidas
| Parámetro     | Tipo     | Descripción                                      |
|---------------|----------|--------------------------------------------------|
| `idEmpleado`  | `string` | Identificador del usuario (6 caracteres numéricos) |
| `password`    | `string` | Contraseña ingresada                             |
| `biometrico`  | `string` | Resultado del escáner (`"aprobado"` / `"denegado"`) |
| `hora`        | `int`    | Hora actual en formato 24h (`0` a `23`)          |

**Salida esperada:** Mensaje de éxito o error específico por nivel de validación.

## 🧩 Estructura Lógica Sugerida
```pseudocode
SI longitud(idEmpleado) == 6 Y idEmpleado es numérico ENTONCES
    SI password == passwordRegistrada ENTONCES
        SI biometrico == "aprobado" ENTONCES
            SI hora >= 8 Y hora <= 18 ENTONCES
                MOSTRAR "✅ Acceso concedido"
            SINO
                MOSTRAR "❌ Acceso denegado: Fuera de horario permitido (08:00 - 18:00)"
            FIN SI
        SINO
            MOSTRAR "❌ Acceso denegado: Verificación biométrica fallida"
        FIN SI
    SINO
        MOSTRAR "❌ Acceso denegado: Contraseña incorrecta"
    FIN SI
SINO
    MOSTRAR "❌ Acceso denegado: ID de empleado inválido"
FIN SI
