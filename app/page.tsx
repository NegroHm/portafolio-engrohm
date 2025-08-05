"use client"

import { useState, useEffect, useRef } from "react"

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
  navContact: { en: "// Contact", es: "// Contacto" },

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
    en: "Contacta con Mauricio Medina para poder solucionarlo",
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

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about")
  const [showCursor, setShowCursor] = useState(true)
  const [typedText, setTypedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [visibleSections, setVisibleSections] = useState(new Set())
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const [language, setLanguage] = useState<"en" | "es">("en")
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
    { id: "skills", label: t("navSkills") },
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
      image: "/placeholder.svg?height=300&width=400&text=Web+Development+Project",
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
    if (visibleSections.has("skills") && !isTyping) {
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const switchLanguage = (newLang: "en" | "es") => {
    setLanguage(newLang)
  }

  return (
    <div className="min-h-screen bg-[#111111] text-[#EAEAEA] font-mono">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-[#111111]/95 backdrop-blur-sm border-b border-[#9370DB]/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-10">
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

            {/* Language Switcher */}
            <div className="flex items-center space-x-1 text-sm">
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
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6">
        {/* About Section */}
        <section id="about" className="py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min">
            {/* Hero Module */}
            <div className="md:col-span-2 bg-transparent p-8 fade-slide-up stagger-1">
              <h1 className="text-3xl font-medium text-[#EAEAEA] mb-3 leading-tight">{t("heroTitle")}</h1>
              <h2 className="text-xl text-secondary mb-6 leading-relaxed">{t("heroSubtitle")}</h2>
              <p className="text-base text-secondary leading-[1.7]">
                <span className="text-[#9370DB]">// </span>
                {t("heroDescription")}
              </p>
            </div>

            {/* Profile Picture Module */}
            <div className="flex justify-center items-start p-8 fade-slide-up stagger-2">
              <div className="w-36 h-36 rounded-full overflow-hidden hover:ring-2 hover:ring-[#9370DB] hover:shadow-lg hover:shadow-[#9370DB]/50 transition-all duration-500">
                <img
                  src="/placeholder.svg?height=144&width=144&text=MM"
                  alt="Mauricio Medina"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Status Module */}
            <div className="bg-transparent p-8 fade-slide-up stagger-3">
              <div className="text-sm text-[#9370DB] mb-4">{t("statusTitle")}</div>
              <div className="text-base text-[#EAEAEA] mb-3 leading-relaxed">{t("statusAvailable")}</div>
              <div className="text-sm text-secondary mb-4 leading-relaxed">{t("statusLocation")}</div>
              <div className="flex items-center text-sm">
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></span>
                <span className="text-secondary">{t("statusOnline")}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="flex justify-center py-12">
          <div className="w-64 h-px bg-gradient-to-r from-transparent via-[#9370DB] to-transparent"></div>
        </div>

        {/* Skills Section */}
        <section id="skills" className="py-20">
          <h2 className="text-3xl font-bold text-[#EAEAEA] mb-12 text-center leading-tight">{t("skillsTitle")}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Terminal Skills Module */}
            <div className="md:col-span-2 bg-black/40 p-6 rounded-lg hover-glow-interactive transition-all duration-500 border border-[#333] fade-slide-up stagger-1">
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
                      className="bg-transparent border-none outline-none text-green-400 flex-1 ml-2 placeholder-secondary"
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
                            errorMessage.className = "text-red-400 text-xs mb-3 leading-relaxed"
                            errorMessage.innerHTML = `bash: ${command}: command not found<br/><span class="text-[#9370DB]">Error:</span> <span class="text-secondary">${t("skillsError")}</span><br/><span class="text-secondary">Email:</span> <a href="mailto:mauricio@example.com" class="text-[#9370DB] hover:glow-purple transition-all">mauricio@example.com</a>`

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
              <div className="text-sm text-[#9370DB] mb-3">uname -a</div>
              <div className="text-xs text-secondary mb-4 leading-relaxed">Linux arch 6.6.1-zen</div>
              <div className="text-sm text-[#EAEAEA] mb-3">Powered by Linux</div>
              <div className="text-3xl">🐧</div>
            </div>
          </div>
        </section>

        {/* Section Separator - CLI Loading Indicator */}
        <div className="flex justify-center py-12">
          <div className="bg-black/40 p-6 rounded-lg border border-[#333] font-mono text-sm max-w-md w-full">
            <div className="text-[#EAEAEA] mb-3">[user@arch ~]$ sudo pacman -Syu portfolio-data</div>
            <div className="text-secondary text-xs mb-4">:: Synchronizing package databases...</div>

            <div className="space-y-3">
              <div className="text-green-400 text-xs">downloading portfolio-data-2024.tar.xz...</div>
              <div className="flex items-center space-x-3 text-xs">
                <span className="text-[#EAEAEA]">[████████████░░░░░░░░] 65%</span>
                <span className="text-secondary">2.1 MiB/3.2 MiB</span>
              </div>

              <div className="text-green-400 text-xs">extracting portfolio-data...</div>
              <div className="flex items-center space-x-3 text-xs">
                <span className="text-[#EAEAEA]">[██████████████████░░] 90%</span>
                <span className="text-secondary">installing...</span>
              </div>
            </div>

            <div className="mt-4 text-green-400 text-xs">✓ portfolio-data successfully installed</div>
          </div>
        </div>

        {/* Services Section */}
        <section id="services" className="py-20">
          <h2 className="text-3xl font-bold text-[#EAEAEA] mb-12 text-center leading-tight">{t("servicesTitle")}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((service, index) => (
              <div
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`bg-transparent p-8 hover-glow-interactive transition-all duration-500 border border-transparent hover:border-[#9370DB]/30 rounded-lg cursor-pointer active:scale-95 fade-slide-up stagger-${index + 1}`}
              >
                <h3 className="text-lg text-[#9370DB] mb-4 leading-tight">{service.title}</h3>
                <p className="text-sm text-secondary mb-6 leading-[1.7]">{service.shortDescription}</p>
                <div className="text-xs text-[#EAEAEA]">
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
                  <h2 className="text-2xl font-bold text-[#EAEAEA] leading-tight">
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
                      <p className="text-sm text-[#EAEAEA] leading-[1.7]">
                        {servicesData[selectedService].expandedDescription}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg text-[#9370DB] mb-4 font-mono">{t("modalFeatures")}</h3>
                      <div className="space-y-2">
                        {servicesData[selectedService].features.map((feature, index) => (
                          <div key={index} className="text-sm text-[#EAEAEA] leading-relaxed">
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
                      <p className="text-xs text-secondary mb-4 leading-relaxed">{t("modalContact")}</p>
                      <button
                        onClick={() => {
                          setSelectedService(null)
                          scrollToSection("contact")
                        }}
                        className="bg-[#9370DB] hover:bg-[#9370DB]/80 text-white px-6 py-3 rounded text-sm font-mono transition-all duration-300 hover:shadow-lg hover:shadow-[#9370DB]/30"
                      >
                        {t("modalContactBtn")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Section Separator */}
        <div className="flex justify-center py-12">
          <div className="w-64 h-px bg-gradient-to-r from-transparent via-[#9370DB] to-transparent"></div>
        </div>

        {/* Projects Section */}
        <section id="projects" className="py-20">
          <h2 className="text-3xl font-bold text-[#EAEAEA] mb-12 text-center leading-tight">{t("projectsTitle")}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-transparent p-8 transition-all duration-300 border border-transparent hover:border-[#9370DB]/30 rounded-lg fade-slide-up stagger-1">
              <h3 className="text-xl text-[#9370DB] mb-4 leading-tight">{t("ecommerceTitle")}</h3>
              <p className="text-sm text-secondary mb-6 leading-[1.7]">{t("ecommerceDesc")}</p>
              <div className="bg-black/40 p-4 rounded text-xs text-green-400 font-mono mb-6 leading-relaxed">
                $ sudo deploy --platform=custom --tech=php,mysql
                <br />
                <span className="text-secondary">✓ Deployment successful</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-[#9370DB]/20 text-[#9370DB] text-xs rounded">PHP</span>
                <span className="px-3 py-1 bg-[#9370DB]/20 text-[#9370DB] text-xs rounded">MySQL</span>
                <span className="px-3 py-1 bg-[#9370DB]/20 text-[#9370DB] text-xs rounded">Linux</span>
              </div>
            </div>

            <div className="bg-transparent p-8 transition-all duration-300 border border-transparent hover:border-[#9370DB]/30 rounded-lg fade-slide-up stagger-2">
              <h3 className="text-xl text-[#9370DB] mb-4 leading-tight">{t("automationProjectTitle")}</h3>
              <p className="text-sm text-secondary mb-6 leading-[1.7]">{t("automationProjectDesc")}</p>
              <div className="bg-black/40 p-4 rounded text-xs text-green-400 font-mono mb-6 leading-relaxed">
                $ ./automate --workflow=business --tool=n8n
                <br />
                <span className="text-secondary">✓ 15 workflows activated</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-[#9370DB]/20 text-[#9370DB] text-xs rounded">n8n</span>
                <span className="px-3 py-1 bg-[#9370DB]/20 text-[#9370DB] text-xs rounded">API Integration</span>
                <span className="px-3 py-1 bg-[#9370DB]/20 text-[#9370DB] text-xs rounded">Automation</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="flex justify-center py-12">
          <div className="flex space-x-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-10 bg-[#9370DB] animate-pulse rounded-full"
                style={{ animationDelay: `${i * 0.3}s` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <h2 className="text-3xl font-bold text-[#EAEAEA] mb-12 text-center leading-tight">{t("contactTitle")}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-black/40 p-8 rounded-lg transition-all duration-300 border border-[#333] fade-slide-up stagger-1">
              <div className="font-mono text-sm">
                <div className="text-[#EAEAEA] mb-4">[user@arch ~]$ contact --info</div>
                <div className="space-y-3 text-secondary leading-relaxed">
                  <div>
                    Email:{" "}
                    <a href="mailto:mauricio@example.com" className="text-[#9370DB] hover:glow-purple transition-all">
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
              <div className="text-sm text-[#9370DB] mb-6">{t("socialLinks")}</div>
              <div className="space-y-4">
                <a
                  href="https://linkedin.com"
                  className="block text-[#EAEAEA] hover:text-[#9370DB] hover:glow-purple transition-all duration-300"
                >
                  <span className="text-[#9370DB]">{">"}</span> LinkedIn
                </a>
                <a
                  href="https://github.com"
                  className="block text-[#EAEAEA] hover:text-[#9370DB] hover:glow-purple transition-all duration-300"
                >
                  <span className="text-[#9370DB]">{">"}</span> GitHub
                </a>
                <a
                  href="https://twitter.com"
                  className="block text-[#EAEAEA] hover:text-[#9370DB] hover:glow-purple transition-all duration-300"
                >
                  <span className="text-[#9370DB]">{">"}</span> X (Twitter)
                </a>
                <a
                  href="https://youtube.com"
                  className="block text-[#EAEAEA] hover:text-[#9370DB] hover:glow-purple transition-all duration-300"
                >
                  <span className="text-[#9370DB]">{">"}</span> YouTube
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 text-center border-t border-[#333] mt-20">
          <div className="text-xs text-secondary leading-relaxed">
            {t("footerCopyright")}
            <div className="mt-3 opacity-20">🐧</div>
          </div>
        </footer>
      </div>
    </div>
  )
}
