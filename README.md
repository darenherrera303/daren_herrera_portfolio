# Daren Herrera — Portafolio

Portafolio de ingeniería multimedia en estilo **vaporwave 80s**: fondo 3D (Three.js) con una "materia"
que se transforma al hacer scroll, menú lateral tipo dashboard de consola, ventanas retro, rejilla, sol y palmeras.

## Publicar en GitHub Pages

1. Crea un repositorio llamado `tu-usuario.github.io` (así obtienes el dominio `https://tu-usuario.github.io`).
2. Sube a la raíz: `index.html`, `styles.css`, `main.js`, `projects.js` (y tu carpeta `assets/` con imágenes).
3. **Settings → Pages → Build and deployment → Source: Deploy from a branch → `main` / `(root)`**.
4. En 1–2 minutos estará online.

> Para probarlo en tu computador no abras el archivo con doble clic (los módulos JS lo bloquean):
> usa un servidor local, por ejemplo `python -m http.server` y entra a `http://localhost:8000`.

## Personalizar

- **Correo y redes:** `index.html`, sección CONTACTO (busca `tucorreo@ejemplo.com` y `tu-usuario`).
- **Proyectos y skills:** `projects.js`. Añade un bloque nuevo y aparece solo, con su filtro de categoría.
- **Imágenes:** carpeta `assets/` y `imagen: "assets/mi-proyecto.jpg"` en cada proyecto.
- **Colores:** variables al inicio de `styles.css` (`--pink`, `--cyan`, `--mint`...).
- **Materia 3D:** en `main.js`, el arreglo `STATES` controla posición, tamaño, deformación y colores en cada sección.

## Controles

- Scroll, menú lateral, o teclas ↑ ↓ / PageUp / PageDown para saltar entre secciones.
- Botón "SONIDO" activa los bips de navegación (apagado por defecto).
