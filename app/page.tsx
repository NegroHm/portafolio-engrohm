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
  navAbout: { en: "// About", es: "// Acerca" },
  navSkills: { en: "// Skills", es: "// Habilidades" },
  navServices: { en: "// Services", es: "// Servicios" },
  navProjects: { en: "// Projects", es: "// Proyectos" },
  navContact: { en: "// Contacto", es: "// Contacto" },

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
    //! MOdificar
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

// Update the projects section data
const projectsData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "Built a scalable e-commerce solution with custom PHP backend and optimized database architecture, handling 10k+ daily transactions with real-time inventory management.",
    technologies: ["PHP", "MySQL", "Redis", "Docker", "Linux"],
    liveDemo: "https://demo-ecommerce.example.com",
    github: "https://github.com/mauricio/ecommerce-platform",
    featured: true,
  },
  {
    id: 2,
    title: "Automation Workflow System",
    description:
      "Developed comprehensive automation workflows using n8n, reducing manual tasks by 80% and improving operational efficiency across multiple business processes.",
    technologies: ["n8n", "Node.js", "PostgreSQL", "Docker", "API Integration"],
    liveDemo: "https://automation-demo.example.com",
    github: "https://github.com/mauricio/automation-system",
    featured: true,
  },
  {
    id: 3,
    title: "WordPress Performance Suite",
    description:
      "Created a comprehensive WordPress optimization plugin that improves site speed by 60% through advanced caching, image optimization, and database cleanup.",
    technologies: ["WordPress", "PHP", "JavaScript", "MySQL", "Redis"],
    liveDemo: "https://wp-performance.example.com",
    github: "https://github.com/mauricio/wp-performance-suite",
    featured: false,
  },
]

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
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
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
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [showContactModal])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      // Get the header height for offset calculation
      const header = document.querySelector("nav")
      const headerHeight = header ? header.offsetHeight : 70

      // Calculate the target position accounting for sticky header
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight - 20 // Extra 20px padding

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
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 nav-bar">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex justify-between items-center">
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-10 desktop-nav-panel">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm transition-all duration-300 hover:text-[#9370DB] hover:glow-purple relative ${
                    activeSection === item.id ? "text-[#9370DB] glow-purple" : "text-[#EAEAEA]"
                  }`}
                >
                  {activeSection === item.id && (
                    <span className="absolute -left-3 top-1/2 transform -translate-y-1/2 text-[#9370DB] text-xs">
                      •
                    </span>
                  )}
                  {item.label}
                </button>
              ))}
            </div>

            {/* Desktop Language Switcher */}
            <div className="hidden md:flex items-center space-x-1 text-sm desktop-nav-panel">
              <button
                onClick={() => switchLanguage("es")}
                className={`transition-all duration-300 ${
                  language === "es"
                    ? "text-[#EAEAEA] cursor-default"
                    : "text-secondary hover:text-[#EAEAEA] cursor-pointer"
                }`}
                disabled={language === "es"}
              >
                ES
              </button>
              <span className="text-secondary">/</span>
              <button
                onClick={() => switchLanguage("en")}
                className={`transition-all duration-300 ${
                  language === "en"
                    ? "text-[#EAEAEA] cursor-default"
                    : "text-secondary hover:text-[#EAEAEA] cursor-pointer"
                }`}
                disabled={language === "en"}
              >
                EN
              </button>
            </div>

            {/* Mobile Menu */}
            <div className="mobile-only">
              <MobileMenu
                navItems={navItems}
                activeSection={activeSection}
                language={language}
                onSectionClick={scrollToSection}
                onLanguageSwitch={switchLanguage}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* About Section */}
      <section id="about" className="py-12 md:py-20 section-primary">
        <div className="max-w-7xl mx-auto px-4 md:px-6 content-depth">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-min">
            {/* Hero Module */}
            <div className="lg:col-span-2 bg-transparent p-6 md:p-8 fade-slide-up stagger-1">
              <h1 className="text-3xl font-medium text-[#EAEAEA] mb-3 leading-tight font-mono">{t("heroTitle")}</h1>
              <h2 className="text-xl text-secondary mb-6 leading-relaxed font-mono">{t("heroSubtitle")}</h2>
              <p className="text-base text-secondary leading-[1.7] font-sans">
                <span className="text-[#9370DB]">// </span>
                {t("heroDescription")}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  onClick={handleDownloadCV}
                  disabled={isDownloading}
                  className="flex-1 sm:flex-none px-6 py-3 border border-[#9370DB]/40 text-[#EAEAEA] font-mono text-sm rounded hover:border-[#9370DB] hover:bg-[#9370DB]/10 hover:glow-purple transition-all duration-300 min-w-[180px] flex items-center justify-center hover-glow-clickable"
                >
                  {downloadText}
                </button>
                <button
                  onClick={() => setShowContactModal(true)}
                  className="flex-1 sm:flex-none px-6 py-3 border border-[#9370DB]/40 text-[#EAEAEA] font-mono text-sm rounded hover:border-[#9370DB] hover:bg-[#9370DB]/10 hover:glow-purple transition-all duration-300 min-w-[180px] hover-glow-clickable"
                >
                  Contact Me
                </button>
              </div>
            </div>

            {/* Profile Picture Module */}
            <div className="flex justify-center items-start p-8 fade-slide-up stagger-2">
              <div className="w-56 h-56 rounded-full overflow-hidden hover:ring-2 hover:ring-[#9370DB] hover:shadow-lg hover:shadow-[#9370DB]/50 transition-all duration-500">
                <img
                  src="fotoperfilmauriciomedina.jpeg"
                  alt="Mauricio Medina"
                  className="w-full h-full object-cover"
                />
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

      {/* Skills Matrix Section */}
      <section id="skills-matrix" className="py-12 md:py-20 section-secondary">
        <div className="max-w-7xl mx-auto px-4 md:px-6 content-depth">
          <h2 className="text-2xl md:text-3xl font-bold text-[#EAEAEA] mb-8 md:mb-12 text-center leading-tight font-mono">
            <span className="text-[#9370DB]">// </span>Technical Skills
          </h2>

          <div className="skills-matrix">
            {[
              {
                name: "PHP",
                level: "Expert",
                progress: 75,
                icon: "🐘",
                className: "skill-php",
                description: "Server-side development & frameworks",
              },
              {
                name: "Java",
                level: "Advanced",
                progress: 55,
                icon: "☕",
                className: "skill-java",
                description: "Enterprise applications & Spring",
              },
              {
                name: "C++",
                level: "Proficient",
                progress: 75,
                icon: "⚡",
                className: "skill-cpp",
                description: "System programming & algorithms",
              },
              {
                name: "HTML5",
                level: "Expert",
                progress: 95,
                icon: "🌐",
                className: "skill-html",
                description: "Semantic markup & accessibility",
              },
              {
                name: "CSS3",
                level: "Expert",
                progress: 90,
                icon: "🎨",
                className: "skill-css",
                description: "Modern styling & animations",
              },
              {
                name: "SQL",
                level: "Advanced",
                progress: 88,
                icon: "🗄️",
                className: "skill-sql",
                description: "Database design & optimization",
              },
              {
                name: "UX/UI Design",
                level: "Advanced",
                progress: 82,
                icon: "✨",
                className: "skill-ux",
                description: "User experience & interface design",
              },
              {
                name: "Linux Admin",
                level: "Expert",
                progress: 92,
                icon: "🐧",
                className: "skill-linux",
                description: "System administration & scripting",
              },
            ].map((skill, index) => (
              <div
                key={skill.name}
                className={`skill-card fade-slide-up stagger-${index + 1} hover-scale-subtle`}
                style={{ "--progress-width": `${skill.progress}%` } as React.CSSProperties}
              >
                <div className="skill-header">
                  <div className={`skill-icon ${skill.className}`}>{skill.icon}</div>
                  <div>
                    <div className="skill-name font-mono">{skill.name}</div>
                    <div className="skill-level font-sans">{skill.level}</div>
                  </div>
                </div>
                <div className="text-xs text-secondary mb-3 leading-relaxed font-sans">{skill.description}</div>
                <div className="progress-container">
                  <div className="progress-bar"></div>
                </div>
              </div>
            ))}
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
            {/* Terminal Skills Module */}
            <div className="lg:col-span-2 bg-black/40 p-4 md:p-6 rounded-lg hover-glow-interactive transition-all duration-500 border border-[#333] fade-slide-up stagger-1">
              <div className="font-mono text-sm">
                <div className="flex items-center mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="ml-4 text-secondary">terminal</span>
                </div>

                <div className="space-y-3">
                  {/* Previous commands and outputs */}
                  <div className="text-[#EAEAEA]">
                    [user@arch ~]$ sudo pacman -S {language === "en" ? "skills" : "habilidades"}
                  </div>
                  <div className="text-secondary text-xs mb-2">
                    {language === "en" ? "resolving dependencies..." : "resolviendo dependencias..."}
                  </div>
                  <div className="space-y-1 mb-3 text-[#EAEAEA] text-xs leading-relaxed">
                    <div>
                      {language === "en"
                        ? "Packages (5): php java c++ html css"
                        : "Paquetes (5): php java c++ html css"}
                    </div>
                    <div>{language === "en" ? "Database (1): sql" : "Base de datos (1): sql"}</div>
                    <div>
                      {language === "en"
                        ? "Expertise (2): ux/ui-design linux-system-administration"
                        : "Experiencia (2): diseño-ux/ui administración-sistema-linux"}
                    </div>
                  </div>
                  <div className="text-secondary text-xs mb-3">
                    {language === "en" ? "Total Installed Size: 1024.00 MiB" : "Tamaño Total Instalado: 1024.00 MiB"}
                  </div>
                  <div className="text-green-400 text-xs mb-6">{t("skillsInstalled")}</div>

                  {/* Interactive terminal input */}
                  <div className="flex items-center">
                    <span className="text-[#EAEAEA]">[user@arch ~]$ </span>
                    <input
                      type="text"
                      className="bg-transparent border-none outline-none text-green-400 flex-1 ml-2 placeholder-secondary font-sans"
                      placeholder={t("skillsPlaceholder")}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const command = e.currentTarget.value.trim()
                          if (command) {
                            // Add the command to terminal history
                            const terminalDiv = e.currentTarget.closest(".space-y-3")
                            const newCommand = document.createElement("div")
                            newCommand.className = "text-[#EAEAEA] mt-3"
                            newCommand.textContent = `[user@arch ~]$ ${command}`

                            const errorMessage = document.createElement("div")
                            errorMessage.className = "text-red-400 text-xs mb-3 leading-relaxed font-sans"
                            errorMessage.innerHTML = `bash: ${command}: command not found<br/><span class="text-[#9370DB]">Error:</span> <span class="text-secondary">${t("skillsError")}</span><br/><span class="text-secondary">Email:</span> <a href="mailto:mauricio@example.com" class="text-[#9370DB] hover:glow-purple transition-all hover-glow-clickable">mauricio@example.com</a>`

                            terminalDiv?.appendChild(newCommand)
                            terminalDiv?.appendChild(errorMessage)

                            // Clear input and scroll to bottom
                            e.currentTarget.value = ""
                            terminalDiv?.scrollIntoView({ behavior: "smooth", block: "end" })
                          }
                        }
                      }}
                    />
                    <span className={`terminal-cursor text-green-400`}>_</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Linux Detail Module */}
            <div className="bg-black/20 p-6 rounded-lg transition-all duration-300 text-center border border-[#333] fade-slide-up stagger-2">
              <div className="text-sm text-[#9370DB] mb-3 font-mono">uname -a</div>
              <div className="text-xs text-secondary mb-4 leading-relaxed font-sans">Linux arch 6.6.1-zen</div>
              <div className="text-sm text-[#EAEAEA] mb-3 font-sans">Powered by Linux</div>
              <div className="text-3xl">🐧</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Separator - CLI Loading Indicator */}
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
          </div>

          {/* Enhanced Modal */}
          {selectedService !== null && (
            <div
              className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6 animate-fadeIn"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setSelectedService(null)
                }
              }}
            >
              <div className="bg-[#111111] border border-[#9370DB]/30 rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-[#9370DB]/20 animate-scaleIn">
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
      </section>

      {/* Section Separator */}
      <div className="flex justify-center py-12">
        <div className="section-separator"></div>
      </div>

      {/* Projects Section */}
      <section id="projects" className="py-12 md:py-20 section-primary">
        <div className="max-w-7xl mx-auto px-4 md:px-6 content-depth">
          <h2 className="text-2xl md:text-3xl font-bold text-[#EAEAEA] mb-8 md:mb-12 text-center leading-tight font-mono">
            {t("projectsTitle")}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {projectsData.map((project, index) => (
              <div
                key={project.id}
                className={`bg-transparent p-8 transition-all duration-300 border border-transparent hover:border-[#9370DB]/30 rounded-lg fade-slide-up stagger-${
                  index + 1
                } hover-scale-subtle`}
              >
                <h3 className="text-xl text-[#9370DB] mb-4 leading-tight font-mono">{project.title}</h3>
                <p className="text-sm text-secondary mb-6 leading-[1.7] font-sans">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-[#9370DB]/20 text-[#9370DB] text-xs rounded font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#EAEAEA] hover:text-[#9370DB] hover:glow-purple transition-all duration-300 font-mono hover-glow-clickable"
                      >
                        <span className="text-[#9370DB]">{">"}</span> Live Demo
                      </a>
                    )}
                  </div>
                  <div>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#EAEAEA] hover:text-[#9370DB] hover:glow-purple transition-all duration-300 font-mono hover-glow-clickable"
                      >
                        <span className="text-[#9370DB]">{">"}</span> GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
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
                  href="https://github.com/NegroHmd"
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
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6 animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowContactModal(false)
            }
          }}
        >
          <div className="bg-[#111111] border border-[#9370DB]/30 rounded-lg max-w-md w-full shadow-2xl shadow-[#9370DB]/20 animate-scaleIn">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-[#333]">
              <h2 className="text-xl font-bold text-[#EAEAEA] leading-tight font-mono">
                <span className="text-[#9370DB]">// </span>Get in Touch
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
