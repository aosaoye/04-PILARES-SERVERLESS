# Festival Control · Serverless Learning Tour (04 · PILARES)

Documentación completa y unificada del cuaderno interactivo **04 · PILARES - Festival Control & Venue Control**, desarrollado por Alberto Hernández Akkari.

---

## 📑 Índice de Bloques

| Bloque | Título | Descripción |
|---|---|---|
| **00** | [Bloque 00 · Preparación](#bloque-00--preparación) | Configuración del entorno desde cero (Node 22, Git Bash, VS Code, AWS CLI). |
| **01** | [Bloque 01 · Primer Serverless](#bloque-01--primer-serverless) | Primera función Lambda HTTP local con TypeScript y Serverless Framework. |
| **02** | [Bloque 02 · GET + Parámetros](#bloque-02--get--parámetros) | Rutas con parámetros `{id}`, lectura de `pathParameters` y estados 200/400/404. |
| **03** | [Bloque 03 · POST + Body](#bloque-03--post--body) | Peticiones POST, parseo y validación del body JSON, y respuestas 201 Created. |
| **04** | [Bloque 04 · API CRUD](#bloque-04--api-crud) | CRUD completo con PUT (reemplazo), PATCH (parcial) y DELETE. |
| **05** | [Bloque 05 · React Native](#bloque-05--react-native) | Creación de la aplicación móvil con Expo y TypeScript. |
| **06** | [Bloque 06 · React Native + GET](#bloque-06--react-native--get) | Consumo de la API local desde el cliente móvil con `fetch` y estados de carga. |
| **07** | [Bloque 07 · React Native CRUD](#bloque-07--react-native-crud) | Formularios e interacción completa para crear, editar y eliminar eventos. |
| **08** | [Bloque 08 · Deploy AWS](#bloque-08--deploy-aws) | Despliegue de la API en la nube de AWS con Serverless Framework y `LabRole`. |
| **09** | [Bloque 09 · Cloud Launch](#bloque-09--cloud-launch) | Conexión del cliente móvil a AWS API Gateway y comprobación end-to-end. |
| **10** | [Entrenamiento · Venue Control (Evaluable)](#entrenamiento--venue-control-evaluable) | Reto individual de transferencia con contrato para la gestión de zonas del recinto. |

---


<br>

<a id="bloque-00"></a>

# 00 · Preparación

**BLOQUE 00 · CONFIGURA EL ORDENADOR DESDE CERO**

## Prepara tu equipo paso a paso

> Empieza con un Windows de aula y un navegador. Descarga, instala, configura y comprueba cada herramienta antes de escribir la primera función.

🏷️ **Etiquetas:** `Windows 10/11` · `Git Bash` · `Node 22` · `VS Code` · `Thunder Client` · `AWS CLI`


---

### Fase 1: Destino

**Desde un equipo sin configurar**

*Comprueba los requisitos y entiende la función de cada herramienta antes de instalar.*

*LEE · PUNTO DE PARTIDA*

#### Qué significa empezar desde cero

Windows ya está instalado. Necesitas conexión a Internet y permiso para instalar programas. No damos por hecho que tengas Git, Node, VS Code ni una terminal configurada. Si una herramienta ya existe, comprueba su versión y configuración en lugar de instalarla otra vez. Sigue los pasos en orden; no copies todos los comandos de golpe.

*CONCEPTOS ANTES DE INSTALAR*

#### Qué aporta cada pieza

| Concepto | Detalle |
|---|---|
| **Git y Git Bash** | Git registra cambios del código. Git Bash es la terminal incluida en Git para Windows con la que ejecutaremos comandos como pwd, cd y mkdir. GitHub es el servicio web donde más adelante subiremos el proyecto: instalar Git no crea una cuenta GitHub. |
| **Node y npm** | Node.js ejecuta JavaScript en el ordenador. npm se instala con Node y descarga las dependencias de un proyecto. Usaremos Node 22.x para mantener el mismo entorno durante el cuaderno; no elijas Current ni otra versión porque aparezca primero en la web. |
| **VS Code y PATH** | VS Code es el editor. Su terminal integrada ejecutará Git Bash. PATH es la lista de carpetas donde Windows busca los programas: por eso un instalador puede terminar correctamente y una terminal antigua seguir sin encontrar node o code. Cierra y abre la terminal después de cada instalación. |
| **Herramienta y proyecto** | Git, Node y VS Code se instalan en el equipo. Serverless Framework y serverless-offline se instalarán dentro de backend, mediante npm en el bloque 01. Cada proyecto conserva sus dependencias en package.json y package-lock.json; no instalaremos Serverless globalmente. |
| **Local y AWS** | Thunder Client enviará peticiones a nuestra API local. AWS CLI permitirá trabajar después con AWS. Instalar AWS CLI no inicia Academy ni proporciona credenciales: las credenciales temporales se preparan cuando llegue el bloque de despliegue. |

*MIRA EL DESTINO · ANTES DE CREAR CARPETAS*

#### Al terminar este bloque tendrás el equipo listo y esta carpeta

📄 **Archivo:** `Windows · estructura de trabajo`

En el bloque 00 creamos únicamente el workspace. En el 01 aparecerá backend y más adelante mobile. No clones el repositorio del cuaderno dentro de esta carpeta: la web contiene instrucciones; aquí escribirás tu aplicación.

```bash
D:\DEVOPS\
└── 04-PILARES-SERVERLESS\   ← workspace del alumno

Bloque 01: backend/          ← funciones y configuración
Bloque 05: mobile/           ← aplicación Expo
```

[object Object]


---

### Fase 2: Herramientas

**Instala Git y Node**

*Empieza en el navegador de Windows. Git Bash aparecerá después de instalar Git.*

*INSTALA LAS HERRAMIENTAS DEL EQUIPO*

#### Desde el navegador hasta Node funcionando

##### Paso 1: Comprueba el equipo antes de descargar

*Un instalador debe corresponder al sistema y a la arquitectura del ordenador. Los permisos del aula pueden requerir intervención del profesor.*

<ol><li>Abre Inicio → Configuración → Sistema → Acerca de. Comprueba que utilizas Windows 10/11 y consulta Tipo de sistema.</li><li>Abre el Explorador con Win+E → Este equipo. Comprueba si existe la unidad D:.</li><li>Abre el navegador y entra en una web para comprobar Internet.</li><li>Usaremos instaladores para Windows x64 en los equipos Intel/AMD de 64 bits; si aparece ARM, consulta al profesor antes de descargar.</li></ol>

**Resultado esperado:**
```text
Sabes qué Windows utilizas, tienes Internet y has localizado D:.
```

> **Ayuda / Resolución de problemas:** No existe D:,Detente y avisa al profesor para acordar una ruta y adaptar los comandos. No crees particiones ni sustituyas rutas por tu cuenta.,Windows pide contraseña de administrador,Solicita la instalación al profesor o al responsable del equipo; no cambies las políticas de seguridad.

- [ ] **Verificación:** CHECKPOINT: requisitos comprobados. SIGUIENTE: instala Git, que incluye Git Bash.

##### Paso 2: Descarga e instala Git para Windows

*Git Bash todavía no existe: lo instalaremos con Git para poder utilizar los comandos del cuaderno.*

<ol><li>Abre [la descarga oficial de Git para Windows](https://git-scm.com/install/windows).</li><li>Elige el instalador x64 Setup para el equipo del aula; no Portable.</li><li>Ejecuta el archivo descargado desde Descargas. Conserva la carpeta propuesta y los componentes de Git Bash.</li><li>En la opción de PATH elige Git from the command line and also from 3rd-party software. Conserva las opciones recomendadas del resto del asistente y pulsa Install → Finish.</li><li>Abre Inicio, escribe Git Bash y abre la aplicación. Ejecuta los comandos inferiores de uno en uno.</li></ol>

```bash
# Estos comandos se ejecutan DENTRO de Git Bash
git --version
bash --version
curl --version
```

**Resultado esperado:**
```text
Las tres órdenes muestran versiones. La ventana abierta es Git Bash, no PowerShell ni cmd.
```

> **Ayuda / Resolución de problemas:** No encuentro Git Bash en Inicio,Comprueba que terminó el instalador de Git. Cierra y vuelve a abrir el menú Inicio.,git: command not found,Cierra la terminal y abre Git Bash de nuevo. Si persiste, revisa la instalación de Git y su opción de PATH.

- [ ] **Verificación:** CHECKPOINT: puedo abrir Git Bash y git responde. SIGUIENTE: instala Node.js.

##### Paso 3: Instala Node.js 22 y npm

*El instalador de Node incluye npm. No necesitas instalar npm por separado ni una CLI global de Expo o Serverless.*

<ol><li>Abre [la página oficial de Node.js](https://nodejs.org/en/download). Selecciona la línea 22.x LTS y Windows.</li><li>Si no encuentras esa versión en el selector, utiliza [el directorio oficial de Node 22](https://nodejs.org/download/release/latest-v22.x/) y el archivo terminado en x64.msi.</li><li>Ejecuta el MSI y conserva Node.js runtime, npm package manager y Add to PATH.</li><li>Si ofrece herramientas adicionales para compilar módulos nativos, no son necesarias para este bloque.</li><li>Termina la instalación. Cierra TODAS las ventanas Git Bash y abre una nueva desde Inicio.</li></ol>

```bash
# Verifica la instalación en una ventana NUEVA
node --version
npm --version

# Comprueba que Node ejecuta JavaScript
node -e "console.log('Node listo para Festival Control')"
```

**Resultado esperado:**
```text
node muestra v22.x.x; npm muestra una versión y aparece Node listo para Festival Control.
```

> **Ayuda / Resolución de problemas:** Node muestra 18, 20, 24 u otra línea,Estás usando otra instalación. Ejecuta where.exe node para localizarla y pide al profesor unificar el equipo con Node 22 antes de continuar.,node o npm no se encuentra,Cierra todas las terminales y abre Git Bash. Si persiste, repara Node con la opción Add to PATH.,npm.ps1 o execution policy,Has abierto PowerShell. Abre Git Bash; no cambies la política de ejecución para resolver este paso.

- [ ] **Verificación:** CHECKPOINT: Node 22 y npm responden. SIGUIENTE: instala el editor.


---

### Fase 3: Puesto

**Configura editor, carpeta y terminal**

*Todas las órdenes posteriores se ejecutan en Git Bash integrado en VS Code.*

*CONFIGURA TU PUESTO DE TRABAJO*

#### Editor, carpetas, terminal y cliente HTTP

##### Paso 1: Instala Visual Studio Code y habilita code

*El comando code . abrirá el editor en la carpeta actual; el punto significa aquí.*

<ol><li>Entra en [la descarga oficial de VS Code](https://code.visualstudio.com/download) y elige Windows User Installer x64.</li><li>Ejecuta el instalador. Conserva la opción Add to PATH; puedes marcar Abrir con Code para carpetas si aparece.</li><li>Finaliza. Si el equipo sólo permite una instalación gestionada, pide al profesor la instalación correspondiente.</li><li>Cierra y vuelve a abrir Git Bash; comprueba el comando inferior.</li></ol>

```bash
# Comprueba que Windows localiza el editor
code --version
```

**Resultado esperado:**
```text
Aparece la versión de VS Code y no command not found.
```

> **Ayuda / Resolución de problemas:** code: command not found,Reabre Git Bash después de instalar. Si continúa, revisa Add to PATH en el instalador de Windows.,¿Necesito Visual Studio?,El producto es Visual Studio Code. No descargues el entorno Visual Studio en su lugar.

- [ ] **Verificación:** CHECKPOINT: code responde. SIGUIENTE: crea la carpeta donde trabajarás.

##### Paso 2: Crea D:\DEVOPS\04-PILARES-SERVERLESS y ábrela

*En Git Bash la unidad D: se escribe /d. mkdir -p crea carpetas y conserva las que ya existen; cd cambia la carpeta actual; pwd muestra dónde estás.*

<ol><li>Abre Git Bash desde Inicio.</li><li>Ejecuta cada comando por separado y observa el resultado.</li><li>Cuando se abra VS Code, comprueba que su Explorador muestra 04-PILARES-SERVERLESS.</li><li>Si VS Code solicita confianza, confirma sólo si es la carpeta que acabas de crear tú.</li></ol>

```bash
# Crea el workspace del alumno
mkdir -p /d/DEVOPS/04-PILARES-SERVERLESS

# Entra antes de abrir el editor
cd /d/DEVOPS/04-PILARES-SERVERLESS
pwd

# Abre ESTA carpeta en VS Code
code .
```

**Resultado esperado:**
```text
pwd muestra /d/DEVOPS/04-PILARES-SERVERLESS y VS Code abre esa carpeta.
```

> **Ayuda / Resolución de problemas:** La carpeta ya tiene archivos de otra práctica,Revisa con el profesor antes de reutilizarla. Empezar desde cero no significa borrar trabajo anterior.,No existe /d,Regresa al paso Windows y acuerda la ruta con el profesor.,VS Code abre otra carpeta,Utiliza Archivo → Abrir carpeta y selecciona D:\DEVOPS\04-PILARES-SERVERLESS.

- [ ] **Verificación:** CHECKPOINT: editor y terminal apuntan al mismo workspace. SIGUIENTE: configura la terminal integrada.

##### Paso 3: Haz que VS Code abra Git Bash por defecto

*Abrir VS Code desde Git Bash no garantiza que su terminal integrada use Bash. Elegimos el perfil explícitamente.*

<ol><li>En VS Code pulsa Ctrl+Shift+P.</li><li>Busca Terminal: Select Default Profile (Terminal: Seleccionar perfil predeterminado).</li><li>Elige Git Bash. Cierra las terminales anteriores con el icono de papelera.</li><li>Abre Terminal → Nuevo terminal. En el selector de terminal debe aparecer bash o Git Bash.</li><li>Ejecuta las comprobaciones inferiores en esa terminal integrada.</li></ol>

```bash
# Terminal integrada de VS Code: perfil Git Bash
cd /d/DEVOPS/04-PILARES-SERVERLESS
pwd
git --version
node --version
npm --version
```

**Resultado esperado:**
```text
La terminal integrada usa Git Bash, pwd muestra el workspace y Node sigue mostrando v22.
```

> **Ayuda / Resolución de problemas:** Git Bash no aparece en la lista,Cierra VS Code por completo y vuelve a abrirlo después de instalar Git. Comprueba antes que Git Bash abre desde Inicio.,El prompt empieza por PS y aparece una ruta C:\...,Ese perfil es PowerShell. Selecciona Git Bash y crea una terminal nueva.,Node funciona fuera del editor pero aquí no,VS Code conserva el PATH antiguo. Cierra todas sus ventanas y ábrelo otra vez.

- [ ] **Verificación:** CHECKPOINT: ejecutaré los comandos del cuaderno en esta terminal Bash. SIGUIENTE: instala Thunder Client.

##### Paso 4: Instala Thunder Client dentro de VS Code

*Una extensión añade funciones al editor. Thunder Client nos permitirá elegir método HTTP, URL y cuerpo y leer la respuesta.*

<ol><li>Pulsa Ctrl+Shift+X para abrir Extensiones.</li><li>Busca Thunder Client. Comprueba el autor Ranga Vadhineni y el identificador rangav.vscode-thunder-client; puedes comparar con [su ficha oficial](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client).</li><li>Pulsa Install / Instalar y espera a que termine.</li><li>Abre su icono del rayo en la barra lateral y pulsa New Request.</li><li>Localiza el selector GET, la URL y el botón Send. Todavía no envíes una petición a localhost: no hemos creado la API.</li></ol>

**Resultado esperado:**
```text
Puedes abrir New Request y localizar Method, URL y Send.
```

> **Ayuda / Resolución de problemas:** No se ve el icono,Comprueba que la extensión está habilitada y recarga la ventana de VS Code.,ECONNREFUSED al probar localhost,Aún no hay servidor escuchando. En este bloque comprobamos la herramienta; la primera petición llega en el bloque 01.

- [ ] **Verificación:** CHECKPOINT: tengo preparado el cliente HTTP. SIGUIENTE: completa las herramientas AWS del equipo.


---

### Fase 4: AWS CLI

**Prepara la herramienta y distingue las cuentas**

*Instalar AWS CLI no inicia una sesión Academy ni despliega recursos.*

*PREPARA EL PUENTE HACIA AWS*

#### Instalar una herramienta no es conectar una cuenta

##### Paso 1: Instala AWS CLI v2 y comprueba su versión

*La CLI es un programa del equipo. Se puede instalar y comprobar sin iniciar Academy ni introducir claves.*

<ol><li>Abre [la guía oficial de instalación de AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) y localiza Windows.</li><li>Para tu usuario puedes descargar [AWS CLI v2 · instalador de usuario](https://awscli.amazonaws.com/AWSCLIV2-User.msi). Si el centro requiere instalación para todo el equipo, el profesor utilizará [el MSI para todos los usuarios](https://awscli.amazonaws.com/AWSCLIV2.msi) con los permisos necesarios.</li><li>Ejecuta el MSI y completa el asistente.</li><li>Cierra VS Code y Git Bash. Abre de nuevo el workspace y una terminal Git Bash.</li><li>Ejecuta sólo la comprobación de versión.</li></ol>

```bash
# Esto no solicita credenciales ni crea recursos AWS
aws --version
```

**Resultado esperado:**
```text
La salida comienza por aws-cli/2. La instalación de la herramienta está comprobada.
```

> **Ayuda / Resolución de problemas:** aws: command not found,Reabre editor y terminal. Si persiste, revisa que terminó el instalador de AWS CLI.,Veo aws-cli/1,Es la línea antigua. Pide al profesor revisar la coexistencia con CLI v2.,No tengo permiso para instalar,Deja registrada la incidencia para el profesor. Puedes realizar los bloques locales; antes del despliegue deberás completar este paso.

- [ ] **Verificación:** CHECKPOINT: AWS CLI v2 responde, o la incidencia está registrada para resolver antes del bloque 08. SIGUIENTE: identifica qué cuentas se utilizarán.

##### Paso 2: Distingue Serverless Framework, GitHub y AWS Academy

*Son servicios diferentes. Sus cuentas y sesiones no son intercambiables.*

<ol><li>GitHub se utilizará para guardar y entregar código. Comprueba que puedes acceder a tu cuenta cuando llegue la entrega.</li><li>Serverless Framework v4 puede solicitar autenticación del Framework. El bloque 01 explica el comando de acceso y la vuelta del navegador a la terminal.</li><li>AWS Academy proporcionará más adelante una sesión de laboratorio y credenciales temporales para desplegar.</li><li>No ejecutes todavía aws configure ni aws sts get-caller-identity: no estamos validando una sesión AWS en este bloque.</li></ol>

**Resultado esperado:**
```text
Puedes explicar qué programa está instalado en Windows y qué cuenta o sesión necesitarás después.
```

> **Ayuda / Resolución de problemas:** ¿Instalar AWS CLI inicia Learning Lab?,No. El laboratorio se inicia en Academy cuando trabajemos el despliegue.,¿La cuenta Serverless es mi cuenta AWS?,No. La autenticación del Framework y las credenciales de AWS son independientes.

- [ ] **Verificación:** CHECKPOINT: no confundo instalación, autenticación y despliegue. SIGUIENTE: comprueba el conjunto y pasa al primer backend.


---

### Fase 5: Comprueba

**Verifica y deja el equipo preparado**

*Ejecuta las comprobaciones finales y registra cualquier incidencia del aula.*

*STOP · PRUEBA EL EQUIPO COMPLETO*

#### Última comprobación en la terminal integrada

📄 **Archivo:** `VS Code → Terminal → Git Bash`

Ejecuta desde una ventana nueva de VS Code. Si una orden falla, vuelve al paso que instala esa herramienta. No avances al backend con Node o npm sin resolver.

```bash
cd /d/DEVOPS/04-PILARES-SERVERLESS
pwd
git --version
node --version
npm --version
code --version
curl --version
aws --version
```

[object Object]

#### ✅ CHECKPOINT · ordenador preparado desde cero

- [ ] Tengo Windows y una ruta de trabajo acordada.
- [ ] He instalado Git y puedo abrir Git Bash.
- [ ] Node muestra v22.x.x y npm responde.
- [ ] He instalado VS Code y code funciona.
- [ ] VS Code abre D:\DEVOPS\04-PILARES-SERVERLESS.
- [ ] La terminal integrada utiliza Git Bash por defecto.
- [ ] Thunder Client está instalado y abre New Request.
- [ ] AWS CLI v2 responde o he registrado la incidencia para el bloque de despliegue.
- [ ] Sé que Serverless se instala localmente al crear backend en el bloque 01.
- [ ] Sé distinguir cuenta GitHub, autenticación de Serverless y sesión Academy.

> [!TIP] **Equipo configurado · siguiente: 01 · Primer Serverless**
> Abre 01 · Primer Serverless en el menú lateral. Allí crearás backend, inicializarás npm e instalarás Serverless Framework y serverless-offline con los comandos completos. Después construirás la primera función. Conserva este workspace; no reinstales los programas en cada bloque.



[⬆ Volver al Índice](#-índice-de-bloques)

---

<br>

<a id="bloque-01"></a>

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



[⬆ Volver al Índice](#-índice-de-bloques)

---

<br>

<a id="bloque-02"></a>

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



[⬆ Volver al Índice](#-índice-de-bloques)

---

<br>

<a id="bloque-03"></a>

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



[⬆ Volver al Índice](#-índice-de-bloques)

---

<br>

<a id="bloque-04"></a>

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



[⬆ Volver al Índice](#-índice-de-bloques)

---

<br>

<a id="bloque-05"></a>

# 05 · React Native

**BLOQUE 05 · APRENDIZAJE ASISTIDO**

## Una interfaz TypeScript con datos locales

> Construye Festival Control en React Native y comprueba su primera interacción en el navegador del aula.

🏷️ **Etiquetas:** `TypeScript` · `Festival Control`


---

### Fase 1: Destino

**Reconoce el resultado antes de construir**

*Construye Festival Control en React Native y comprueba su primera interacción en el navegador del aula.*

> [!IMPORTANT] **Orientación de la Fase**
> - **Objetivo:** Mostrar dos tarjetas y cambiar una selección mediante estado local.
> - **Requisitos previos:** TypeScript y backend de 04 terminado. En este bloque el backend puede estar detenido.
> - **Nuevo contenido:** Expo, TSX, componentes React Native, estilos y estado de interfaz.

#### Las piezas que necesitas comprender

| Componente | Responsabilidad |
|---|---|
| **Expo y versiones** | Expo organiza el desarrollo React Native. Usamos SDK 54 y versiones fijadas para este cuaderno, con Node 22; no mezclamos versiones latest. |
| **TSX** | Es TypeScript con sintaxis de interfaz. App.tsx exporta el componente raíz. |
| **View, Text y Pressable** | Contenedor, texto y acción. Un botón necesita onPress para producir un comportamiento. |
| **useState** | Guarda un valor de interfaz entre renders y solicita actualizar la pantalla cuando cambia. |

#### Sigue el dato de principio a fin

`App.tsx → Array local tipado → map → tarjetas → onPress → setSelected → nuevo render`

Separamos claramente el origen de los datos: ahora un array del cliente; en 06 será una respuesta HTTP.


---

### Fase 2: Prepara

**Recupera el punto de partida**

*Continúas en el mismo repositorio del alumno. Comprueba el bloque anterior antes de modificar archivos.*

*HAZLO · OBSERVA · DIAGNOSTICA*

#### Prepara la carpeta y el checkpoint

##### Paso 1: Crea mobile

*El backend y el cliente tienen package.json y node_modules diferentes. No se instala Expo en backend.*

Desde la raíz crea mobile/src y abre el workspace completo con code .: backend y mobile deben verse como carpetas hermanas. Todas las rutas de las pestañas se leen desde esa raíz; no crees mobile/mobile. Si ya existe un intento anterior, consérvalo en Git antes de reemplazar archivos. Crea los archivos completos de Construye. No ejecutes npm install hasta haber guardado mobile/package.json.

```bash
cd /d/DEVOPS/04-PILARES-SERVERLESS
mkdir -p mobile/src
code .
```

**Resultado esperado:**
```text
VS Code muestra mobile y su carpeta src. Aún no tiene dependencias; se instalarán al probar.
```

> **Ayuda / Resolución de problemas:** La terminal está en otra carpeta,Ejecuta pwd. Los comandos del backend van en /d/DEVOPS/04-PILARES-SERVERLESS/backend; los de Expo, en mobile.,Error de TypeScript,Lee archivo y línea del primer error. Compara ese archivo completo, guarda y repite npm run typecheck.

- [ ] **Verificación:** Comprueba que backend sigue siendo una carpeta hermana de mobile.

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
```


---

### Fase 3: Construye

**Construye una pieza cada vez**

*Primero comprende su responsabilidad; después copia el archivo completo y comprueba su ruta.*

*CONSTRUYE · ARCHIVOS COMPLETOS*

#### Archivos de este bloque

Recorre las pestañas de izquierda a derecha. Cada una contiene un archivo completo, no un fragmento que debas adivinar.

##### 📄 `mobile/package.json`
**Responsabilidad:** Fijar dependencias y comandos reproducibles del cliente.

Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.

> **Concepto clave:** expo/AppEntry,Expo carga App.tsx como raíz sin crear un index.js propio.,Versiones exactas,Instala estas versiones juntas. package-lock.json se genera con npm install y se guarda en Git.,web y typecheck,Un script sirve la interfaz; el otro verifica TS/TSX sin generar archivos.

```json
{
  "name": "festival-control-mobile",
  "version": "1.0.0",
  "private": true,
  "main": "expo/AppEntry",
  "scripts": {
    "start": "expo start",
    "web": "expo start --web",
    "typecheck": "tsc --noEmit",
    "build:web": "expo export --platform web"
  },
  "dependencies": {
    "@expo/metro-runtime": "6.1.2",
    "expo": "54.0.38",
    "expo-status-bar": "3.0.9",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "react-native": "0.81.5",
    "react-native-web": "0.21.4"
  },
  "devDependencies": {
    "@types/react": "19.1.17",
    "typescript": "5.9.3"
  },
  "engines": {
    "node": ">=22.13.0 <23"
  }
}
```

> [!CHECKPOINT] **Comprobación:** Guarda con Ctrl+S. Comprueba nombre, extensión y ruta antes de pasar a la siguiente pestaña.

##### 📄 `mobile/app.json`
**Responsabilidad:** Identificar la aplicación y usar Metro para web.

Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.

> **Concepto clave:** expo,La configuración pertenece a Expo; no contiene claves AWS ni la URL de la API.

```json
{
  "expo": {
    "name": "Festival Control",
    "slug": "festival-control",
    "version": "1.0.0",
    "web": {
      "bundler": "metro"
    }
  }
}
```

> [!CHECKPOINT] **Comprobación:** Guarda con Ctrl+S. Comprueba nombre, extensión y ruta antes de pasar a la siguiente pestaña.

##### 📄 `mobile/tsconfig.json`
**Responsabilidad:** Aplicar la configuración TypeScript compatible con Expo.

Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.

> **Concepto clave:** extends,Recupera la base del SDK; el cliente usa resolución de módulos distinta del NodeNext del backend.,strict,Mantiene las comprobaciones que ya utilizas en TypeScript.

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "noEmit": true
  }
}
```

> [!CHECKPOINT] **Comprobación:** Guarda con Ctrl+S. Comprueba nombre, extensión y ruta antes de pasar a la siguiente pestaña.

##### 📄 `mobile/src/types.ts`
**Responsabilidad:** Nombrar el contrato HTTP en el cliente sin importar módulos de Node o del backend.

Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.

> **Concepto clave:** FestivalEvent,Tiene los mismos campos que el JSON de la API. No se importa el catálogo del servidor.,EventInput,El cliente envía los datos, el servidor asigna el id simulado.

```typescript
export type EventStatus = 'CONFIRMED' | 'CANCELLED';
export interface FestivalEvent {
  id: string;
  artist: string;
  space: string;
  time: string;
  status: EventStatus;
}
export type EventInput = Omit<FestivalEvent, 'id'>;
```

> [!CHECKPOINT] **Comprobación:** Guarda con Ctrl+S. Comprueba nombre, extensión y ruta antes de pasar a la siguiente pestaña.

##### 📄 `mobile/App.tsx`
**Responsabilidad:** Dibujar la pantalla y expresar sus estados de interacción.

Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.

> **Concepto clave:** TSX y componentes,View organiza, Text muestra texto, ScrollView permite recorrer la pantalla y Pressable activa una acción. Las llaves insertan expresiones TypeScript en JSX.,useState,Cambiar estado provoca un nuevo render. No modifica el servidor.,key={item.id},Cada tarjeta conserva una identidad estable durante el render de la lista.,StyleSheet,La UI del producto es negra y rosa; el cuaderno mantiene azul, cian y blanco.

```tsx
import { useState } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { FestivalEvent } from './src/types';

const localEvents: FestivalEvent[] = [
  { id: 'EVT-101', artist: 'Neon Waves', space: 'Main Stage', time: '22:30', status: 'CONFIRMED' },
  { id: 'EVT-102', artist: 'Midnight Session', space: 'Club Stage', time: '23:45', status: 'CONFIRMED' }
];

export default function App() {
  const [selected, setSelected] = useState<string | null>(null);
  const events = localEvents;
  return (
    <View style={styles.page}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>FESTIVAL CONTROL</Text>
        <Text style={styles.title}>Programación</Text>
        <Text style={styles.text}>Datos locales · todavía sin llamadas HTTP</Text>
        {events.map(item => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.tag}>{item.id} · {item.status}</Text>
            <Text style={styles.artist}>{item.artist}</Text>
            <Text style={styles.text}>{item.space} · {item.time}</Text>
          </View>
        ))}
        <Pressable accessibilityRole="button" style={styles.button} onPress={() => setSelected('EVT-101')}>
          <Text style={styles.buttonText}>Seleccionar EVT-101</Text>
        </Pressable>
        <Text accessibilityLiveRegion="polite" style={styles.text}>Selección: {selected ?? 'ninguna'}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#08090d' },
  content: { padding: 24, paddingTop: 48, gap: 16, width: '100%', maxWidth: 760, alignSelf: 'center' },
  eyebrow: { color: '#ff4b9b', fontWeight: '700', letterSpacing: 2 },
  title: { color: '#ffffff', fontSize: 34, fontWeight: '800' },
  text: { color: '#d2d3df', fontSize: 16, lineHeight: 24 },
  card: { padding: 20, gap: 8, borderRadius: 16, borderWidth: 1, borderColor: '#353644', backgroundColor: '#151620' },
  artist: { color: '#ffffff', fontSize: 22, fontWeight: '700' },
  tag: { color: '#ff8fc0', fontWeight: '700' },
  button: { padding: 14, backgroundColor: '#cf236e', borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
  error: { color: '#ffb4b4', fontSize: 16 },
  result: { color: '#afffcf', fontFamily: 'monospace', fontSize: 14, lineHeight: 20 }
});
```

> [!CHECKPOINT] **Comprobación:** Guarda con Ctrl+S. Comprueba nombre, extensión y ruta antes de pasar a la siguiente pestaña.

##### 📄 `.gitignore`
**Responsabilidad:** Excluir dependencias, compilaciones, configuración temporal y credenciales.

Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.

> **Concepto clave:** package-lock.json,Se conserva en Git. No excluyas los archivos .ts, .tsx o tus evidencias.

```typescript
backend/node_modules/
backend/dist/
backend/.serverless/
backend/.env
backend/.env.*
mobile/node_modules/
mobile/dist/
mobile/.expo/
mobile/.env
mobile/.env.*
.aws/
.DS_Store
```

> [!CHECKPOINT] **Comprobación:** Guarda con Ctrl+S. Comprueba nombre, extensión y ruta antes de pasar a la siguiente pestaña.


---

### Fase 4: Prueba

**Prueba por capas y conserva las evidencias**

*No avances porque una pantalla parezca correcta. Contrasta acción, respuesta y diagnóstico.*

*HAZLO · OBSERVA · DIAGNOSTICA*

#### Ejecuta las pruebas del bloque

##### Paso 1: Instala dependencias

*npm install genera node_modules y package-lock.json a partir del manifiesto fijado.*

Desde mobile, después de guardar todos los archivos, ejecuta:

```bash
cd /d/DEVOPS/04-PILARES-SERVERLESS/mobile
npm install
npm run typecheck
```

**Resultado esperado:**
```text
Instalación completada y cero errores de TypeScript.
```

> **Ayuda / Resolución de problemas:** Unsupported engine,Revisa node -v: usa Node 22.13 o superior dentro de la rama 22.,Errores de descarga,Comprueba conexión/proxy del aula; repite npm install sin cambiar versiones al azar.,La terminal está en otra carpeta,Ejecuta pwd. Los comandos del backend van en /d/DEVOPS/04-PILARES-SERVERLESS/backend; los de Expo, en mobile.,Error de TypeScript,Lee archivo y línea del primer error. Compara ese archivo completo, guarda y repite npm run typecheck.

- [ ] **Verificación:** Conserva el lockfile. En otro equipo, con ese lockfile, npm ci reproduce la instalación.

##### Paso 2: Expo · navegador del aula

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

##### Paso 3: Interacción local

*Una selección demuestra que el botón está conectado a un cambio de estado.*

Pulsa Seleccionar EVT-101 y observa el texto inferior. Recarga la página y contrasta el estado inicial.

```bash
Acción: seleccionar → recargar navegador
```

**Resultado esperado:**
```text
Selección EVT-101 después de pulsar; ninguna tras recargar. Las dos tarjetas permanecen.
```

> **Ayuda / Resolución de problemas:** No cambia,Comprueba onPress y setSelected en App.tsx.,Página en blanco,Revisa la primera excepción de Metro y npm run typecheck.

- [ ] **Verificación:** Explica por qué la selección no se conserva tras recargar.


---

### Fase 5: Entiende

**Explica por qué ha funcionado**

*Relaciona la instrucción con el efecto observado antes de modificarla.*

#### Del código al comportamiento

| Paso / Elemento | Explicación |
|---|---|
| `events.map` | Convierte datos en componentes, sin ejecutar HTTP. |
| `useState<string | null>(null)` | La selección puede no existir todavía; no se inventa un id inicial. |
| `onPress={() => setSelected(…)}` | La función se ejecuta al pulsar, no al dibujar el botón. |

> [!TIP] **Predice antes de comprobar: Predice antes de probar**
> **Pregunta:** ¿Aparecerá una llamada a /events al abrir la pantalla?
> 
> **Respuesta razonada:** No. App.tsx usa localEvents. La integración con fetch empieza en 06.


---

### Fase 6: Modifica

**Introduce un cambio pequeño y compruébalo**

*La modificación utiliza lo que acabas de aprender y conserva el contrato necesario para continuar.*

#### Selecciona la segunda tarjeta

**Pasos guiados para modificar el código:**

1. En App.tsx cambia el valor de setSelected a EVT-102.
2. Cambia el texto del botón a Seleccionar EVT-102.
3. Guarda, pulsa y comprueba el nuevo texto. Después restaura EVT-101 para conservar el hito base.


---

### Fase 7: Comprueba

**Contrasta tu comprensión**

*Estas preguntas son formativas, sin nota. Si fallas, lee la explicación y vuelve a intentarlo.*

> [!NOTE] **Autoevaluación: ¿Qué provoca el nuevo render al pulsar?**
> - [ ] 1. El nombre del archivo
> - [ ] 2. setSelected
> - [ ] 3. serverless.yml
> - [ ] 4. JSON.stringify

> [!NOTE] **Autoevaluación: ¿De dónde vienen estas tarjetas?**
> - [ ] 1. De AWS
> - [ ] 2. De Offline
> - [ ] 3. Del array local tipado
> - [ ] 4. De una base de datos


---

### Fase 8: Cierra

**Documenta y deja el proyecto recuperable**

*Marca sólo las comprobaciones que has realizado en tu ordenador.*

*CONSTRUYE · ARCHIVOS COMPLETOS*

#### Deja una evidencia breve y recuperable

Recorre las pestañas de izquierda a derecha. Cada una contiene un archivo completo, no un fragmento que debas adivinar.

##### 📄 `evidencias/05/README.md`
**Responsabilidad:** Documentar lo que tú has comprobado, sin inventar evidencias.

Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.

> **Concepto clave:** Resultado,Completa cada apartado con tu ejecución. Este texto es una plantilla para tus respuestas.,Sin credenciales,No incluyas AWSDetails, tokens ni archivos .aws en capturas, Git o README.

```typescript
# Bloque 05

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

Desde la raíz, completa el README de evidencias/05 y revisa los cambios. Los comandos añaden únicamente los archivos de este bloque. Antes del commit lee git diff --cached y verifica que el lockfile y las fuentes correctas están preparados.

```bash
cd /d/DEVOPS/04-PILARES-SERVERLESS
git status --short
git diff
git add mobile/package.json mobile/package-lock.json mobile/app.json mobile/tsconfig.json mobile/src/types.ts mobile/App.tsx .gitignore evidencias/05/README.md
git diff --cached
git commit -m "Completa bloque 05"
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

- [ ] He instalado mobile con su propio package.json y guardado package-lock.json.
- [ ] Veo dos tarjetas y la selección responde al botón.
- [ ] He explicado mi resultado en el README y guardado un commit recuperable.

> [!NOTE] **Siguiente paso**
> Bloque 06: sustituirás el array local por datos recibidos del backend mediante GET.



[⬆ Volver al Índice](#-índice-de-bloques)

---

<br>

<a id="bloque-06"></a>

# 06 · React Native + GET

**BLOQUE 06 · APRENDIZAJE ASISTIDO**

## La pantalla recibe datos de la API

> Sustituye el array local por un GET y distingue carga, respuesta y error.

🏷️ **Etiquetas:** `TypeScript` · `Festival Control`


---

### Fase 1: Destino

**Reconoce el resultado antes de construir**

*Sustituye el array local por un GET y distingue carga, respuesta y error.*

> [!IMPORTANT] **Orientación de la Fase**
> - **Objetivo:** Cargar dos actuaciones desde backend y mostrar un error recuperable si el servidor se detiene.
> - **Requisitos previos:** Interfaz de 05 y API completa de 04. Mantén sus tipos y la configuración CORS.
> - **Nuevo contenido:** fetch, Promises, efecto inicial y estados de carga/error.

#### Las piezas que necesitas comprender

| Componente | Responsabilidad |
|---|---|
| **Dos orígenes** | Expo suele usar 8081 y backend 3000. El navegador exige CORS aunque ambos estén en localhost. |
| **API_URL** | Es la base de la API, con /dev, sin /events ni barra final. El helper añade la ruta. |
| **fetch y response.ok** | La Promise puede resolverse aun con 400/404. response.ok permite convertirlo en un error visible. |
| **Carga y recuperación** | useEffect inicia la primera carga; finally libera el estado; GET recargar vuelve a intentarlo. |

#### Sigue el dato de principio a fin

`useEffect / botón → getEvents() → fetch a /events → JSON validado → setEvents → tarjetas`

El cliente importa tipos, pero no el catálogo fijo del backend. Una petición visible en Network demuestra el origen HTTP.


---

### Fase 2: Prepara

**Recupera el punto de partida**

*Continúas en el mismo repositorio del alumno. Comprueba el bloque anterior antes de modificar archivos.*

*HAZLO · OBSERVA · DIAGNOSTICA*

#### Prepara la carpeta y el checkpoint

##### Paso 1: Backend primero

*Separar la API del cliente permite localizar el fallo antes de revisar React.*

En una terminal de backend, ejecuta npm start. En otra prueba GET con curl. Conserva la primera abierta.

```bash
cd /d/DEVOPS/04-PILARES-SERVERLESS/backend
npm start
```

**Resultado esperado:**
```text
Se anuncian las rutas de 04. En la segunda terminal curl -i http://localhost:3000/dev/events devuelve 200 y dos actuaciones.
```

> **Ayuda / Resolución de problemas:** La terminal está en otra carpeta,Ejecuta pwd. Los comandos del backend van en /d/DEVOPS/04-PILARES-SERVERLESS/backend; los de Expo, en mobile.,Error de TypeScript,Lee archivo y línea del primer error. Compara ese archivo completo, guarda y repite npm run typecheck.

- [ ] **Verificación:** Si GET no funciona fuera del frontend, corrige backend antes de abrir Expo.

##### Paso 2: Cliente · punto de partida

*Expo y el backend son procesos distintos; cada uno necesita su propia terminal.*

Desde mobile, verifica el proyecto previo. Para 06 y 07 deja además backend activo con npm start.

```bash
cd /d/DEVOPS/04-PILARES-SERVERLESS/mobile
npm run typecheck
```

**Resultado esperado:**
```text
El cliente compila sin errores; backend mantiene las rutas de 04 si este bloque usa HTTP.
```

> **Ayuda / Resolución de problemas:** La terminal está en otra carpeta,Ejecuta pwd. Los comandos del backend van en /d/DEVOPS/04-PILARES-SERVERLESS/backend; los de Expo, en mobile.,Error de TypeScript,Lee archivo y línea del primer error. Compara ese archivo completo, guarda y repite npm run typecheck.

- [ ] **Verificación:** Corrige el primer error antes de sustituir archivos. No ejecutes los comandos Expo dentro de backend.

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

> **Concepto clave:** API_URL,URL base del servidor, sin barra final y sin /events. En el navegador de este PC, localhost se refiere a ese mismo PC.,fetch + response.ok,fetch puede completar con 400/404. response.ok distingue esos errores de una respuesta correcta.,unknown y type guard,Antes de renderizar una lista, comprobamos su forma. Los tipos estáticos no validan JSON remoto.,encodeURIComponent,GET no envía body ni Content-Type innecesario.

```typescript
import type { FestivalEvent } from './types';

// URL base sin /events al final. Sustituye sólo este valor en el bloque 09.
export const API_URL = 'http://localhost:3000/dev';

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
```

> [!CHECKPOINT] **Comprobación:** Guarda con Ctrl+S. Comprueba nombre, extensión y ruta antes de pasar a la siguiente pestaña.

##### 📄 `mobile/App.tsx`
**Responsabilidad:** Dibujar la pantalla y expresar sus estados de interacción.

Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.

> **Concepto clave:** TSX y componentes,View organiza, Text muestra texto, ScrollView permite recorrer la pantalla y Pressable activa una acción. Las llaves insertan expresiones TypeScript en JSX.,useState,Cambiar estado provoca un nuevo render. No modifica el servidor.,useEffect + loadEvents,El efecto solicita datos al montar; el botón permite repetir la carga. try/catch/finally actualiza carga, error y resultado.,StyleSheet,La UI del producto es negra y rosa; el cuaderno mantiene azul, cian y blanco.

```tsx
import { useEffect, useState } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { FestivalEvent } from './src/types';
import { getEvents } from './src/api';

export default function App() {
  const [events, setEvents] = useState<FestivalEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  async function loadEvents() {
    setLoading(true);
    setError('');
    try { setEvents(await getEvents()); }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'Error de red'); }
    finally { setLoading(false); }
  }
  useEffect(() => { void loadEvents(); }, []);
  return (
    <View style={styles.page}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>FESTIVAL CONTROL</Text>
        <Text style={styles.title}>Programación</Text>
        <Text style={styles.text}>Catálogo recibido por HTTP</Text>
        {events.map(item => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.tag}>{item.id} · {item.status}</Text>
            <Text style={styles.artist}>{item.artist}</Text>
            <Text style={styles.text}>{item.space} · {item.time}</Text>
          </View>
        ))}
        <Pressable accessibilityRole="button" disabled={loading} style={styles.button} onPress={() => void loadEvents()}>
          <Text style={styles.buttonText}>{loading ? 'Cargando…' : 'GET recargar'}</Text>
        </Pressable>
        {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#08090d' },
  content: { padding: 24, paddingTop: 48, gap: 16, width: '100%', maxWidth: 760, alignSelf: 'center' },
  eyebrow: { color: '#ff4b9b', fontWeight: '700', letterSpacing: 2 },
  title: { color: '#ffffff', fontSize: 34, fontWeight: '800' },
  text: { color: '#d2d3df', fontSize: 16, lineHeight: 24 },
  card: { padding: 20, gap: 8, borderRadius: 16, borderWidth: 1, borderColor: '#353644', backgroundColor: '#151620' },
  artist: { color: '#ffffff', fontSize: 22, fontWeight: '700' },
  tag: { color: '#ff8fc0', fontWeight: '700' },
  button: { padding: 14, backgroundColor: '#cf236e', borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
  error: { color: '#ffb4b4', fontSize: 16 },
  result: { color: '#afffcf', fontFamily: 'monospace', fontSize: 14, lineHeight: 20 }
});
```

> [!CHECKPOINT] **Comprobación:** Guarda con Ctrl+S. Comprueba nombre, extensión y ruta antes de pasar a la siguiente pestaña.


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

##### Paso 2: Comprueba Network

*Las tarjetas por sí solas no demuestran una llamada. La pestaña Network registra método, URL, estado y body.*

Abre F12 → Network (Red), filtra events, recarga y selecciona la petición. Comprueba el panel Response.

```bash
GET http://localhost:3000/dev/events
```

**Resultado esperado:**
```text
GET 200, respuesta con dos actuaciones y tarjetas que corresponden a esos datos.
```

> **Ayuda / Resolución de problemas:** CORS,Revisa cors: true y el helper json del bloque 04, incluido en respuestas de error. No desactives la protección del navegador.,404,API_URL debe acabar en /dev, no en /events; confirma ruta y puerto con curl.

- [ ] **Verificación:** Guarda una evidencia que relacione respuesta y tarjetas.

##### Paso 3: Detén y recupera

*La recuperación forma parte del comportamiento esperado, no es un fallo a ocultar.*

Detén sólo backend con Ctrl+C. Pulsa GET recargar. Después arranca backend otra vez y pulsa de nuevo.

```bash
Backend detenido → GET recargar
Backend activo → GET recargar
```

**Resultado esperado:**
```text
Aparece error de red al detener backend; con el servidor activo desaparece el error y reaparecen/actualizan las dos tarjetas.
```

> **Ayuda / Resolución de problemas:** No hay error,Comprueba que has pulsado recargar y detenido la terminal correcta.,Error persistente,Prueba curl de nuevo y comprueba API_URL.

- [ ] **Verificación:** Explica qué capa fallaba y cuál continuaba funcionando.


---

### Fase 5: Entiende

**Explica por qué ha funcionado**

*Relaciona la instrucción con el efecto observado antes de modificarla.*

#### Del código al comportamiento

| Paso / Elemento | Explicación |
|---|---|
| `getEvents(): Promise<FestivalEvent[]>` | La función entrega datos comprobados; el componente no concatena URLs. |
| `setLoading(true) / finally` | La interfaz vuelve a estar disponible tanto al acertar como al fallar. |
| `setError(…)` | El alumno puede ver el error en pantalla y volver a intentar la operación. |

> [!TIP] **Predice antes de comprobar: Predice antes de probar**
> **Pregunta:** Si recibes HTTP 404, ¿fetch entra automáticamente en catch?
> 
> **Respuesta razonada:** No por el estado HTTP. Nuestro helper revisa response.ok y lanza Error; ese throw hace que el componente entre en catch.


---

### Fase 6: Modifica

**Introduce un cambio pequeño y compruébalo**

*La modificación utiliza lo que acabas de aprender y conserva el contrato necesario para continuar.*

#### Distingue ruta incorrecta de servidor detenido

**Pasos guiados para modificar el código:**

1. En api.ts cambia temporalmente /events por /ruta-inexistente dentro de getEvents.
2. Con backend activo, pulsa recargar y observa Network: hay respuesta HTTP aunque sea 404.
3. Restaura /events, guarda y comprueba GET 200.


---

### Fase 7: Comprueba

**Contrasta tu comprensión**

*Estas preguntas son formativas, sin nota. Si fallas, lee la explicación y vuelve a intentarlo.*

> [!NOTE] **Autoevaluación: ¿Dónde se configura el destino HTTP?**
> - [ ] 1. En StyleSheet
> - [ ] 2. En API_URL de src/api.ts
> - [ ] 3. En un token AWS del cliente
> - [ ] 4. En cada Text

> [!NOTE] **Autoevaluación: ¿Qué confirma que los datos vienen por HTTP?**
> - [ ] 1. El color rosa
> - [ ] 2. Ver una tarjeta
> - [ ] 3. La petición GET y su respuesta en Network
> - [ ] 4. Que exista types.ts


---

### Fase 8: Cierra

**Documenta y deja el proyecto recuperable**

*Marca sólo las comprobaciones que has realizado en tu ordenador.*

*CONSTRUYE · ARCHIVOS COMPLETOS*

#### Deja una evidencia breve y recuperable

Recorre las pestañas de izquierda a derecha. Cada una contiene un archivo completo, no un fragmento que debas adivinar.

##### 📄 `evidencias/06/README.md`
**Responsabilidad:** Documentar lo que tú has comprobado, sin inventar evidencias.

Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.

> **Concepto clave:** Resultado,Completa cada apartado con tu ejecución. Este texto es una plantilla para tus respuestas.,Sin credenciales,No incluyas AWSDetails, tokens ni archivos .aws en capturas, Git o README.

```typescript
# Bloque 06

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

Desde la raíz, completa el README de evidencias/06 y revisa los cambios. Los comandos añaden únicamente los archivos de este bloque. Antes del commit lee git diff --cached y verifica que el lockfile y las fuentes correctas están preparados.

```bash
cd /d/DEVOPS/04-PILARES-SERVERLESS
git status --short
git diff
git add mobile/src/api.ts mobile/App.tsx evidencias/06/README.md
git diff --cached
git commit -m "Completa bloque 06"
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

- [ ] GET 200 aparece en Network y alimenta la lista.
- [ ] He probado fallo de red y recuperación sin ocultar el error.
- [ ] He explicado mi resultado en el README y guardado un commit recuperable.

> [!NOTE] **Siguiente paso**
> Bloque 07: el cliente disparará las cuatro escrituras simuladas y mostrará sus respuestas.



[⬆ Volver al Índice](#-índice-de-bloques)

---

<br>

<a id="bloque-07"></a>

# 07 · React Native CRUD

**BLOQUE 07 · APRENDIZAJE ASISTIDO**

## Cada acción de interfaz tiene su método HTTP

> Envía POST, PUT, PATCH y DELETE desde la misma pantalla y muestra la respuesta del servidor.

🏷️ **Etiquetas:** `TypeScript` · `Festival Control`


---

### Fase 1: Destino

**Reconoce el resultado antes de construir**

*Envía POST, PUT, PATCH y DELETE desde la misma pantalla y muestra la respuesta del servidor.*

> [!IMPORTANT] **Orientación de la Fase**
> - **Objetivo:** Relacionar cuatro botones con método, ruta, body, estado y respuesta; conservar GET y sus errores.
> - **Requisitos previos:** GET integrado en 06 y contrato fijo de 04, incluidos EVT-101 y EVT-102.
> - **Nuevo contenido:** Helper compartido para escrituras, callbacks asíncronos y bloqueo durante envío.

#### Las piezas que necesitas comprender

| Componente | Responsabilidad |
|---|---|
| **Una función por operación** | api.ts traduce la intención a método y ruta. App.tsx decide cuándo invocarla. |
| **Objeto completo o parcial** | createEvent/replaceEvent reciben EventInput; updateEvent recibe sólo status. El tipo ayuda a respetar el contrato. |
| **run y busy** | run prepara el estado, espera la operación y muestra JSON o error. busy deshabilita botones durante el envío. |
| **Resultado frente a catálogo** | Una respuesta UPDATED demuestra la simulación atendida; GET sigue devolviendo el catálogo original. |

#### Sigue el dato de principio a fin

`Pressable.onPress → run(label, task) → api.ts + método HTTP → Handler simulado → Resultado visible + Network`

Se conservan dos procesos y una única URL base. No añadimos AWS SDK al cliente ni credenciales.


---

### Fase 2: Prepara

**Recupera el punto de partida**

*Continúas en el mismo repositorio del alumno. Comprueba el bloque anterior antes de modificar archivos.*

*HAZLO · OBSERVA · DIAGNOSTICA*

#### Prepara la carpeta y el checkpoint

##### Paso 1: API de 04 activa

*Las escrituras necesitan los handlers y CORS del bloque CRUD.*

Arranca backend y confirma GET /events en otra terminal. Usa los ids conocidos, no EVT-104.

```bash
cd /d/DEVOPS/04-PILARES-SERVERLESS/backend
npm start
```

**Resultado esperado:**
```text
Rutas GET, POST, PUT, PATCH y DELETE anunciadas y GET con dos actuaciones.
```

> **Ayuda / Resolución de problemas:** La terminal está en otra carpeta,Ejecuta pwd. Los comandos del backend van en /d/DEVOPS/04-PILARES-SERVERLESS/backend; los de Expo, en mobile.,Error de TypeScript,Lee archivo y línea del primer error. Compara ese archivo completo, guarda y repite npm run typecheck.

- [ ] **Verificación:** Deja backend abierto; vuelve a la terminal de mobile.

##### Paso 2: Cliente · punto de partida

*Expo y el backend son procesos distintos; cada uno necesita su propia terminal.*

Desde mobile, verifica el proyecto previo. Para 06 y 07 deja además backend activo con npm start.

```bash
cd /d/DEVOPS/04-PILARES-SERVERLESS/mobile
npm run typecheck
```

**Resultado esperado:**
```text
El cliente compila sin errores; backend mantiene las rutas de 04 si este bloque usa HTTP.
```

> **Ayuda / Resolución de problemas:** La terminal está en otra carpeta,Ejecuta pwd. Los comandos del backend van en /d/DEVOPS/04-PILARES-SERVERLESS/backend; los de Expo, en mobile.,Error de TypeScript,Lee archivo y línea del primer error. Compara ese archivo completo, guarda y repite npm run typecheck.

- [ ] **Verificación:** Corrige el primer error antes de sustituir archivos. No ejecutes los comandos Expo dentro de backend.

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
export const API_URL = 'http://localhost:3000/dev';

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

##### 📄 `mobile/App.tsx`
**Responsabilidad:** Dibujar la pantalla y expresar sus estados de interacción.

Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.

> **Concepto clave:** TSX y componentes,View organiza, Text muestra texto, ScrollView permite recorrer la pantalla y Pressable activa una acción. Las llaves insertan expresiones TypeScript en JSX.,useState,Cambiar estado provoca un nuevo render. No modifica el servidor.,useEffect + loadEvents,El efecto solicita datos al montar; el botón permite repetir la carga. try/catch/finally actualiza carga, error y resultado.,StyleSheet,La UI del producto es negra y rosa; el cuaderno mantiene azul, cian y blanco.

```tsx
import { useEffect, useState } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { FestivalEvent } from './src/types';
import { getEvents, createEvent, replaceEvent, updateEvent, deleteEvent } from './src/api';

export default function App() {
  const [events, setEvents] = useState<FestivalEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  async function loadEvents() {
    setLoading(true);
    setError('');
    try { setEvents(await getEvents()); }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'Error de red'); }
    finally { setLoading(false); }
  }
  useEffect(() => { void loadEvents(); }, []);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState('');
  async function run(label: string, task: () => Promise<unknown>) {
    setBusy(true); setError(''); setResult('');
    try {
      const response = await task();
      setResult(label + '\n' + JSON.stringify(response, null, 2));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Error de red');
    } finally { setBusy(false); }
  }
  const input = { artist: 'Nova Pulse', space: 'Main Stage', time: '21:00', status: 'CONFIRMED' as const };
  const actions: [string, () => Promise<unknown>][] = [
    ['POST crear', () => createEvent(input)],
    ['PUT reemplazar EVT-101', () => replaceEvent('EVT-101', input)],
    ['PATCH cancelar EVT-101', () => updateEvent('EVT-101', 'CANCELLED')],
    ['DELETE EVT-102', () => deleteEvent('EVT-102')]
  ];
  return (
    <View style={styles.page}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>FESTIVAL CONTROL</Text>
        <Text style={styles.title}>Programación</Text>
        <Text style={styles.text}>Catálogo recibido por HTTP</Text>
        {events.map(item => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.tag}>{item.id} · {item.status}</Text>
            <Text style={styles.artist}>{item.artist}</Text>
            <Text style={styles.text}>{item.space} · {item.time}</Text>
          </View>
        ))}
        <Pressable accessibilityRole="button" disabled={loading || busy} style={styles.button} onPress={() => void loadEvents()}>
          <Text style={styles.buttonText}>{loading ? 'Cargando…' : 'GET recargar'}</Text>
        </Pressable>
        {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
        <Text style={styles.text}>Escrituras simuladas: el resultado se muestra debajo; la lista conserva sus dos eventos.</Text>
        {actions.map(([label, task]) => (
          <Pressable key={label} accessibilityRole="button" disabled={busy || loading} style={styles.button} onPress={() => void run(label, task)}>
            <Text style={styles.buttonText}>{label}</Text>
          </Pressable>
        ))}
        {busy ? <Text style={styles.text}>Enviando…</Text> : null}
        <Text accessibilityLiveRegion="polite" style={styles.result}>{result}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#08090d' },
  content: { padding: 24, paddingTop: 48, gap: 16, width: '100%', maxWidth: 760, alignSelf: 'center' },
  eyebrow: { color: '#ff4b9b', fontWeight: '700', letterSpacing: 2 },
  title: { color: '#ffffff', fontSize: 34, fontWeight: '800' },
  text: { color: '#d2d3df', fontSize: 16, lineHeight: 24 },
  card: { padding: 20, gap: 8, borderRadius: 16, borderWidth: 1, borderColor: '#353644', backgroundColor: '#151620' },
  artist: { color: '#ffffff', fontSize: 22, fontWeight: '700' },
  tag: { color: '#ff8fc0', fontWeight: '700' },
  button: { padding: 14, backgroundColor: '#cf236e', borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
  error: { color: '#ffb4b4', fontSize: 16 },
  result: { color: '#afffcf', fontFamily: 'monospace', fontSize: 14, lineHeight: 20 }
});
```

> [!CHECKPOINT] **Comprobación:** Guarda con Ctrl+S. Comprueba nombre, extensión y ruta antes de pasar a la siguiente pestaña.


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

##### Paso 2: Cuatro botones y cuatro evidencias

*Cada clic produce una petición real. La respuesta se muestra debajo de los botones.*

Abre Network. Pulsa uno a uno POST crear, PUT reemplazar EVT-101, PATCH cancelar EVT-101 y DELETE EVT-102. Espera el resultado entre clics.

```bash
POST /events → 201
PUT /events/EVT-101 → 200 REPLACED
PATCH /events/EVT-101 → 200 UPDATED
DELETE /events/EVT-102 → 200 DELETED
```

**Resultado esperado:**
```text
Métodos y cuerpos coinciden con los helpers. Cada resultado JSON aparece en pantalla; las tarjetas no desaparecen tras DELETE.
```

> **Ayuda / Resolución de problemas:** 400,Compara el body con el contrato; PUT necesita todos los campos y PATCH únicamente status válido.,404,Usa EVT-101 o EVT-102 y conserva /dev en API_URL.,Failed to fetch en escrituras,Comprueba OPTIONS y Content-Type en Network, cors: true y headers del helper json.

- [ ] **Verificación:** Documenta método, ruta, body y estado de las cuatro operaciones.

##### Paso 3: Recarga después de escribir

*El botón GET permite comprobar el efecto real sobre consultas posteriores.*

Después de PATCH y DELETE pulsa GET recargar y compara con el resultado anterior.

```bash
GET /events después de escrituras
```

**Resultado esperado:**
```text
Continúan dos actuaciones, con status CONFIRMED. El mensaje UPDATED/DELETED no implica persistencia.
```

> **Ayuda / Resolución de problemas:** Esperabas que desapareciera una tarjeta,Relee el alcance de 04. Este cliente refleja un contrato simulado y no altera datos locales para fingir un guardado.

- [ ] **Verificación:** Explica con tus palabras qué parte sí has demostrado.


---

### Fase 5: Entiende

**Explica por qué ha funcionado**

*Relaciona la instrucción con el efecto observado antes de modificarla.*

#### Del código al comportamiento

| Paso / Elemento | Explicación |
|---|---|
| `() => createEvent(input)` | Pasa una tarea pendiente a run; no dispara POST durante el render. |
| `headers + JSON.stringify` | El helper transforma el objeto en el texto JSON que espera el backend. |
| `disabled={busy || loading}` | Evita nuevas acciones mientras se espera una respuesta. |
| `setResult(JSON.stringify(…))` | Muestra el valor devuelto sin asumir que el catálogo cambió. |

> [!TIP] **Predice antes de comprobar: Predice antes de probar**
> **Pregunta:** ¿Qué petición lleva el botón de cancelar: PUT o PATCH?
> 
> **Respuesta razonada:** PATCH, con un body que sólo contiene status. Un PUT parcial se rechazaría con 400.


---

### Fase 6: Modifica

**Introduce un cambio pequeño y compruébalo**

*La modificación utiliza lo que acabas de aprender y conserva el contrato necesario para continuar.*

#### Cambia el estado solicitado

**Pasos guiados para modificar el código:**

1. En la acción PATCH cambia CANCELLED por CONFIRMED.
2. Guarda, pulsa PATCH y comprueba Request Payload, estado 200 y changes.status.
3. Restaura CANCELLED al terminar para mantener el hito del cuaderno.


---

### Fase 7: Comprueba

**Contrasta tu comprensión**

*Estas preguntas son formativas, sin nota. Si fallas, lee la explicación y vuelve a intentarlo.*

> [!NOTE] **Autoevaluación: ¿Por qué pasamos una función a run?**
> - [ ] 1. Para ejecutar durante cada render
> - [ ] 2. Para que la tarea empiece al pulsar y pueda esperarse con await
> - [ ] 3. Para evitar TypeScript
> - [ ] 4. Para modificar YAML

> [!NOTE] **Autoevaluación: ¿Qué debería ocurrir tras DELETE en esta práctica?**
> - [ ] 1. Desaparece definitivamente de GET
> - [ ] 2. Se borra de AWS DynamoDB
> - [ ] 3. Aparece DELETED y GET conserva los dos datos fijos
> - [ ] 4. Se elimina App.tsx


---

### Fase 8: Cierra

**Documenta y deja el proyecto recuperable**

*Marca sólo las comprobaciones que has realizado en tu ordenador.*

*CONSTRUYE · ARCHIVOS COMPLETOS*

#### Deja una evidencia breve y recuperable

Recorre las pestañas de izquierda a derecha. Cada una contiene un archivo completo, no un fragmento que debas adivinar.

##### 📄 `evidencias/07/README.md`
**Responsabilidad:** Documentar lo que tú has comprobado, sin inventar evidencias.

Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.

> **Concepto clave:** Resultado,Completa cada apartado con tu ejecución. Este texto es una plantilla para tus respuestas.,Sin credenciales,No incluyas AWSDetails, tokens ni archivos .aws en capturas, Git o README.

```typescript
# Bloque 07

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

Desde la raíz, completa el README de evidencias/07 y revisa los cambios. Los comandos añaden únicamente los archivos de este bloque. Antes del commit lee git diff --cached y verifica que el lockfile y las fuentes correctas están preparados.

```bash
cd /d/DEVOPS/04-PILARES-SERVERLESS
git status --short
git diff
git add mobile/src/api.ts mobile/App.tsx evidencias/07/README.md
git diff --cached
git commit -m "Completa bloque 07"
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

- [ ] Los cinco métodos están visibles y comprobados en Network.
- [ ] La pantalla muestra respuestas y errores, y bloquea botones mientras envía.
- [ ] He explicado mi resultado en el README y guardado un commit recuperable.

> [!NOTE] **Siguiente paso**
> Bloque 08: desplegarás este mismo backend compilado en el laboratorio AWS autorizado.



[⬆ Volver al Índice](#-índice-de-bloques)

---

<br>

<a id="bloque-08"></a>

# 08 · Deploy AWS

**BLOQUE 08 · APRENDIZAJE ASISTIDO**

## Del backend local al laboratorio AWS

> Comprueba sesión, región y rol; despliega el backend y contrasta una invocación cloud con sus logs.

🏷️ **Etiquetas:** `TypeScript` · `Festival Control`


---

### Fase 1: Destino

**Reconoce el resultado antes de construir**

*Comprueba sesión, región y rol; despliega el backend y contrasta una invocación cloud con sus logs.*

> [!IMPORTANT] **Orientación de la Fase**
> - **Objetivo:** Obtener un endpoint API Gateway del laboratorio y verificar una Lambda del mismo servicio TypeScript.
> - **Requisitos previos:** Backend completo de 04, interfaz local de 07, AWS CLI v2 instalada y cuenta Framework validada en 01.
> - **Nuevo contenido:** Credenciales temporales, perfil academy, rol Lambda, CloudFormation y trazabilidad cloud.

#### Las piezas que necesitas comprender

| Componente | Responsabilidad |
|---|---|
| **Sesión Academy** | Start Lab habilita recursos y credenciales temporales de esa sesión. Vuelve a comprobarla cada jornada. |
| **Perfil academy** | Se guarda fuera del repositorio, en ~/.aws/credentials. Incluye access key, secret key y session token. |
| **Identidad y rol Lambda** | STS comprueba quién despliega. El rol de ejecución es otra identidad, usada por Lambda. Copiar el Arn de STS en provider.iam.role es incorrecto. |
| **CloudFormation y permisos** | Serverless prepara recursos y CloudFormation aplica la plantilla. El lab debe permitir desplegarlos y pasar el rol existente; no todos los cursos Academy tienen los mismos permisos. |

#### Sigue el dato de principio a fin

`tsc → dist → Framework + perfil academy → CloudFormation → API Gateway → Lambda → JSON + CloudWatch`

Las fuentes y los contratos son los mismos que en local. La infraestructura y el lugar de ejecución cambian.


---

### Fase 2: Prepara

**Recupera el punto de partida**

*Continúas en el mismo repositorio del alumno. Comprueba el bloque anterior antes de modificar archivos.*

*HAZLO · OBSERVA · DIAGNOSTICA*

#### Prepara la carpeta y el checkpoint

##### Paso 1: Inicia el laboratorio

*Las credenciales de una sesión anterior pueden haber caducado aunque estén guardadas.*

Abre AWS Academy → curso → Learner Lab / Learning Lab → Start Lab. Espera el indicador activo. Abre AWS Details y la consola AWS; localiza los datos AWS CLI de la sesión. No compartas ni captures las claves.

```bash
aws --version
```

**Resultado esperado:**
```text
Laboratorio activo, consola abierta y AWS CLI v2 disponible en Git Bash.
```

> **Ayuda / Resolución de problemas:** Start Lab no se habilita,Pide al profesor revisar matrícula, disponibilidad y presupuesto del laboratorio.,No hay credenciales CLI,Consulta las instrucciones del lab; no uses claves de otra persona ni de una cuenta personal.

- [ ] **Verificación:** No avances hasta disponer de la sesión y sus datos temporales.

##### Paso 2: Guarda el perfil academy

*AWS lee el archivo del usuario. No pertenece a backend ni al repositorio.*

En Git Bash ejecuta los comandos inferiores. En el archivo abierto conserva los otros perfiles. Añade o actualiza una única sección [academy] con los tres valores reales de AWS Details: aws_access_key_id, aws_secret_access_key y aws_session_token. Si te dieron [default], copia sus tres líneas bajo [academy]; no dupliques secciones. Guarda y cierra el archivo.

```bash
mkdir -p ~/.aws
code ~/.aws/credentials
```

**Resultado esperado:**
```text
Existe [academy] con las tres credenciales actuales. Ruta Windows: carpeta de tu usuario → .aws → credentials, sin extensión .txt.
```

> **Ayuda / Resolución de problemas:** No encuentra el perfil,Comprueba el nombre [academy], archivo credentials sin extensión y guardado.,Hay variables de credenciales anteriores,En esta terminal ejecuta unset AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_SESSION_TOKEN AWS_SECURITY_TOKEN antes de elegir academy; evita que claves antiguas sustituyan al perfil.,Token inválido,Copia de nuevo los tres valores de la misma sesión, sin comillas añadidas ni espacios dentro de las claves.

- [ ] **Verificación:** El archivo permanece fuera de Git. No imprimas ni pegues su contenido en la entrega.

##### Paso 3: Región, servicio y rol

*Una variable de shell pertenece a esta terminal. Serverless necesita región, identificador y rol al resolver el YAML.*

Con el laboratorio iniciado, localiza la región autorizada y el ARN del rol de ejecución Lambda en las instrucciones del lab o en IAM → Roles → rol autorizado (frecuentemente LabRole) → ARN. Si no puedes verlo, el profesor debe facilitar el ARN de tu cuenta. No inventes un ARN ni crees políticas. Introduce valores reales cuando cada pregunta te lo pida. Conserva esta terminal para todos los comandos Serverless de 08 y 09.

```bash
export AWS_PROFILE=academy
read -r -p "Región autorizada del lab: " AWS_REGION
export AWS_REGION
export AWS_DEFAULT_REGION="$AWS_REGION"
read -r -p "Código de alumno (ej. alumno01): " STUDENT_CODE
export STUDENT_CODE
read -r -p "ARN del rol Lambda autorizado: " LAMBDA_ROLE_ARN
export LAMBDA_ROLE_ARN
aws configure set region "$AWS_REGION" --profile academy
aws sts get-caller-identity --profile academy
```

**Resultado esperado:**
```text
STS devuelve Account, UserId y Arn de la identidad temporal. Ese Arn de STS NO es el ARN del rol de ejecución Lambda. El profesor confirma que el rol elegido puede ser asumido por Lambda.
```

> **Ayuda / Resolución de problemas:** ExpiredToken / InvalidClientTokenId,Renueva las tres credenciales desde la sesión actual, guarda y repite STS.,AccessDenied de IAM,El rol y los permisos del lab los determina el centro. El profesor debe confirmar ARN, iam:PassRole y permisos de CloudFormation/S3/Lambda/API Gateway antes de desplegar.,Abrí otra terminal,Vuelve a introducir estas variables allí. El archivo credentials conserva el perfil, pero las variables exportadas no pasan a terminales ya abiertas.

- [ ] **Verificación:** Comprueba cuenta, región y rol autorizado. Si faltan permisos del lab, registra el bloqueo antes de intentar el deploy.

##### Paso 4: Carpeta y bloque anterior

*El backend sigue usando package.json, tsconfig.json, hello.ts y las dependencias fijadas en 01. No se crea un servicio nuevo.*

Abre Git Bash en VS Code. No ejecutes npm start ahora: los comandos siguientes preparan AWS. La comprobación local de 04 debe estar superada. Detén Offline con Ctrl+C antes de editar su configuración.

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

##### 📄 `backend/serverless.yml`
**Responsabilidad:** Desplegar el mismo código compilado con región y rol existentes del laboratorio.

Conserva las siete funciones y sustituye el archivo completo. Los valores env se preparan en Prepara y se repiten al volver otro día.

> **Concepto clave:** service + STUDENT_CODE,Añade tu código de alumno para distinguir servicios si se comparte cuenta AWS. Debe contener sólo minúsculas, números y guiones, y ser breve.,${env:AWS_REGION},Lee una variable de esta terminal. La región debe coincidir con la autorizada en el laboratorio.,provider.iam.role,Usa el ARN del rol Lambda autorizado por el laboratorio; así no pedimos crear un rol IAM nuevo.,dist/events/…,Se despliega el JavaScript que produce tsc; los fuentes de trabajo siguen siendo TypeScript.

```yaml
service: festival-control-api-${env:STUDENT_CODE}
frameworkVersion: ~4.45.0

provider:
  name: aws
  runtime: nodejs22.x
  region: ${env:AWS_REGION}
  stage: dev
  iam:
    role: ${env:LAMBDA_ROLE_ARN}

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

> [!NOTE] **Conserva los handlers TypeScript**
> Este bloque cambia configuración de infraestructura, no el lenguaje ni el contrato. Conserva íntegros backend/src/hello.ts y backend/src/events/*.ts del bloque 04. npm run build genera dist antes de empaquetar; no se editan archivos .js.


---

### Fase 4: Prueba

**Prueba por capas y conserva las evidencias**

*No avances porque una pantalla parezca correcta. Contrasta acción, respuesta y diagnóstico.*

*HAZLO · OBSERVA · DIAGNOSTICA*

#### Ejecuta las pruebas del bloque

##### Paso 1: Compila y empaqueta

*El paquete debe incluir dist/events/*.js y referenciar las rutas de ejecución. Las dependencias de desarrollo no son el código de tus handlers.*

Dentro de backend y en la terminal preparada, comprueba tipos, compila y prepara el paquete. No continúes si falta una variable o el paquete falla.

```bash
npm run typecheck
npm run build
npx serverless package --stage dev --region "$AWS_REGION"
```

**Resultado esperado:**
```text
Se crea .serverless con el paquete y la plantilla de CloudFormation. Al abrir el ZIP puedes localizar dist/events/list.js y los demás handlers; el rol de la plantilla coincide con el autorizado.
```

> **Ayuda / Resolución de problemas:** Framework solicita login,Autentica Serverless Framework como en 01. Es independiente de la sesión Academy.,AccessDenied / CREATE_FAILED,Lee el primer recurso y permiso denegado en CloudFormation → Events. Comunica al profesor recurso y acción, sin claves. No añadas permisos ni repitas despliegues a ciegas.,Token caducado,Renueva las tres credenciales de academy y comprueba STS de nuevo.,Variables env ausentes,Vuelve a Prepara y usa la misma terminal con AWS_REGION, STUDENT_CODE y LAMBDA_ROLE_ARN.

- [ ] **Verificación:** Comprueba el paquete antes del despliegue. Esta operación no equivale a una invocación real en AWS.

##### Paso 2: Despliega el servicio

*deploy crea o actualiza únicamente el servicio de este proyecto en la cuenta y región seleccionadas.*

Con el profesor habiendo confirmado permisos del lab, ejecuta en esa misma terminal:

```bash
npx serverless deploy --stage dev --region "$AWS_REGION"
npx serverless info --stage dev --region "$AWS_REGION"
```

**Resultado esperado:**
```text
Deploy finaliza correctamente y muestra URLs HTTPS reales para las siete funciones. Copia la base hasta /dev, sin añadir /events.
```

> **Ayuda / Resolución de problemas:** Framework solicita login,Autentica Serverless Framework como en 01. Es independiente de la sesión Academy.,AccessDenied / CREATE_FAILED,Lee el primer recurso y permiso denegado en CloudFormation → Events. Comunica al profesor recurso y acción, sin claves. No añadas permisos ni repitas despliegues a ciegas.,Token caducado,Renueva las tres credenciales de academy y comprueba STS de nuevo.,Variables env ausentes,Vuelve a Prepara y usa la misma terminal con AWS_REGION, STUDENT_CODE y LAMBDA_ROLE_ARN.

- [ ] **Verificación:** Anota servicio, región, stage y URL base, sin secretos. Si hay un bloqueo de permisos, documenta el evento exacto y resuélvelo con el profesor antes de seguir.

##### Paso 3: Invoca y observa

*Una URL publicada debe responder y producir evidencia de ejecución.*

En Git Bash pide la base real al alumno con read. Después ejecuta curl. En Thunder utiliza esa misma URL con /events.

```bash
read -r -p "URL base real, hasta /dev: " API_BASE
curl -i "$API_BASE/events"
npx serverless logs -f listEvents --stage dev --region "$AWS_REGION"
```

**Resultado esperado:**
```text
HTTP 200 y dos eventos; en logs aparece LIST eventos: GET.
```

> **Ayuda / Resolución de problemas:** 403 Missing Authentication Token,Revisa dominio, región, stage, método y ruta. No es automáticamente un problema del token Academy.,502 o error Lambda,Abre logs de listEvents; revisa handler dist/events/list.handler, compilación incluida y permisos del rol.,Framework solicita login,Autentica Serverless Framework como en 01. Es independiente de la sesión Academy.,AccessDenied / CREATE_FAILED,Lee el primer recurso y permiso denegado en CloudFormation → Events. Comunica al profesor recurso y acción, sin claves. No añadas permisos ni repitas despliegues a ciegas.,Token caducado,Renueva las tres credenciales de academy y comprueba STS de nuevo.,Variables env ausentes,Vuelve a Prepara y usa la misma terminal con AWS_REGION, STUDENT_CODE y LAMBDA_ROLE_ARN.

- [ ] **Verificación:** Relaciona cliente → endpoint → Lambda. No basta con que deploy termine sin error.


---

### Fase 5: Entiende

**Explica por qué ha funcionado**

*Relaciona la instrucción con el efecto observado antes de modificarla.*

#### Del código al comportamiento

| Paso / Elemento | Explicación |
|---|---|
| `AWS_PROFILE=academy` | El Framework obtiene credenciales del perfil temporal del usuario. |
| `provider.iam.role` | Es el rol existente que asumirá Lambda; no se sustituye por el usuario de STS. |
| `serverless package → deploy → info` | Preparar, aplicar y consultar son operaciones distintas. |
| `serverless logs -f listEvents` | Observa la ejecución cloud de la función nombrada en el YAML. |

> [!TIP] **Predice antes de comprobar: Predice antes de probar**
> **Pregunta:** Si STS funciona, ¿está garantizado que el despliegue también funcione?
> 
> **Respuesta razonada:** No. STS acredita una identidad válida; CloudFormation, S3, Lambda, API Gateway e iam:PassRole requieren permisos adicionales del laboratorio.


---

### Fase 6: Modifica

**Introduce un cambio pequeño y compruébalo**

*La modificación utiliza lo que acabas de aprender y conserva el contrato necesario para continuar.*

#### Relaciona un parámetro con la Lambda cloud

**Pasos guiados para modificar el código:**

1. Con el endpoint real pide /events/EVT-101 y después /events/NO-EXISTE.
2. Comprueba 200 y 404 respectivamente.
3. Consulta npx serverless logs -f getEvent --stage dev --region "$AWS_REGION" y localiza ambos ids.


---

### Fase 7: Comprueba

**Contrasta tu comprensión**

*Estas preguntas son formativas, sin nota. Si fallas, lee la explicación y vuelve a intentarlo.*

> [!NOTE] **Autoevaluación: ¿Cuál es el rol de provider.iam.role?**
> - [ ] 1. El Arn del usuario de STS
> - [ ] 2. El rol autorizado que asume Lambda
> - [ ] 3. La cuenta de GitHub
> - [ ] 4. Un token del frontend

> [!NOTE] **Autoevaluación: ¿Qué debes renovar al caducar Academy?**
> - [ ] 1. Sólo API_URL
> - [ ] 2. Sólo access key
> - [ ] 3. Las tres credenciales temporales de la sesión
> - [ ] 4. App.tsx completo


---

### Fase 8: Cierra

**Documenta y deja el proyecto recuperable**

*Marca sólo las comprobaciones que has realizado en tu ordenador.*

*CONSTRUYE · ARCHIVOS COMPLETOS*

#### Deja una evidencia breve y recuperable

Recorre las pestañas de izquierda a derecha. Cada una contiene un archivo completo, no un fragmento que debas adivinar.

##### 📄 `evidencias/08/README.md`
**Responsabilidad:** Documentar lo que tú has comprobado, sin inventar evidencias.

Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.

> **Concepto clave:** Resultado,Completa cada apartado con tu ejecución. Este texto es una plantilla para tus respuestas.,Sin credenciales,No incluyas AWSDetails, tokens ni archivos .aws en capturas, Git o README.

```typescript
# Bloque 08

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

Desde la raíz, completa el README de evidencias/08 y revisa los cambios. Los comandos añaden únicamente los archivos de este bloque. Antes del commit lee git diff --cached y verifica que el lockfile y las fuentes correctas están preparados.

```bash
cd /d/DEVOPS/04-PILARES-SERVERLESS
git status --short
git diff
git add backend/serverless.yml evidencias/08/README.md
git diff --cached
git commit -m "Completa bloque 08"
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

- [ ] STS identifica la cuenta correcta y el profesor ha confirmado rol y permisos.
- [ ] He obtenido GET 200 desde el endpoint real y su log cloud.
- [ ] He registrado servicio, región, stage y endpoint sin credenciales.
- [ ] He explicado mi resultado en el README y guardado un commit recuperable.

> [!NOTE] **Siguiente paso**
> Bloque 09: conectarás el mismo cliente al endpoint HTTPS y comprobarás los cinco métodos en AWS.



[⬆ Volver al Índice](#-índice-de-bloques)

---

<br>

<a id="bloque-09"></a>

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



[⬆ Volver al Índice](#-índice-de-bloques)

---

<br>

<a id="bloque-10"></a>

# ENTRENAMIENTO · Evaluable

**ENTRENAMIENTO NO ASISTIDO · ÚNICA PARTE EVALUABLE**

## Venue Control · ahora decides tú

> Transfiere el aprendizaje a Venue Control con TypeScript y React Native. Dispones del contrato, requisitos, evidencias y rúbrica; la implementación la decides tú.

🏷️ **Etiquetas:** `EVALUABLE` · `Individual` · `Transferencia` · `Serverless Framework` · `React Native` · `AWS`

> [!WARNING] **Cambio de modo**
> Hasta aquí el cuaderno te ha acompañado. En este entrenamiento puedes consultar los bloques 00–09 y documentación, pero esta sección no te dará procedimientos paso a paso ni archivos solución. Se evalúa que puedas transferir lo aprendido.

> [!NOTE] **Alcance técnico y condiciones del aula**
> Usa TypeScript (.ts) en el backend y TSX (.tsx) en React Native. Puedes demostrar el cliente en el navegador con React Native Web. Como en el tour, se admite catálogo fijo y escrituras simuladas si lo declaras y muestras sus límites; no se exige persistencia. La evaluación exige peticiones reales, validación, errores y evidencias. Si el laboratorio impide desplegar por permisos o disponibilidad, registra el bloqueo verificable para acordar la comprobación con el profesor; no presentes evidencias inventadas.

#### El nuevo producto · Venue Control

Construye una aplicación móvil interna para gestionar los espacios de un gran festival. Ya no gestionas actuaciones: gestionas zonas/espacios operativos del recinto.

#### 📱 Venue Control · referencia funcional interactiva

Explora las cuatro vistas. El objetivo es que entiendas el producto que debes construir en React Native: jerarquía, estados, acciones y comportamiento mínimo. No se proporciona el código de esta maqueta como solución del ejercicio.

*CONTRATO DE DATOS*

#### Un espacio debe poder representarse así

📄 **Archivo:** `Ejemplo conceptual · NO es código solución`

Puedes organizar internamente tu código como consideres, pero tu API debe intercambiar como mínimo estos datos.

```json
{
  "id": "ZONE-07",
  "name": "Garden Stage",
  "capacity": 2500,
  "status": "OPEN"
}
```

*CONTRATO API OBLIGATORIO*

#### Tu backend debe ofrecer estas operaciones

📄 **Archivo:** `HTTP API`

Los nombres de handlers/archivos los decides tú. Las rutas y métodos forman el contrato que debe poder probar el profesor.

```bash
GET     /zones
GET     /zones/{id}
POST    /zones
PUT     /zones/{id}
PATCH   /zones/{id}
DELETE  /zones/{id}
```

*REQUISITOS*

#### Qué debe demostrar tu solución

| Concepto | Detalle |
|---|---|
| **Backend** | Node.js + Serverless Framework. Debe funcionar primero con serverless-offline y mantener una organización de archivos comprensible. |
| **HTTP** | Las seis operaciones del contrato deben devolver respuestas coherentes. Debes explicar pathParameters, body, JSON.parse, statusCode y la diferencia PUT/PATCH. |
| **Pruebas** | Debes demostrar la API local con Thunder Client y también utilizar curl en una selección representativa de operaciones. |
| **React Native** | Crea una app Expo/React Native con identidad visual profesional propia para Venue Control. Debe listar zonas y disparar operaciones POST/PUT/PATCH/DELETE. |
| **AWS** | Despliega mediante Serverless Framework en AWS Academy. Valida primero con Thunder/curl y después conecta React Native al endpoint cloud. |
| **Diagnóstico** | Debes ser capaz de utilizar logs, Thunder y separación de capas para localizar un fallo sin modificar elementos al azar. |

#### Arquitectura objetivo · tú decides cómo llegar

`React Native ➔ HTTP ➔ API Gateway ➔ Lambda Node.js ➔ Respuesta JSON ➔ Logs`

#### ✅ Evidencias obligatorias de entrega

- [ ] Repositorio con backend/ y mobile/ claramente separados.
- [ ] serverless.yml legible y coherente.
- [ ] Captura/evidencia de serverless-offline con rutas.
- [ ] Thunder Client: GET, POST, PUT, PATCH y DELETE demostrables.
- [ ] Al menos tres operaciones reproducidas con curl.
- [ ] App React Native funcional contra backend local.
- [ ] Endpoint AWS obtenido del despliegue Serverless.
- [ ] Thunder/curl funcionando contra AWS.
- [ ] React Native consumiendo AWS.
- [ ] Logs de al menos una invocación cloud provocada desde la app.
- [ ] README con arquitectura, ejecución local, despliegue y decisiones.
- [ ] Ninguna Access Key, Secret Key ni Session Token en el repositorio.

*RÚBRICA · 100 PUNTOS*

#### Sabes desde el principio qué se evalúa

| Concepto | Detalle |
|---|---|
| **Backend · 20** | Estructura, handlers TypeScript compilados para Node.js, serverless.yml y funcionamiento local coherentes. |
| **HTTP · 20** | Contrato completo, uso correcto de métodos/rutas/body/pathParameters/status y comprensión PUT vs PATCH. |
| **Pruebas · 15** | Thunder Client, curl y logs utilizados como evidencias y herramientas de diagnóstico. |
| **React Native · 20** | Interfaz funcional, consumo de API y separación razonable entre UI y capa HTTP. |
| **AWS · 15** | Deploy con Serverless Framework, endpoint real, Lambda/API Gateway y prueba cloud. |
| **Defensa · 10** | Explica una petición de extremo a extremo y diagnostica un supuesto sin depender de una receta. |

> [!WARNING] **No se evalúa sólo que «salga»**
> Una aplicación que funciona pero cuyo autor no puede explicar event, handler, rutas, body, Serverless Offline, API Gateway o la transición local/cloud no demuestra los resultados de aprendizaje completos.

#### ✅ STOP · Autoauditoría antes de entregar

- [ ] Puedo dibujar la arquitectura sin mirar el cuaderno.
- [ ] Puedo explicar cómo una URL {id} llega a pathParameters.
- [ ] Puedo explicar cómo JSON llega a event.body.
- [ ] Sé qué crea serverless deploy.
- [ ] Sé por qué pruebo Thunder antes que React Native.
- [ ] Puedo cambiar local/cloud de forma controlada.
- [ ] Puedo demostrar cada requisito con una evidencia concreta.
- [ ] He revisado que no existen credenciales AWS en Git.

> [!TIP] **Entrenamiento terminado**
> La entrega está completa cuando puedes demostrar el producto y defender técnicamente cómo viaja una petición desde React Native hasta la función Serverless y vuelve como respuesta.



[⬆ Volver al Índice](#-índice-de-bloques)

---
