# 02 · GET + parámetros

**BLOQUE 02 · APRENDIZAJE ASISTIDO**

## La URL lleva el identificador

> Recibe un parámetro de ruta, sigue su valor en el handler TypeScript y contrástalo con la respuesta.

🏷️ **Etiquetas:** `TypeScript` · `Festival Control`


---

### Fase 1: Destino

**Reconoce el resultado antes de construir**

*Recibe un parámetro de ruta, sigue su valor en el handler TypeScript y contrástalo con la respuesta.*

> [!IMPORTANT] **Orientación de la Fase**
> - **Objetivo:** Consultar /events/EVT-104 y demostrar que el id de la URL llega a pathParameters.
> - **Requisitos previos:** Bloque 01 terminado: backend TypeScript, compilación y GET /hello funcionando.
> - **Nuevo contenido:** Ruta dinámica, parámetro opcional y diferencias entre configuración y URL real.

#### Las piezas que necesitas comprender

| Componente | Responsabilidad |
|---|---|
| **GET** | Pide información. El dato identificador viaja en la URL. |
| **/events/{id}** | Las llaves se escriben en YAML. En el cliente se sustituyen por un valor: /events/EVT-104. |
| **event.pathParameters?.id** | Optional chaining contempla que el evento no traiga parámetros. El tipo resultante es string | undefined. |
| **400 y 200** | 400 expresa una entrada insuficiente; 200 confirma la respuesta correcta. El tipo HTTP es numérico. |

#### Sigue el dato de principio a fin

`Cliente → GET /events/EVT-104 → { id: "EVT-104" } → getEvent.handler → 200 + JSON`

Offline interpreta el YAML y construye event. El console.log muestra el id, no demuestra que exista una base de datos.


---

### Fase 2: Prepara

**Recupera el punto de partida**

*Continúas en el mismo repositorio del alumno. Comprueba el bloque anterior antes de modificar archivos.*

*HAZLO · OBSERVA · DIAGNOSTICA*

#### Prepara la carpeta y el checkpoint

##### Paso 1: Carpeta y bloque anterior

*El backend sigue usando package.json, tsconfig.json, hello.ts y las dependencias fijadas en 01. No se crea un servicio nuevo.*

Abre Git Bash en VS Code. Comprueba que GET /hello funciona con el hito 01. Detén Offline con Ctrl+C antes de editar su configuración.

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
    └── dist/ (generado por npm run build)
```


---

### Fase 3: Construye

**Construye una pieza cada vez**

*Primero comprende su responsabilidad; después copia el archivo completo y comprueba su ruta.*

*CONSTRUYE · ARCHIVOS COMPLETOS*

#### Archivos de este bloque

Recorre las pestañas de izquierda a derecha. Cada una contiene un archivo completo, no un fragmento que debas adivinar.

##### 📄 `backend/src/getEvent.ts`
**Responsabilidad:** Leer el id y construir una respuesta HTTP tipada.

Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.

> **Concepto clave:** APIGatewayProxyEvent,Tipo de la entrada REST; la importación type desaparece al compilar.,if (!id),Corta la ejecución si no llega identificador; evita devolver undefined.,JSON.stringify,Convierte el objeto TypeScript en el texto exigido por body.

```typescript
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters?.id;
  console.log('GET evento:', id);
  if (!id) return { statusCode: 400, body: JSON.stringify({ message: 'Falta id' }) };
  return {
    statusCode: 200,
    body: JSON.stringify({ id, artist: 'Neon Waves', space: 'Main Stage', time: '22:30', status: 'CONFIRMED' })
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

##### Paso 2: Primer id

*curl -i permite contrastar el estado HTTP con el cuerpo JSON. El cliente y el handler son piezas diferentes.*

En una segunda terminal Git Bash, con el servidor activo, ejecuta:

```bash
curl -i http://localhost:3000/dev/events/EVT-104
```

**Resultado esperado:**
```text
200 y body con id EVT-104. En backend aparece GET evento: EVT-104.
```

> **Ayuda / Resolución de problemas:** Connection refused,Arranca npm start en backend y deja esa terminal abierta.,404 o Missing Authentication Token,Compara método, /dev y ruta con el servidor. /events y /events/EVT-101 son rutas diferentes.

- [ ] **Verificación:** Contrasta estado y cuerpo; después relaciona la petición con el log de la función.

##### Paso 3: Otro cliente e id

*curl -i permite contrastar el estado HTTP con el cuerpo JSON. El cliente y el handler son piezas diferentes.*

En una segunda terminal Git Bash, con el servidor activo, ejecuta:

```bash
curl -i http://localhost:3000/dev/events/EVT-205
```

**Resultado esperado:**
```text
200 con id EVT-205, sin editar TypeScript. Repite GET desde Thunder Client con el mismo valor.
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
| `path: events/{id}` | La configuración acepta un segmento variable. |
| `event.pathParameters?.id` | El valor de ese segmento llega como string. |
| `id dentro del body` | La respuesta refleja el dato recibido; los otros campos siguen siendo literales. |

> [!TIP] **Predice antes de comprobar: Predice antes de probar**
> **Pregunta:** ¿Qué pasa si solicitas EVT-999 sin tocar el código?
> 
> **Respuesta razonada:** Recibirás id EVT-999 y la misma ficha simulada. El bloque 04 introducirá una búsqueda en dos eventos conocidos y su 404.


---

### Fase 6: Modifica

**Introduce un cambio pequeño y compruébalo**

*La modificación utiliza lo que acabas de aprender y conserva el contrato necesario para continuar.*

#### Sigue un tercer identificador

**Pasos guiados para modificar el código:**

1. Solicita /events/EVT-330 con curl y Thunder.
2. Predice id antes de pulsar Send.
3. Contrasta el JSON y el log; no modifiques la función para cada id.


---

### Fase 7: Comprueba

**Contrasta tu comprensión**

*Estas preguntas son formativas, sin nota. Si fallas, lee la explicación y vuelve a intentarlo.*

> [!NOTE] **Autoevaluación: ¿Dónde llega EVT-104?**
> - [ ] 1. En event.body
> - [ ] 2. En event.pathParameters.id
> - [ ] 3. En package.json
> - [ ] 4. En el nombre del archivo

> [!NOTE] **Autoevaluación: ¿Qué demuestra la ficha devuelta?**
> - [ ] 1. Que hay una base de datos
> - [ ] 2. Que se ha guardado un evento
> - [ ] 3. Que el handler recibió el id y creó una respuesta simulada
> - [ ] 4. Que se desplegó en AWS


---

### Fase 8: Cierra

**Documenta y deja el proyecto recuperable**

*Marca sólo las comprobaciones que has realizado en tu ordenador.*

*CONSTRUYE · ARCHIVOS COMPLETOS*

#### Deja una evidencia breve y recuperable

Recorre las pestañas de izquierda a derecha. Cada una contiene un archivo completo, no un fragmento que debas adivinar.

##### 📄 `evidencias/02/README.md`
**Responsabilidad:** Documentar lo que tú has comprobado, sin inventar evidencias.

Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.

> **Concepto clave:** Resultado,Completa cada apartado con tu ejecución. Este texto es una plantilla para tus respuestas.,Sin credenciales,No incluyas AWSDetails, tokens ni archivos .aws en capturas, Git o README.

```typescript
# Bloque 02

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

Desde la raíz, completa el README de evidencias/02 y revisa los cambios. Los comandos añaden únicamente los archivos de este bloque. Antes del commit lee git diff --cached y verifica que el lockfile y las fuentes correctas están preparados.

```bash
cd /d/DEVOPS/04-PILARES-SERVERLESS
git status --short
git diff
git add backend/src/getEvent.ts backend/serverless.yml evidencias/02/README.md
git diff --cached
git commit -m "Completa bloque 02"
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

- [ ] Dos ids diferentes han llegado al mismo handler.
- [ ] GET /hello sigue respondiendo y comprendo la simulación.
- [ ] He explicado mi resultado en el README y guardado un commit recuperable.

> [!NOTE] **Siguiente paso**
> Bloque 03: el cliente enviará un objeto en el body mediante POST.

