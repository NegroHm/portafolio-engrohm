"use client"

import { useState, useEffect } from "react"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about")
  const [showCursor, setShowCursor] = useState(true)
  const [typedText, setTypedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [visibleSections, setVisibleSections] = useState(new Set())

  const terminalText = `[user@arch ~]$ sudo pacman -S skills
resolving dependencies...
Packages (5): php java c++ html css
Database (1): sql
Expertise (2): ux/ui-design linux-system-administration
Total Installed Size: 1024.00 MiB
:: Proceed with installation? [Y/n] `

  useEffect(() => {
    // Cursor blinking
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 1000)

    // Intersection Observer for sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.3 },
    )

    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => observer.observe(section))

    return () => {
      clearInterval(cursorInterval)
      observer.disconnect()
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const navItems = [
    { id: "about", label: "// About" },
    { id: "skills", label: "// Skills" },
    { id: "services", label: "// Services" },
    { id: "projects", label: "// Projects" },
    { id: "contact", label: "// Contact" },
  ]

  return (
    <div className="min-h-screen bg-[#111111] text-[#EAEAEA] font-mono">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-[#111111]/95 backdrop-blur-sm border-b border-[#9370DB]/20">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm transition-all duration-300 hover:text-[#9370DB] hover:glow-purple ${
                  activeSection === item.id ? "text-[#9370DB] glow-purple" : "text-[#EAEAEA]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4">
        {/* About Section */}
        <section id="about" className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min">
            {/* Hero Module */}
            <div className="md:col-span-2 bg-transparent p-6 hover-glow transition-all duration-300">
              <h1 className="text-2xl font-medium text-[#EAEAEA] mb-2">Mauricio Medina</h1>
              <h2 className="text-lg text-[#888888] mb-4">Developer & Project Manager</h2>
              <p className="text-base text-[#888888] leading-relaxed">
                <span className="text-[#9370DB]">// </span>
                Building robust systems with a focus on Linux environments and process automation. Passionate about
                clean code and efficient project execution.
              </p>
            </div>

            {/* Profile Picture Module */}
            <div className="flex justify-center items-start p-6 hover-glow transition-all duration-300">
              <div className="w-32 h-32 rounded-full overflow-hidden hover:ring-2 hover:ring-[#9370DB] hover:shadow-lg hover:shadow-[#9370DB]/50 transition-all duration-300">
                <img
                  src="/placeholder.svg?height=128&width=128&text=MM"
                  alt="Mauricio Medina"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Status Module */}
            <div className="bg-transparent p-6 hover-glow transition-all duration-300">
              <div className="text-sm text-[#9370DB] mb-3">// Current Status</div>
              <div className="text-base text-[#EAEAEA] mb-2">Available for Projects</div>
              <div className="text-sm text-[#888888] mb-3">Remote • Full-time • Contract</div>
              <div className="flex items-center text-sm">
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></span>
                <span className="text-[#888888]">Online</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="flex justify-center py-8">
          <div className="w-64 h-px bg-gradient-to-r from-transparent via-[#9370DB] to-transparent"></div>
        </div>

        {/* Skills Section */}
        <section id="skills" className="py-16">
          <h2 className="text-2xl font-bold text-[#EAEAEA] mb-8 text-center">Skills & Expertise</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Terminal Skills Module */}
            <div className="md:col-span-2 bg-black/40 p-4 rounded-lg hover-glow transition-all duration-300 border border-[#333]">
              <div className="font-mono text-sm">
                <div className="flex items-center mb-3">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="ml-4 text-[#888888]">terminal</span>
                </div>
                <div className="text-green-400 whitespace-pre-wrap">
                  {typedText}
                  <span className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}>_</span>
                </div>
              </div>
            </div>

            {/* Linux Detail Module */}
            <div className="bg-black/20 p-4 rounded-lg hover-glow transition-all duration-300 text-center border border-[#333]">
              <div className="text-sm text-[#9370DB] mb-2">uname -a</div>
              <div className="text-xs text-[#888888] mb-3">Linux arch 6.6.1-zen</div>
              <div className="text-sm text-[#EAEAEA] mb-2">Powered by Linux</div>
              <div className="text-2xl">🐧</div>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="flex justify-center py-8">
          <div className="flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-[#9370DB] rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Services Section */}
        <section id="services" className="py-16">
          <h2 className="text-2xl font-bold text-[#EAEAEA] mb-8 text-center">Services & Solutions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-transparent p-6 hover-glow transition-all duration-300 border border-transparent hover:border-[#9370DB]/30 rounded-lg">
              <h3 className="text-lg text-[#9370DB] mb-3">Custom Web Development</h3>
              <p className="text-sm text-[#888888] mb-4">
                Building scalable web applications from scratch using modern technologies and best practices.
              </p>
              <div className="text-xs text-[#EAEAEA]">
                <span className="text-[#9370DB]">{">"}</span> Full-stack development
                <br />
                <span className="text-[#9370DB]">{">"}</span> API design & integration
              </div>
            </div>

            <div className="bg-transparent p-6 hover-glow transition-all duration-300 border border-transparent hover:border-[#9370DB]/30 rounded-lg">
              <h3 className="text-lg text-[#9370DB] mb-3">WordPress Solutions</h3>
              <p className="text-sm text-[#888888] mb-4">
                Advanced WordPress development, custom themes, plugins, and performance optimization.
              </p>
              <div className="text-xs text-[#EAEAEA]">
                <span className="text-[#9370DB]">{">"}</span> Custom theme development
                <br />
                <span className="text-[#9370DB]">{">"}</span> Performance optimization
              </div>
            </div>

            <div className="bg-transparent p-6 hover-glow transition-all duration-300 border border-transparent hover:border-[#9370DB]/30 rounded-lg">
              <h3 className="text-lg text-[#9370DB] mb-3">Process Automation</h3>
              <p className="text-sm text-[#888888] mb-4">
                Designing custom systems to automate workflows and reduce manual tasks.
              </p>
              <div className="text-xs text-[#EAEAEA]">
                <span className="text-[#9370DB]">{">"}</span> n8n workflow automation
                <br />
                <span className="text-[#9370DB]">{">"}</span> System integration
              </div>
            </div>

            <div className="bg-transparent p-6 hover-glow transition-all duration-300 border border-transparent hover:border-[#9370DB]/30 rounded-lg">
              <h3 className="text-lg text-[#9370DB] mb-3">System Enhancement</h3>
              <p className="text-sm text-[#888888] mb-4">
                Modernizing and improving existing systems with better performance and functionality.
              </p>
              <div className="text-xs text-[#EAEAEA]">
                <span className="text-[#9370DB]">{">"}</span> Legacy system upgrades
                <br />
                <span className="text-[#9370DB]">{">"}</span> Performance tuning
              </div>
            </div>

            <div className="bg-transparent p-6 hover-glow transition-all duration-300 border border-transparent hover:border-[#9370DB]/30 rounded-lg">
              <h3 className="text-lg text-[#9370DB] mb-3">Online Catalogs</h3>
              <p className="text-sm text-[#888888] mb-4">
                Creating dynamic, user-friendly product catalogs for e-commerce and business applications.
              </p>
              <div className="text-xs text-[#EAEAEA]">
                <span className="text-[#9370DB]">{">"}</span> Interactive interfaces
                <br />
                <span className="text-[#9370DB]">{">"}</span> Search & filtering
              </div>
            </div>

            <div className="bg-transparent p-6 hover-glow transition-all duration-300 border border-transparent hover:border-[#9370DB]/30 rounded-lg">
              <h3 className="text-lg text-[#9370DB] mb-3">Linux Administration</h3>
              <p className="text-sm text-[#888888] mb-4">
                Expert Linux server management, shell scripting, and system administration.
              </p>
              <div className="text-xs text-[#EAEAEA]">
                <span className="text-[#9370DB]">{">"}</span> Server configuration
                <br />
                <span className="text-[#9370DB]">{">"}</span> Security hardening
              </div>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="flex justify-center py-8">
          <div className="w-64 h-px bg-gradient-to-r from-transparent via-[#9370DB] to-transparent"></div>
        </div>

        {/* Projects Section */}
        <section id="projects" className="py-16">
          <h2 className="text-2xl font-bold text-[#EAEAEA] mb-8 text-center">Featured Projects</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-transparent p-6 hover-glow transition-all duration-300 border border-transparent hover:border-[#9370DB]/30 rounded-lg">
              <h3 className="text-xl text-[#9370DB] mb-3">E-Commerce Platform</h3>
              <p className="text-sm text-[#888888] mb-4 leading-relaxed">
                Built a scalable e-commerce solution with custom PHP backend and optimized database architecture,
                handling 10k+ daily transactions.
              </p>
              <div className="bg-black/40 p-3 rounded text-xs text-green-400 font-mono mb-4">
                $ sudo deploy --platform=custom --tech=php,mysql
                <br />
                <span className="text-[#888888]">✓ Deployment successful</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-[#9370DB]/20 text-[#9370DB] text-xs rounded">PHP</span>
                <span className="px-2 py-1 bg-[#9370DB]/20 text-[#9370DB] text-xs rounded">MySQL</span>
                <span className="px-2 py-1 bg-[#9370DB]/20 text-[#9370DB] text-xs rounded">Linux</span>
              </div>
            </div>

            <div className="bg-transparent p-6 hover-glow transition-all duration-300 border border-transparent hover:border-[#9370DB]/30 rounded-lg">
              <h3 className="text-xl text-[#9370DB] mb-3">Automation System</h3>
              <p className="text-sm text-[#888888] mb-4 leading-relaxed">
                Developed comprehensive automation workflows using n8n, reducing manual tasks by 80% and improving
                operational efficiency.
              </p>
              <div className="bg-black/40 p-3 rounded text-xs text-green-400 font-mono mb-4">
                $ ./automate --workflow=business --tool=n8n
                <br />
                <span className="text-[#888888]">✓ 15 workflows activated</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-[#9370DB]/20 text-[#9370DB] text-xs rounded">n8n</span>
                <span className="px-2 py-1 bg-[#9370DB]/20 text-[#9370DB] text-xs rounded">API Integration</span>
                <span className="px-2 py-1 bg-[#9370DB]/20 text-[#9370DB] text-xs rounded">Automation</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="flex justify-center py-8">
          <div className="flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-8 bg-[#9370DB] animate-pulse"
                style={{ animationDelay: `${i * 0.3}s` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <section id="contact" className="py-16">
          <h2 className="text-2xl font-bold text-[#EAEAEA] mb-8 text-center">Get In Touch</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-black/40 p-6 rounded-lg hover-glow transition-all duration-300 border border-[#333]">
              <div className="font-mono text-sm">
                <div className="text-[#EAEAEA] mb-3">[user@arch ~]$ contact --info</div>
                <div className="space-y-2 text-[#888888]">
                  <div>
                    Email:{" "}
                    <a href="mailto:mauricio@example.com" className="text-[#9370DB] hover:glow-purple transition-all">
                      mauricio@example.com
                    </a>
                  </div>
                  <div>Location: Remote</div>
                  <div>Timezone: Available globally</div>
                  <div className="text-green-400 mt-3">Status: Available for new projects</div>
                </div>
              </div>
            </div>

            <div className="bg-transparent p-6 hover-glow transition-all duration-300">
              <div className="text-sm text-[#9370DB] mb-4">// Social Links</div>
              <div className="space-y-3">
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
        <footer className="py-8 text-center border-t border-[#333] mt-16">
          <div className="text-xs text-[#888888]">
            © 2024 Mauricio Medina • Built with passion for clean code
            <div className="mt-2 opacity-20">🐧</div>
          </div>
        </footer>
      </div>
    </div>
  )
}
