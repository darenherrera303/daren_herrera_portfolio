// ============================================================
//  EDITA AQUÍ: tus proyectos y skills.
//
//  PROYECTOS (cada uno es un "archivo" dentro de una carpeta):
//   categoria: define la carpeta ("UX", "Diseño", "3D", "Código", "Apps"...).
//              Si inventas una categoría nueva, la carpeta aparece sola.
//   herramientas: lo que usaste (se muestra en la ficha)
//   imagen: ruta a tu imagen, ej. "assets/proyecto1.jpg" (opcional)
//   enlace: link al caso de estudio, repo o demo (opcional)
//
//  SKILLS: lv va de 1 a 10 (se dibuja como barra de combo y rango D–S).
// ============================================================

window.PROJECTS = [
  {
    titulo: "Rediseño de App Móvil",
    categoria: "UX",
    anio: 2026,
    descripcion: "Investigación, flujos y prototipo de alta fidelidad para una app de movilidad urbana.",
    herramientas: ["Adobe XD", "Photoshop", "Illustrator"],
    imagen: "",
    enlace: "#"
  },
  {
    titulo: "Identidad Visual Street",
    categoria: "Diseño",
    anio: 2026,
    descripcion: "Sistema de marca con paleta de atardecer, tipografía y piezas para redes.",
    herramientas: ["Illustrator", "Photoshop"],
    imagen: "",
    enlace: "#"
  },
  {
    titulo: "Personaje 3D Estilizado",
    categoria: "3D",
    anio: 2025,
    descripcion: "Escultura en alta resolución, retopología y texturizado de un personaje listo para animar.",
    herramientas: ["ZBrush", "Blender"],
    imagen: "",
    enlace: "#"
  },
  {
    titulo: "Experiencia Interactiva en Unity",
    categoria: "Código",
    anio: 2025,
    descripcion: "Prototipo interactivo con mecánicas propias, UI y activos 3D integrados.",
    herramientas: ["Unity", "C#", "Blender"],
    imagen: "",
    enlace: "#"
  },
  {
    titulo: "Sitio Web Interactivo",
    categoria: "Código",
    anio: 2025,
    descripcion: "Sitio responsive con animaciones y componentes interactivos hechos a mano.",
    herramientas: ["HTML5", "CSS3", "JavaScript"],
    imagen: "",
    enlace: "#"
  },
  {
    titulo: "Animación 3D Corta",
    categoria: "3D",
    anio: 2024,
    descripcion: "Pieza animada con ambientación, iluminación y render final.",
    herramientas: ["Blender", "After Effects"],
    imagen: "",
    enlace: "#"
  }
];

// Niveles de ejemplo: ajústalos con tu nivel real (1–10).
window.SKILLS = {
  "3D & ANIMACIÓN": [
    { n: "Blender", lv: 8 },
    { n: "ZBrush", lv: 7 },
    { n: "Unity", lv: 8 },
    { n: "Activos 3D", lv: 8 },
    { n: "Animación 3D", lv: 7 }
  ],
  "UI / UX": [
    { n: "Diseño de interfaces", lv: 9 },
    { n: "Experiencia de usuario", lv: 8 },
    { n: "Adobe Creative Suite", lv: 8 },
    { n: "Contenido visual interactivo", lv: 8 }
  ],
  "CÓDIGO": [
    { n: "C#", lv: 7 },
    { n: "JavaScript", lv: 7 },
    { n: "HTML5", lv: 9 },
    { n: "CSS3", lv: 9 }
  ],
  "PRODUCCIÓN": [
    { n: "Producción multimedia", lv: 8 },
    { n: "Trabajo en equipo", lv: 9 },
    { n: "Adaptación tecnológica", lv: 9 }
  ]
};
