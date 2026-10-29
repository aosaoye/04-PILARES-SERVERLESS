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

