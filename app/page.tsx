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

// Arch Linux SVG Logo Component
const ArchLogo = () => (
  <svg width="24" height="24" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M32 2C32 2 20 20 20 32C20 44 32 62 32 62C32 62 44 44 44 32C44 20 32 2 32 2Z"
      fill="currentColor"
      opacity="0.8"
    />
    <path
      d="M32 8C32 8 24 22 24 32C24 42 32 56 32 56C32 56 40 42 40 32C40 22 32 8 32 8Z"
      fill="currentColor"
      opacity="0.6"
    />
    <path
      d="M32 14C32 14 28 24 28 32C28 40 32 50 32 50C32 50 36 40 36 32C36 24 32 14 32 14Z"
      fill="currentColor"
      opacity="0.4"
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

          {/* Arch Linux Logo */}
          <div className="arch-logo">
            <ArchLogo />
            <span className="text-xs font-mono text-[#9370DB] hidden sm:inline">arch</span>
          </div>
        </div>
      </nav>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 section-primary">
        <div className="max-w-7xl mx-auto px-4 md:px-6 content-depth">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-min">
            {/* Hero Module */}
            <div className="lg:col-span-2 bg-transparent p-6 md:p-8 fade-slide-up stagger-1">
              <h1 className="text-4xl md:text-5xl font-medium text-[#EAEAEA] mb-4 leading-tight font-mono">
                {t("heroTitle")}
              </h1>
              <h2 className="text-xl md:text-2xl text-secondary mb-8 leading-relaxed font-mono">{t("heroSubtitle")}</h2>
              <p className="text-base md:text-lg text-secondary leading-[1.7] font-sans max-w-2xl">
                <span className="text-[#9370DB]">// </span>
                {t("heroDescription")}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <button
                  onClick={handleDownloadCV}
                  disabled={isDownloading}
                  className="flex-1 sm:flex-none px-8 py-4 border border-[#9370DB]/40 text-[#EAEAEA] font-mono text-sm rounded-lg hover:border-[#9370DB] hover:bg-[#9370DB]/10 hover:glow-purple transition-all duration-300 min-w-[200px] flex items-center justify-center hover-glow-clickable"
                >
                  {downloadText}
                </button>
                <button
                  onClick={() => setShowContactModal(true)}
                  className="flex-1 sm:flex-none px-8 py-4 border border-[#9370DB]/40 text-[#EAEAEA] font-mono text-sm rounded-lg hover:border-[#9370DB] hover:bg-[#9370DB]/10 hover:glow-purple transition-all duration-300 min-w-[200px] hover-glow-clickable"
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

      {/* Enhanced Technical Skills Section */}
      <section id="skills-matrix" className="py-20 md:py-32 section-secondary">
        <div className="max-w-7xl mx-auto px-4 md:px-6 content-depth">
          <div className="text-center mb-16 fade-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-[#EAEAEA] mb-4 leading-tight font-mono">
              <span className="text-[#9370DB]">// </span>Technical Skills
            </h2>
            <p className="text-lg text-secondary font-sans max-w-2xl mx-auto">
              A comprehensive overview of my technical expertise and proficiency levels
            </p>
          </div>

          <div className="skills-showcase fade-slide-up stagger-1">
            <div className="skills-grid">
              {[
                {
                  name: "PHP",
                  level: "Expert",
                  progress: 95,
                  icon: (
                    <svg viewBox="0 0 24 24" className="skill-icon" fill="#777bb4">
                      <path d="M7.01 10.207h-.944l-.515 2.648h.838c.556 0 .982-.122 1.292-.391.313-.27.47-.663.47-1.178 0-.353-.093-.621-.276-.804-.183-.183-.463-.275-.865-.275zm12.583-4.157c.473 0 .825.108 1.056.324.23.216.345.531.345.945 0 .47-.158.858-.473 1.167-.315.308-.744.462-1.287.462h-.29l.342-1.76h-.463l-.515 2.648h.838c.556 0 .982-.122 1.292-.391.313-.27.47-.663.47-1.178 0-.353-.093-.621-.276-.804-.183-.183-.463-.275-.865-.275h-.944l-.515 2.648h.838c.556 0 .982-.122 1.292-.391.313-.27.47-.663.47-1.178 0-.353-.093-.621-.276-.804-.183-.183-.463-.275-.865-.275h-.944l-.515 2.648h.838c.556 0 .982-.122 1.292-.391.313-.27.47-.663.47-1.178 0-.353-.093-.621-.276-.804-.183-.183-.463-.275-.865-.275z" />
                    </svg>
                  ),
                  className: "skill-php",
                  description: "Server-side development, Laravel, Symfony",
                },
                {
                  name: "Java",
                  level: "Advanced",
                  progress: 85,
                  icon: (
                    <svg viewBox="0 0 24 24" className="skill-icon" fill="#ed8b00">
                      <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218" />
                    </svg>
                  ),
                  className: "skill-java",
                  description: "Enterprise applications, Spring Boot",
                },
                {
                  name: "C++",
                  level: "Proficient",
                  progress: 75,
                  icon: (
                    <svg viewBox="0 0 24 24" className="skill-icon" fill="#00599c">
                      <path d="M22.394 6c-.167-.29-.398-.543-.652-.69L12.926.22c-.509-.294-1.34-.294-1.848 0L2.26 5.31c-.508.293-.923 1.013-.923 1.6v10.18c0 .294.104.62.271.91.167.29.398.543.652.69l8.816 5.09c.508.293 1.34.293 1.848 0l8.816-5.09c.254-.147.485-.4.652-.69.167-.29.27-.616.27-.91V6.91c.003-.294-.1-.62-.268-.91zM12 19.11c-3.92 0-7.109-3.19-7.109-7.11 0-3.92 3.19-7.11 7.109-7.11a7.133 7.133 0 016.156 3.553l-3.076 1.78a3.567 3.567 0 00-3.08-1.78A3.56 3.56 0 008.444 12 3.56 3.56 0 0012 15.555a3.57 3.57 0 003.08-1.778l3.078 1.78A7.135 7.135 0 0112 19.11zm7.11-6.715h-.79V11.61h-.79v.785h-.79v.79h.79v.785h.79v-.785h.79v-.79zm2.962 0h-.79V11.61h-.79v.785h-.79v.79h.79v.785h.79v-.785h.79v-.79z" />
                    </svg>
                  ),
                  className: "skill-cpp",
                  description: "System programming, algorithms",
                },
                {
                  name: "HTML5",
                  level: "Expert",
                  progress: 95,
                  icon: (
                    <svg viewBox="0 0 24 24" className="skill-icon" fill="#e34f26">
                      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
                    </svg>
                  ),
                  className: "skill-html",
                  description: "Semantic markup, accessibility",
                },
                {
                  name: "CSS3",
                  level: "Expert",
                  progress: 90,
                  icon: (
                    <svg viewBox="0 0 24 24" className="skill-icon" fill="#1572b6">
                      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z" />
                    </svg>
                  ),
                  className: "skill-css",
                  description: "Modern styling, animations, Tailwind",
                },
                {
                  name: "SQL",
                  level: "Advanced",
                  progress: 88,
                  icon: (
                    <svg viewBox="0 0 24 24" className="skill-icon" fill="#336791">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 16.568C16.327 17.81 14.39 18.5 12 18.5s-4.327-.69-5.568-1.932C5.19 15.327 4.5 13.39 4.5 11s.69-4.327 1.932-5.568C7.673 4.19 9.61 3.5 12 3.5s4.327.69 5.568 1.932C18.81 6.673 19.5 8.61 19.5 11s-.69 4.327-1.932 5.568z" />
                    </svg>
                  ),
                  className: "skill-sql",
                  description: "Database design, optimization, PostgreSQL",
                },
                {
                  name: "UX/UI Design",
                  level: "Advanced",
                  progress: 82,
                  icon: (
                    <svg viewBox="0 0 24 24" className="skill-icon" fill="#ff6b6b">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ),
                  className: "skill-ux",
                  description: "User experience, interface design, Figma",
                },
                {
                  name: "Linux Admin",
                  level: "Expert",
                  progress: 92,
                  icon: (
                    <svg viewBox="0 0 24 24" className="skill-icon" fill="#fcc624">
                      <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 01-.088.069c-.104.105-.259.158-.436.158-.177 0-.33-.053-.435-.158a.698.698 0 01-.096-.069.956.956 0 01-.213-.335 1.69 1.69 0 01-.148-.706l-.004.024a.086.086 0 01-.004.021v-.105c0 .02.006.04.006.06.008-.265.061-.465.166-.724.107-.201.248-.398.438-.533.188-.136.37-.198.584-.198z" />
                    </svg>
                  ),
                  className: "skill-linux",
                  description: "System administration, Docker, scripting",
                },
              ].map((skill, index) => (
                <div
                  key={skill.name}
                  className={`skill-item ${skill.className} fade-slide-up stagger-${index + 2}`}
                  style={{ "--progress-width": `${skill.progress}%` } as React.CSSProperties}
                >
                  <div className="skill-header">
                    <div className="skill-icon-wrapper">{skill.icon}</div>
                    <div className="skill-info">
                      <div className="skill-name">{skill.name}</div>
                      <div className="skill-level">{skill.level}</div>
                    </div>
                  </div>
                  <div className="text-sm text-secondary mb-4 leading-relaxed font-sans">{skill.description}</div>
                  <div className="skill-progress">
                    <div className="progress-label">
                      <span className="progress-text">Proficiency</span>
                      <span className="progress-percentage">{skill.progress}%</span>
                    </div>
                    <div className="progress-container">
                      <div className="progress-bar"></div>
                    </div>
                  </div>
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
