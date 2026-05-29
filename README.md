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


# 🎓 Clasificador de Becas Universitarias

## 📖 Descripción
Ejercicio práctico de programación centrado en **condicionales anidados y evaluación de umbrales numéricos**. Simula el proceso de asignación de becas en una universidad, aplicando filtros secuenciales basados en métricas académicas, socioeconómicas y de participación estudiantil.

## 📝 Enunciado
Una universidad otorga becas siguiendo un criterio estricto de validación en tres niveles:
1. **Promedio Académico:** Debe ser mayor o igual a `9.0`.
2. **Ingreso Familiar Mensual:** No debe superar los `$5,000`.
3. **Actividades Extracurriculares:** Determina el tipo de beca:
   - Si el estudiante participa en `3` o más actividades → **Beca Completa**.
   - Si participa en menos de `3` → **Beca Parcial**.

El algoritmo debe evaluar cada condición en orden. Si alguna no se cumple, debe detenerse y mostrar un mensaje de rechazo con el motivo específico.

## 🔑 Entradas y 📤 Salidas
| Parámetro      | Tipo     | Descripción                                      |
|----------------|----------|--------------------------------------------------|
| `promedio`     | `float`  | Promedio académico del estudiante (0.0 - 10.0)   |
| `ingreso`      | `float`  | Ingreso familiar mensual en moneda local         |
| `actividades`  | `int`    | Número de actividades extracurriculares registradas |

**Salida esperada:** Tipo de beca asignada (`"Beca Completa"` / `"Beca Parcial"`) o mensaje de rechazo con motivo específico.

## 🧩 Estructura Lógica Sugerida
```pseudocode
SI promedio >= 9.0 ENTONCES
    SI ingreso <= 5000 ENTONCES
        SI actividades >= 3 ENTONCES
            MOSTRAR "🎓 ¡Felicidades! Has obtenido: Beca Completa"
        SINO
            MOSTRAR "📘 Has obtenido: Beca Parcial"
        FIN SI
    SINO
        MOSTRAR "❌ Beca no disponible por ingresos (superan $5,000)"
    FIN SI
SINO
    MOSTRAR "❌ Beca no disponible por promedio (menor a 9.0)"
FIN SI

# 🏥 Triaje Médico Básico

## 📖 Descripción
Simulación de un sistema de triaje para urgencias médicas. El algoritmo clasifica pacientes según signos vitales, priorizando la atención mediante reglas clínicas anidadas y evaluación en cascada.

## 📝 Enunciado
Un sistema de urgencias clasifica pacientes siguiendo este flujo:
1. Si la **temperatura ≥ 39.5°C** → evaluar signos de alarma.
2. Si `signosAlarma == "sí"` → **🔴 Prioridad: Urgente**.
3. SiNo → Si **frecuencia cardíaca > 110** → **🟠 Prioridad: Alta**.
4. SiNo → **🟢 Prioridad: Media**.
5. Si la **temperatura < 39.5°C** → asignar directamente **🟢 Media**.

## 🔑 Entradas y 📤 Salidas
| Parámetro        | Tipo     | Descripción                          |
|------------------|----------|--------------------------------------|
| `temperatura`    | `float`  | Temperatura corporal en °C           |
| `signosAlarma`   | `string` | `"sí"` o `"no"`                      |
| `fc`             | `int`    | Frecuencia cardíaca (latidos por min)|

**Salida esperada:** Nivel de prioridad con emoji y mensaje descriptivo.

## 🧩 Estructura Lógica Sugerida
```pseudocode
SI temperatura >= 39.5 ENTONCES
    SI signosAlarma == "sí" ENTONCES
        MOSTRAR "🔴 Prioridad: Urgente - Evaluación inmediata"
    SINO
        SI fc > 110 ENTONCES
            MOSTRAR "🟠 Prioridad: Alta - Requiere observación cercana"
        SINO
            MOSTRAR "🟢 Prioridad: Media - Atención estándar"
        FIN SI
    FIN SI
SINO
    MOSTRAR "🟢 Prioridad: Media - Temperatura estable"
FIN SI



---

### 📦 4. Calculadora de Envíos Internacionales
```markdown
# 📦 Calculadora de Envíos Internacionales

## 📖 Descripción
Algoritmo de cálculo de tarifas logísticas. Demuestra cómo el anidamiento condicional puede usarse de forma **acumulativa** para modificar progresivamente una variable base (`costoTotal`).

## 📝 Enunciado
Una paquetería determina el costo final aplicando reglas secuenciales:
1. **Zona:** `"nacional"` → base `$100` | `"internacional"` → base `$250`
2. **Peso:** Si `> 10 kg` → sumar `$50` por cada `5 kg` extra (o fracción).
3. **Tipo:** Si `"frágil"` → agregar `15%` al total acumulado.
4. **Seguro:** Si `"sí"` → sumar `$30` fijos al final.

## 🔑 Entradas y 📤 Salidas
| Parámetro | Tipo     | Descripción                     |
|-----------|----------|---------------------------------|
| `zona`    | `string` | `"nacional"` o `"internacional"`|
| `peso`    | `float`  | Peso del paquete en kg          |
| `tipo`    | `string` | `"normal"` o `"frágil"`         |
| `seguro`  | `string` | `"sí"` o `"no"`                 |

**Salida esperada:** Costo final desglosado y total.

## 🧩 Estructura Lógica Sugerida
```pseudocode
costoTotal = 0

SI zona == "nacional" ENTONCES
    costoTotal = 100
SINO SI zona == "internacional" ENTONCES
    costoTotal = 250
FIN SI

SI peso > 10 ENTONCES
    kgExtra = peso - 10
    bloques = CEIL(kgExtra / 5)
    costoTotal = costoTotal + (bloques * 50)
FIN SI

SI tipo == "frágil" ENTONCES
    costoTotal = costoTotal * 1.15
FIN SI

SI seguro == "sí" ENTONCES
    costoTotal = costoTotal + 30
FIN SI

MOSTRAR "📦 Costo final: $" + costoTotal



---

### 🎮 5. Selector de Dificultad en Videojuego
```markdown
# 🎮 Selector de Dificultad en Videojuego

## 📖 Descripción
Sistema de balanceo automático de dificultad. Ideal para aprender a construir **árboles de decisión anidados** y a manejar combinaciones lógicas (`Y` / `AND`) dentro de condicionales.

## 📝 Enunciado
Un videojuego ajusta automáticamente la dificultad según el perfil del jugador:
1. Si `edad < 13` → `"Fácil"` (protección infantil).
2. SiNo → Si `experiencia == "principiante"` → `"Normal"`.
3. SiNo → Si `experiencia == "avanzado" Y modo == "competitivo"` → `"Difícil"`.
4. SiNo → `"Extremo"`.

## 🔑 Entradas y 📤 Salidas
| Parámetro     | Tipo     | Descripción                          |
|---------------|----------|--------------------------------------|
| `edad`        | `int`    | Edad del jugador                     |
| `experiencia` | `string` | `"principiante"`, `"avanzado"`, etc. |
| `modo`        | `string` | `"casual"` o `"competitivo"`         |

**Salida esperada:** Nivel de dificultad + mensaje motivacional.

## 🧩 Estructura Lógica Sugerida
```pseudocode
SI edad < 13 ENTONCES
    MOSTRAR "🟢 Dificultad: Fácil - ¡Disfruta aprendiendo!"
SINO
    SI experiencia == "principiante" ENTONCES
        MOSTRAR "🟡 Dificultad: Normal - ¡Buena suerte en tus primeras partidas!"
    SINO
        SI experiencia == "avanzado" Y modo == "competitivo" ENTONCES
            MOSTRAR "🔴 Dificultad: Difícil - ¿Estás listo para el reto?"
        SINO
            MOSTRAR "⚫ Dificultad: Extremo - Solo para leyendas. ¡A por ello!"
        FIN SI
    FIN SI
FIN SI



---

### 🏦 6. Validación de Préstamo Bancario
```markdown
# 🏦 Validación de Préstamo Bancario

## 📖 Descripción
Simulación de un motor de aprobación crediticia. Ejercicio avanzado de **condicionales secuenciales profundamente anidados**, donde el orden de evaluación determina la eficiencia y seguridad del proceso.

## 📝 Enunciado
Un banco evalúa solicitudes con 4 filtros obligatorios:
1. Si `ingreso mensual ≥ $3000` → continuar.
2. Si `historial crediticio ≥ 700` → continuar.
3. Si `antigüedad laboral ≥ 2 años` → continuar.
4. Si `ratio endeudamiento ≤ 30%` → `"✅ Aprobado"`.
   - SiNo → `"⚠️ Aprobado con aval"`.
   - Si cualquiera de los 3 primeros falla → `"❌ Rechazado"`.

## 🔑 Entradas y 📤 Salidas
| Parámetro       | Tipo     | Descripción                          |
|-----------------|----------|--------------------------------------|
| `ingreso`       | `float`  | Ingreso mensual                      |
| `score`         | `int`    | Puntaje crediticio (0-850)           |
| `antiguedad`    | `float`  | Años en empleo actual                |
| `endeudamiento` | `float`  | % de ingreso destinado a deudas      |

**Salida esperada:** Estado de aprobación con observación técnica.

## 🧩 Estructura Lógica Sugerida
```pseudocode
SI ingreso >= 3000 ENTONCES
    SI score >= 700 ENTONCES
        SI antiguedad >= 2 ENTONCES
            SI endeudamiento <= 30 ENTONCES
                MOSTRAR "✅ Aprobado - Crédito estándar autorizado"
            SINO
                MOSTRAR "⚠️ Aprobado con aval - Alto ratio de endeudamiento"
            FIN SI
        SINO
            MOSTRAR "❌ Rechazado - Antigüedad laboral insuficiente"
        FIN SI
    SINO
        MOSTRAR "❌ Rechazado - Historial crediticio bajo"
    FIN SI
SINO
    MOSTRAR "❌ Rechazado - Ingresos mínimos no alcanzados"
FIN SI
