// ============================================================
//  EDITA AQUÍ: tus proyectos y skills.
//
//  PROYECTOS (cada uno es una "carpeta" dentro del archivador):
//   categoria: define la carpeta ("Videojuegos", "Web", "Software"...).
//              Si inventas una categoría nueva, la carpeta aparece sola.
//   rol, puntos, herramientas: se muestran en la ficha (rol y anio son opcionales).
//   imagen: ruta a una captura, ej. "assets/devil-blood.jpg" (opcional;
//           si no hay, se dibuja una portada con ícono pixel-art).
//   enlace: link al repo, demo o caso de estudio (opcional).
//
//  SKILLS: lv va de 1 a 10. lv 9–10 = MAX, 4–8 = MID, 1–3 = LOW.
//          Define qué tan alto carga el medidor y qué tan grande es el fuego.
// ============================================================

window.PROJECTS = [
  {
    titulo: "Devil Blood",
    subtitulo: "Videojuego de acción 2.5D",
    categoria: "Videojuegos",
    anio: 2024,
    rol: "Diseñador de mecánicas, UI y animaciones",
    puntos: ["Implementación de IA básica", "Sistema de combate"],
    herramientas: ["Unity", "C#", "Blender"],
    imagen: "",
    enlace: ""
  },
  {
    titulo: "Interfaz de DJ interactiva",
    subtitulo: "Experiencia 3D en WebGL",
    categoria: "Web",
    anio: 2025,
    puntos: [
      "Experiencia 3D con paneles dinámicos y animaciones",
      "Integración de audio, volumen y video de fondo"
    ],
    herramientas: ["Three.js", "HTML/CSS", "Spline"],
    imagen: "",
    enlace: ""
  },
  {
    titulo: "Chatbot asesor legal PRIM",
    subtitulo: "Asistente conversacional",
    categoria: "Software",
    anio: 2025,
    puntos: ["Aplicativo en Java", "Programación de base de datos en Rasa", "Gestión del proyecto"],
    herramientas: ["Java", "Rasa"],
    imagen: "",
    enlace: ""
  },
  {
    titulo: "Rediseño de página web empresarial",
    subtitulo: "Sitio corporativo en Wix",
    categoria: "Web",
    anio: "",
    puntos: [
      "Uso de CSS/HTML",
      "Consolidación con directivos y requerimientos",
      "Creación de recursos y alternativas de navegación"
    ],
    herramientas: ["Wix", "HTML", "CSS"],
    imagen: "",
    enlace: ""
  }
];

window.SKILLS = [
  {
    nombre: "MODELADO 3D",
    lv: 10,
    color: "var(--pink)",
    puntos: ["Modelado y animación 3D", "Optimización de assets para videojuegos"],
    herramientas: ["Blender", "ZBrush", "Unity", "Cinema"]
  },
  {
    nombre: "PROGRAMACIÓN",
    lv: 5,
    color: "var(--cyan)",
    puntos: ["Desarrollo interactivo y web", "Lógica de juego e interfaces"],
    herramientas: ["C#", "JavaScript", "HTML5", "CSS3", "Java", "Three.js", "Git"]
  },
  {
    nombre: "DISEÑO",
    lv: 10,
    color: "var(--yellow)",
    puntos: ["Diseño UX/UI y diseño web", "Branding y producción audiovisual"],
    herramientas: ["Figma", "Photoshop", "Illustrator", "Premiere Pro", "After Effects", "Canva", "CapCut"]
  }
];
