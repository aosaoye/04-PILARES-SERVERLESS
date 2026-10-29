# 03 · POST + body

**BLOQUE 03 · APRENDIZAJE ASISTIDO**

## El cliente envía un objeto JSON

> Lee, valida y responde a un POST sin perder el backend que ya funciona.

🏷️ **Etiquetas:** `TypeScript` · `Festival Control`


---

### Fase 1: Destino

**Reconoce el resultado antes de construir**

*Lee, valida y responde a un POST sin perder el backend que ya funciona.*

> [!IMPORTANT] **Orientación de la Fase**
> - **Objetivo:** Enviar una actuación y obtener 201 con EVT-NEW; rechazar JSON o campos inválidos con 400.
> - **Requisitos previos:** Bloques 01 y 02; TypeScript, rutas HTTP y JSON.stringify ya utilizados.
> - **Nuevo contenido:** Body como texto, JSON.parse, unknown y validación del dato externo.

#### Las piezas que necesitas comprender

| Componente | Responsabilidad |
|---|---|
| **POST** | Envía un objeto en body. Content-Type anuncia que ese texto tiene formato JSON. |
| **JSON.parse y try/catch** | Parse convierte texto en un valor. Un JSON roto lanza una excepción que transformamos en 400. |
| **unknown y comprobaciones** | El cliente puede enviar null, un array o campos de otro tipo. Comprobamos forma y propiedades antes de leerlas como strings. |
| **Validación de dominio** | artist y space no pueden estar vacíos; time usa HH:mm de 00:00 a 23:59; status admite CONFIRMED o CANCELLED. |

#### Sigue el dato de principio a fin

`Cliente + JSON → POST /events → event.body (texto) → parse + validación → 201 o 400`

TypeScript comprueba tu código. La validación comprueba el valor que envía el cliente durante la ejecución; ambas son necesarias.


---

### Fase 2: Prepara

**Recupera el punto de partida**

*Continúas en el mismo repositorio del alumno. Comprueba el bloque anterior antes de modificar archivos.*

*HAZLO · OBSERVA · DIAGNOSTICA*

#### Prepara la carpeta y el checkpoint

##### Paso 1: Carpeta y bloque anterior

*El backend sigue usando package.json, tsconfig.json, hello.ts y las dependencias fijadas en 01. No se crea un servicio nuevo.*

Abre Git Bash en VS Code. Recupera GET /hello y GET /events/EVT-104. Detén Offline con Ctrl+C antes de editar su configuración.

```bash
cd /d/DEVOPS/04-PILARES-SERVERLESS/backend
pwd
node -v
npm run typecheck
```

**Resultado esperado:**
```text
Estás en backend, Node muestra v22 y TypeScript termina sin errores.
```

> **Ayuda / Resolución de problemas:** La terminal está en otra carpeta,Ejecuta pwd. Los comandos del backend van en /d/DEVOPS/04-PILARES-SERVERLESS/backend; los de Expo, en mobile.,Error de TypeScript,Lee archivo y línea del primer error. Compara ese archivo completo, guarda y repite npm run typecheck.

- [ ] **Verificación:** Si el punto de partida falla, vuelve al cierre del bloque anterior. Después abre las pestañas de Construye.

*MIRA EL MAPA · ANTES DE CONSTRUIR*

#### Proyecto acumulado al finalizar este bloque

📄 **Archivo:** `Workspace del alumno`

El árbol es una referencia. Crea cada archivo por separado en las pestañas de Construye; las llaves del esquema agrupan nombres, no forman parte del nombre real. Conserva el resto del trabajo del bloque anterior.

```bash
04-PILARES-SERVERLESS/
└── backend/
    ├── package.json + package-lock.json
    ├── tsconfig.json
    ├── serverless.yml
    ├── src/hello.ts
    ├── src/getEvent.ts
    ├── src/createEvent.ts
    └── dist/ (generado por npm run build)
```


---

### Fase 3: Construye

**Construye una pieza cada vez**

*Primero comprende su responsabilidad; después copia el archivo completo y comprueba su ruta.*

*CONSTRUYE · ARCHIVOS COMPLETOS*

#### Archivos de este bloque

Recorre las pestañas de izquierda a derecha. Cada una contiene un archivo completo, no un fragmento que debas adivinar.

##### 📄 `backend/src/createEvent.ts`
**Responsabilidad:** Validar datos externos y devolver 201 o un error 400 comprensible.

Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.

> **Concepto clave:** event.body ?? 'null',La entrada puede no tener body. El valor null se rechazará por forma.,typeof / in / trim,Acotan unknown antes de usar propiedades; trim detecta textos compuestos sólo por espacios.,Expresión HH:mm,La expresión regular limita hora y minutos. No valida fecha ni zona horaria.,status,Si se omite, usa CONFIRMED; un valor desconocido se rechaza.

```typescript
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  let body: unknown;
  try {
    body = JSON.parse(event.body ?? 'null');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ message: 'JSON inválido' }) };
  }
  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    return { statusCode: 400, body: JSON.stringify({ message: 'Se espera un objeto JSON' }) };
  }
  if (!('artist' in body) || typeof body.artist !== 'string' || !body.artist.trim() ||
      !('space' in body) || typeof body.space !== 'string' || !body.space.trim() ||
      !('time' in body) || typeof body.time !== 'string' || !/^([01]\d|2[0-3]):[0-5]\d$/.test(body.time)) {
    return { statusCode: 400, body: JSON.stringify({ message: 'artist, space y time (HH:mm) son obligatorios' }) };
  }
  const status = 'status' in body ? body.status : 'CONFIRMED';
  if (status !== 'CONFIRMED' && status !== 'CANCELLED') {
    return { statusCode: 400, body: JSON.stringify({ message: 'status debe ser CONFIRMED o CANCELLED' }) };
  }
  console.log('POST evento:', body.artist);
  return {
    statusCode: 201,
    body: JSON.stringify({ id: 'EVT-NEW', artist: body.artist.trim(), space: body.space.trim(), time: body.time, status })
  };
};
```

> [!CHECKPOINT] **Comprobación:** Guarda con Ctrl+S. Comprueba nombre, extensión y ruta antes de pasar a la siguiente pestaña.

##### 📄 `backend/serverless.yml`
**Responsabilidad:** Relacionar cada método y ruta HTTP con el export handler del JavaScript compilado.

Sustituye el YAML completo por esta versión acumulativa. Conserva hello y todas las rutas anteriores.

> **Concepto clave:** handler: dist/… .handler,La parte anterior al punto es la ruta sin extensión; handler es el nombre exportado. El archivo que editas sigue siendo .ts en src.,events → http,Usamos REST API, compatible con APIGatewayProxyEvent. Conserva sangrías con espacios.,cors: true,Configura preflight OPTIONS para el cliente web. Las respuestas Lambda también devolverán Access-Control-Allow-Origin en el bloque 04.

```yaml
service: festival-control-api
frameworkVersion: ~4.45.0

provider:
  name: aws
  runtime: nodejs22.x

plugins:
  - serverless-offline

functions:
  hello:
    handler: dist/hello.handler
    events:
      - http:
          path: hello
          method: get
          cors: true

  getEvent:
    handler: dist/getEvent.handler
    events:
      - http:
          path: events/{id}
          method: get
          cors: true

  createEvent:
    handler: dist/createEvent.handler
    events:
      - http:
          path: events
          method: post
          cors: true
```

> [!CHECKPOINT] **Comprobación:** Guarda con Ctrl+S. Comprueba nombre, extensión y ruta antes de pasar a la siguiente pestaña.


---

### Fase 4: Prueba

**Prueba por capas y conserva las evidencias**

*No avances porque una pantalla parezca correcta. Contrasta acción, respuesta y diagnóstico.*

*HAZLO · OBSERVA · DIAGNOSTICA*

#### Ejecuta las pruebas del bloque

##### Paso 1: Tipos y ejecución

*npm start comprueba y compila antes de ejecutar Offline. El navegador todavía no interviene.*

Detén la ejecución anterior con Ctrl+C. En Git Bash, dentro de backend, ejecuta estos comandos. Conserva esta terminal abierta; utiliza una segunda para curl.

```bash
npm run typecheck
npm start
```

**Resultado esperado:**
```text
Cero errores de tipos y lista de rutas HTTP. Mantén /dev, el puerto y los métodos anunciados por Offline.
```

> **Ayuda / Resolución de problemas:** No aparece una ruta,Comprueba el YAML completo, su indentación y dist/..., y reinicia después de guardar.,Framework pide acceso,Completa la cuenta/autenticación del bloque 01. Esta cuenta es distinta de las credenciales AWS Academy.,La terminal está en otra carpeta,Ejecuta pwd. Los comandos del backend van en /d/DEVOPS/04-PILARES-SERVERLESS/backend; los de Expo, en mobile.,Error de TypeScript,Lee archivo y línea del primer error. Compara ese archivo completo, guarda y repite npm run typecheck.

- [ ] **Verificación:** Copia la URL anunciada. Si el puerto difiere de 3000, adapta las peticiones; no pruebes una ruta ausente.

##### Paso 2: POST válido

*curl -i permite contrastar el estado HTTP con el cuerpo JSON. El cliente y el handler son piezas diferentes.*

En una segunda terminal Git Bash, con el servidor activo, ejecuta:

```bash
curl -i -X POST http://localhost:3000/dev/events -H 'Content-Type: application/json' -d '{"artist":"Nova Pulse","space":"Main Stage","time":"21:00","status":"CONFIRMED"}'
```

**Resultado esperado:**
```text
201 con EVT-NEW y los campos enviados. En Thunder: método POST, Body → JSON, misma URL y objeto.
```

> **Ayuda / Resolución de problemas:** Connection refused,Arranca npm start en backend y deja esa terminal abierta.,404 o Missing Authentication Token,Compara método, /dev y ruta con el servidor. /events y /events/EVT-101 son rutas diferentes.

- [ ] **Verificación:** Contrasta estado y cuerpo; después relaciona la petición con el log de la función.

##### Paso 3: Campo ausente

*curl -i permite contrastar el estado HTTP con el cuerpo JSON. El cliente y el handler son piezas diferentes.*

En una segunda terminal Git Bash, con el servidor activo, ejecuta:

```bash
curl -i -X POST http://localhost:3000/dev/events -H 'Content-Type: application/json' -d '{"artist":"Nova Pulse"}'
```

**Resultado esperado:**
```text
400 con mensaje sobre artist, space y time. No se acepta una actuación incompleta.
```

> **Ayuda / Resolución de problemas:** Connection refused,Arranca npm start en backend y deja esa terminal abierta.,404 o Missing Authentication Token,Compara método, /dev y ruta con el servidor. /events y /events/EVT-101 son rutas diferentes.

- [ ] **Verificación:** Contrasta estado y cuerpo; después relaciona la petición con el log de la función.

##### Paso 4: JSON roto

*curl -i permite contrastar el estado HTTP con el cuerpo JSON. El cliente y el handler son piezas diferentes.*

En una segunda terminal Git Bash, con el servidor activo, ejecuta:

```bash
curl -i -X POST http://localhost:3000/dev/events -H 'Content-Type: application/json' -d '{'
```

**Resultado esperado:**
```text
400 con message JSON inválido. El servidor continúa activo.
```

> **Ayuda / Resolución de problemas:** Connection refused,Arranca npm start en backend y deja esa terminal abierta.,404 o Missing Authentication Token,Compara método, /dev y ruta con el servidor. /events y /events/EVT-101 son rutas diferentes.

- [ ] **Verificación:** Contrasta estado y cuerpo; después relaciona la petición con el log de la función.

##### Paso 5: Comprueba el límite

*curl -i permite contrastar el estado HTTP con el cuerpo JSON. El cliente y el handler son piezas diferentes.*

En una segunda terminal Git Bash, con el servidor activo, ejecuta:

```bash
curl -i http://localhost:3000/dev/events/EVT-NEW
```

**Resultado esperado:**
```text
200 con ficha fija Neon Waves. No recupera Nova Pulse: el GET del bloque 02 no lee lo que envías por POST.
```

> **Ayuda / Resolución de problemas:** Connection refused,Arranca npm start en backend y deja esa terminal abierta.,404 o Missing Authentication Token,Compara método, /dev y ruta con el servidor. /events y /events/EVT-101 son rutas diferentes.

- [ ] **Verificación:** Contrasta estado y cuerpo; después relaciona la petición con el log de la función.


---

### Fase 5: Entiende

**Explica por qué ha funcionado**

*Relaciona la instrucción con el efecto observado antes de modificarla.*

#### Del código al comportamiento

| Paso / Elemento | Explicación |
|---|---|
| `unknown` | No se confía en el tipo del body por haberlo enviado desde nuestro cliente. |
| `try/catch` | La sintaxis JSON se valida antes de acceder a propiedades. |
| `statusCode: 201` | Expresa el resultado del contrato simulado; no añade persistencia. |

> [!TIP] **Predice antes de comprobar: Predice antes de probar**
> **Pregunta:** ¿Un body con time: "29:80" devolverá 201?
> 
> **Respuesta razonada:** No. La comprobación HH:mm lo rechaza con 400, aunque los tipos de TypeScript sean strings.


---

### Fase 6: Modifica

**Introduce un cambio pequeño y compruébalo**

*La modificación utiliza lo que acabas de aprender y conserva el contrato necesario para continuar.*

#### Valida un valor de dominio

**Pasos guiados para modificar el código:**

1. Repite el POST válido con status CANCELLED.
2. Después envía status PAUSED y time 29:80 en peticiones separadas.
3. Contrasta los dos 400 con el 201 anterior y restaura un body válido.


---

### Fase 7: Comprueba

**Contrasta tu comprensión**

*Estas preguntas son formativas, sin nota. Si fallas, lee la explicación y vuelve a intentarlo.*

> [!NOTE] **Autoevaluación: ¿Por qué el body se trata como unknown?**
> - [ ] 1. Porque TypeScript no admite JSON
> - [ ] 2. Porque la red puede traer cualquier valor y hay que comprobarlo
> - [ ] 3. Porque toda propiedad es opcional
> - [ ] 4. Porque evita compilar

> [!NOTE] **Autoevaluación: ¿Dónde se conserva el POST?**
> - [ ] 1. En un array permanente
> - [ ] 2. En AWS
> - [ ] 3. En ningún almacenamiento de este ejercicio
> - [ ] 4. En serverless.yml


---

### Fase 8: Cierra

**Documenta y deja el proyecto recuperable**

*Marca sólo las comprobaciones que has realizado en tu ordenador.*

*CONSTRUYE · ARCHIVOS COMPLETOS*

#### Deja una evidencia breve y recuperable

Recorre las pestañas de izquierda a derecha. Cada una contiene un archivo completo, no un fragmento que debas adivinar.

##### 📄 `evidencias/03/README.md`
**Responsabilidad:** Documentar lo que tú has comprobado, sin inventar evidencias.

Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.

> **Concepto clave:** Resultado,Completa cada apartado con tu ejecución. Este texto es una plantilla para tus respuestas.,Sin credenciales,No incluyas AWSDetails, tokens ni archivos .aws en capturas, Git o README.

```typescript
# Bloque 03

## Resultado
- Qué añadí al proyecto:
- Ruta o pantalla comprobada:
- Estado y respuesta observados:

## Comprensión
- Recorrido del dato, explicado con mis palabras:
- Cambio guiado y resultado:
- Error encontrado y cómo lo resolví:

## Evidencias
- Captura o transcripción breve, sin credenciales:
- Limitaciones del ejercicio:
```

> [!CHECKPOINT] **Comprobación:** Guarda con Ctrl+S. Comprueba nombre, extensión y ruta antes de pasar a la siguiente pestaña.

*HAZLO · OBSERVA · DIAGNOSTICA*

#### Guarda el hito del bloque

##### Paso 1: Git · revisa y guarda

*Un commit permite recuperar el proyecto acumulado en este punto. Revisar el diff evita subir archivos ajenos al ejercicio.*

Desde la raíz, completa el README de evidencias/03 y revisa los cambios. Los comandos añaden únicamente los archivos de este bloque. Antes del commit lee git diff --cached y verifica que el lockfile y las fuentes correctas están preparados.

```bash
cd /d/DEVOPS/04-PILARES-SERVERLESS
git status --short
git diff
git add backend/src/createEvent.ts backend/serverless.yml evidencias/03/README.md
git diff --cached
git commit -m "Completa bloque 03"
git push
git log -1 --oneline
```

**Resultado esperado:**
```text
El commit contiene tu documentación y los archivos de trabajo revisados. No aparecen node_modules, dist, .serverless, .env ni .aws.
```

> **Ayuda / Resolución de problemas:** No hay cambios preparados,Añade las rutas concretas que muestra git status y que pertenecen al bloque. No copies la línea de ejemplo si no corresponde a tus archivos.,Push rechazado o remoto ausente,Consulta la configuración Git del cierre del bloque 01. Conserva el commit local y resuelve acceso/remoto; no uses push --force.

- [ ] **Verificación:** Anota el hash con git log -1 --oneline y verifica en GitHub el contenido del commit.

#### ✅ Checkpoint · listo para continuar

- [ ] POST válido devuelve 201; JSON roto y campos inválidos devuelven 400.
- [ ] He contrastado por separado sintaxis, tipos de entrada y reglas de dominio.
- [ ] He explicado mi resultado en el README y guardado un commit recuperable.

> [!NOTE] **Siguiente paso**
> Bloque 04: organizarás los handlers y completarás los métodos HTTP sobre un catálogo fijo.

