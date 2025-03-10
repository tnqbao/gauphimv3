"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

// Bamboo leaf SVG
const BambooLeaf = ({ className = "", ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} {...props}>
        <path
            d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"
            fill="currentColor"
        />
        <path
            d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 10c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"
            fill="currentColor"
        />
    </svg>
)

interface Leaf {
    id: number
    x: number
    y: number
    size: number
    rotation: number
    duration: number
    delay: number
}

export default function FloatingLeaves() {
    const [leaves, setLeaves] = useState<Leaf[]>([])

    useEffect(() => {
        // Generate random leaves
        const newLeaves = Array.from({ length: 15 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: -20 - Math.random() * 20,
            size: 10 + Math.random() * 20,
            rotation: Math.random() * 360,
            duration: 15 + Math.random() * 20,
            delay: Math.random() * 10,
        }))

        setLeaves(newLeaves)

        // Regenerate leaves periodically
        const interval = setInterval(() => {
            setLeaves((prev) => {
                const newLeaf = {
                    id: Date.now(),
                    x: Math.random() * 100,
                    y: -20,
                    size: 10 + Math.random() * 20,
                    rotation: Math.random() * 360,
                    duration: 15 + Math.random() * 20,
                    delay: 0,
                }

                // Remove one old leaf and add a new one
                return [...prev.slice(1), newLeaf]
            })
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
            {leaves.map((leaf) => (
                <motion.div
                    key={leaf.id}
                    className="absolute"
                    style={{
                        left: `${leaf.x}%`,
                        top: `${leaf.y}%`,
                    }}
                    animate={{
                        y: ["0%", "120%"],
                        x: [`${leaf.x}%`, `${leaf.x + (Math.random() * 20 - 10)}%`],
                        rotate: [leaf.rotation, leaf.rotation + (Math.random() > 0.5 ? 360 : -360)],
                    }}
                    transition={{
                        duration: leaf.duration,
                        delay: leaf.delay,
                        ease: "linear",
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                        times: [0, 1],
                    }}
                >
                    <BambooLeaf
                        className={`text-green-600/20 w-${Math.round(leaf.size / 4)} h-${Math.round(leaf.size / 4)}`}
                        style={{ width: leaf.size, height: leaf.size }}
                    />
                </motion.div>
            ))}
        </div>
    )
}

