# Daren Herrera — Portafolio

Portafolio de ingeniería multimedia en estilo **vaporwave 80s** (paleta sobria): fondo 3D (Three.js) con una "materia"
que se transforma al hacer scroll, menú lateral tipo dashboard de consola, trabajos en formato de archivador
(carpetas con fichas) y skills con medidor de carga con fuego 8-bit al pasar el mouse.

## Publicar en GitHub Pages

1. Crea un repositorio llamado `tu-usuario.github.io` (así obtienes el dominio `https://tu-usuario.github.io`).
2. Sube a la raíz: `index.html`, `styles.css`, `main.js`, `projects.js` (y tu carpeta `assets/` con imágenes).
3. **Settings → Pages → Build and deployment → Source: Deploy from a branch → `main` / `(root)`**.
4. En 1–2 minutos estará online.

> Para probarlo en tu computador no abras el archivo con doble clic (los módulos JS lo bloquean):
> usa un servidor local, por ejemplo `python -m http.server` y entra a `http://localhost:8000`.

## Personalizar

- **Datos de contacto, perfil, formación y certificados:** `index.html` (secciones SOBRE MÍ, FORMACIÓN y CONTACTO).
- **GitHub:** en `index.html`, sección CONTACTO, cambia `https://github.com/tu-usuario` por tu usuario real.
- **Foto (opcional):** guarda una imagen como `assets/foto.jpg` y aparece sola en "Sobre mí".
- **Proyectos (archivador):** `projects.js`. Cada proyecto es una carpeta; su `categoria` define el índice lateral.
  Para agregar capturas: `imagen: "assets/devil-blood.jpg"`. Si no hay imagen, se dibuja una portada pixel-art.
- **Skills:** `projects.js` → `SKILLS`. `lv` de 1 a 10: 9–10 = MAX (carga completa, fuego grande),
  4–8 = MID (carga parcial, fuego mediano).
- **Colores:** variables al inicio de `styles.css` (`--pink`, `--cyan`, `--mint`...) y paletas en `STATES` de `main.js`.
- **Velocidad del movimiento 3D:** en `main.js`, el multiplicador `0.45` de `clock.getElapsedTime()`.

## Controles

- Scroll, menú lateral, o teclas ↑ ↓ / PageUp / PageDown para saltar entre secciones.
- Skills: pasa el mouse (o enfoca con Tab / toca en celular) para cargar el medidor.
- Botón "SONIDO" activa los bips de navegación (apagado por defecto).
