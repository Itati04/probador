# Probador virtual (PWA)

App web instalable en teléfono y ordenador: los clientes se hacen una foto, se prueban ropa y accesorios, eligen talla y color y hacen su pedido. Quien gestiona la tienda carga el catálogo y ve los pedidos en `/#gestion`.

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La app completa |
| `config.js` | **Lo único que tienes que editar**: datos de Firebase y tu correo |
| `firestore.rules` | Reglas de seguridad de la base de datos |
| `manifest.json`, `sw.js`, `icons/` | Lo que la hace instalable (PWA) y usable sin conexión |

## 1. Crear la base de datos (Firebase, gratis)

1. Entra en https://console.firebase.google.com y crea un proyecto (puedes desactivar Analytics).
2. **Authentication** > Comenzar > Método de acceso: activa **Anónimo** y **Correo electrónico/contraseña**.
3. **Authentication** > Usuarios > Agregar usuario: crea tu cuenta de administrador (tu correo y una contraseña).
4. **Firestore Database** > Crear base de datos > modo producción > elige la región más cercana.
5. En Firestore, pestaña **Reglas**: pega el contenido de `firestore.rules`, cambia `tu-correo@ejemplo.com` por tu correo y pulsa **Publicar**.
6. Engranaje > **Configuración del proyecto** > Tus apps > icono `</>` (Web): registra la app y copia el objeto `firebaseConfig`.
7. Abre `config.js`, pega esos valores en `FIREBASE_CONFIG` y pon tu correo en `ADMIN_EMAILS`.

## 2. Publicarla en internet

### Opción A: GitHub Pages
1. En https://github.com/new crea un repositorio **público** (por ejemplo `probador`).
2. Pulsa **uploading an existing file** y arrastra **todo el contenido** de esta carpeta (no el .zip). Pulsa **Commit changes**.
3. Ve a **Settings > Pages**, en *Branch* elige `main` y `/ (root)`, y guarda.
4. En 1-2 minutos estará en `https://TU-USUARIO.github.io/probador/`.

### Opción B: Netlify (la más rápida)
Entra en https://app.netlify.com/drop y arrastra esta carpeta. Te da una dirección al momento.

### Después de publicar
En Firebase > Authentication > Configuración > **Dominios autorizados**, añade tu dominio (`TU-USUARIO.github.io` o el de Netlify).

## 3. Empezar a usarla
1. Abre `https://tu-direccion/#gestion` (o el enlace *Acceso para la tienda* al pie del catálogo) e inicia sesión.
2. Pulsa **Cargar productos de ejemplo** para probar, o **Añadir producto** para subir los tuyos.
3. Comparte la dirección con tus clientes. En el teléfono pueden instalarla con *Añadir a pantalla de inicio*.

## Notas
- La cámara y la instalación solo funcionan con **https** (GitHub Pages y Netlify ya lo dan).
- Las fotos de los clientes **no se suben**: se quedan en su teléfono.
- Los clientes entran sin registrarse (sesión anónima). Sus pedidos quedan asociados a su navegador.
- Las fotos de productos se guardan comprimidas dentro de la base de datos (límite ~1 MB por producto). No hace falta el plan de pago de Firebase.
- **El pago es de demostración**: no cobra. Para cobrar de verdad hace falta una pasarela (Stripe, Redsys, Mercado Pago…) con un pequeño servidor, por ejemplo Firebase Cloud Functions.
- Si cambias archivos, sube el número de `CACHE` en `sw.js` (`probador-v2`…) para que los teléfonos reciban la versión nueva.
