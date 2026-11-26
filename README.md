# Daren Herrera — Portafolio

Portafolio de ingeniería multimedia en estilo **vaporwave 80s** (paleta sobria): fondo 3D (Three.js) con una "materia"
que se transforma al hacer scroll, menú lateral tipo dashboard de consola, trabajos en formato de archivador,
galería de modelos 3D (Sketchfab), archivos de UX (Figma) y skills con medidor de carga con fuego 8-bit.

## Publicar en GitHub Pages

1. Crea un repositorio llamado `tu-usuario.github.io` (así obtienes el dominio `https://tu-usuario.github.io`).
2. Sube a la raíz: `index.html`, `styles.css`, `main.js`, `projects.js` (y tu carpeta `assets/` con imágenes).
3. **Settings → Pages → Build and deployment → Source: Deploy from a branch → `main` / `(root)`**.
4. En 1–2 minutos estará online.

> Para probarlo en tu computador no abras el archivo con doble clic (los módulos JS lo bloquean):
> usa un servidor local, por ejemplo `python -m http.server` y entra a `http://localhost:8000`.

## Agregar contenido (todo en `projects.js`)

- **Modelos 3D (Sketchfab):** agrega un bloque a `MODELS3D` con `titulo`, `slug` e `id`.
  Los dos últimos salen de la URL del modelo: `https://sketchfab.com/3d-models/<slug>-<id>`
  (el `id` son los últimos 32 caracteres). La miniatura se trae sola de Sketchfab; si quieres una propia,
  usa `imagen: "assets/mi-modelo.jpg"`.
- **UX / UI (Figma):** agrega un bloque a `UXFILES` con `titulo`, `id` y `slug`, que salen de la URL
  `https://www.figma.com/design/<id>/<slug>`. Para que el embed funcione, el archivo debe estar compartido
  como "cualquiera con el enlace puede ver". `descripcion` es opcional.
- **Proyectos (archivador):** `PROJECTS`. Cada proyecto es una carpeta; su `categoria` define el índice lateral.
  Para agregar capturas: `imagen: "assets/devil-blood.jpg"`.
- **Skills:** `SKILLS`. `lv` de 1 a 10: 9–10 = MAX, 4–8 = MID.

## Otros ajustes

- **Contacto, perfil y datos:** `index.html` (secciones SOBRE MÍ y CONTACTO).
- **GitHub:** en `index.html`, sección CONTACTO, cambia `https://github.com/tu-usuario` por tu usuario real.
- **Foto (opcional):** guarda una imagen como `assets/foto.jpg` y aparece sola en "Sobre mí".
- **Colores:** variables al inicio de `styles.css` (`--pink`, `--cyan`, `--mint`...) y paletas en `STATES` de `main.js`.
- **Velocidad del movimiento 3D:** en `main.js`, el multiplicador `0.45` de `clock.getElapsedTime()`.

## Controles

- Scroll, menú lateral, o teclas ↑ ↓ / PageUp / PageDown para saltar entre secciones.
- Galería 3D: ← → cambian de modelo. El visor se carga al pulsar "Cargar modelo 3D" (así la página no pesa).
- UX / UI: clic en un archivo para abrirlo en grande; Esc lo cierra.
- Skills: pasa el mouse (o enfoca con Tab / toca en celular) para cargar el medidor.
- Botón "SONIDO" activa los bips de navegación (apagado por defecto).
