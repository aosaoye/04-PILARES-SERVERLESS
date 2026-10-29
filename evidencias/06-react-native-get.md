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

