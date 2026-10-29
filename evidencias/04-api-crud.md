# 04 · API CRUD

**BLOQUE 04 · APRENDIZAJE ASISTIDO**

## Un contrato HTTP completo y coherente

> Organiza los handlers TypeScript y prueba consultas, creación, sustitución, cambio parcial y eliminación simuladas.

🏷️ **Etiquetas:** `TypeScript` · `Festival Control`


---

### Fase 1: Destino

**Reconoce el resultado antes de construir**

*Organiza los handlers TypeScript y prueba consultas, creación, sustitución, cambio parcial y eliminación simuladas.*

> [!IMPORTANT] **Orientación de la Fase**
> - **Objetivo:** Disponer de cinco métodos sobre /events y /events/{id}, con 200/201, 400 y 404 comprobables.
> - **Requisitos previos:** Bloques 01–03: GET dinámico, POST, validación y compilación hacia dist.
> - **Nuevo contenido:** Módulo compartido, catálogo fijo, recurso inexistente, PUT frente a PATCH y CORS para el siguiente cliente.

#### Las piezas que necesitas comprender

| Componente | Responsabilidad |
|---|---|
| **CRUD y HTTP** | En este tour modelamos contratos de crear, leer, actualizar y eliminar. Su efecto persistente queda fuera de esta práctica. |
| **GET conocido y 404** | Ahora GET busca EVT-101 o EVT-102. El eco arbitrario de 02 se sustituye por una consulta real a este catálogo fijo. |
| **PUT y PATCH** | PUT exige el objeto completo, incluido status. PATCH acepta únicamente {"status":"CANCELLED"} o CONFIRMED. |
| **Módulo y CORS** | model.ts reúne tipos, catálogo y respuesta. cors: true configura OPTIONS; el header de json permite leer la respuesta desde otro origen web. |

#### Sigue el dato de principio a fin

`Cliente HTTP → Método + ruta → Handler de src/events → Validación y catálogo → Estado + JSON`

Las rutas siguen siendo acumulativas y hello se conserva. La separación de handlers no exige servicios distintos.


---

### Fase 2: Prepara

**Recupera el punto de partida**

*Continúas en el mismo repositorio del alumno. Comprueba el bloque anterior antes de modificar archivos.*

*HAZLO · OBSERVA · DIAGNOSTICA*

#### Prepara la carpeta y el checkpoint

##### Paso 1: Carpeta y bloque anterior

*El backend sigue usando package.json, tsconfig.json, hello.ts y las dependencias fijadas en 01. No se crea un servicio nuevo.*

Abre Git Bash en VS Code. Verifica el POST de 03 con body completo. Crea src/events desde VS Code. Detén Offline con Ctrl+C antes de editar su configuración.

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

> [!NOTE] **Árbol del incremento**
> backend/src/events/ contendrá model.ts, list.ts, get.ts, create.ts, replace.ts, update.ts y delete.ts. Conserva hello.ts y, durante la transición, getEvent.ts y createEvent.ts de 02–03: el nuevo YAML ya no los invoca. Evitamos borrar trabajo previo. Sólo se editan fuentes en src; dist se regenera.

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
    ├── src/events/{model,list,get,create,replace,update,delete}.ts
    └── dist/ (generado por npm run build)
```


---

### Fase 3: Construye

**Construye una pieza cada vez**

*Primero comprende su responsabilidad; después copia el archivo completo y comprueba su ruta.*

*CONSTRUYE · ARCHIVOS COMPLETOS*

#### Archivos de este bloque

Recorre las pestañas de izquierda a derecha. Cada una contiene un archivo completo, no un fragmento que debas adivinar.

##### 📄 `backend/src/events/model.ts`
**Responsabilidad:** Definir el contrato, catálogo fijo y validación compartida.

Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.

> **Concepto clave:** Omit<FestivalEvent, 'id'>,Deriva la entrada de escritura: el cliente no asigna id. En 04 status pasa a ser obligatorio en POST y PUT.,value is EventInput,Este type guard comunica al compilador que las comprobaciones han validado todos los campos.,Record<string, unknown>,Tras comprobar objeto no nulo ni array, podemos consultar claves; cada valor sigue requiriendo validación.,json y CORS,Todas las respuestas, incluidos errores, entregan JSON y permiten al navegador leerlas. El catálogo no se modifica.

```typescript
import type { APIGatewayProxyResult } from 'aws-lambda';

export type EventStatus = 'CONFIRMED' | 'CANCELLED';
export interface FestivalEvent {
  id: string;
  artist: string;
  space: string;
  time: string;
  status: EventStatus;
}
export type EventInput = Omit<FestivalEvent, 'id'>;

export const catalog: FestivalEvent[] = [
  { id: 'EVT-101', artist: 'Neon Waves', space: 'Main Stage', time: '22:30', status: 'CONFIRMED' },
  { id: 'EVT-102', artist: 'Midnight Session', space: 'Club Stage', time: '23:45', status: 'CONFIRMED' }
];

export const json = (statusCode: number, value: unknown): APIGatewayProxyResult => ({
  statusCode,
  headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  body: JSON.stringify(value)
});

export function readBody(text: string | null): Record<string, unknown> | null {
  try {
    const value: unknown = JSON.parse(text ?? 'null');
    return typeof value === 'object' && value !== null && !Array.isArray(value)
      ? value as Record<string, unknown> : null;
  } catch { return null; }
}

export function isEventInput(value: Record<string, unknown> | null): value is EventInput {
  return value !== null &&
    typeof value.artist === 'string' && value.artist.trim().length > 0 &&
    typeof value.space === 'string' && value.space.trim().length > 0 &&
    typeof value.time === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(value.time) &&
    (value.status === 'CONFIRMED' || value.status === 'CANCELLED');
}
```

> [!CHECKPOINT] **Comprobación:** Guarda con Ctrl+S. Comprueba nombre, extensión y ruta antes de pasar a la siguiente pestaña.

##### 📄 `backend/src/events/list.ts`
**Responsabilidad:** Devolver las dos actuaciones fijas.

Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.

> **Concepto clave:** import … './model.js',NodeNext usa la extensión de ejecución .js en el import; TypeScript encuentra model.ts y genera model.js.,Guardas y retorno anticipado,Un id ausente devuelve 400; un recurso desconocido, 404. Las escrituras se validan antes del 200/201.,Contrato simulado,El JSON describe la operación. Ninguna función muta catalog ni conserva cambios entre peticiones.

```typescript
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { catalog, json } from './model.js';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('LIST eventos:', event.httpMethod);
  return json(200, catalog);
};
```

> [!CHECKPOINT] **Comprobación:** Guarda con Ctrl+S. Comprueba nombre, extensión y ruta antes de pasar a la siguiente pestaña.

##### 📄 `backend/src/events/get.ts`
**Responsabilidad:** Buscar un id conocido o devolver 404.

Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.

> **Concepto clave:** import … './model.js',NodeNext usa la extensión de ejecución .js en el import; TypeScript encuentra model.ts y genera model.js.,Guardas y retorno anticipado,Un id ausente devuelve 400; un recurso desconocido, 404. Las escrituras se validan antes del 200/201.,Contrato simulado,El JSON describe la operación. Ninguna función muta catalog ni conserva cambios entre peticiones.

```typescript
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { catalog, json } from './model.js';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters?.id;
  console.log('GET evento:', id);
  if (!id) return json(400, { message: 'Falta id' });
  const found = catalog.find(item => item.id === id);
  return found ? json(200, found) : json(404, { message: 'Evento no encontrado' });
};
```

> [!CHECKPOINT] **Comprobación:** Guarda con Ctrl+S. Comprueba nombre, extensión y ruta antes de pasar a la siguiente pestaña.

##### 📄 `backend/src/events/create.ts`
**Responsabilidad:** Validar un objeto completo y devolver una creación simulada.

Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.

> **Concepto clave:** import … './model.js',NodeNext usa la extensión de ejecución .js en el import; TypeScript encuentra model.ts y genera model.js.,Guardas y retorno anticipado,Un id ausente devuelve 400; un recurso desconocido, 404. Las escrituras se validan antes del 200/201.,Contrato simulado,El JSON describe la operación. Ninguna función muta catalog ni conserva cambios entre peticiones.

```typescript
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { readBody, isEventInput, json } from './model.js';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const input = readBody(event.body);
  if (!isEventInput(input)) return json(400, { message: 'JSON con artist, space, time HH:mm y status válido requerido' });
  console.log('POST evento:', input.artist);
  return json(201, { id: 'EVT-NEW', artist: input.artist, space: input.space, time: input.time, status: input.status });
};
```

> [!CHECKPOINT] **Comprobación:** Guarda con Ctrl+S. Comprueba nombre, extensión y ruta antes de pasar a la siguiente pestaña.

##### 📄 `backend/src/events/replace.ts`
**Responsabilidad:** Simular la sustitución completa de una actuación conocida.

Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.

> **Concepto clave:** import … './model.js',NodeNext usa la extensión de ejecución .js en el import; TypeScript encuentra model.ts y genera model.js.,Guardas y retorno anticipado,Un id ausente devuelve 400; un recurso desconocido, 404. Las escrituras se validan antes del 200/201.,Contrato simulado,El JSON describe la operación. Ninguna función muta catalog ni conserva cambios entre peticiones.

```typescript
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { catalog, readBody, isEventInput, json } from './model.js';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters?.id;
  if (!id) return json(400, { message: 'Falta id' });
  if (!catalog.some(item => item.id === id)) return json(404, { message: 'Evento no encontrado' });
  const input = readBody(event.body);
  if (!isEventInput(input)) return json(400, { message: 'PUT requiere artist, space, time HH:mm y status válido' });
  console.log('PUT evento:', id);
  return json(200, { id, artist: input.artist, space: input.space, time: input.time, status: input.status, operation: 'REPLACED' });
};
```

> [!CHECKPOINT] **Comprobación:** Guarda con Ctrl+S. Comprueba nombre, extensión y ruta antes de pasar a la siguiente pestaña.

##### 📄 `backend/src/events/update.ts`
**Responsabilidad:** Simular el cambio parcial de status, único campo permitido aquí.

Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.

> **Concepto clave:** import … './model.js',NodeNext usa la extensión de ejecución .js en el import; TypeScript encuentra model.ts y genera model.js.,Guardas y retorno anticipado,Un id ausente devuelve 400; un recurso desconocido, 404. Las escrituras se validan antes del 200/201.,Contrato simulado,El JSON describe la operación. Ninguna función muta catalog ni conserva cambios entre peticiones.

```typescript
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { catalog, readBody, json } from './model.js';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters?.id;
  if (!id) return json(400, { message: 'Falta id' });
  if (!catalog.some(item => item.id === id)) return json(404, { message: 'Evento no encontrado' });
  const input = readBody(event.body);
  if (!input || Object.keys(input).length !== 1 || (input.status !== 'CONFIRMED' && input.status !== 'CANCELLED')) {
    return json(400, { message: 'PATCH admite únicamente status CONFIRMED o CANCELLED' });
  }
  console.log('PATCH evento:', id);
  return json(200, { id, changes: { status: input.status }, operation: 'UPDATED' });
};
```

> [!CHECKPOINT] **Comprobación:** Guarda con Ctrl+S. Comprueba nombre, extensión y ruta antes de pasar a la siguiente pestaña.

##### 📄 `backend/src/events/delete.ts`
**Responsabilidad:** Simular la eliminación de una actuación conocida.

Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.

> **Concepto clave:** import … './model.js',NodeNext usa la extensión de ejecución .js en el import; TypeScript encuentra model.ts y genera model.js.,Guardas y retorno anticipado,Un id ausente devuelve 400; un recurso desconocido, 404. Las escrituras se validan antes del 200/201.,Contrato simulado,El JSON describe la operación. Ninguna función muta catalog ni conserva cambios entre peticiones.

```typescript
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { catalog, json } from './model.js';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters?.id;
  if (!id) return json(400, { message: 'Falta id' });
  if (!catalog.some(item => item.id === id)) return json(404, { message: 'Evento no encontrado' });
  console.log('DELETE evento:', id);
  return json(200, { id, operation: 'DELETED' });
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
    handler: dist/events/get.handler
    events:
      - http:
          path: events/{id}
          method: get
          cors: true

  createEvent:
    handler: dist/events/create.handler
    events:
      - http:
          path: events
          method: post
          cors: true

  listEvents:
    handler: dist/events/list.handler
    events:
      - http:
          path: events
          method: get
          cors: true

  replaceEvent:
    handler: dist/events/replace.handler
    events:
      - http:
          path: events/{id}
          method: put
          cors: true

  updateEvent:
    handler: dist/events/update.handler
    events:
      - http:
          path: events/{id}
          method: patch
          cors: true

  deleteEvent:
    handler: dist/events/delete.handler
    events:
      - http:
          path: events/{id}
          method: delete
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

##### Paso 2: GET lista y detalle

*curl -i permite contrastar el estado HTTP con el cuerpo JSON. El cliente y el handler son piezas diferentes.*

En una segunda terminal Git Bash, con el servidor activo, ejecuta:

```bash
curl -i http://localhost:3000/dev/events
curl -i http://localhost:3000/dev/events/EVT-101
curl -i http://localhost:3000/dev/events/NO-EXISTE
```

**Resultado esperado:**
```text
200 con dos eventos; 200 con EVT-101; 404 para NO-EXISTE. EVT-104 ya no pertenece al catálogo.
```

> **Ayuda / Resolución de problemas:** Connection refused,Arranca npm start en backend y deja esa terminal abierta.,404 o Missing Authentication Token,Compara método, /dev y ruta con el servidor. /events y /events/EVT-101 son rutas diferentes.

- [ ] **Verificación:** Contrasta estado y cuerpo; después relaciona la petición con el log de la función.

##### Paso 3: POST y PUT

*curl -i permite contrastar el estado HTTP con el cuerpo JSON. El cliente y el handler son piezas diferentes.*

En una segunda terminal Git Bash, con el servidor activo, ejecuta:

```bash
curl -i -X POST http://localhost:3000/dev/events -H 'Content-Type: application/json' -d '{"artist":"Nova Pulse","space":"Main Stage","time":"21:00","status":"CONFIRMED"}'
curl -i -X PUT http://localhost:3000/dev/events/EVT-101 -H 'Content-Type: application/json' -d '{"artist":"Nova Pulse","space":"Main Stage","time":"21:00","status":"CONFIRMED"}'
```

**Resultado esperado:**
```text
POST: 201 y EVT-NEW. PUT: 200 con id EVT-101 y operation REPLACED.
```

> **Ayuda / Resolución de problemas:** Connection refused,Arranca npm start en backend y deja esa terminal abierta.,404 o Missing Authentication Token,Compara método, /dev y ruta con el servidor. /events y /events/EVT-101 son rutas diferentes.

- [ ] **Verificación:** Contrasta estado y cuerpo; después relaciona la petición con el log de la función.

##### Paso 4: PATCH y DELETE

*curl -i permite contrastar el estado HTTP con el cuerpo JSON. El cliente y el handler son piezas diferentes.*

En una segunda terminal Git Bash, con el servidor activo, ejecuta:

```bash
curl -i -X PATCH http://localhost:3000/dev/events/EVT-101 -H 'Content-Type: application/json' -d '{"status":"CANCELLED"}'
curl -i -X DELETE http://localhost:3000/dev/events/EVT-102
```

**Resultado esperado:**
```text
PATCH: 200 con changes.status CANCELLED y operation UPDATED. DELETE: 200 con id EVT-102 y operation DELETED.
```

> **Ayuda / Resolución de problemas:** Connection refused,Arranca npm start en backend y deja esa terminal abierta.,404 o Missing Authentication Token,Compara método, /dev y ruta con el servidor. /events y /events/EVT-101 son rutas diferentes.

- [ ] **Verificación:** Contrasta estado y cuerpo; después relaciona la petición con el log de la función.

##### Paso 5: Errores y ausencia de persistencia

*curl -i permite contrastar el estado HTTP con el cuerpo JSON. El cliente y el handler son piezas diferentes.*

En una segunda terminal Git Bash, con el servidor activo, ejecuta:

```bash
curl -i -X PUT http://localhost:3000/dev/events/EVT-101 -H 'Content-Type: application/json' -d '{"status":"CANCELLED"}'
curl -i -X PATCH http://localhost:3000/dev/events/EVT-101 -H 'Content-Type: application/json' -d '{"time":"22:00"}'
curl -i http://localhost:3000/dev/events
```

**Resultado esperado:**
```text
Ambas escrituras inválidas: 400. GET conserva dos eventos y status CONFIRMED. Repite la secuencia válida en Thunder Client.
```

> **Ayuda / Resolución de problemas:** Connection refused,Arranca npm start en backend y deja esa terminal abierta.,404 o Missing Authentication Token,Compara método, /dev y ruta con el servidor. /events y /events/EVT-101 son rutas diferentes.

- [ ] **Verificación:** Contrasta estado y cuerpo; después relaciona la petición con el log de la función.

##### Paso 6: Preflight para el navegador

*curl -i permite contrastar el estado HTTP con el cuerpo JSON. El cliente y el handler son piezas diferentes.*

En una segunda terminal Git Bash, con el servidor activo, ejecuta:

```bash
curl -i -X OPTIONS http://localhost:3000/dev/events -H 'Origin: http://localhost:8081' -H 'Access-Control-Request-Method: POST' -H 'Access-Control-Request-Headers: content-type'
```

**Resultado esperado:**
```text
OPTIONS responde 2xx, permite el origen y el método POST, y admite Content-Type. En un GET normal también aparece Access-Control-Allow-Origin.
```

> **Ayuda / Resolución de problemas:** No hay headers CORS,Revisa cors: true en todos los eventos HTTP y los headers del helper json. Reinicia Offline.,Connection refused,Arranca npm start en backend y deja esa terminal abierta.,404 o Missing Authentication Token,Compara método, /dev y ruta con el servidor. /events y /events/EVT-101 son rutas diferentes.

- [ ] **Verificación:** Contrasta estado y cuerpo; después relaciona la petición con el log de la función.


---

### Fase 5: Entiende

**Explica por qué ha funcionado**

*Relaciona la instrucción con el efecto observado antes de modificarla.*

#### Del código al comportamiento

| Paso / Elemento | Explicación |
|---|---|
| `catalog.find / catalog.some` | find devuelve la ficha; some comprueba si existe el id antes de simular una escritura. |
| `isEventInput(input)` | POST y PUT validan el objeto entero, incluido status. |
| `Object.keys(input).length !== 1` | Este PATCH sólo admite status: no anuncia cambios que no implementa. |
| `json(200, { operation: … })` | Devuelve el resultado del contrato; no modifica el array. |

> [!TIP] **Predice antes de comprobar: Predice antes de probar**
> **Pregunta:** Después de DELETE EVT-102, ¿cuántos eventos trae GET /events?
> 
> **Respuesta razonada:** Dos. La simulación devuelve DELETED pero no modifica catalog. Demostrar este límite forma parte del aprendizaje.


---

### Fase 6: Modifica

**Introduce un cambio pequeño y compruébalo**

*La modificación utiliza lo que acabas de aprender y conserva el contrato necesario para continuar.*

#### Contrasta sustitución y cambio parcial

**Pasos guiados para modificar el código:**

1. Envía sólo status CANCELLED mediante PUT a EVT-101.
2. Envía exactamente el mismo body mediante PATCH.
3. Consulta de nuevo EVT-101 y explica por qué conserva CONFIRMED.


---

### Fase 7: Comprueba

**Contrasta tu comprensión**

*Estas preguntas son formativas, sin nota. Si fallas, lee la explicación y vuelve a intentarlo.*

> [!NOTE] **Autoevaluación: ¿Qué entrada acepta este PATCH?**
> - [ ] 1. Cualquier campo desconocido
> - [ ] 2. El evento entero
> - [ ] 3. Sólo status válido
> - [ ] 4. Un array de eventos

> [!NOTE] **Autoevaluación: ¿Qué falta para que DELETE cambie futuras consultas?**
> - [ ] 1. Otro console.log
> - [ ] 2. Almacenamiento y operaciones de persistencia
> - [ ] 3. Cambiar 200 por 204
> - [ ] 4. Renombrar .ts a .js


---

### Fase 8: Cierra

**Documenta y deja el proyecto recuperable**

*Marca sólo las comprobaciones que has realizado en tu ordenador.*

*CONSTRUYE · ARCHIVOS COMPLETOS*

#### Deja una evidencia breve y recuperable

Recorre las pestañas de izquierda a derecha. Cada una contiene un archivo completo, no un fragmento que debas adivinar.

##### 📄 `evidencias/04/README.md`
**Responsabilidad:** Documentar lo que tú has comprobado, sin inventar evidencias.

Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.

> **Concepto clave:** Resultado,Completa cada apartado con tu ejecución. Este texto es una plantilla para tus respuestas.,Sin credenciales,No incluyas AWSDetails, tokens ni archivos .aws en capturas, Git o README.

```typescript
# Bloque 04

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

Desde la raíz, completa el README de evidencias/04 y revisa los cambios. Los comandos añaden únicamente los archivos de este bloque. Antes del commit lee git diff --cached y verifica que el lockfile y las fuentes correctas están preparados.

```bash
cd /d/DEVOPS/04-PILARES-SERVERLESS
git status --short
git diff
git add backend/src/events backend/serverless.yml evidencias/04/README.md
git diff --cached
git commit -m "Completa bloque 04"
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

- [ ] He probado los cinco métodos y los errores 400/404.
- [ ] El YAML conserva hello y apunta a dist/events.
- [ ] He observado OPTIONS y las cabeceras CORS.
- [ ] He explicado mi resultado en el README y guardado un commit recuperable.

> [!NOTE] **Siguiente paso**
> Bloque 05: construirás la interfaz React Native en TypeScript; primero con datos locales, después con esta API.

