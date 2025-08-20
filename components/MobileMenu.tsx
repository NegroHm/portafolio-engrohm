"use client"

import { useState, useEffect } from "react"

interface MobileMenuProps {
  navItems: Array<{ id: string; label: string }>
  activeSection: string
  language: "en" | "es"
  onSectionClick: (sectionId: string) => void
  onLanguageSwitch: (lang: "en" | "es") => void
}

export default function MobileMenu({
  navItems,
  activeSection,
  language,
  onSectionClick,
  onLanguageSwitch,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Enhanced scroll locking for mobile menu with improved mobile handling
    if (isOpen) {
      // Store current scroll position
      const scrollY = window.scrollY

      // Apply scroll lock styles with better mobile support
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = "0"
      document.body.style.right = "0"
      document.body.style.overflow = "hidden"
      document.body.style.width = "100%"
      document.body.style.height = "100%"

      // Store scroll position for restoration
      document.body.setAttribute("data-scroll-lock", scrollY.toString())
    } else {
      // Restore scroll position and remove lock
      const scrollY = document.body.getAttribute("data-scroll-lock")

      // Remove scroll lock styles
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.left = ""
      document.body.style.right = ""
      document.body.style.overflow = ""
      document.body.style.width = ""
      document.body.style.height = ""

      // Restore scroll position smoothly
      if (scrollY) {
        requestAnimationFrame(() => {
          window.scrollTo(0, Number.parseInt(scrollY))
          document.body.removeAttribute("data-scroll-lock")
        })
      }
    }

    return () => {
      // Cleanup on unmount
      const scrollY = document.body.getAttribute("data-scroll-lock")
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.left = ""
      document.body.style.right = ""
      document.body.style.overflow = ""
      document.body.style.width = ""
      document.body.style.height = ""

      if (scrollY) {
        window.scrollTo(0, Number.parseInt(scrollY))
        document.body.removeAttribute("data-scroll-lock")
      }
    }
  }, [isOpen])

  // Close menu when clicking outside or pressing escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen])

  const handleSectionClick = (sectionId: string) => {
    onSectionClick(sectionId)
    setIsOpen(false)
  }

  const handleLanguageSwitch = (lang: "en" | "es") => {
    onLanguageSwitch(lang)
    setIsOpen(false)
  }

  return (
    <>
      {/* Enhanced Hamburger Icon with better touch target */}
      <button 
        className="md:hidden z-[1001] relative p-2 rounded-lg hover:bg-[#9370DB]/10 transition-all duration-300" 
        onClick={() => setIsOpen(!isOpen)} 
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-menu"
        type="button"
      >
        <div className={`hamburger-icon ${isOpen ? "open" : ""}`}>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </div>
      </button>

      {/* Overlay */}
      <div className={`mobile-menu-overlay md:hidden ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(false)} />

      {/* Enhanced Menu Panel */}
      <div 
        id="mobile-navigation-menu"
        className={`mobile-menu-panel block md:!hidden ${isOpen ? "open" : ""}`}
        role="dialog"
        aria-modal={isOpen}
        aria-hidden={!isOpen}
      >
        {/* Navigation Links */}
        <nav 
          className="flex-1 flex flex-col justify-center space-y-8" 
          role="navigation"
          aria-label="Mobile navigation"
        >
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleSectionClick(item.id)}
              className={`text-left text-lg transition-all duration-300 hover:text-[#9370DB] hover:glow-purple relative font-mono touch-manipulation ${
                activeSection === item.id ? "text-[#9370DB] glow-purple" : "text-[#EAEAEA]"
              }`}
              style={{ 
                animationDelay: isOpen ? `${(index + 1) * 0.05}s` : '0s' 
              }}
              aria-current={activeSection === item.id ? "page" : undefined}
            >
              {activeSection === item.id && (
                <span 
                  className="absolute -left-4 top-1/2 transform -translate-y-1/2 text-[#9370DB] text-sm animate-pulse"
                  aria-hidden="true"
                >
                  •
                </span>
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Language Switcher */}
        <div className="border-t border-[#333] pt-6 mt-6">
          <div className="flex items-center justify-center space-x-2 text-base">
            <button
              onClick={() => handleLanguageSwitch("es")}
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
              onClick={() => handleLanguageSwitch("en")}
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
    </>
  )
}
