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

