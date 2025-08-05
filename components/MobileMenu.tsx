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
    // Prevent body scroll when menu is open
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
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
      {/* Hamburger Icon */}
      <button className="md:hidden z-[1001] relative" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
        <div className={`hamburger-icon ${isOpen ? "open" : ""}`}>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </div>
      </button>

      {/* Overlay */}
      <div className={`mobile-menu-overlay ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(false)} />

      {/* Menu Panel */}
      <div className={`mobile-menu-panel ${isOpen ? "open" : ""}`}>
        {/* Navigation Links */}
        <nav className="flex-1 flex flex-col justify-center space-y-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSectionClick(item.id)}
              className={`text-left text-lg transition-all duration-300 hover:text-[#9370DB] hover:glow-purple relative ${
                activeSection === item.id ? "text-[#9370DB] glow-purple" : "text-[#EAEAEA]"
              }`}
            >
              {activeSection === item.id && (
                <span className="absolute -left-4 top-1/2 transform -translate-y-1/2 text-[#9370DB] text-sm">•</span>
              )}
              {item.label}
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
