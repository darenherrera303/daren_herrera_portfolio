# Daren Herrera — Portafolio

Portafolio de ingeniería multimedia en estilo **vaporwave 80s** (paleta sobria): fondo 3D (Three.js) con una "materia"
que se transforma al hacer scroll, menú lateral tipo dashboard de consola, trabajos en formato de archivador
(carpetas y fichas) y skills con barras de combo estilo juego de pelea.

## Publicar en GitHub Pages

1. Crea un repositorio llamado `tu-usuario.github.io` (así obtienes el dominio `https://tu-usuario.github.io`).
2. Sube a la raíz: `index.html`, `styles.css`, `main.js`, `projects.js` (y tu carpeta `assets/` con imágenes).
3. **Settings → Pages → Build and deployment → Source: Deploy from a branch → `main` / `(root)`**.
4. En 1–2 minutos estará online.

> Para probarlo en tu computador no abras el archivo con doble clic (los módulos JS lo bloquean):
> usa un servidor local, por ejemplo `python -m http.server` y entra a `http://localhost:8000`.

## Personalizar

- **Correo y redes:** `index.html`, sección CONTACTO (busca `tucorreo@ejemplo.com` y `tu-usuario`).
- **Proyectos (archivador):** `projects.js`. Cada proyecto es un "archivo"; su `categoria` define la carpeta.
  Si usas una categoría nueva, la carpeta aparece sola.
- **Skills:** `projects.js` → `SKILLS`. `lv` de 1 a 10 define la barra y el rango (S ≥ 9, A ≥ 7, B ≥ 5, C ≥ 3).
  Los niveles actuales son de ejemplo: ajústalos a tu nivel real.
- **Imágenes:** carpeta `assets/` y `imagen: "assets/mi-proyecto.jpg"` en cada proyecto.
- **Colores:** variables al inicio de `styles.css` (`--pink`, `--cyan`, `--mint`...) y paletas en `STATES` de `main.js`.
- **Velocidad del movimiento 3D:** en `main.js`, el multiplicador `0.45` de `clock.getElapsedTime()`.

## Controles

- Scroll, menú lateral, o teclas ↑ ↓ / PageUp / PageDown para saltar entre secciones.
- Botón "SONIDO" activa los bips de navegación (apagado por defecto).
