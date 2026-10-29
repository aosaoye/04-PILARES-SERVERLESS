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

