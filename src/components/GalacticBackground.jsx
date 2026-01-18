// Import React hooks:
// - useRef: stores mutable values that persist across renders
// - useEffect: runs side effects after the component mounts
import { useEffect, useRef } from 'react'

export default function GalacticBackground() {

  // Reference to the <canvas> DOM element
  // This lets us draw directly using the Canvas API
  const canvasRef = useRef(null)

  // Holds an array of star objects
  // We use useRef so the array persists without triggering re-renders
  const stars = useRef([])

  // Stores the current speed of the stars
  // Controlled by scroll position
  const speedRef = useRef(0)

  useEffect(() => {
    // Get the canvas element from the ref
    const canvas = canvasRef.current

    // Get the 2D drawing context (Canvas API)
    const ctx = canvas.getContext('2d')

    // Function to resize the canvas to match the viewport
    // IMPORTANT: canvas pixels must match screen size or it will blur/stretch
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Initial resize on mount
    resize()

    // Recalculate canvas size when the window resizes
    window.addEventListener('resize', resize)

    // Number of stars in the starfield
    // More stars = denser space, but higher cost
    const STAR_COUNT = 800

    // Depth of the virtual 3D space
    // Larger = stars take longer to reach the camera
    const DEPTH = 1000

    // Create the initial star field
    // Each star has an (x, y, z) position in 3D space
    stars.current = Array.from({ length: STAR_COUNT }, () => ({
      // x and y are centered around (0, 0)
      // Think of this as a coordinate system centered on the camera
      x: (Math.random() - 0.5) * canvas.width,
      y: (Math.random() - 0.5) * canvas.height,

      // z is depth: how far the star is from the camera
      // Larger z = farther away
      z: Math.random() * DEPTH,
    }))

    // Main animation loop (runs ~60 times per second)
    const animate = () => {

      // Clear the entire canvas by painting it black
      // This is effectively "clearing the frame"
      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Read the current speed (set by scroll)
      const speed = speedRef.current

      // Loop over every star
      for (const star of stars.current) {

        // Move the star closer to the camera
        // Lower z = closer
        star.z -= speed

        // If the star has passed the camera...
        if (star.z <= 0) {

          // ...send it back to the far distance
          star.z = DEPTH

          // Give it a new random position
          // This creates the illusion of infinite stars
          star.x = (Math.random() - 0.5) * canvas.width
          star.y = (Math.random() - 0.5) * canvas.height
        }

        // Perspective projection:
        // Objects appear larger when closer (small z)
        const scale = DEPTH / star.z

        // Convert 3D coordinates to 2D screen coordinates
        // Center of screen is the camera origin
        const x = star.x * scale + canvas.width / 2
        const y = star.y * scale + canvas.height / 2

        // Star size increases as it approaches the camera
        const size = scale * 1.2

        // Draw the star as a white square
        ctx.fillStyle = 'white'
        ctx.fillRect(x, y, size, size)
      }

      // Schedule the next frame
      requestAnimationFrame(animate)
    }

    // Start the animation loop
    animate()

    // Scroll handler
    const onScroll = () => {
      // Convert scroll distance into speed
      // Higher scroll = faster hyperspace
      // Clamp to prevent insane speeds
      speedRef.current = Math.min(20, window.scrollY * 0.02)
    }

    // Listen for scroll events
    window.addEventListener('scroll', onScroll)

    // Cleanup when component unmounts
    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
    }

  }, []) // Empty dependency array = run once on mount

  // Render only a canvas
  // It's fixed, full-screen, and behind all content
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
    />
  )
}
