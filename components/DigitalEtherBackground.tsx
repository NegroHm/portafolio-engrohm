"use client"

import { useEffect, useRef, useCallback } from "react"

interface EtherNode {
  x: number
  y: number
  element: HTMLDivElement
  isPulsing: boolean
  pulseTimeout?: NodeJS.Timeout
  baseOpacity: number
}

interface EtherConnection {
  from: EtherNode
  to: EtherNode
  element: HTMLDivElement
  timeout: NodeJS.Timeout
}

export default function DigitalEtherBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const nodesRef = useRef<EtherNode[]>([])
  const connectionsRef = useRef<EtherConnection[]>([])
  const animationFrameRef = useRef<number>()
  const scrollYRef = useRef(0)
  const parallaxLayer1Ref = useRef<HTMLDivElement>(null)
  const parallaxLayer2Ref = useRef<HTMLDivElement>(null)

  const createEtherField = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    // Clear existing nodes
    nodesRef.current.forEach((node) => {
      if (node.pulseTimeout) clearTimeout(node.pulseTimeout)
      node.element.remove()
    })
    nodesRef.current = []

    // Create a more organic, less grid-like distribution
    const density = 0.8 // nodes per 10000 pixels
    const viewportArea = window.innerWidth * window.innerHeight
    const nodeCount = Math.floor((viewportArea / 10000) * density)

    // Create two layers for parallax depth
    const layer1 = parallaxLayer1Ref.current
    const layer2 = parallaxLayer2Ref.current

    for (let i = 0; i < nodeCount; i++) {
      const x = Math.random() * (window.innerWidth + 200) - 100
      const y = Math.random() * (window.innerHeight * 1.5) // Extend beyond viewport

      const nodeElement = document.createElement("div")
      nodeElement.className = "ether-node"
      nodeElement.style.left = `${x}px`
      nodeElement.style.top = `${y}px`

      // Randomly assign to layers for depth
      const targetLayer = Math.random() > 0.6 ? layer2 : layer1
      targetLayer?.appendChild(nodeElement)

      const baseOpacity = Math.random() * 0.3 + 0.1 // 0.1 to 0.4
      nodeElement.style.opacity = baseOpacity.toString()

      const node: EtherNode = {
        x,
        y,
        element: nodeElement,
        isPulsing: false,
        baseOpacity,
      }

      nodesRef.current.push(node)

      // Schedule ethereal pulsing
      const scheduleEtherealPulse = () => {
        const delay = Math.random() * 25000 + 10000 // 10-35 seconds
        node.pulseTimeout = setTimeout(() => {
          if (!node.isPulsing && Math.random() < 0.2) {
            // 20% chance to pulse
            node.isPulsing = true
            node.element.classList.add("pulsing")

            setTimeout(() => {
              node.isPulsing = false
              node.element.classList.remove("pulsing")
              scheduleEtherealPulse()
            }, 4000) // 4 second pulse duration
          } else {
            scheduleEtherealPulse()
          }
        }, delay)
      }

      scheduleEtherealPulse()
    }
  }, [])

  const createEtherealConnection = useCallback(() => {
    if (nodesRef.current.length < 2) return

    const node1 = nodesRef.current[Math.floor(Math.random() * nodesRef.current.length)]
    const nearbyNodes = nodesRef.current.filter((node) => {
      const distance = Math.sqrt(Math.pow(node.x - node1.x, 2) + Math.pow(node.y - node1.y, 2))
      return distance > 0 && distance < 150 // Shorter connections for subtlety
    })

    if (nearbyNodes.length === 0) return

    const node2 = nearbyNodes[Math.floor(Math.random() * nearbyNodes.length)]

    const lineElement = document.createElement("div")
    lineElement.className = "ether-connection"

    const distance = Math.sqrt(Math.pow(node2.x - node1.x, 2) + Math.pow(node2.y - node1.y, 2))
    const angle = Math.atan2(node2.y - node1.y, node2.x - node1.x) * (180 / Math.PI)

    lineElement.style.left = `${node1.x}px`
    lineElement.style.top = `${node1.y}px`
    lineElement.style.width = `${distance}px`
    lineElement.style.transform = `rotate(${angle}deg)`

    // Randomly assign to layers
    const targetLayer = Math.random() > 0.5 ? parallaxLayer2Ref.current : parallaxLayer1Ref.current
    targetLayer?.appendChild(lineElement)

    const connection: EtherConnection = {
      from: node1,
      to: node2,
      element: lineElement,
      timeout: setTimeout(() => {
        lineElement.remove()
        const index = connectionsRef.current.indexOf(connection)
        if (index > -1) {
          connectionsRef.current.splice(index, 1)
        }
      }, 6000),
    }

    connectionsRef.current.push(connection)
  }, [])

  const scheduleEtherealConnections = useCallback(() => {
    const delay = Math.random() * 12000 + 8000 // 8-20 seconds
    setTimeout(() => {
      if (Math.random() < 0.3) {
        // 30% chance to create connection
        createEtherealConnection()
      }
      scheduleEtherealConnections()
    }, delay)
  }, [createEtherealConnection])

  const handleScroll = useCallback(() => {
    scrollYRef.current = window.scrollY
  }, [])

  const updateParallax = useCallback(() => {
    const layer1 = parallaxLayer1Ref.current
    const layer2 = parallaxLayer2Ref.current

    if (layer1) {
      layer1.style.transform = `translateY(${scrollYRef.current * 0.05}px)`
    }
    if (layer2) {
      layer2.style.transform = `translateY(${scrollYRef.current * 0.08}px)`
    }

    animationFrameRef.current = requestAnimationFrame(updateParallax)
  }, [])

  useEffect(() => {
    // Only run on desktop
    if (typeof window === "undefined" || window.innerWidth < 768) {
      return
    }

    createEtherField()
    scheduleEtherealConnections()
    window.addEventListener("scroll", handleScroll, { passive: true })
    updateParallax()

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        createEtherField()
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
  }, [createEtherField, scheduleEtherealConnections, handleScroll, updateParallax])

  // Don't render on mobile
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null
  }

  return (
    <div ref={containerRef} className="digital-ether-background">
      <div ref={parallaxLayer1Ref} className="parallax-layer-1 absolute inset-0" />
      <div ref={parallaxLayer2Ref} className="parallax-layer-2 absolute inset-0" />
    </div>
  )
}
