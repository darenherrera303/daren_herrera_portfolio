# Portafolio — Ingeniería Multimedia

Sitio estático (HTML + CSS + JS), sin dependencias. Dos estilos intercambiables:
**BINARY** (minimalista futurista, lluvia de binarios) y **WEST** (urbano 80s, atardecer, rejilla).

## Publicar en GitHub Pages

1. Crea un repositorio llamado `tu-usuario.github.io` (así obtienes el dominio `https://tu-usuario.github.io`).
2. Sube estos archivos a la raíz: `index.html`, `styles.css`, `main.js`, `projects.js`.
3. En el repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch → `main` / `(root)`**.
4. En 1–2 minutos estará online.

## Personalizar

- **Nombre / textos / contacto:** `index.html` (busca "Tu Nombre", `tucorreo@ejemplo.com` y los links de redes).
- **Proyectos y skills:** `projects.js`. Añade un bloque nuevo y aparece solo, con su filtro de categoría.
- **Imágenes:** crea una carpeta `assets/` y pon la ruta en `imagen: "assets/mi-proyecto.jpg"`.
- **Colores:** variables al inicio de `styles.css` (`[data-theme="binary"]` y `[data-theme="west"]`).
- **Estilo por defecto:** cambia `data-theme="binary"` por `"west"` en la etiqueta `<html>`.
