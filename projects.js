// ============================================================
//  EDITA AQUÍ: tus proyectos, modelos 3D, archivos UX y skills.
//
//  PROYECTOS (cada uno es una "carpeta" dentro del archivador):
//   categoria: define la carpeta ("Videojuegos", "Web", "Software"...).
//   rol, puntos, herramientas: se muestran en la ficha (rol y anio son opcionales).
//   imagen: ruta a una captura, ej. "assets/devil-blood.jpg" (opcional).
//   enlace: link al repo, demo o caso de estudio (opcional).
//
//  MODELOS 3D (Sketchfab): para agregar uno nuevo necesitas 3 datos de su URL
//   https://sketchfab.com/3d-models/<slug>-<id>
//   Ejemplo: .../3d-models/sv-001-1791213122c74bf4a791c275f80b36a3
//            slug = "sv-001"   id = "1791213122c74bf4a791c275f80b36a3"
//   imagen: miniatura propia (opcional). Si no la pones, se intenta traer la de Sketchfab.
//
//  ARCHIVOS UX (Figma): de la URL https://www.figma.com/design/<id>/<slug>
//   toma id y slug. descripcion es opcional.
//
//  SKILLS: lv va de 1 a 10. lv 9–10 = MAX, 4–8 = MID, 1–3 = LOW.
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

window.MODELS3D = [
  {
    titulo: "Boskov from Evil Con Carne",
    slug: "boskov-from-evil-con-carne",
    id: "42989c45070d46e2ac0227581a9a6205",
    autor: "MF daren",
    autorUrl: "https://sketchfab.com/MFDAREN",
    imagen: ""
  },
  {
    titulo: "Dark Souls 3 Fire Enlace",
    slug: "dark-souls-3-fire-enlace",
    id: "d4098c12817841be87e31ad2aaa0db84",
    autor: "MF daren",
    autorUrl: "https://sketchfab.com/MFDAREN",
    imagen: ""
  },
  {
    titulo: "Sv-001",
    slug: "sv-001",
    id: "1791213122c74bf4a791c275f80b36a3",
    autor: "MF daren",
    autorUrl: "https://sketchfab.com/MFDAREN",
    imagen: ""
  },
  {
    titulo: "Motorola Krzr K1",
    slug: "motorola-krzr-k1-new",
    id: "a38c9292bcf34264a30e70b1177577b8",
    autor: "MF daren",
    autorUrl: "https://sketchfab.com/MFDAREN",
    imagen: ""
  }
];

window.UXFILES = [
  {
    titulo: "Interfaz Replication",
    id: "c1gpJSSki1zgx5oEAXpTm8",
    slug: "interfaz-replication",
    descripcion: ""
  },
  {
    titulo: "UX Challenge 1",
    id: "3FlxqgOqN7xkOgNaIRmSmx",
    slug: "ux-CHALLENGE-1",
    descripcion: ""
  },
  {
    titulo: "Diseño sin título",
    id: "Fo9sIFlLhdAnNjKdN0Rqk4",
    slug: "Untitled",
    descripcion: ""
  },
  {
    titulo: "Facebook Interface Replica",
    id: "WORSgR4eCBUVE1myb0ABy1",
    slug: "facebook-interface-reply",
    descripcion: ""
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
