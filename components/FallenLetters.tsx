'use client'

import { useEffect, useRef, useState } from 'react'
import Matter from 'matter-js'

const LETTERS = ['A', 'R', 'T', 'S', 'Y', 'N', 'C']

export default function FallenLetters() {
    const containerRef = useRef<HTMLDivElement>(null)
    const letterRefs = useRef<(HTMLDivElement | null)[]>([])
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        if (!containerRef.current) return

        const { Engine, World, Bodies, Runner, Events, Composite } = Matter

        // 1. Setup Engine (Headless)
        const engine = Engine.create()
        const world = engine.world
        engine.gravity.y = 1 // Standard gravity

        // 2. Dimensions
        const width = containerRef.current.clientWidth
        const height = containerRef.current.clientHeight

        // 3. Create Bodies
        // We need to map bodies to our DOM elements.
        // The visual elements are sized by CSS, so we need to approximate physics body size.
        // Let's say approx 15vw width/height.
        const letterSize = Math.max(100, width / 6) // Approx size in pixels

        // Position logic: Center on mobile (<768), Left-ish on Desktop
        const isMobile = width < 768
        const spawnX = isMobile ? width / 2 : width * 0.25

        const letterBodies = LETTERS.map((_, i) => {
            return Bodies.rectangle(
                spawnX + (Math.random() * 200 - 100), // Cluster around target X
                -600 - (i * 300), // Start High Up (Fall from sky)
                letterSize * 0.6, // Hitbox width (letters are usually narrower than square)
                letterSize * 0.8, // Hitbox height
                {
                    restitution: 0.6,
                    friction: 0.1,
                    density: 1,
                    angle: (Math.random() * 0.5) - 0.25
                }
            )
        })

        // 4. Create Walls
        const wallOptions = { isStatic: true, render: { visible: false } }
        const ground = Bodies.rectangle(width / 2, height + 100, width * 2, 200, wallOptions)
        // No ceiling so letters can fall from infinitely high
        const leftWall = Bodies.rectangle(-50, height / 2, 100, height * 10, wallOptions) // Tall walls
        const rightWall = Bodies.rectangle(width + 50, height / 2, 100, height * 10, wallOptions)

        Composite.add(world, [...letterBodies, ground, leftWall, rightWall])

        // 5. Run Engine
        const runner = Runner.create()
        Runner.run(runner, engine)

        // 6. Sync Loop (Visuals)
        let animationFrameId: number
        const renderLoop = () => {
            letterBodies.forEach((body, i) => {
                const domNode = letterRefs.current[i]
                if (domNode) {
                    const { x, y } = body.position
                    const rotation = body.angle
                    // Update transform directly for performance
                    domNode.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotation}rad)`
                    domNode.style.opacity = '1' // Ensure visible once positioning starts
                }
            })
            animationFrameId = requestAnimationFrame(renderLoop)
        }
        renderLoop()

        // 7. Mouse Repulsion Logic
        const mousePosition = { x: 0, y: 0 }
        const handleMouseMove = (e: MouseEvent) => {
            const rect = containerRef.current?.getBoundingClientRect()
            if (rect) {
                mousePosition.x = e.clientX - rect.left
                mousePosition.y = e.clientY - rect.top
            }
        }

        // Add interaction logic to engine update
        Events.on(engine, 'beforeUpdate', () => {
            // Skip if mouse hasn't moved yet or is out of bounds
            if (mousePosition.x === 0 && mousePosition.y === 0) return

            letterBodies.forEach(body => {
                const dx = body.position.x - mousePosition.x
                const dy = body.position.y - mousePosition.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                const interactionRadius = 300
                if (distance < interactionRadius) {
                    const forceMagnitude = 2.5 * (1 - distance / interactionRadius)

                    Matter.Body.applyForce(body, body.position, {
                        x: (dx / distance) * forceMagnitude,
                        y: (dy / distance) * forceMagnitude
                    })
                }
            })
        })

        // Attach listeners
        containerRef.current.addEventListener('mousemove', handleMouseMove)

        // Handle Window Resize (Reset walls)
        const handleResize = () => {
            if (!containerRef.current) return
            const w = containerRef.current.clientWidth
            const h = containerRef.current.clientHeight

            Matter.Body.setPosition(ground, { x: w / 2, y: h + 100 })
            Matter.Body.setVertices(ground, Matter.Bodies.rectangle(w / 2, h + 100, w * 2, 200).vertices)

            Matter.Body.setPosition(rightWall, { x: w + 50, y: h / 2 })
            Matter.Body.setPosition(leftWall, { x: -50, y: h / 2 })
        }
        window.addEventListener('resize', handleResize)

        // Set ready to render children
        setIsReady(true)

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize)
            if (containerRef.current) {
                containerRef.current.removeEventListener('mousemove', handleMouseMove)
            }
            cancelAnimationFrame(animationFrameId)
            Runner.stop(runner)
            Engine.clear(engine)
        }
    }, [])

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden pointer-events-auto"
        >
            {LETTERS.map((char, i) => (
                <div
                    key={i}
                    ref={(el) => {
                        if (el) letterRefs.current[i] = el
                    }}
                    className="absolute top-0 left-0 flex items-center justify-center font-black text-[#1a1a1a] select-none pointer-events-none will-change-transform"
                    style={{
                        // Letters are centered at 0,0 by default in absolute, we translate them.
                        // Matter.js bodies are positioned at center of mass.
                        // So we need to offset by -50% to center the div on the coordinate.
                        width: '1px',
                        height: '1px',
                        overflow: 'visible',
                        fontSize: 'clamp(100px, 15vw, 300px)',
                        opacity: 0, // Hidden until physics starts
                        marginTop: '-0.5em', // optical centering
                        marginLeft: '-0.25em'
                    }}
                >
                    {char}
                </div>
            ))}
            {/* Background Grain/Noise */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.06),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(0,0,0,0.04),transparent_50%)] pointer-events-none" />
        </div>
    )
}
