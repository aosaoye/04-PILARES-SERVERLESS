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

