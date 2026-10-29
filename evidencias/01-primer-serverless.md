# 01 · Primer Serverless

**BLOQUE 01 · BACKEND LOCAL · APRENDIZAJE ASISTIDO**

## Tu primera función Serverless

> Construye un handler TypeScript tipado, compílalo e invócalo por HTTP.

🏷️ **Etiquetas:** `TypeScript` · `Node 22` · `Serverless Framework` · `HTTP`


---

### Fase 1: Destino

**Mira qué vas a conseguir**

*Primero reconoce el resultado. Después construiremos las piezas que lo hacen posible.*

> [!IMPORTANT] **Orientación de la Fase**
> - **Objetivo:** Recibir GET /dev/hello en tu ordenador y devolver un mensaje JSON con estado 200.
> - **Requisitos previos:** TypeScript ya trabajado en clase. Node 22, npm, VS Code y Git Bash preparados en el [bloque 00 · Preparación](#preparacion).
> - **Nuevo contenido:** La entrada y salida de una Lambda HTTP, su compilación y la relación entre ruta, evento y handler.

#### Cuatro piezas, cuatro responsabilidades

| Componente | Responsabilidad |
|---|---|
| **Serverless Framework** | Lee la configuración del servicio. Más adelante también podrá desplegarlo; hoy nos ayuda a organizarlo. |
| **serverless.yml** | Declara la plataforma, el runtime, la función y la petición que la activa. Es configuración YAML. |
| **src/hello.ts** | Escribes el handler en TypeScript. APIGatewayProxyEvent tipa la entrada y APIGatewayProxyResult la respuesta. |
| **serverless-offline** | Emula localmente la entrada HTTP y la ejecución. No crea una Lambda real. |
| **tsconfig.json y tsc** | Recuperamos el compilador que ya conoces: strict comprueba los tipos y outDir envía el código ejecutable a dist. |
| **Código fuente y ejecución** | Node ejecuta el JavaScript generado. Tú mantienes hello.ts; dist/hello.js se regenera con npm run build. |

#### Sigue una sola petición

`Thunder o curl → GET /dev/hello → Offline + serverless.yml → dist/hello.handler → 200 + JSON`

Antes de arrancar: src/hello.ts → tsc → dist/hello.js. Después: cliente → petición HTTP → handler compilado → respuesta. El console.log aparece en la terminal del backend.

> [!NOTE] **Cómo trabajar esta fase**
> El índice superior permite consultar cualquier fase. «Marcar fase y continuar» registra lo que ya has hecho. Las comprobaciones se guardan en este navegador. Al cerrar el bloque, comprobarás el conjunto antes de darlo por terminado.


---

### Fase 2: Prepara

**Prepara backend desde cero**

*Usa la terminal integrada de VS Code con perfil Git Bash. Espera a que termine cada comando.*

*PREPARA EL EJERCICIO*

#### Carpeta, proyecto y dependencias

##### Paso 1: Crea backend y comprueba dónde estás

*backend separa las funciones del futuro cliente. mkdir -p conserva las carpetas existentes; pwd muestra la ruta actual.*

Entra en el workspace del alumno. Si ya hay archivos de esta práctica, revísalos antes de repetir pasos; no borres tu trabajo.

```bash
cd /d/DEVOPS/04-PILARES-SERVERLESS
mkdir -p backend/src
cd backend
pwd
ls
```

**Resultado esperado:**
```text
pwd termina en /04-PILARES-SERVERLESS/backend y ls muestra src/.
```

> **Ayuda / Resolución de problemas:** No existe /d,Vuelve al bloque 00 y usa la ruta acordada con el profesor.,Estoy dentro de otra carpeta,Repite el cd absoluto antes de continuar.

- [ ] **Verificación:** La terminal está en backend. Después inicializarás el proyecto Node.

##### Paso 2: Inicializa el proyecto y configura sus scripts

*Recuperamos npm y los módulos ESM. package.json describe las herramientas del backend; los scripts separan comprobar tipos, compilar y arrancar.*

Ejecuta desde backend. Este paso es para un proyecto nuevo; si package.json ya existe, léelo antes de reinicializarlo.

```bash
npm init -y
npm pkg set type=module
npm pkg set "scripts.typecheck=tsc --noEmit"
npm pkg set "scripts.build=tsc"
npm pkg set "scripts.start=npm run build && serverless offline"
cat package.json
```

**Resultado esperado:**
```text
package.json contiene type: module y los scripts typecheck, build y start. Todavía no los ejecutes: faltan tsconfig.json y hello.ts, que crearás en Construye.
```

> **Ayuda / Resolución de problemas:** npm no responde,Comprueba node --version y npm --version en una terminal nueva: usamos Node 22.,¿Qué significa -y?,Acepta los metadatos iniciales por defecto. No escribe la lógica de la aplicación.

- [ ] **Verificación:** Ya existe un proyecto Node que entiende export. Después instalarás sus herramientas.

##### Paso 3: Instala las herramientas dentro del proyecto

*Instalamos el Framework y Offline con el compilador TypeScript y los tipos de Node y Lambda. @types/aws-lambda sólo aporta declaraciones; no es un AWS SDK ni realiza peticiones.*

No necesitas instalar Serverless globalmente. Desde backend:

```bash
npm install --save-dev --save-exact serverless@4.45.0 serverless-offline@14.8.4 typescript@5.9.3 @types/aws-lambda@8.10.164 @types/node@22.20.5
npm ls serverless serverless-offline typescript @types/aws-lambda @types/node
npx tsc --version
npx serverless --version
```

**Resultado esperado:**
```text
npm ls muestra las versiones indicadas, tsc responde con 5.9.3 y el Framework muestra su versión. La primera ejecución puede descargar componentes adicionales.
```

> **Ayuda / Resolución de problemas:** Falla una descarga,Comprueba Internet. Además del registro npm, el Framework descarga desde install.serverless.com. Si la red del centro lo bloquea, consulta al profesor.,Versión global distinta,Comprueba que estás en backend y usas npx.,Ya tengo el proyecto en otro equipo,Con package.json y package-lock.json existentes, npm ci instala el árbol guardado; no repitas npm init.

- [ ] **Verificación:** Las herramientas están instaladas localmente. Después resolverás el acceso del Framework.

##### Paso 4: Resuelve la autenticación del Framework

*La sesión de Serverless Framework v4 es independiente de AWS Academy. Instalar el paquete y obtener un número de versión no acredita el acceso a sus comandos.*

Ejecuta login, completa el acceso o registro en la página oficial que abra el navegador y vuelve a la terminal. Usa la cuenta o licencia acordada en clase. Si se exige una licencia que tu cuenta no cumple, consulta al profesor.

```bash
npx serverless login
```

**Resultado esperado:**
```text
La terminal confirma el acceso del Framework o el profesor ha resuelto el mecanismo de licencia del aula.
```

> **Ayuda / Resolución de problemas:** El navegador no se abre,Utiliza el enlace que muestre la terminal. Después vuelve a ella.,Pide credenciales AWS,Esta fase resuelve el acceso del Framework. No ejecutes deploy ni configures AWS Academy ahora.,¿Debo crear org o app?,No las añadimos al YAML de esta práctica; no utilizaremos las funciones del Dashboard.

- [ ] **Verificación:** Entorno y acceso listos. La siguiente fase crea la configuración del compilador, el YAML y el handler TypeScript.

#### ✅ STOP · antes de construir

- [ ] Estoy dentro de backend y puedo localizar src/.
- [ ] package.json contiene type: module y los scripts typecheck, build y start.
- [ ] Las dos dependencias aparecen con npm ls y el acceso del Framework está resuelto.


---

### Fase 3: Construye

**Conecta configuración, TypeScript y código ejecutable**

*Crea tsconfig.json, declara la ruta del handler compilado y escribe el código TypeScript. Cada pestaña contiene un archivo completo.*

*CONSTRUYE · ARCHIVOS COMPLETOS*

#### Tres archivos con responsabilidades distintas

Lee primero las instrucciones y la sintaxis de cada archivo. Créalo en la ruta indicada y copia su contenido completo. El modo maximizado se mantiene al cambiar de archivo.

##### 📄 `backend/tsconfig.json`
**Responsabilidad:** Comprueba TypeScript en modo estricto y genera JavaScript ejecutable en dist.

Recuperamos la configuración TypeScript. Crea tsconfig.json en backend, al nivel de package.json. Configuramos el proyecto; no estamos empezando otro curso de tipos.

> **Concepto clave:** strict: true,Activa comprobaciones estrictas, incluyendo los tipos de los parámetros.,module / moduleResolution: NodeNext,Alinea importaciones y salida con los módulos de Node y type: module.,rootDir: src / outDir: dist,Separa código fuente TypeScript y artefactos generados. No edites dist a mano.,include,Compila los .ts de src. typecheck utiliza la misma configuración sin emitir archivos.

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "rootDir": "src",
    "outDir": "dist",
    "types": [
      "node"
    ],
    "sourceMap": true
  },
  "include": [
    "src/**/*.ts"
  ]
}
```

> [!CHECKPOINT] **Comprobación:** Después crea serverless.yml, que apuntará al handler generado en dist.

##### 📄 `backend/serverless.yml`
**Responsabilidad:** Relaciona una ruta HTTP con la función que se ejecutará.

En el Explorador de VS Code, selecciona backend → Nuevo archivo → serverless.yml. Debe quedar al mismo nivel que package.json, fuera de src.

> **Concepto clave:** service,Nombre del servicio completo, no de una función.,provider / runtime,Plataforma prevista y entorno Node. Declarar aws no despliega nada por sí solo.,plugins,Activa serverless-offline.,functions.hello,hello es el nombre lógico de esta función.,handler: dist/hello.handler,dist/hello identifica el archivo generado dist/hello.js; después del punto está la exportación handler. El código fuente que mantienes está en src/hello.ts.,events / http / path / method,GET /hello activa la función. Offline añadirá normalmente el stage /dev.

```yaml
service: festival-control-api

# Conservamos la línea del Framework preparada para la práctica.
frameworkVersion: ~4.45.0

provider:
  name: aws
  runtime: nodejs22.x

plugins:
  - serverless-offline

functions:
  hello:
    # Ejecuta dist/hello.js, generado desde src/hello.ts.
    handler: dist/hello.handler
    events:
      - http:
          path: hello
          method: get
```

> [!CHECKPOINT] **Comprobación:** Comprueba los espacios de indentación. YAML utiliza espacios, no tabulaciones. Después crea hello.ts en la siguiente pestaña.

##### 📄 `backend/src/hello.ts`
**Responsabilidad:** Recibe el evento de la petición, deja un log y devuelve estado HTTP y contenido JSON.

En el Explorador, selecciona backend/src → Nuevo archivo → hello.ts. Guarda con Ctrl+S después de copiar. No lo crees junto a package.json.

> **Concepto clave:** import type,Recuperamos una importación sólo de tipos: no genera un import en el JavaScript compilado.,APIGatewayProxyEvent,Tipo del evento recibido por una integración Lambda proxy REST de API Gateway. Corresponde al evento http que declaramos en el YAML.,Promise<APIGatewayProxyResult>,La función asíncrona promete devolver una respuesta con statusCode y body. El compilador revisa ese contrato.,export const handler,Exporta la función que cargará Offline desde dist/hello.js tras compilar.,console.log,Deja evidencia en la terminal del backend. No es la respuesta HTTP.,JSON.stringify(...),Convierte el objeto de respuesta en texto JSON para body.

```typescript
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // Evidencia: esta petición llegó a nuestra función.
  console.log('EVENT RECIBIDO:', event);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Festival Control API online'
    })
  };
};
```

> [!CHECKPOINT] **Comprobación:** Guarda los tres archivos. La siguiente fase ejecuta typecheck y build antes de arrancar el servidor.

#### ✅ STOP · antes de ejecutar

- [ ] tsconfig.json y serverless.yml están en backend, al nivel de package.json.
- [ ] src/hello.ts exporta handler y tipa su entrada y respuesta.
- [ ] El YAML apunta a dist/hello.handler; no he creado ni editado dist a mano.


---

### Fase 4: Prueba

**Demuestra el backend con dos clientes**

*Comprueba los tipos, compila y deja el servidor en una terminal. La otra permite probarlo.*

*PRUEBA POR CAPAS*

#### Servidor → Thunder → curl

##### Paso 1: Comprueba, compila y arranca Offline

*npm run typecheck comprueba los tipos sin emitir. npm start ejecuta build primero y sólo arranca Offline si compilar termina bien. dist/hello.js es un artefacto, no el código fuente del alumno.*

En VS Code abre una terminal Git Bash y ejecuta:

```bash
cd /d/DEVOPS/04-PILARES-SERVERLESS/backend
npm run typecheck
npm start
```

**Resultado esperado:**
```text
TypeScript termina sin errores, aparece dist/hello.js y Offline anuncia GET, normalmente en http://localhost:3000/dev/hello. Conserva la URL exacta del proceso.
```

> **Ayuda / Resolución de problemas:** Error de TypeScript,Lee la línea indicada en src/hello.ts y corrige el contrato antes de arrancar. Comprueba que existe tsconfig.json y que instalaste los tipos.,No encuentra dist/hello,Ejecuta npm run build desde backend y comprueba que genera dist/hello.js. El YAML apunta al archivo compilado, no al .ts.,No encuentra el plugin,Revisa npm ls serverless-offline y plugins en el YAML.,Error de configuración,Revisa nombre de archivo, indentación y handler.,Puerto ocupado,Detén con Ctrl+C el servidor anterior de esta práctica antes de repetir.,Acceso del Framework pendiente,Vuelve al paso Acceso de la fase Prepara.

- [ ] **Verificación:** La terminal queda escuchando. No la cierres: prueba ahora desde Thunder.

##### Paso 2: Envía la primera petición HTTP

*Thunder Client es el cliente; el handler es el servidor. Un 200 y un log nuevo demuestran dos partes del recorrido.*

En VS Code: icono de Thunder Client → New Request → selecciona GET → pega la URL anunciada por Offline → Send. Aquí la línea inferior representa la petición: no es un comando Bash.

```bash
GET http://localhost:3000/dev/hello
```

**Resultado esperado:**
```text
Thunder muestra Status 200 y { "message": "Festival Control API online" }. La terminal del backend añade EVENT RECIBIDO y el evento.
```

> **Ayuda / Resolución de problemas:** 404,El servidor respondió, pero la ruta o método no coinciden. Compara /dev/hello con la salida de Offline.,ECONNREFUSED,No se alcanza el proceso en esa dirección/puerto. Comprueba que Offline sigue ejecutándose.,500,La petición llegó, pero la función falló. Lee el error de la terminal.

- [ ] **Verificación:** Comprueba respuesta y log. Después repite la misma petición con curl.

##### Paso 3: Repite desde una segunda terminal Git Bash

*curl es otro cliente HTTP. -i muestra también la línea de estado y las cabeceras. No necesitas cambiar el backend.*

Conserva la terminal de Offline abierta. Usa el botón + del panel Terminal para abrir otra Git Bash. Sustituye la URL si tu proceso mostró una diferente.

```bash
curl -i http://localhost:3000/dev/hello
```

**Resultado esperado:**
```text
La segunda terminal muestra HTTP 200 y el mismo JSON que Thunder. La primera registra una nueva invocación.
```

> **Ayuda / Resolución de problemas:** Connection refused,Comprueba la primera terminal y su puerto.,404,Copia la URL exacta, incluido el stage si aparece.,¿Dónde escribo si el servidor ocupa la terminal?,Usa otra terminal con el botón +. No escribas comandos encima del proceso de Offline.

- [ ] **Verificación:** Dos clientes han recibido la misma respuesta. Continúa para explicar por qué.

#### ✅ CHECKPOINT · evidencias locales

- [ ] Offline sigue ejecutándose y anuncia GET /hello.
- [ ] Thunder recibe 200 y el mensaje esperado.
- [ ] curl recibe el mismo JSON y veo una invocación nueva en el log.


---

### Fase 5: Entiende

**Explica qué acaba de pasar**

*Relaciona lo que has visto con cada archivo. Esto prepara el trabajo con parámetros del bloque 02.*

#### De la petición a la respuesta

| Paso / Elemento | Explicación |
|---|---|
| `GET /dev/hello` | El cliente solicita un recurso del servidor local. /dev es el stage anunciado por Offline en este ejemplo. |
| `path: hello + method: get` | La configuración asocia esa petición con functions.hello. |
| `npm run typecheck / npm run build` | El primer comando comprueba el contrato; el segundo emite dist/hello.js. Los tipos ayudan durante el desarrollo, pero no viajan como validación automática del JSON. |
| `handler: dist/hello.handler` | Offline carga dist/hello.js, generado desde src/hello.ts, y busca la exportación handler. |
| `event: APIGatewayProxyEvent` | Tipa los datos de esta invocación REST. El tipo aporta comprobación estática; más adelante validaremos los valores que llegan por HTTP. |
| `console.log(...)` | Sale por la terminal del backend. El cliente no recibe este log como respuesta. |
| `return { statusCode, body }` | Define lo que recibe el cliente: estado HTTP y texto de respuesta. |
| `JSON.stringify({ message: ... })` | El objeto se transforma en texto JSON; Thunder o curl muestran ese contenido. |

> [!TIP] **Predice antes de comprobar: Predice antes de comprobar**
> **Pregunta:** Si cambias únicamente el texto de message, ¿cambiará la URL, el log o el contenido de la respuesta?
> 
> **Respuesta razonada:** Cambiará el contenido del body. La ruta seguirá siendo la misma porque no has cambiado el YAML. El handler seguirá ejecutando console.log al recibir cada petición. En la siguiente fase lo demostrarás.

> [!NOTE] **Qué hemos demostrado**
> Has ejecutado una función local a través de HTTP. No has demostrado un despliegue AWS, una base de datos ni persistencia. El nombre provider: aws describe el destino previsto; sólo ejecutar deploy crearía recursos cloud.


---

### Fase 6: Modifica

**Cambia una cosa y demuestra su efecto**

*Una modificación guiada: conserva la ruta y cambia la respuesta. No necesitas otro proyecto.*

#### Identifica tu servicio en la respuesta

**Pasos guiados para modificar el código:**

1. Abre backend/src/hello.ts.
2. Cambia message por Festival Control · equipo preparado y añade service: hello dentro del objeto de JSON.stringify.
3. Conserva los tipos APIGatewayProxyEvent y APIGatewayProxyResult, el log y statusCode: 200. No cambies serverless.yml.
4. Guarda src/hello.ts. Detén Offline con Ctrl+C y ejecuta npm run typecheck y npm start: este último recompila antes de arrancar. No edites dist/hello.js.
5. Repite la MISMA URL en Thunder y curl. Observa un log nuevo y el nuevo JSON.

*CONTRASTA TU MODIFICACIÓN*

#### hello.ts completo después del cambio

Haz primero la modificación en tu editor. Utiliza este archivo completo para contrastar el resultado o recuperarte si aparece un error.

##### 📄 `backend/src/hello.ts`
**Responsabilidad:** Devuelve la identificación del servicio conservando el contrato de la función.

Este archivo sustituye al hello.ts inicial. El YAML se conserva. Puedes mantener este cambio al pasar al bloque 02.

> **Concepto clave:** Contrato tipado,Se mantienen el tipo de evento y el resultado HTTP. Cambias el objeto que se convierte en body.,Compilar de nuevo,npm start vuelve a generar dist. Sin recompilar, podrías seguir ejecutando la respuesta anterior.

```typescript
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // Evidencia: esta petición llegó a nuestra función.
  console.log('EVENT RECIBIDO:', event);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Festival Control · equipo preparado',
      service: 'hello'
    })
  };
};
```

> [!CHECKPOINT] **Comprobación:** Comprueba una respuesta 200 con ambos campos. Si ves el texto anterior, confirma que guardaste el archivo y reiniciaste el proceso correcto.

#### ✅ CHECKPOINT · transferencia guiada

- [ ] La misma URL devuelve el nuevo message y service: hello.
- [ ] He conservado el 200 y aparece una nueva invocación en la terminal.
- [ ] Puedo explicar por qué no cambié serverless.yml.


---

### Fase 7: Comprueba

**Comprueba que puedes explicarlo**

*Preguntas formativas, sin nota. Si fallas, lee la explicación y vuelve a intentarlo.*

> [!NOTE] **Autoevaluación: El YAML contiene handler: dist/hello.handler. ¿Qué debe existir al arrancar Offline?**
> - [ ] 1. Un archivo llamado handler dentro de src/hello/.
> - [ ] 2. dist/hello.js generado desde src/hello.ts, con una exportación llamada handler.
> - [ ] 3. Una función llamada hello dentro de serverless.yml.
> - [ ] 4. Un recurso Lambda ya desplegado en AWS.

> [!NOTE] **Autoevaluación: Thunder recibe el JSON, pero ¿dónde buscas EVENT RECIBIDO?**
> - [ ] 1. En el body de la respuesta HTTP.
> - [ ] 2. En la consola del navegador que muestra el cuaderno.
> - [ ] 3. En la terminal de VS Code donde está ejecutándose Offline.
> - [ ] 4. En CloudWatch, porque provider dice aws.

> [!NOTE] **Autoevaluación: Thunder y curl reciben el mismo JSON. ¿Qué demuestra esa comparación?**
> - [ ] 1. Que el backend responde por HTTP y puede ser consumido por clientes distintos.
> - [ ] 2. Que Thunder ejecuta el comando curl internamente.
> - [ ] 3. Que el JSON está guardado en una base de datos.
> - [ ] 4. Que se ha desplegado la función en AWS.


---

### Fase 8: Cierra

**Guarda una evidencia y deja preparado el siguiente bloque**

*Cierra con el proyecto guardado, una explicación breve y una versión recuperable.*

#### ✅ He aprendido y puedo demostrarlo

- [ ] Localizo el recorrido src/hello.ts → tsc → dist/hello.js → handler.
- [ ] Puedo repetir GET con Thunder y curl y relacionarlo con un log nuevo.
- [ ] He comprobado la modificación sin cambiar la ruta.
- [ ] He guardado el proyecto, una evidencia y he verificado el commit en mi repositorio GitHub.

*DOCUMENTA · ARCHIVOS DE LA RAÍZ*

#### Una explicación breve y un repositorio limpio

Crea estos archivos en D:/DEVOPS/04-PILARES-SERVERLESS, fuera de backend. Sustituye los textos entre corchetes del README por tus respuestas reales. No incluyas claves ni tokens.

##### 📄 `04-PILARES-SERVERLESS/README.md`
**Responsabilidad:** Explica qué has construido y cómo has comprobado que funciona.

Resume el aprendizaje; no necesitas una memoria extensa.

> **Concepto clave:** Evidencia,Guarda una captura o salida de la petición y el log que permita relacionar ambas cosas.

```typescript
# Festival Control · Bloque 01

## Qué he construido
[Describe la función y la ruta local que has probado.]

## Qué he comprendido
[Explica los tipos del handler, la compilación y dónde aparece EVENT RECIBIDO.]

## Qué he modificado
[Explica qué cambió en el JSON y por qué no cambió la URL.]

## Cómo lo he comprobado
[Indica resultado de Thunder, curl y log. Adjunta una evidencia propia.]
```

> [!CHECKPOINT] **Comprobación:** El README cuenta lo que tú has comprobado; no copies resultados como si ya los hubieras obtenido.

##### 📄 `04-PILARES-SERVERLESS/.gitignore`
**Responsabilidad:** Evita versionar dependencias, artefactos y archivos de entorno.

Créalo antes de git add. Si ya existe, añade estas reglas sin borrar las anteriores.

> **Concepto clave:** node_modules,Se recupera mediante npm; no debe subirse al repositorio.,package-lock.json,Sí se conserva: describe las versiones instaladas.,dist,Se regenera con npm run build; conserva el .ts y tsconfig.json, no el JavaScript generado.

```typescript
backend/node_modules/
backend/dist/
backend/.serverless/
backend/.env
backend/.env.*
.aws/
.DS_Store
```

> [!CHECKPOINT] **Comprobación:** Comprueba git status antes de crear el commit. Las credenciales no deben estar dentro del proyecto.

*GUARDA UN PUNTO DE RECUPERACIÓN*

#### Git y GitHub, con un primer commit comprobado

##### Paso 1: Prepara un repositorio GitHub del alumno

*El código de tu aplicación vive aparte del repositorio que publica el cuaderno. Un repositorio remoto es el destino de tus commits.*

Entra en tu cuenta GitHub → New repository → escribe 04-PILARES-SERVERLESS → crea el repositorio vacío, sin inicializar README ni gitignore. Si ya tienes un repositorio para esta práctica, conserva ese y no crees otro. Copia su URL HTTPS. Todavía no ejecutes push.

```bash
git --version
```

**Resultado esperado:**
```text
Tienes una URL HTTPS de TU repositorio y Git responde.
```

> **Ayuda / Resolución de problemas:** No tengo cuenta o acceso,Resuélvelo con el profesor. Guarda mientras tanto el proyecto y sus evidencias localmente.,Ya tengo origin configurado,En el siguiente paso comprueba git remote -v y conserva el remoto correcto.

- [ ] **Verificación:** Destino identificado. Después prepararás el commit local.

##### Paso 2: Revisa y guarda los archivos del bloque

*Un commit es un punto recuperable del proyecto. La identidad se configura aquí sólo para este repositorio, no para otros alumnos del equipo.*

Ejecuta desde la raíz del alumno. Cambia los textos de nombre y correo por tu identidad de autor de GitHub. git init conserva un repositorio existente; si git status muestra trabajo ajeno a esta práctica, detente y revisa la carpeta.

```bash
cd /d/DEVOPS/04-PILARES-SERVERLESS
git init
git config user.name "TU NOMBRE Y APELLIDOS"
git config user.email "TU CORREO DE AUTOR EN GITHUB"
git status

# Revisa que .gitignore existe antes de añadir archivos
git add .gitignore README.md backend/
git diff --cached --stat
git commit -m "Bloque 01 - Primera funcion Serverless local"
```

**Resultado esperado:**
```text
El commit incluye hello.ts, tsconfig.json, serverless.yml, package.json, package-lock.json y README; no incluye dist, node_modules, .serverless ni secretos.
```

> **Ayuda / Resolución de problemas:** Aparece node_modules en el resumen,Detente antes del commit. Revisa .gitignore y retira las dependencias del área de preparación con git rm -r --cached --ignore-unmatch backend/node_modules.,Nothing to commit,Puede estar ya guardado. Comprueba git log -1 --oneline y git status.

- [ ] **Verificación:** Punto local guardado. Después verifica el remoto y sube el commit.

##### Paso 3: Publica y comprueba el resultado en GitHub

*Un push correcto debe verse también en el repositorio remoto. El login GitHub no es el login de Serverless Framework.*

Comprueba primero git remote -v. Sólo si no existe origin, ejecuta git remote add origin sustituyendo la URL de ejemplo por la tuya. Si origin ya existe, omite esa línea y comprueba que corresponde a tu repositorio. Para un repositorio nuevo, usa main como rama de la práctica. En Windows puede abrirse el navegador para autorizar GitHub.

```bash
git remote -v

# Sólo si origin NO existe: sustituye USUARIO por tu cuenta
git remote add origin https://github.com/TU_USUARIO/04-PILARES-SERVERLESS.git

# En el repositorio nuevo de esta práctica
git branch -M main
git push -u origin main

git status
git log -1 --oneline
```

**Resultado esperado:**
```text
GitHub muestra el commit y los archivos del bloque 01. git status no indica cambios pendientes del bloque.
```

> **Ayuda / Resolución de problemas:** No existe origin,Configura el remoto con tu URL antes del push.,Autenticación fallida,Completa el acceso GitHub mediante el mecanismo del centro. No pegues contraseñas o tokens en los archivos.,Push rechazado porque ya hay commits remotos,No uses force push. Consulta el estado con el profesor antes de integrar trabajo previo.

- [ ] **Verificación:** Abre GitHub y confirma el commit. Ya puedes cerrar el bloque.

> [!NOTE] **Siguiente · 02 · GET + parámetros**
> Conserva backend, sus scripts, tsconfig.json y el handler TypeScript. En la revisión del bloque 02 continuaremos con este entorno para observar cómo un id de la URL llega al evento. Puedes mantener hello.ts modificado: su ruta sigue siendo /hello.

