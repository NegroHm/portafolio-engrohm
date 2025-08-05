"use client"

import { useEffect, useRef } from "react"

interface Node {
  x: number
  y: number
  element: HTMLDivElement
  isPulsing: boolean
  pulseTimeout?: NodeJS.Timeout
}

interface Connection {
  from: Node
  to: Node
  element: HTMLDivElement
  timeout: NodeJS.Timeout
}

export default function ConstellationBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const nodesRef = useRef<Node[]>([])
  const connectionsRef = useRef<Connection[]>([])
  const animationFrameRef = useRef<number>()
  const scrollYRef = useRef(0)

  useEffect(() => {
    // Only run on desktop
    if (typeof window === "undefined" || window.innerWidth < 768) {
      return
    }

    const container = containerRef.current
    if (!container) return

    // Create node grid
    const createNodes = () => {
      const gridSpacing = 120
      const cols = Math.ceil(window.innerWidth / gridSpacing) + 2
      const rows = Math.ceil(window.innerHeight / gridSpacing) + 2

      // Clear existing nodes
      nodesRef.current.forEach((node) => {
        if (node.pulseTimeout) clearTimeout(node.pulseTimeout)
        node.element.remove()
      })
      nodesRef.current = []

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * gridSpacing + (Math.random() - 0.5) * 40
          const y = row * gridSpacing + (Math.random() - 0.5) * 40

          const nodeElement = document.createElement("div")
          nodeElement.className = "constellation-node"
          nodeElement.style.left = `${x}px`
          nodeElement.style.top = `${y}px`

          container.appendChild(nodeElement)

          const node: Node = {
            x,
            y,
            element: nodeElement,
            isPulsing: false,
          }

          nodesRef.current.push(node)

          // Schedule random pulsing
          const schedulePulse = () => {
            const delay = Math.random() * 15000 + 5000 // 5-20 seconds
            node.pulseTimeout = setTimeout(() => {
              if (!node.isPulsing && Math.random() < 0.3) {
                // 30% chance to pulse
                node.isPulsing = true
                node.element.classList.add("pulsing")

                setTimeout(() => {
                  node.isPulsing = false
                  node.element.classList.remove("pulsing")
                  schedulePulse()
                }, 3000)
              } else {
                schedulePulse()
              }
            }, delay)
          }

          schedulePulse()
        }
      }
    }

    // Create ephemeral connections
    const createConnection = () => {
      if (nodesRef.current.length < 2) return

      const node1 = nodesRef.current[Math.floor(Math.random() * nodesRef.current.length)]
      const nearbyNodes = nodesRef.current.filter((node) => {
        const distance = Math.sqrt(Math.pow(node.x - node1.x, 2) + Math.pow(node.y - node1.y, 2))
        return distance > 0 && distance < 200
      })

      if (nearbyNodes.length === 0) return

      const node2 = nearbyNodes[Math.floor(Math.random() * nearbyNodes.length)]

      const lineElement = document.createElement("div")
      lineElement.className = "constellation-line"

      const distance = Math.sqrt(Math.pow(node2.x - node1.x, 2) + Math.pow(node2.y - node1.y, 2))
      const angle = Math.atan2(node2.y - node1.y, node2.x - node1.x) * (180 / Math.PI)

      lineElement.style.left = `${node1.x}px`
      lineElement.style.top = `${node1.y}px`
      lineElement.style.width = `${distance}px`
      lineElement.style.transform = `rotate(${angle}deg)`

      container.appendChild(lineElement)

      const connection: Connection = {
        from: node1,
        to: node2,
        element: lineElement,
        timeout: setTimeout(() => {
          lineElement.remove()
          const index = connectionsRef.current.indexOf(connection)
          if (index > -1) {
            connectionsRef.current.splice(index, 1)
          }
        }, 4000),
      }

      connectionsRef.current.push(connection)
    }

    // Schedule random connections
    const scheduleConnections = () => {
      const delay = Math.random() * 8000 + 3000 // 3-11 seconds
      setTimeout(() => {
        if (Math.random() < 0.4) {
          // 40% chance to create connection
          createConnection()
        }
        scheduleConnections()
      }, delay)
    }

    // Parallax scroll effect
    const handleScroll = () => {
      scrollYRef.current = window.scrollY
    }

    const updateParallax = () => {
      if (container) {
        container.style.transform = `translateY(${scrollYRef.current * 0.1}px)`
      }
      animationFrameRef.current = requestAnimationFrame(updateParallax)
    }

    // Initialize
    createNodes()
    scheduleConnections()
    window.addEventListener("scroll", handleScroll, { passive: true })
    updateParallax()

    // Handle resize
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        createNodes()
      }
    }
    window.addEventListener("resize", handleResize)

    return () => {
      // Cleanup
      nodesRef.current.forEach((node) => {
        if (node.pulseTimeout) clearTimeout(node.pulseTimeout)
      })
      connectionsRef.current.forEach((connection) => {
        clearTimeout(connection.timeout)
      })
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Don't render on mobile
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null
  }

  return <div ref={containerRef} className="constellation-background" />
}
