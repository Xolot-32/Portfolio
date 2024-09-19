import { Brain, Briefcase, Bolt, Mail, Code, Headphones, Play, Database, Cpu, Text } from "lucide-react"



export const NAV_ITEMS = [
  { name: 'Skills', href: '#skills', icon: Brain },
  { name: 'Portafolio', href: '#portfolio', icon: Briefcase },
  { name: 'Tecnologías', href: '#technologies', icon: Bolt },
  { name: 'Contacto', href: '#contact', icon: Mail },
]

export const SKILLS = [
  { 
    icon: Code, 
    title: "Programación",
    description: "Desarrollo de software y aplicaciones en diversos lenguajes",
    longDescription: "Programación generativa con un enfoque innovador que utiliza algoritmos para crear arte, música y diseños únicos. Esta técnica combina creatividad y lógica para producir resultados sorprendentes y a menudo impredecibles. Desarrollo de aplicaciones de arte procedural, aplicaciones móviles y páginas web.",
    image: "/cards/code.jpg"
  },
  { 
    icon: Headphones, 
    title: "Diseño Sonoro y QC", 
    description: "Edición de audio para proyectos multimedia",
    longDescription: "Diseño sonoro para videojuegos, películas, series y otros medios. Grabación, manipulación y mezcla de sonidos para crear atmósferas inmersivas y mejorar la experiencia del usuario. Control de calidad en archivos de audio descriptivo, M&E y diálogos. Síntesis sonora, desarrollo de aplicativos digitales para procesamiento de audio.",
    image: "/cards/sound.jpg"
  },
  { 
    icon: Play, 
    title: "Media Processing", 
    description: "Manipulación y procesamiento avanzado de medios digitales",
    longDescription: "Transformación y optimización de contenido audiovisual utilizando técnicas avanzadas de software. Control de calidad de contenido de audio, video y archivos de texto para subtitulaje. Comprometido con el cumplimiento de los estándares de calidad requeridos para su distribución y consumo en plataformas de streaming.",
    image: "/cards/media.jpg"
  },
  { 
    icon: Database, 
    title: "Data Management", 
    description: "Organización y análisis eficiente de datos multimedia",
    longDescription: "Gestión de datos multimedia. Almacenamiento, organización y análisis de grandes volúmenes de información audiovisual para facilitar su acceso y uso efectivo.",
   image: "/cards/data.jpg"
  },
  { 
    icon: Cpu, 
    title: "Tecnologías Emergentes", 
    description: "Uso de inteligencia artificial para crear contenido multimedia",
    longDescription: "Uso IA generativa y algoritmos avanzados de aprendizaje automático para crear contenido original, como imágenes, música, videos y texto, ampliando las posibilidades creativas en el campo multimedia. Conocimiento y aplicación de tecnologías emergentes en el campo de la ingeniería y el arte. Experiencia en bio-arte evolutivo y exploración de nuevas formas de expresión tecnológica.",
    image: "/cards/ia.jpg"
  },
  { 
    icon: Text, 
    title: "Subtitulaje y Localización", 
    description: "Procesamiento y control de calidad de subtítulos",
    longDescription: "Creación precisa y sincronizada de texto en múltiples idiomas para hacer el contenido audiovisual accesible a una audiencia global. Experiencia en el control de calidad de archivos de texto para subtitulaje, asegurando que cumplan con los estándares requeridos para su distribución en diversas plataformas de streaming.",
    image:"/cards/subs.jpg"
  }
];

export const TECHNOLOGIES = [
  { name: 'React', icon: '/icons/Rea_logo.png' },
  { name: 'TypeSscript', icon: '/icons/TS_logo.png' },
  { name: 'Node.js', icon: '/icons/nodejs.png' },
  { name: 'Adobe Premiere Pro', icon: '/icons/Adobe_Premiere_Pro.png' },
  { name: 'After Effects', icon: '/icons/After_Effects.png' },
  { name: 'MySQL', icon: '/icons/MySQL.png' },
  { name: 'p5.js', icon: '/icons/p5_JS.png' },
  { name: 'Processing', icon: '/icons/Processing.png' },
  { name: 'Apple', icon: '/icons/Apple.png' },
  { name: 'Audition', icon: '/icons/audition.png' },
  { name: 'C++', icon: '/icons/C++.png' },
  { name: 'Canva', icon: '/icons/Canva.png' },
  { name: 'GitHub', icon: '/icons/GitHub.png' },
  { name: 'Google', icon: '/icons/Google.png' },
  { name: 'HTML5', icon: '/icons/HTML5.png' },
  { name: 'JavaScript', icon: '/icons/JavaScript.png' },
  { name: 'Python', icon: '/icons/Python.png' },
  { name: 'Reaper', icon: '/icons/reaper.png' },
  { name: 'Visual Studio Code', icon: '/icons/visual.png' },
  { name: 'Windows', icon: '/icons/Windows.png' },
  { name: 'Subtitle Edit', icon: '/icons/subtitle.png' },
  { name: 'OpenAI', icon: '/icons/openai.png' },
  { name: 'DaVinci Resolve', icon: '/icons/davinci.png' },
  { name: 'MATLAB', icon: '/icons/matlab.png' },
]