# 09 · Cloud Launch

**BLOQUE 09 · APRENDIZAJE ASISTIDO**

## La misma pantalla consume el endpoint AWS

> Cambia la URL base, comprueba los cinco métodos y demuestra que las peticiones llegan a las Lambdas cloud.

🏷️ **Etiquetas:** `TypeScript` · `Festival Control`


---

### Fase 1: Destino

**Reconoce el resultado antes de construir**

*Cambia la URL base, comprueba los cinco métodos y demuestra que las peticiones llegan a las Lambdas cloud.*

> [!IMPORTANT] **Orientación de la Fase**
> - **Objetivo:** Usar Festival Control contra AWS con Offline detenido y observar las invocaciones reales.
> - **Requisitos previos:** Interfaz de 07 y despliegue verificado de 08. Sesión del lab vigente y variables de región/servicio/rol preparadas.
> - **Nuevo contenido:** Cambio de entorno, diagnóstico por capas y evidencia completa de cliente a Lambda.

#### Las piezas que necesitas comprender

| Componente | Responsabilidad |
|---|---|
| **URL base real** | Se obtiene con serverless info del servicio de ese alumno, región y stage. El texto TU_API es un marcador que debes sustituir antes de ejecutar. |
| **Contrato estable** | Los métodos, rutas y campos de 04–07 se conservan. La interfaz no tiene que conocer nombres internos de Lambda. |
| **Prueba por capas** | Primero curl/Thunder contra AWS, después navegador y finalmente logs. Así distingues endpoint, CORS, cliente y ejecución. |
| **Evidencia cloud** | Offline detenido y una invocación en CloudWatch permiten demostrar el destino real; dos tarjetas similares no bastan. |

#### Sigue el dato de principio a fin

`Pressable / useEffect → api.ts con HTTPS → API Gateway → Lambda desplegada → JSON → pantalla + logs`

El cambio de entorno se concentra en API_URL. Conservar el contrato evita reescribir App.tsx.


---

### Fase 2: Prepara

**Recupera el punto de partida**

*Continúas en el mismo repositorio del alumno. Comprueba el bloque anterior antes de modificar archivos.*

*HAZLO · OBSERVA · DIAGNOSTICA*

#### Prepara la carpeta y el checkpoint

##### Paso 1: Recupera sesión y endpoint

*Las variables exportadas no están en una terminal nueva. Si vuelves otro día, repite perfil y variables de Prepara en 08 antes de usar Serverless.*

Detén únicamente Offline. En backend consulta el servicio desplegado; copia la base real hasta /dev. Si cambiaste STUDENT_CODE, estarías consultando otro servicio.

```bash
cd /d/DEVOPS/04-PILARES-SERVERLESS/backend
aws sts get-caller-identity --profile academy
npx serverless info --stage dev --region "$AWS_REGION"
```

**Resultado esperado:**
```text
STS válido y endpoint real del servicio de 08. El servidor local queda detenido.
```

> **Ayuda / Resolución de problemas:** Framework solicita login,Autentica Serverless Framework como en 01. Es independiente de la sesión Academy.,AccessDenied / CREATE_FAILED,Lee el primer recurso y permiso denegado en CloudFormation → Events. Comunica al profesor recurso y acción, sin claves. No añadas permisos ni repitas despliegues a ciegas.,Token caducado,Renueva las tres credenciales de academy y comprueba STS de nuevo.,Variables env ausentes,Vuelve a Prepara y usa la misma terminal con AWS_REGION, STUDENT_CODE y LAMBDA_ROLE_ARN.

- [ ] **Verificación:** No reutilices una URL de otro alumno ni el marcador del ejemplo.

##### Paso 2: Verifica AWS antes de Expo

*El endpoint debe responder independientemente de React Native.*

Introduce la URL obtenida y verifica el catálogo. Después repite GET con Thunder.

```bash
read -r -p "URL base AWS real, hasta /dev: " API_BASE
curl -i "$API_BASE/events"
```

**Resultado esperado:**
```text
200 con dos actuaciones y cabecera Access-Control-Allow-Origin.
```

> **Ayuda / Resolución de problemas:** Falla curl,Resuelve endpoint, deploy o lab antes de modificar el cliente.,No hay CORS,Revisa YAML y json del bloque 04, vuelve a desplegar y repite la prueba.

- [ ] **Verificación:** Backend cloud comprobado. Sólo ahora cambia api.ts.

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

└── mobile/
    ├── package.json + package-lock.json
    ├── app.json + tsconfig.json
    ├── App.tsx
    └── src/
        ├── types.ts
        └── api.ts
```


---

### Fase 3: Construye

**Construye una pieza cada vez**

*Primero comprende su responsabilidad; después copia el archivo completo y comprueba su ruta.*

*CONSTRUYE · ARCHIVOS COMPLETOS*

#### Archivos de este bloque

Recorre las pestañas de izquierda a derecha. Cada una contiene un archivo completo, no un fragmento que debas adivinar.

##### 📄 `mobile/src/api.ts`
**Responsabilidad:** Centralizar URL, métodos, serialización y errores HTTP.

Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.

> **Concepto clave:** API_URL,URL base del servidor, sin barra final y sin /events. En el navegador de este PC, localhost se refiere a ese mismo PC.,fetch + response.ok,fetch puede completar con 400/404. response.ok distingue esos errores de una respuesta correcta.,unknown y type guard,Antes de renderizar una lista, comprobamos su forma. Los tipos estáticos no validan JSON remoto.,encodeURIComponent,Codifica un id al construir una URL. POST/PUT envían objeto completo; PATCH sólo status.

```typescript
import type { FestivalEvent, EventInput, EventStatus } from './types';

// URL base sin /events al final. Sustituye sólo este valor en el bloque 09.
export const API_URL = 'https://TU_API.execute-api.TU_REGION.amazonaws.com/dev';

async function request(path: string, method = 'GET', body?: unknown): Promise<unknown> {
  const response = await fetch(API_URL + path, {
    method,
    ...(body !== undefined ? { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : {})
  });
  const value: unknown = await response.json();
  if (!response.ok) {
    const message = typeof value === 'object' && value !== null && 'message' in value
      ? String(value.message) : response.statusText;
    throw new Error('HTTP ' + response.status + ': ' + message);
  }
  return value;
}

function isFestivalEvent(value: unknown): value is FestivalEvent {
  return typeof value === 'object' && value !== null &&
    'id' in value && typeof value.id === 'string' &&
    'artist' in value && typeof value.artist === 'string' &&
    'space' in value && typeof value.space === 'string' &&
    'time' in value && typeof value.time === 'string' &&
    'status' in value && (value.status === 'CONFIRMED' || value.status === 'CANCELLED');
}

export async function getEvents(): Promise<FestivalEvent[]> {
  const value = await request('/events');
  if (!Array.isArray(value) || !value.every(isFestivalEvent)) throw new Error('La API no devolvió una lista de actuaciones válida');
  return value;
}

export const createEvent = (input: EventInput) => request('/events', 'POST', input);
export const replaceEvent = (id: string, input: EventInput) => request('/events/' + encodeURIComponent(id), 'PUT', input);
export const updateEvent = (id: string, status: EventStatus) => request('/events/' + encodeURIComponent(id), 'PATCH', { status });
export const deleteEvent = (id: string) => request('/events/' + encodeURIComponent(id), 'DELETE');
```

> [!CHECKPOINT] **Comprobación:** Guarda con Ctrl+S. Comprueba nombre, extensión y ruta antes de pasar a la siguiente pestaña.

> [!NOTE] **STOP · sustituye el marcador antes de ejecutar**
> En API_URL pega la base HTTPS real obtenida de tu despliegue. No dejes TU_API o TU_REGION, no añadas /events ni pongas claves. Conserva App.tsx y types.ts completos de 07. La única diferencia del archivo respecto a 07 es el valor de API_URL.


---

### Fase 4: Prueba

**Prueba por capas y conserva las evidencias**

*No avances porque una pantalla parezca correcta. Contrasta acción, respuesta y diagnóstico.*

*HAZLO · OBSERVA · DIAGNOSTICA*

#### Ejecuta las pruebas del bloque

##### Paso 1: Expo · navegador del aula

*React Native Web utiliza los componentes React Native en el navegador. Esta es la vía común del ejercicio, sin instalar Expo Go.*

En una terminal exclusiva de mobile ejecuta npm run web. Acepta abrir el navegador o pulsa w. Conserva la URL que muestra Expo; si 8081 está ocupado, usa el puerto que proponga.

```bash
npm run typecheck
npm run web
```

**Resultado esperado:**
```text
La pestaña muestra Festival Control, fondo negro y acentos rosas; no hay error de Metro.
```

> **Ayuda / Resolución de problemas:** Cannot find module,Dentro de mobile ejecuta npm install con el package.json completo de 05.,Puerto ocupado,Acepta un puerto libre. El API_URL sigue apuntando al backend, no al puerto de Expo.,Expo Go / teléfono,La práctica principal usa navegador. El teléfono es opcional y exige versión compatible del SDK, URL LAN del PC y red permitida. No uses localhost en un teléfono para llegar al PC.

- [ ] **Verificación:** Anota la URL del frontend por separado de la URL del backend.

##### Paso 2: Comprueba los cinco métodos

*Cada petición debe ir al dominio execute-api real. No basta con conservar una pestaña de una sesión anterior.*

Con Offline detenido abre Network, recarga el navegador y prueba GET recargar y los cuatro botones. Selecciona las peticiones y revisa Request URL, Method, Payload, Status y Response.

```bash
GET /events → 200
POST /events → 201
PUT /events/EVT-101 → 200
PATCH /events/EVT-101 → 200
DELETE /events/EVT-102 → 200
```

**Resultado esperado:**
```text
Todas las URLs son HTTPS del endpoint de tu servicio. El resultado se muestra en pantalla; GET conserva dos eventos tras las escrituras.
```

> **Ayuda / Resolución de problemas:** Sigue llamando a localhost,Guarda api.ts y recarga. Comprueba que ejecutas mobile del repositorio correcto.,CORS sólo en escrituras,Inspecciona OPTIONS, cors: true y Content-Type. Revisa errores del backend: también necesitan headers CORS.,Falla toda la API,Comprueba curl/Thunder de nuevo; el lab o endpoint pueden haber dejado de estar disponibles.

- [ ] **Verificación:** Guarda una tabla de las cinco peticiones y sus resultados, sin capturar credenciales.

##### Paso 3: Prueba la ejecución cloud

*La evidencia final conecta la acción con la Lambda desplegada.*

En backend consulta logs de updateEvent, pulsa PATCH y vuelve a consultar. Repite listEvents después de recargar la lista. Usa la terminal con las variables de 08.

```bash
npx serverless logs -f updateEvent --stage dev --region "$AWS_REGION"
npx serverless logs -f listEvents --stage dev --region "$AWS_REGION"
```

**Resultado esperado:**
```text
Logs muestran PATCH evento: EVT-101 y LIST eventos: GET coincidiendo con tus acciones.
```

> **Ayuda / Resolución de problemas:** No aparece el log todavía,Espera unos segundos y consulta otra vez. Confirma función, servicio, región y stage.,AccessDenied de logs,Registra la restricción del lab para el profesor. No inventes trazas ni cambies políticas.

- [ ] **Verificación:** Relaciona la hora aproximada, acción, petición y log; identifica expresamente la ausencia de persistencia.


---

### Fase 5: Entiende

**Explica por qué ha funcionado**

*Relaciona la instrucción con el efecto observado antes de modificarla.*

#### Del código al comportamiento

| Paso / Elemento | Explicación |
|---|---|
| `API_URL = https://…/dev` | Centraliza la selección del destino sin cambiar los componentes. |
| `Network → Request URL` | Demuestra a qué origen se envió la petición del navegador. |
| `logs -f updateEvent` | Corrobora el destino con una ejecución cloud de la función que atiende PATCH. |

> [!TIP] **Predice antes de comprobar: Predice antes de probar**
> **Pregunta:** ¿Necesita el navegador aws_access_key_id para llamar a esta API?
> 
> **Respuesta razonada:** No. La API de práctica es pública, sin autenticación. Las credenciales temporales se usan para administrar el despliegue desde el equipo y jamás se incorporan al cliente.


---

### Fase 6: Modifica

**Introduce un cambio pequeño y compruébalo**

*La modificación utiliza lo que acabas de aprender y conserva el contrato necesario para continuar.*

#### Compara entornos sin reescribir la interfaz

**Pasos guiados para modificar el código:**

1. Anota la URL local de 07 y la base cloud real de este bloque.
2. Conserva una captura de GET y PATCH cloud en Network y sus logs.
3. Explica qué línea cambiarías para volver a local y qué proceso tendrías que arrancar. Deja la configuración final apuntando a cloud.


---

### Fase 7: Comprueba

**Contrasta tu comprensión**

*Estas preguntas son formativas, sin nota. Si fallas, lee la explicación y vuelve a intentarlo.*

> [!NOTE] **Autoevaluación: ¿Qué prueba completa la demostración cloud?**
> - [ ] 1. Sólo ver las tarjetas
> - [ ] 2. Offline detenido, URL HTTPS real en Network e invocación en logs
> - [ ] 3. Cambiar el título
> - [ ] 4. Un comentario que diga AWS

> [!NOTE] **Autoevaluación: ¿Qué has construido al terminar?**
> - [ ] 1. Un sistema con persistencia
> - [ ] 2. Una interfaz sin HTTP
> - [ ] 3. Un recorrido full stack con contratos simulados, ejecutado en local y AWS
> - [ ] 4. Una base de datos en el cliente


---

### Fase 8: Cierra

**Documenta y deja el proyecto recuperable**

*Marca sólo las comprobaciones que has realizado en tu ordenador.*

*CONSTRUYE · ARCHIVOS COMPLETOS*

#### Deja una evidencia breve y recuperable

Recorre las pestañas de izquierda a derecha. Cada una contiene un archivo completo, no un fragmento que debas adivinar.

##### 📄 `evidencias/09/README.md`
**Responsabilidad:** Documentar lo que tú has comprobado, sin inventar evidencias.

Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.

> **Concepto clave:** Resultado,Completa cada apartado con tu ejecución. Este texto es una plantilla para tus respuestas.,Sin credenciales,No incluyas AWSDetails, tokens ni archivos .aws en capturas, Git o README.

```typescript
# Bloque 09

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

Desde la raíz, completa el README de evidencias/09 y revisa los cambios. Los comandos añaden únicamente los archivos de este bloque. Antes del commit lee git diff --cached y verifica que el lockfile y las fuentes correctas están preparados.

```bash
cd /d/DEVOPS/04-PILARES-SERVERLESS
git status --short
git diff
git add mobile/src/api.ts evidencias/09/README.md
git diff --cached
git commit -m "Completa bloque 09"
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

- [ ] Los cinco métodos apuntan al endpoint real y muestran los estados esperados.
- [ ] He relacionado las peticiones con logs cloud y conservado las evidencias.
- [ ] Comprendo el alcance de la simulación y puedo distinguir local de cloud.
- [ ] He explicado mi resultado en el README y guardado un commit recuperable.

> [!NOTE] **Siguiente paso**
> Entrenamiento Venue Control: transfieres el aprendizaje a espacios del recinto, con requisitos y rúbrica, sin receta ni archivos solución.

