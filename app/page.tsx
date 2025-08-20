"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import DigitalEtherBackground from "@/components/DigitalEtherBackground"
import MobileMenu from "@/components/MobileMenu"

interface Translation {
  [key: string]: {
    en: string
    es: string
  }
}

const translations: Translation = {
  // Navigation
  navAbout: { en: "About", es: "Acerca" },
  navSkills: { en: "Skills", es: "Habilidades" },
  navServices: { en: "Services", es: "Servicios" },
  navProjects: { en: "Projects", es: "Proyectos" },
  navContact: { en: "Contacto", es: "Contacto" },

  // Hero Section
  heroTitle: { en: "Mauricio Medina", es: "Mauricio Medina" },
  heroSubtitle: { en: "Developer & Project Manager", es: "Desarrollador y Gerente de Proyectos" },
  heroDescription: {
    en: "Building robust systems with a focus on Linux environments and process automation. Passionate about clean code and efficient project execution.",
    es: "Construyendo sistemas robustos con enfoque en entornos Linux y automatización de procesos. Apasionado por el código limpio y la ejecución eficiente de proyectos.",
  },

  // Status
  statusTitle: { en: "// Current Status", es: "// Estado Actual" },
  statusAvailable: { en: "Available for Projects", es: "Disponible para Proyectos" },
  statusLocation: { en: "Remote • Full-time • Contract", es: "Remoto • Tiempo Completo • Contrato" },
  statusOnline: { en: "Online", es: "En Línea" },

  // Skills Section
  skillsTitle: { en: "Skills & Expertise", es: "Habilidades y Experiencia" },
  skillsInstalled: { en: "✓ Skills successfully installed", es: "✓ Habilidades instaladas exitosamente" },
  skillsPlaceholder: { en: "Type a command...", es: "Escribe un comando..." },
  skillsError: {
    en: "Contacta with Mauricio Medina for poder solucionarlo",
    es: "Contact Mauricio Medina to solve this issue",
  },

  // Services Section
  servicesTitle: { en: "Services & Solutions", es: "Servicios y Soluciones" },
  servicesLearnMore: { en: "Click to learn more", es: "Haz clic para saber más" },

  // Service Cards
  webDevTitle: { en: "Custom Web Development", es: "Desarrollo Web Personalizado" },
  webDevDesc: {
    en: "Building scalable web applications from scratch using modern technologies and best practices.",
    es: "Construyendo aplicaciones web escalables desde cero usando tecnologías modernas y mejores prácticas.",
  },

  wordpressTitle: { en: "WordPress Solutions", es: "Soluciones WordPress" },
  wordpressDesc: {
    en: "Advanced WordPress development, custom themes, plugins, and performance optimization.",
    es: "Desarrollo avanzado de WordPress, temas personalizados, plugins y optimización de rendimiento.",
  },

  automationTitle: { en: "Process Automation", es: "Automatización de Procesos" },
  automationDesc: {
    en: "Designing custom systems to automate workflows and reduce manual tasks.",
    es: "Diseñando sistemas personalizados para automatizar flujos de trabajo y reducir tareas manuales.",
  },

  enhancementTitle: { en: "System Enhancement", es: "Mejora de Sistemas" },
  enhancementDesc: {
    en: "Modernizing and improving existing systems with better performance and functionality.",
    es: "Modernizando y mejorando sistemas existentes con mejor rendimiento y funcionalidad.",
  },

  catalogsTitle: { en: "Online Catalogs", es: "Catálogos en Línea" },
  catalogsDesc: {
    en: "Creating dynamic, user-friendly product catalogs for e-commerce and business applications.",
    es: "Creando catálogos de productos dinámicos y fáciles de usar para comercio electrónico y aplicaciones empresariales.",
  },

  linuxTitle: { en: "Linux Administration", es: "Administración Linux" },
  linuxDesc: {
    en: "Expert Linux server management, shell scripting, and system administration.",
    es: "Gestión experta de servidores Linux, scripting de shell y administración de sistemas.",
  },

  // Projects Section
  projectsTitle: { en: "Featured Projects", es: "Proyectos Destacados" },
  ecommerceTitle: { en: "E-Commerce Platform", es: "Plataforma de Comercio Electrónico" },
  ecommerceDesc: {
    en: "Built a scalable e-commerce solution with custom PHP backend and optimized database architecture, handling 10k+ daily transactions.",
    es: "Construí una solución de comercio electrónico escalable con backend PHP personalizado y arquitectura de base de datos optimizada, manejando más de 10k transacciones diarias.",
  },

  automationProjectTitle: { en: "Automation System", es: "Sistema de Automatización" },
  automationProjectDesc: {
    en: "Developed comprehensive automation workflows using n8n, reducing manual tasks by 80% and improving operational efficiency.",
    es: "Desarrollé flujos de trabajo de automatización integrales usando n8n, reduciendo las tareas manuales en un 80% y mejorando la eficiencia operacional.",
  },

  // Contact Section
  contactTitle: { en: "Get In Touch", es: "Ponte en Contacto" },
  contactLocation: { en: "Location: Remote", es: "Ubicación: Remoto" },
  contactTimezone: { en: "Timezone: Available globally", es: "Zona Horaria: Disponible globalmente" },
  contactStatus: { en: "Status: Available for new projects", es: "Estado: Disponible para nuevos proyectos" },
  socialLinks: { en: "// Social Links", es: "// Enlaces Sociales" },

  // Footer
  footerCopyright: {
    en: "© 2024 Mauricio Medina • Built with passion for clean code",
    es: "© 2024 Mauricio Medina • Construido con pasión por el código limpio",
  },

  // Modal Content
  modalOverview: { en: "// Overview", es: "// Descripción General" },
  modalFeatures: { en: "// Key Features", es: "// Características Clave" },
  modalCode: { en: "// Code Example", es: "// Ejemplo de Código" },
  modalProject: { en: "// Project Example", es: "// Ejemplo de Proyecto" },
  modalReady: { en: "// Ready to get started?", es: "// ¿Listo para comenzar?" },
  modalContact: {
    en: "Let's discuss how this service can benefit your project.",
    es: "Hablemos sobre cómo este servicio puede beneficiar tu proyecto.",
  },
  modalContactBtn: { en: "Contact Me", es: "Contáctame" },
}

// Enhanced projects section data with screenshots and professional presentation
const projectsData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "Built a scalable e-commerce solution with custom PHP backend and optimized database architecture, handling 10k+ daily transactions with real-time inventory management.",
    shortDescription: "Scalable PHP e-commerce platform handling 10k+ daily transactions",
    technologies: ["PHP", "MySQL", "Redis", "Docker", "Linux"],
    liveDemo: "https://demo-ecommerce.example.com",
    github: "https://github.com/mauricio/ecommerce-platform",
    image: "/project-ecommerce-preview.jpg",
    featured: true,
    highlights: ["10k+ Daily Transactions", "Real-time Inventory", "Custom PHP Backend", "Optimized Database"],
  },
  {
    id: 2,
    title: "Automation Workflow System",
    description:
      "Developed comprehensive automation workflows using n8n, reducing manual tasks by 80% and improving operational efficiency across multiple business processes.",
    shortDescription: "n8n automation system reducing manual tasks by 80%",
    technologies: ["n8n", "Node.js", "PostgreSQL", "Docker", "API Integration"],
    liveDemo: "https://automation-demo.example.com",
    github: "https://github.com/mauricio/automation-system",
    image: "/project-automation-preview.jpg",
    featured: true,
    highlights: ["80% Task Reduction", "Multi-Process Automation", "API Integrations", "Business Optimization"],
  },
  {
    id: 3,
    title: "WordPress Performance Suite",
    description:
      "Created a comprehensive WordPress optimization plugin that improves site speed by 60% through advanced caching, image optimization, and database cleanup.",
    shortDescription: "WordPress optimization plugin improving speed by 60%",
    technologies: ["WordPress", "PHP", "JavaScript", "MySQL", "Redis"],
    liveDemo: "https://wp-performance.example.com",
    github: "https://github.com/mauricio/wp-performance-suite",
    image: "/project-wordpress-preview.jpg",
    featured: false,
    highlights: ["60% Speed Improvement", "Advanced Caching", "Image Optimization", "Database Cleanup"],
  },
]

// Linux Tux Penguin SVG Logo Component - Clean version without background
const TuxLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="linux-icon">
    <path
      d="M12 2C8.5 2 7 4.5 7 7.5C7 8.5 7.2 9.4 7.5 10.2C6.8 10.8 6.5 11.7 6.5 12.5C6.5 13.8 7.3 15 8.5 15.5C8.2 16.2 8 17 8 17.5C8 19.5 9.5 21 12 21C14.5 21 16 19.5 16 17.5C16 17 15.8 16.2 15.5 15.5C16.7 15 17.5 13.8 17.5 12.5C17.5 11.7 17.2 10.8 16.5 10.2C16.8 9.4 17 8.5 17 7.5C17 4.5 15.5 2 12 2Z"
      fill="currentColor"
      opacity="0.9"
    />
    <ellipse cx="10" cy="8.5" rx="1" ry="1.5" fill="#FFFFFF" opacity="0.8"/>
    <ellipse cx="14" cy="8.5" rx="1" ry="1.5" fill="#FFFFFF" opacity="0.8"/>
    <ellipse cx="10" cy="8.2" rx="0.3" ry="0.5" fill="#000000"/>
    <ellipse cx="14" cy="8.2" rx="0.3" ry="0.5" fill="#000000"/>
    <path
      d="M12 10.5C11.5 10.5 11 10.8 11 11.3C11 11.8 11.5 12 12 12C12.5 12 13 11.8 13 11.3C13 10.8 12.5 10.5 12 10.5Z"
      fill="#FFA500"
    />
    <path
      d="M9 13.5C9 14 9.5 14.5 10 14.5C10.5 14.5 11 14 11 13.5M13 13.5C13 14 13.5 14.5 14 14.5C14.5 14.5 15 14 15 13.5"
      stroke="currentColor"
      strokeWidth="0.5"
      opacity="0.6"
    />
  </svg>
)

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about")
  const [showCursor, setShowCursor] = useState(true)
  const [typedText, setTypedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [visibleSections, setVisibleSections] = useState(new Set())
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const [language, setLanguage] = useState<"en" | "es">("en")

  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadText, setDownloadText] = useState("Download CV")
  const [showContactModal, setShowContactModal] = useState(false)

  const observerRef = useRef<IntersectionObserver | null>(null)

  const t = (key: string) => translations[key]?.[language] || key

  const terminalText =
    language === "en"
      ? `[user@arch ~]$ sudo pacman -S skills
resolving dependencies...
Packages (5): php java c++ html css
Database (1): sql
Expertise (2): ux/ui-design linux-system-administration
Total Installed Size: 1024.00 MiB
:: Proceed with installation? [Y/n] `
      : `[user@arch ~]$ sudo pacman -S habilidades
resolviendo dependencias...
Paquetes (5): php java c++ html css
Base de datos (1): sql
Experiencia (2): diseño-ux/ui administración-sistema-linux
Tamaño Total Instalado: 1024.00 MiB
:: ¿Proceder con la instalación? [S/n] `

  const navItems = [
    { id: "about", label: t("navAbout") },
    { id: "skills-matrix", label: t("navSkills") },
    { id: "services", label: t("navServices") },
    { id: "projects", label: t("navProjects") },
    { id: "contact", label: t("navContact") },
  ]

  const servicesData = [
    {
      id: 0,
      title: t("webDevTitle"),
      shortDescription: t("webDevDesc"),
      expandedDescription:
        language === "en"
          ? "I specialize in creating robust, scalable web applications tailored to your specific business needs. From initial architecture design to deployment and maintenance, I handle every aspect of the development process using modern frameworks and best practices."
          : "Me especializo en crear aplicaciones web robustas y escalables adaptadas a las necesidades específicas de tu negocio. Desde el diseño inicial de la arquitectura hasta el despliegue y mantenimiento, manejo todos los aspectos del proceso de desarrollo usando frameworks modernos y mejores prácticas.",
      features:
        language === "en"
          ? [
              "> Full-stack development with modern frameworks",
              "> RESTful API design and implementation",
              "> Database architecture and optimization",
              "> Responsive design for all devices",
              "> Performance optimization and caching",
              "> Security implementation and testing",
            ]
          : [
              "> Desarrollo full-stack con frameworks modernos",
              "> Diseño e implementación de APIs RESTful",
              "> Arquitectura y optimización de bases de datos",
              "> Diseño responsivo para todos los dispositivos",
              "> Optimización de rendimiento y caché",
              "> Implementación y pruebas de seguridad",
            ],
      codeSnippet: `// Example API endpoint structure
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});`,
      image: "./public/fotoperfilmauriciomedina.jpeg",
    },
    {
      id: 1,
      title: t("wordpressTitle"),
      shortDescription: t("wordpressDesc"),
      expandedDescription:
        language === "en"
          ? "Transform your WordPress site with custom solutions that go beyond standard themes. I create bespoke WordPress experiences that are fast, secure, and perfectly aligned with your brand and functionality requirements."
          : "Transforma tu sitio WordPress con soluciones personalizadas que van más allá de los temas estándar. Creo experiencias WordPress a medida que son rápidas, seguras y perfectamente alineadas con tu marca y requisitos de funcionalidad.",
      features:
        language === "en"
          ? [
              "> Custom theme development from scratch",
              "> Plugin development and customization",
              "> Performance optimization and caching",
              "> Security hardening and maintenance",
              "> WooCommerce integration and customization",
              "> Headless WordPress implementations",
            ]
          : [
              "> Desarrollo de temas personalizados desde cero",
              "> Desarrollo y personalización de plugins",
              "> Optimización de rendimiento y caché",
              "> Endurecimiento de seguridad y mantenimiento",
              "> Integración y personalización de WooCommerce",
              "> Implementaciones WordPress headless",
            ],
      codeSnippet: `// Custom WordPress hook example
function custom_post_meta_box() {
  add_meta_box(
    'custom-fields',
    'Project Details',
    'custom_fields_callback',
    'project'
  );
}
add_action('add_meta_boxes', 'custom_post_meta_box');`,
      image: "/placeholder.svg?height=300&width=400&text=WordPress+Solutions",
    },
    {
      id: 2,
      title: t("automationTitle"),
      shortDescription: t("automationDesc"),
      expandedDescription:
        language === "en"
          ? "Streamline your business operations with intelligent automation solutions. I design and implement custom workflows that eliminate repetitive tasks, reduce errors, and free up your team to focus on high-value activities."
          : "Optimiza las operaciones de tu negocio con soluciones de automatización inteligentes. Diseño e implemento flujos de trabajo personalizados que eliminan tareas repetitivas, reducen errores y liberan a tu equipo para enfocarse en actividades de alto valor.",
      features:
        language === "en"
          ? [
              "> n8n workflow automation and integration",
              "> Custom API integrations between systems",
              "> Data synchronization and processing",
              "> Email and notification automation",
              "> Report generation and scheduling",
              "> Business process optimization",
            ]
          : [
              "> Automatización e integración de flujos de trabajo n8n",
              "> Integraciones API personalizadas entre sistemas",
              "> Sincronización y procesamiento de datos",
              "> Automatización de correos y notificaciones",
              "> Generación y programación de reportes",
              "> Optimización de procesos empresariales",
            ],
      codeSnippet: `// n8n workflow example
{
  "nodes": [
    {
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "parameters": {
        "path": "process-order"
      }
    },
    {
      "name": "Process Data",
      "type": "n8n-nodes-base.function"
    }
  ]
}`,
      image: "/placeholder.svg?height=300&width=400&text=Automation+Workflow",
    },
    {
      id: 3,
      title: t("enhancementTitle"),
      shortDescription: t("enhancementDesc"),
      expandedDescription:
        language === "en"
          ? "Breathe new life into your existing systems with strategic enhancements and modernization. I analyze current performance bottlenecks and implement targeted improvements that deliver measurable results."
          : "Dale nueva vida a tus sistemas existentes con mejoras estratégicas y modernización. Analizo los cuellos de botella de rendimiento actuales e implemento mejoras específicas que entregan resultados medibles.",
      features:
        language === "en"
          ? [
              "> Legacy system analysis and modernization",
              "> Performance profiling and optimization",
              "> Database query optimization",
              "> Code refactoring and cleanup",
              "> Security vulnerability assessment",
              "> Scalability improvements",
            ]
          : [
              "> Análisis y modernización de sistemas legacy",
              "> Perfilado y optimización de rendimiento",
              "> Optimización de consultas de base de datos",
              "> Refactorización y limpieza de código",
              "> Evaluación de vulnerabilidades de seguridad",
              "> Mejoras de escalabilidad",
            ],
      codeSnippet: `// Performance optimization example
// Before: N+1 query problem
users.forEach(user => {
  user.posts = Post.findByUserId(user.id);
});

// After: Optimized with joins
const usersWithPosts = User.findAll({
  include: [{ model: Post }]
});`,
      image: "/placeholder.svg?height=300&width=400&text=System+Enhancement",
    },
    {
      id: 4,
      title: t("catalogsTitle"),
      shortDescription: t("catalogsDesc"),
      expandedDescription:
        language === "en"
          ? "Build engaging digital catalogs that showcase your products beautifully while providing powerful search, filtering, and browsing capabilities. Perfect for e-commerce, B2B portals, and product showcase websites."
          : "Construye catálogos digitales atractivos que muestren tus productos de manera hermosa mientras proporcionan capacidades poderosas de búsqueda, filtrado y navegación. Perfecto para comercio electrónico, portales B2B y sitios web de exhibición de productos.",
      features:
        language === "en"
          ? [
              "> Interactive product browsing interfaces",
              "> Advanced search and filtering systems",
              "> Dynamic pricing and inventory management",
              "> Mobile-responsive catalog design",
              "> Integration with existing e-commerce platforms",
              "> Analytics and user behavior tracking",
            ]
          : [
              "> Interfaces interactivas de navegación de productos",
              "> Sistemas avanzados de búsqueda y filtrado",
              "> Gestión dinámica de precios e inventario",
              "> Diseño de catálogo responsivo para móviles",
              "> Integración con plataformas de comercio electrónico existentes",
              "> Análisis y seguimiento del comportamiento del usuario",
            ],
      codeSnippet: `// Product search implementation
const searchProducts = async (query, filters) => {
  return await Product.findAll({
    where: {
      [Op.and]: [
        { name: { [Op.iLike]: \`%\${query}%\` } },
        filters.category && { category: filters.category },
        filters.priceRange && { 
          price: { 
            [Op.between]: filters.priceRange 
          } 
        }
      ].filter(Boolean)
    }
  });
};`,
      image: "/placeholder.svg?height=300&width=400&text=Online+Catalog",
    },
    {
      id: 5,
      title: t("linuxTitle"),
      shortDescription: t("linuxDesc"),
      expandedDescription:
        language === "en"
          ? "Leverage my deep Linux expertise to optimize your server infrastructure. From initial setup to ongoing maintenance, I ensure your systems are secure, performant, and reliable."
          : "Aprovecha mi profunda experiencia en Linux para optimizar tu infraestructura de servidores. Desde la configuración inicial hasta el mantenimiento continuo, me aseguro de que tus sistemas sean seguros, eficientes y confiables.",
      features:
        language === "en"
          ? [
              "> Server configuration and optimization",
              "> Security hardening and monitoring",
              "> Shell scripting and automation",
              "> Docker containerization and orchestration",
              "> CI/CD pipeline setup and management",
              "> System monitoring and alerting",
            ]
          : [
              "> Configuración y optimización de servidores",
              "> Endurecimiento de seguridad y monitoreo",
              "> Scripting de shell y automatización",
              "> Containerización y orquestación Docker",
              "> Configuración y gestión de pipelines CI/CD",
              "> Monitoreo y alertas del sistema",
            ],
      codeSnippet: `#!/bin/bash
// Automated backup script
BACKUP_DIR="/backup/$(date +%Y%m%d)"
mkdir -p "$BACKUP_DIR"

// Database backup
mysqldump -u root -p database_name > "$BACKUP_DIR/db.sql"

// File system backup
tar -czf "$BACKUP_DIR/files.tar.gz" /var/www/html

echo "Backup completed: $BACKUP_DIR"`,
      image: "/placeholder.svg?height=300&width=400&text=Linux+Administration",
    },
  ]

  const handleDownloadCV = async () => {
    if (isDownloading) return

    setIsDownloading(true)

    // Animation sequence
    setDownloadText("Fetching: cv_mauricio_medina.pdf...")
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setDownloadText("Progress: [████████████]")
    await new Promise((resolve) => setTimeout(resolve, 800))

    setDownloadText("Decompressing package...")
    await new Promise((resolve) => setTimeout(resolve, 600))

    setDownloadText("Success! Opening file...")
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Trigger download (replace with actual CV file path)
    const link = document.createElement("a")
    link.href = "/cv_mauricio_medina.pdf" // Replace with actual CV path
    link.download = "cv_mauricio_medina.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Reset after delay
    setTimeout(() => {
      setDownloadText("Download CV")
      setIsDownloading(false)
    }, 2000)
  }

  useEffect(() => {
    // Refined cursor blinking with standard terminal timing
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)

    // Enhanced Intersection Observer for fade-slide animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))

            // Add fade-slide animation to child elements
            const elements = entry.target.querySelectorAll(".fade-slide-up")
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("visible")
              }, index * 100)
            })
          }
        })
      },
      { threshold: 0.3 },
    )

    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => observerRef.current?.observe(section))

    return () => {
      clearInterval(cursorInterval)
      observerRef.current?.disconnect()
    }
  }, [])

  useEffect(() => {
    // Typing animation for terminal
    if (visibleSections.has("skills-matrix") && !isTyping) {
      setIsTyping(true)
      let index = 0
      const typeInterval = setInterval(() => {
        if (index < terminalText.length) {
          setTypedText(terminalText.slice(0, index + 1))
          index++
        } else {
          clearInterval(typeInterval)
        }
      }, 30)

      return () => clearInterval(typeInterval)
    }
  }, [visibleSections, isTyping, terminalText])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedService(null)
      }
    }

    if (selectedService !== null) {
      document.addEventListener("keydown", handleEscape)
      // Enhanced body scroll prevention
      const scrollY = window.scrollY
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = "0"
      document.body.style.right = "0"
      document.body.style.overflow = "hidden"
      document.body.style.width = "100%"
      document.body.setAttribute("data-scroll-y", scrollY.toString())
      document.body.classList.add("modal-open")
    } else {
      // Restore scroll position
      const scrollY = document.body.getAttribute("data-scroll-y")
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.left = ""
      document.body.style.right = ""
      document.body.style.overflow = ""
      document.body.style.width = ""
      document.body.classList.remove("modal-open")
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY))
        document.body.removeAttribute("data-scroll-y")
      }
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      // Cleanup
      const scrollY = document.body.getAttribute("data-scroll-y")
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.left = ""
      document.body.style.right = ""
      document.body.style.overflow = ""
      document.body.style.width = ""
      document.body.classList.remove("modal-open")
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY))
        document.body.removeAttribute("data-scroll-y")
      }
    }
  }, [selectedService])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowContactModal(false)
      }
    }

    if (showContactModal) {
      document.addEventListener("keydown", handleEscape)
      // Enhanced body scroll prevention for contact modal
      const scrollY = window.scrollY
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = "0"
      document.body.style.right = "0"
      document.body.style.overflow = "hidden"
      document.body.style.width = "100%"
      document.body.setAttribute("data-contact-scroll-y", scrollY.toString())
      document.body.classList.add("modal-open")
    } else {
      // Restore scroll position
      const scrollY = document.body.getAttribute("data-contact-scroll-y")
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.left = ""
      document.body.style.right = ""
      document.body.style.overflow = ""
      document.body.style.width = ""
      document.body.classList.remove("modal-open")
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY))
        document.body.removeAttribute("data-contact-scroll-y")
      }
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      // Cleanup
      const scrollY = document.body.getAttribute("data-contact-scroll-y")
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.left = ""
      document.body.style.right = ""
      document.body.style.overflow = ""
      document.body.style.width = ""
      document.body.classList.remove("modal-open")
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY))
        document.body.removeAttribute("data-contact-scroll-y")
      }
    }
  }, [showContactModal])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      // Get the floating nav height for offset calculation
      const navHeight = 80 // Approximate floating nav height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - navHeight - 20 // Extra 20px padding

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  const switchLanguage = (newLang: "en" | "es") => {
    setLanguage(newLang)
  }

  return (
    <div className="min-h-screen bg-[#111111] text-[#EAEAEA] font-mono main-content">
      <DigitalEtherBackground />

      {/* Modern Floating Navigation */}
      <nav className="floating-nav">
        <div className="nav-content">
          {/* Desktop Navigation Links */}
          <div className="nav-links hidden md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`nav-link ${activeSection === item.id ? "active" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="mobile-nav-toggle md:hidden">
            <MobileMenu
              navItems={navItems}
              activeSection={activeSection}
              language={language}
              onSectionClick={scrollToSection}
              onLanguageSwitch={switchLanguage}
            />
          </div>

          {/* Language Switcher */}
          <div className="language-switcher hidden md:flex">
            <button
              onClick={() => switchLanguage("es")}
              className={`language-btn ${language === "es" ? "active" : ""}`}
            >
              ES
            </button>
            <span className="text-secondary mx-1">/</span>
            <button
              onClick={() => switchLanguage("en")}
              className={`language-btn ${language === "en" ? "active" : ""}`}
            >
              EN
            </button>
          </div>

          {/* Linux Tux Logo - Clean penguin only */}
          <div className="linux-logo-clean">
            <TuxLogo />
          </div>
        </div>
      </nav>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 section-primary">
        <div className="max-w-7xl mx-auto px-4 md:px-6 content-depth">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-min">
            {/* Hero Module */}
            <div className="lg:col-span-2 bg-transparent p-4 md:p-6 lg:p-8 fade-slide-up stagger-1">
              <h1 className="text-4xl md:text-5xl font-medium text-[#EAEAEA] mb-4 leading-tight font-mono">
                {t("heroTitle")}
              </h1>
              <h2 className="text-xl md:text-2xl text-secondary mb-8 leading-relaxed font-mono">{t("heroSubtitle")}</h2>
              <p className="text-base md:text-lg text-secondary leading-[1.7] font-sans max-w-2xl">
                <span className="text-[#9370DB]">{`// `}</span>
                {t("heroDescription")}
              </p>

              {/* CTA Buttons - Enhanced for mobile */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 md:mt-10">
                <button
                  onClick={handleDownloadCV}
                  disabled={isDownloading}
                  className="flex-1 sm:flex-none px-6 md:px-8 py-3 md:py-4 border border-[#9370DB]/40 text-[#EAEAEA] font-mono text-xs md:text-sm rounded-lg hover:border-[#9370DB] hover:bg-[#9370DB]/10 hover:glow-purple transition-all duration-300 min-w-[180px] md:min-w-[200px] flex items-center justify-center hover-glow-clickable touch-manipulation"
                >
                  <span className="truncate">{downloadText}</span>
                </button>
                <button
                  onClick={() => setShowContactModal(true)}
                  className="flex-1 sm:flex-none px-6 md:px-8 py-3 md:py-4 border border-[#9370DB]/40 text-[#EAEAEA] font-mono text-xs md:text-sm rounded-lg hover:border-[#9370DB] hover:bg-[#9370DB]/10 hover:glow-purple transition-all duration-300 min-w-[180px] md:min-w-[200px] hover-glow-clickable touch-manipulation"
                >
                  Contact Me
                </button>
              </div>
            </div>

            {/* Profile Picture Module */}
            <div className="flex justify-center items-start p-8 fade-slide-up stagger-2">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden hover:ring-2 hover:ring-[#9370DB] hover:shadow-lg hover:shadow-[#9370DB]/50 transition-all duration-500">
                <img src="fotoperfilmauriciomedina.jpeg" alt="Mauricio Medina" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Status Module */}
            <div className="bg-transparent p-8 fade-slide-up stagger-3">
              <div className="text-sm text-[#9370DB] mb-4 font-mono">{t("statusTitle")}</div>
              <div className="text-base text-[#EAEAEA] mb-3 leading-relaxed font-sans">{t("statusAvailable")}</div>
              <div className="text-sm text-secondary mb-4 leading-relaxed font-sans">{t("statusLocation")}</div>
              <div className="flex items-center text-sm font-sans">
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></span>
                <span className="text-secondary">{t("statusOnline")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Technology Showcase Section */}
      <section id="skills-matrix" className="py-20 md:py-32 section-secondary">
        <div className="max-w-7xl mx-auto px-4 md:px-6 content-depth">
          <div className="text-center mb-16 fade-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-[#EAEAEA] mb-4 leading-tight font-mono">
              <span className="text-[#9370DB]">{`// `}</span>Technology Expertise
            </h2>
            <p className="text-lg text-secondary font-sans max-w-2xl mx-auto">
              Professional technologies and tools I use to build robust, scalable solutions
            </p>
          </div>

          {/* Frontend Technologies */}
          <div className="tech-category-section fade-slide-up stagger-1">
            <h3 className="tech-category-title">Frontend Development</h3>
            <div className="tech-showcase-grid">
              {[
                {
                  name: "HTML5",
                  category: "Markup",
                  icon: (
                    <svg viewBox="0 0 24 24" className="tech-logo" fill="#e34f26">
                      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
                    </svg>
                  ),
                },
                {
                  name: "CSS3",
                  category: "Styling",
                  icon: (
                    <svg viewBox="0 0 24 24" className="tech-logo" fill="#1572b6">
                      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z" />
                    </svg>
                  ),
                },
                {
                  name: "JavaScript",
                  category: "Programming",
                  icon: (
                    <svg viewBox="0 0 24 24" className="tech-logo" fill="#f7df1e">
                      <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
                    </svg>
                  ),
                },
                {
                  name: "React",
                  category: "Framework",
                  icon: (
                    <svg viewBox="0 0 24 24" className="tech-logo" fill="#61dafb">
                      <path d="M14.23 12.004a2.236 2.236 0 01-2.235 2.236 2.236 2.236 0 110-4.472 2.236 2.236 0 012.235 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.36-.034-.47 0-.92.014-1.36.034.44-.572.895-1.096 1.36-1.564zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.866.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.4-.465-.783-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.36.034.47 0 .92-.014 1.36-.034-.44.572-.895 1.095-1.36 1.56-.465-.467-.92-.992-1.36-1.56z" />
                    </svg>
                  ),
                },
                {
                  name: "Vue.js",
                  category: "Framework",
                  icon: (
                    <svg viewBox="0 0 24 24" className="tech-logo" fill="#4fc08d">
                      <path d="M24,1.61H14.06L12,5.16,9.94,1.61H0L12,22.39ZM12,14.08,5.16,2.23H9.59L12,6.41l2.41-4.18h4.43Z"/>
                    </svg>
                  ),
                },
              ].map((tech, index) => (
                <div key={tech.name} className={`tech-item fade-slide-up stagger-${index + 2}`}>
                  {tech.icon}
                  <div className="tech-name">{tech.name}</div>
                  <div className="tech-category">{tech.category}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Backend Technologies */}
          <div className="tech-category-section fade-slide-up stagger-2">
            <h3 className="tech-category-title">Backend Development</h3>
            <div className="tech-showcase-grid">
              {[
                {
                  name: "PHP",
                  category: "Language",
                  icon: (
                    <svg viewBox="0 0 24 24" className="tech-logo" fill="#777bb4">
                      <path d="M7.01 10.207h-.944l-.515 2.648h.838c.556 0 .982-.122 1.292-.391.313-.27.47-.663.47-1.178 0-.353-.093-.621-.276-.804-.183-.183-.463-.275-.865-.275zm12.583-4.157c.473 0 .825.108 1.056.324.23.216.345.531.345.945 0 .47-.158.858-.473 1.167-.315.308-.744.462-1.287.462h-.29l.342-1.76h-.463l-.515 2.648h.838c.556 0 .982-.122 1.292-.391.313-.27.47-.663.47-1.178 0-.353-.093-.621-.276-.804-.183-.183-.463-.275-.865-.275h-.944l-.515 2.648h.838c.556 0 .982-.122 1.292-.391.313-.27.47-.663.47-1.178 0-.353-.093-.621-.276-.804-.183-.183-.463-.275-.865-.275h-.944l-.515 2.648h.838c.556 0 .982-.122 1.292-.391.313-.27.47-.663.47-1.178 0-.353-.093-.621-.276-.804-.183-.183-.463-.275-.865-.275z" />
                    </svg>
                  ),
                },
                {
                  name: "Java",
                  category: "Language",
                  icon: (
                    <svg viewBox="0 0 24 24" className="tech-logo" fill="#ed8b00">
                      <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218" />
                    </svg>
                  ),
                },
                {
                  name: "Python",
                  category: "Language",
                  icon: (
                    <svg viewBox="0 0 24 24" className="tech-logo" fill="#3776ab">
                      <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" />
                    </svg>
                  ),
                },
                {
                  name: "C++",
                  category: "Language",
                  icon: (
                    <svg viewBox="0 0 24 24" className="tech-logo" fill="#00599c">
                      <path d="M22.394 6c-.167-.29-.398-.543-.652-.69L12.926.22c-.509-.294-1.34-.294-1.848 0L2.26 5.31c-.508.293-.923 1.013-.923 1.6v10.18c0 .294.104.62.271.91.167.29.398.543.652.69l8.816 5.09c.508.293 1.34.293 1.848 0l8.816-5.09c.254-.147.485-.4.652-.69.167-.29.27-.616.27-.91V6.91c.003-.294-.1-.62-.268-.91zM12 19.11c-3.92 0-7.109-3.19-7.109-7.11 0-3.92 3.19-7.11 7.109-7.11a7.133 7.133 0 016.156 3.553l-3.076 1.78a3.567 3.567 0 00-3.08-1.78A3.56 3.56 0 008.444 12 3.56 3.56 0 0012 15.555a3.57 3.57 0 003.08-1.778l3.078 1.78A7.135 7.135 0 0112 19.11zm7.11-6.715h-.79V11.61h-.79v.785h-.79v.79h.79v.785h.79v-.785h.79v-.79zm2.962 0h-.79V11.61h-.79v.785h-.79v.79h.79v.785h.79v-.785h.79v-.79z" />
                    </svg>
                  ),
                },
                {
                  name: "Node.js",
                  category: "Runtime",
                  icon: (
                    <svg viewBox="0 0 24 24" className="tech-logo" fill="#339933">
                      <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.990,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.570,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z" />
                    </svg>
                  ),
                },
              ].map((tech, index) => (
                <div key={tech.name} className={`tech-item fade-slide-up stagger-${index + 2}`}>
                  {tech.icon}
                  <div className="tech-name">{tech.name}</div>
                  <div className="tech-category">{tech.category}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Database & Tools */}
          <div className="tech-category-section fade-slide-up stagger-3">
            <h3 className="tech-category-title">Database & DevOps</h3>
            <div className="tech-showcase-grid">
              {[
                {
                  name: "MySQL",
                  category: "Database",
                  icon: (
                    <svg viewBox="0 0 24 24" className="tech-logo" fill="#4479a1">
                      <path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.151zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H.208c.074-1.83.214-4.924.214-6.723h1.21l1.34 4.184h.04l1.36-4.184h1.15c.16 1.797.25 4.893.257 6.723zM9.76 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H6.44l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41h-.69c.075-1.83.215-4.924.215-6.723h1.21l1.34 4.184h.04l1.36-4.184h1.15c.16 1.797.25 4.893.256 6.723z" />
                    </svg>
                  ),
                },
                {
                  name: "PostgreSQL", 
                  category: "Database",
                  icon: (
                    <svg viewBox="0 0 24 24" className="tech-logo" fill="#336791">
                      <path d="M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-.7181-.1468-.2434.1968-.2974.5563-.1196.8173.1786.2646.5214.3321.7644.1512.2411-.1777.2966-.5389.1296-.7026zM12.0002 24c-6.6274 0-12-5.3726-12-12s5.3726-12 12-12 12 5.3726 12 12-5.3726 12-12 12z"/>
                    </svg>
                  ),
                },
                {
                  name: "Docker",
                  category: "DevOps",
                  icon: (
                    <svg viewBox="0 0 24 24" className="tech-logo" fill="#2496ed">
                      <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887a.186.186 0 00.186.186m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z" />
                    </svg>
                  ),
                },
                {
                  name: "Git",
                  category: "Version Control",
                  icon: (
                    <svg viewBox="0 0 24 24" className="tech-logo" fill="#f05032">
                      <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" />
                    </svg>
                  ),
                },
                {
                  name: "Linux",
                  category: "Operating System",
                  icon: (
                    <svg viewBox="0 0 24 24" className="tech-logo" fill="#fcc624">
                      <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 01-.088.069c-.104.105-.259.158-.436.158-.177 0-.33-.053-.435-.158a.698.698 0 01-.096-.069.956.956 0 01-.213-.335 1.69 1.69 0 01-.148-.706l-.004.024a.086.086 0 01-.004.021v-.105c0 .02.006.04.006.06.008-.265.061-.465.166-.724.107-.201.248-.398.438-.533.188-.136.37-.198.584-.198z" />
                    </svg>
                  ),
                },
              ].map((tech, index) => (
                <div key={tech.name} className={`tech-item fade-slide-up stagger-${index + 2}`}>
                  {tech.icon}
                  <div className="tech-name">{tech.name}</div>
                  <div className="tech-category">{tech.category}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="flex justify-center py-12">
        <div className="section-separator"></div>
      </div>

      {/* Skills Section */}
      <section id="skills" className="py-12 md:py-20 section-primary">
        <div className="max-w-7xl mx-auto px-4 md:px-6 content-depth">
          <h2 className="text-2xl md:text-3xl font-bold text-[#EAEAEA] mb-8 md:mb-12 text-center leading-tight font-mono">
            {t("skillsTitle")}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Enhanced Terminal Skills Module */}
            <div className="lg:col-span-2 terminal-console fade-slide-up stagger-1">
              <div className="terminal-header">
                <div className="terminal-controls">
                  <div className="terminal-control close"></div>
                  <div className="terminal-control minimize"></div>
                  <div className="terminal-control maximize"></div>
                </div>
                <div className="terminal-title">Terminal — mauricio@arch-linux</div>
              </div>

              <div className="terminal-body">
                <div className="space-y-2">
                  {/* Command execution */}
                  <div className="terminal-line visible">
                    <span className="terminal-prompt">[user@arch ~]$</span>
                    <span className="terminal-command">
                      sudo pacman -S {language === "en" ? "skills" : "habilidades"}
                    </span>
                  </div>

                  <div className="terminal-line visible" style={{ animationDelay: "0.5s" }}>
                    <span className="terminal-output">
                      {language === "en" ? "resolving dependencies..." : "resolviendo dependencias..."}
                    </span>
                  </div>

                  <div className="terminal-section-divider"></div>

                  {/* Package listings with icons */}
                  <div className="terminal-line visible" style={{ animationDelay: "1s" }}>
                    <span className="terminal-info">{language === "en" ? "Packages (5):" : "Paquetes (5):"}</span>
                  </div>

                  <div className="package-list">
                    {[
                      { name: "php", icon: "🐘", progress: 95 },
                      { name: "java", icon: "☕", progress: 85 },
                      { name: "c++", icon: "⚡", progress: 75 },
                      { name: "html", icon: "🌐", progress: 95 },
                      { name: "css", icon: "🎨", progress: 90 },
                    ].map((pkg, index) => (
                      <div
                        key={pkg.name}
                        className="terminal-line visible"
                        style={{ animationDelay: `${1.2 + index * 0.2}s` }}
                      >
                        <div className="package-item">
                          <span className="package-icon">{pkg.icon}</span>
                          <span className="terminal-output">{pkg.name}</span>
                          <div className="skill-progress-terminal ml-4">
                            <div className="progress-bar-terminal">
                              <div
                                className="progress-fill-terminal"
                                style={{
                                  width: visibleSections.has("skills") ? `${pkg.progress}%` : "0%",
                                  transitionDelay: `${2 + index * 0.3}s`,
                                }}
                              ></div>
                            </div>
                            <span className="progress-percentage-terminal">{pkg.progress}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="terminal-line visible" style={{ animationDelay: "2.5s" }}>
                    <span className="terminal-info">{language === "en" ? "Database (1):" : "Base de datos (1):"}</span>
                  </div>

                  <div className="terminal-line visible" style={{ animationDelay: "2.7s" }}>
                    <div className="package-item ml-4">
                      <span className="package-icon">🗄️</span>
                      <span className="terminal-output">sql</span>
                      <div className="skill-progress-terminal ml-4">
                        <div className="progress-bar-terminal">
                          <div
                            className="progress-fill-terminal"
                            style={{
                              width: visibleSections.has("skills") ? "88%" : "0%",
                              transitionDelay: "3s",
                            }}
                          ></div>
                        </div>
                        <span className="progress-percentage-terminal">88%</span>
                      </div>
                    </div>
                  </div>

                  <div className="terminal-line visible" style={{ animationDelay: "3s" }}>
                    <span className="terminal-info">{language === "en" ? "Expertise (2):" : "Experiencia (2):"}</span>
                  </div>

                  <div className="terminal-line visible" style={{ animationDelay: "3.2s" }}>
                    <div className="package-item ml-4">
                      <span className="package-icon">✨</span>
                      <span className="terminal-output">{language === "en" ? "ux/ui-design" : "diseño-ux/ui"}</span>
                      <div className="skill-progress-terminal ml-4">
                        <div className="progress-bar-terminal">
                          <div
                            className="progress-fill-terminal"
                            style={{
                              width: visibleSections.has("skills") ? "82%" : "0%",
                              transitionDelay: "3.5s",
                            }}
                          ></div>
                        </div>
                        <span className="progress-percentage-terminal">82%</span>
                      </div>
                    </div>
                  </div>

                  <div className="terminal-line visible" style={{ animationDelay: "3.4s" }}>
                    <div className="package-item ml-4">
                      <span className="package-icon">🐧</span>
                      <span className="terminal-output">
                        {language === "en" ? "linux-system-administration" : "administración-sistema-linux"}
                      </span>
                      <div className="skill-progress-terminal ml-4">
                        <div className="progress-bar-terminal">
                          <div
                            className="progress-fill-terminal"
                            style={{
                              width: visibleSections.has("skills") ? "92%" : "0%",
                              transitionDelay: "3.8s",
                            }}
                          ></div>
                        </div>
                        <span className="progress-percentage-terminal">92%</span>
                      </div>
                    </div>
                  </div>

                  <div className="terminal-section-divider"></div>

                  <div className="terminal-line visible" style={{ animationDelay: "4s" }}>
                    <span className="terminal-output">
                      {language === "en" ? "Total Installed Size: 1024.00 MiB" : "Tamaño Total Instalado: 1024.00 MiB"}
                    </span>
                  </div>

                  <div className="terminal-line visible" style={{ animationDelay: "4.2s" }}>
                    <span className="terminal-success">✓ {t("skillsInstalled")}</span>
                  </div>

                  <div className="terminal-section-divider"></div>

                  {/* Interactive terminal input */}
                  <div className="terminal-line visible" style={{ animationDelay: "4.5s" }}>
                    <span className="terminal-prompt">[user@arch ~]$</span>
                    <input
                      type="text"
                      className="terminal-input"
                      placeholder={t("skillsPlaceholder")}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const command = e.currentTarget.value.trim()
                          if (command) {
                            // Add the command to terminal history
                            const terminalDiv = e.currentTarget.closest(".terminal-body")
                            const newCommand = document.createElement("div")
                            newCommand.className = "terminal-line visible"
                            newCommand.innerHTML = `<span class="terminal-prompt">[user@arch ~]$</span><span class="terminal-command">${command}</span>`

                            const errorMessage = document.createElement("div")
                            errorMessage.className = "terminal-line visible"
                            errorMessage.innerHTML = `<span class="terminal-error">bash: ${command}: command not found</span><br/><span class="terminal-info">Error:</span> <span class="terminal-output">${t("skillsError")}</span><br/><span class="terminal-output">Email:</span> <a href="mailto:mauricio@example.com" class="terminal-success hover:text-green-300 transition-all hover-glow-clickable">mauricio@example.com</a>`

                            terminalDiv?.appendChild(newCommand)
                            terminalDiv?.appendChild(errorMessage)

                            // Clear input and scroll to bottom
                            e.currentTarget.value = ""
                            terminalDiv?.scrollIntoView({ behavior: "smooth", block: "end" })
                          }
                        }
                      }}
                    />
                    <span className="terminal-cursor"></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Linux Detail Module */}
            <div className="linux-detail-terminal fade-slide-up stagger-2">
              <div className="linux-command">$ uname -a</div>
              <div className="linux-output">Linux arch 6.6.1-zen1-1-zen #1 SMP PREEMPT_DYNAMIC</div>
              <div className="linux-description">Powered by Arch Linux</div>
              <div className="linux-penguin">🐧</div>
              <div className="terminal-section-divider"></div>
              <div className="linux-command">$ whoami</div>
              <div className="linux-output">mauricio</div>
              <div className="linux-command">$ uptime</div>
              <div className="linux-output">up 365 days, 24:00, 1 user</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="flex justify-center py-12">
        <div className="section-separator"></div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-12 md:py-20 section-secondary">
        <div className="max-w-7xl mx-auto px-4 md:px-6 content-depth">
          <h2 className="text-2xl md:text-3xl font-bold text-[#EAEAEA] mb-8 md:mb-12 text-center leading-tight font-mono">
            {t("servicesTitle")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {servicesData.map((service, index) => (
              <div
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`bg-transparent p-8 hover-glow-interactive transition-all duration-500 border border-transparent hover:border-[#9370DB]/30 rounded-lg cursor-pointer active:scale-95 fade-slide-up stagger-${index + 1}`}
              >
                <h3 className="text-lg text-[#9370DB] mb-4 leading-tight font-mono">{service.title}</h3>
                <p className="text-sm text-secondary mb-6 leading-[1.7] font-sans">{service.shortDescription}</p>
                <div className="text-xs text-[#EAEAEA] font-mono">
                  <span className="text-[#9370DB]">{">"}</span> {t("servicesLearnMore")}
                </div>
              </div>
            ))}

            {/* Enhanced Modal */}
            {selectedService !== null && (
              <div
                className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999] p-4 md:p-6 animate-fadeIn backdrop-blur-sm"
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    setSelectedService(null)
                  }
                }}
              >
                <div className="bg-[#111111] border border-[#9370DB]/30 rounded-lg max-w-[90vw] w-full max-h-[85vh] overflow-y-auto overflow-x-hidden shadow-2xl shadow-[#9370DB]/20 animate-scaleIn relative">
                  {/* Modal Header */}
                  <div className="flex justify-between items-center p-8 border-b border-[#333]">
                    <h2 className="text-2xl font-bold text-[#EAEAEA] leading-tight font-mono">
                      {servicesData[selectedService].title}
                    </h2>
                    <button
                      onClick={() => setSelectedService(null)}
                      className="text-secondary hover:text-[#9370DB] hover:glow-purple transition-all duration-300 text-2xl font-mono w-8 h-8 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>

                  {/* Modal Content */}
                  <div className="p-8 grid md:grid-cols-2 gap-12">
                    {/* Left Column - Text Content */}
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-lg text-[#9370DB] mb-4 font-mono">{t("modalOverview")}</h3>
                        <p className="text-sm text-[#EAEAEA] leading-[1.7] font-sans">
                          {servicesData[selectedService].expandedDescription}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg text-[#9370DB] mb-4 font-mono">{t("modalFeatures")}</h3>
                        <div className="space-y-2">
                          {servicesData[selectedService].features.map((feature, index) => (
                            <div key={index} className="text-sm text-[#EAEAEA] leading-relaxed font-sans">
                              <span className="text-[#9370DB]">{feature.split(" ")[0]}</span>
                              <span className="text-secondary"> {feature.substring(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg text-[#9370DB] mb-4 font-mono">{t("modalCode")}</h3>
                        <div className="bg-black/40 p-6 rounded-lg border border-[#333] overflow-x-auto">
                          <pre className="text-xs text-green-400 font-mono whitespace-pre-wrap leading-relaxed">
                            {servicesData[selectedService].codeSnippet}
                          </pre>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Visual Content */}
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-lg text-[#9370DB] mb-4 font-mono">{t("modalProject")}</h3>
                        <div className="border border-[#333] rounded-lg overflow-hidden">
                          <img
                            src={servicesData[selectedService].image || "/placeholder.svg"}
                            alt={`${servicesData[selectedService].title} example`}
                            className="w-full h-auto"
                          />
                        </div>
                      </div>

                      <div className="bg-black/20 p-6 rounded-lg border border-[#333]">
                        <h4 className="text-sm text-[#9370DB] mb-3 font-mono">{t("modalReady")}</h4>
                        <p className="text-xs text-secondary mb-4 leading-relaxed font-sans">{t("modalContact")}</p>
                        <button
                          onClick={() => {
                            setSelectedService(null)
                            scrollToSection("contact")
                          }}
                          className="bg-[#9370DB] hover:bg-[#9370DB]/80 text-white px-6 py-3 rounded text-sm font-mono transition-all duration-300 hover:shadow-lg hover:shadow-[#9370DB]/30 hover-glow-clickable"
                        >
                          {t("modalContactBtn")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="flex justify-center py-12">
        <div className="section-separator"></div>
      </div>

      {/* Enhanced Projects Section with Previews */}
      <section id="projects" className="py-12 md:py-20 section-primary">
        <div className="max-w-7xl mx-auto px-4 md:px-6 content-depth">
          <div className="text-center mb-16 fade-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-[#EAEAEA] mb-4 leading-tight font-mono">
              <span className="text-[#9370DB]">{`// `}</span>Featured Projects
            </h2>
            <p className="text-lg text-secondary font-sans max-w-2xl mx-auto">
              Real-world applications showcasing expertise in full-stack development and system optimization
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {projectsData.map((project, index) => (
              <div
                key={project.id}
                className={`project-card fade-slide-up stagger-${index + 1}`}
              >
                {/* Project Preview Image */}
                <div className="project-preview">
                  <img
                    src={project.image || `/placeholder.svg?height=280&width=400&text=${encodeURIComponent(project.title)}`}
                    alt={`${project.title} Preview`}
                    className="project-image"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=280&fit=crop&crop=entropy&cs=tinysrgb`;
                    }}
                  />
                  
                  {/* Hover Overlay with Project Details */}
                  <div className="project-overlay">
                    <div className="project-overlay-content">
                      <h3 className="project-overlay-title">{project.title}</h3>
                      <p className="project-overlay-description">{project.shortDescription}</p>
                      
                      {/* Project Highlights */}
                      <div className="mb-4">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {project.highlights.map((highlight, idx) => (
                            <div key={idx} className="bg-black/30 px-2 py-1 rounded text-center">
                              {highlight}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="project-buttons">
                        {project.liveDemo && (
                          <a
                            href={project.liveDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-btn primary"
                          >
                            Live Demo
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-btn"
                          >
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl text-[#9370DB] mb-3 leading-tight font-mono">{project.title}</h3>
                  <p className="text-sm text-secondary mb-4 leading-[1.6] font-sans">{project.description}</p>
                  
                  {/* Technology Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-3 py-1 bg-[#9370DB]/10 text-[#9370DB] text-xs rounded-full font-mono border border-[#9370DB]/20 hover:bg-[#9370DB]/20 transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 fade-slide-up stagger-4">
            <div className="bg-black/20 border border-[#9370DB]/20 rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-xl text-[#9370DB] mb-4 font-mono">More Projects Available</h3>
              <p className="text-secondary mb-6 font-sans">
                Interested in seeing more of my work? Check out my complete portfolio on GitHub or get in touch to discuss your project needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://github.com/NegroHm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-[#9370DB]/40 text-[#EAEAEA] font-mono text-sm rounded-lg hover:border-[#9370DB] hover:bg-[#9370DB]/10 hover:glow-purple transition-all duration-300 hover-glow-clickable"
                >
                  View All Projects
                </a>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="px-6 py-3 bg-[#9370DB] text-white font-mono text-sm rounded-lg hover:bg-[#9370DB]/80 transition-all duration-300 hover:shadow-lg hover:shadow-[#9370DB]/30"
                >
                  Start a Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="flex justify-center py-12">
        <div className="section-separator"></div>
      </div>

      {/* Contact Section */}
      <section id="contact" className="py-12 md:py-20 section-secondary">
        <div className="max-w-7xl mx-auto px-4 md:px-6 content-depth">
          <h2 className="text-2xl md:text-3xl font-bold text-[#EAEAEA] mb-8 md:mb-12 text-center leading-tight font-mono">
            {t("contactTitle")}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className="bg-black/40 p-8 rounded-lg transition-all duration-300 border border-[#333] fade-slide-up stagger-1">
              <div className="font-mono text-sm">
                <div className="text-[#EAEAEA] mb-4">[user@arch ~]$ contact --info</div>
                <div className="space-y-3 text-secondary leading-relaxed font-sans">
                  <div>
                    Email:{" "}
                    <a
                      href="mailto:mauricio@example.com"
                      className="text-[#9370DB] hover:glow-purple transition-all hover-glow-clickable"
                    >
                      mauricio@example.com
                    </a>
                  </div>
                  <div>{t("contactLocation")}</div>
                  <div>{t("contactTimezone")}</div>
                  <div className="text-green-400 mt-4">{t("contactStatus")}</div>
                </div>
              </div>
            </div>

            <div className="bg-transparent p-8 transition-all duration-300 fade-slide-up stagger-2">
              <div className="text-sm text-[#9370DB] mb-6 font-mono">{t("socialLinks")}</div>
              <div className=" space-y-4">
                <a
                  href="https://www.linkedin.com/in/mauricio-hector-medina-4b9048234/"
                  className="block text-[#EAEAEA] hover:text-[#9370DB]  transition-all duration-300 "
                >
                  <span className="text-[#9370DB]">{">"}</span> LinkedIn
                </a>
                <a
                  href="https://github.com/NegroHm"
                  className="block text-[#EAEAEA] hover:text-[#9370DB]  transition-all duration-300 "
                >
                  <span className="text-[#9370DB]">{">"}</span> GitHub
                </a>
                <a
                  href="https://twitter.com"
                  className="block text-[#EAEAEA] hover:text-[#9370DB]  transition-all duration-300 "
                >
                  <span className="text-[#9370DB]">{">"}</span> X (Twitter)
                </a>
                <a
                  href="https://youtube.com"
                  className="block text-[#EAEAEA] hover:text-[#9370DB]  transition-all duration-300 "
                >
                  <span className="text-[#9370DB]">{">"}</span> YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center border-t border-[#333] mt-20">
        <div className="text-xs text-secondary leading-relaxed font-sans">{t("footerCopyright")}</div>
        <div className="mt-3 opacity-20">🐧</div>
      </footer>

      {/* Contact Modal */}
      {showContactModal && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999] p-4 md:p-6 animate-fadeIn backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowContactModal(false)
            }
          }}
        >
          <div className="bg-[#111111] border border-[#9370DB]/30 rounded-lg max-w-md w-full shadow-2xl shadow-[#9370DB]/20 animate-scaleIn overflow-hidden relative">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-[#333]">
              <h2 className="text-xl font-bold text-[#EAEAEA] leading-tight font-mono">
                <span className="text-[#9370DB]">{`// `}</span>Get in Touch
              </h2>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-secondary hover:text-[#9370DB] hover:glow-purple transition-all duration-300 text-2xl font-mono w-8 h-8 flex items-center justify-center"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="space-y-4">
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#9370DB]/10 hover:border-[#9370DB]/30 border border-transparent transition-all duration-300 group hover-glow-clickable"
                >
                  <div className="text-xl group-hover:text-[#9370DB] group-hover:glow-purple transition-all duration-300">
                    📱
                  </div>
                  <span className="text-[#EAEAEA] font-mono text-sm group-hover:text-[#9370DB] transition-all duration-300">
                    WhatsApp
                  </span>
                </a>

                <a
                  href="https://instagram.com/mauricio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#9370DB]/10 hover:border-[#9370DB]/30 border border-transparent transition-all duration-300 group hover-glow-clickable"
                >
                  <div className="text-xl group-hover:text-[#9370DB] group-hover:glow-purple transition-all duration-300">
                    📷
                  </div>
                  <span className="text-[#EAEAEA] font-mono text-sm group-hover:text-[#9370DB] transition-all duration-300">
                    Instagram
                  </span>
                </a>

                <a
                  href="mailto:mauricio@example.com"
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#9370DB]/10 hover:border-[#9370DB]/30 border border-transparent transition-all duration-300 group hover-glow-clickable"
                >
                  <div className="text-xl group-hover:text-[#9370DB] group-hover:glow-purple transition-all duration-300">
                    ✉️
                  </div>
                  <span className="text-[#EAEAEA] font-mono text-sm group-hover:text-[#9370DB] transition-all duration-300">
                    Email
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
