"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface LoginPandaProps {
    isPasswordFocused: boolean
    activeInputId: string | null
}

export default function LoginPanda({ isPasswordFocused, activeInputId }: LoginPandaProps) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 })
    const pandaRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (activeInputId && activeInputId !== "password") return

            if (pandaRef.current) {
                const rect = pandaRef.current.getBoundingClientRect()
                const x = (e.clientX - rect.left - rect.width / 2) / 15
                const y = (e.clientY - rect.top - rect.height / 2) / 15

                // Limit eye movement range
                const limitedX = Math.max(-3, Math.min(3, x))
                const limitedY = Math.max(-2, Math.min(2, y))

                setMousePosition({ x: limitedX, y: limitedY })
            }
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [activeInputId])

    useEffect(() => {
        if (activeInputId === "email") {
            const interval = setInterval(() => {
                const randomX = Math.random() * 2 - 1
                setEyePosition({ x: randomX, y: 0 })
            }, 500)

            return () => clearInterval(interval)
        } else {
            setEyePosition(mousePosition)
        }
    }, [activeInputId, mousePosition])

    return (
        <div ref={pandaRef} className="relative w-48 h-48 mx-auto">
            {/* Window frame */}
            <div className="absolute inset-0 rounded-2xl border-8 border-green-700 bg-green-50 overflow-hidden shadow-lg">
                {/* Window frame details */}
                <div className="absolute top-0 left-0 w-full h-6 bg-green-700"></div>
                <div className="absolute top-6 left-0 w-full border-b-4 border-green-700"></div>

                {/* Window decorations */}
                <div className="absolute top-1 right-2 flex space-x-1">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>

                {/* Bamboo decoration */}
                <div className="absolute bottom-0 left-0 w-full">
                    <svg width="100%" height="20" viewBox="0 0 200 20" preserveAspectRatio="none">
                        <path d="M0,20 C50,10 150,30 200,20" stroke="#15803d" strokeWidth="2" fill="none" />
                        <path d="M0,15 C50,25 150,5 200,15" stroke="#15803d" strokeWidth="2" fill="none" />
                    </svg>
                </div>
            </div>

            {/* Panda face */}
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 w-full h-full"
                style={{ padding: "12px" }}
            >
                {/* Panda head */}
                <circle cx="50" cy="50" r="40" fill="white" stroke="black" strokeWidth="2" />

                {/* Ears */}
                <circle cx="22" cy="22" r="12" fill="black" />
                <circle cx="78" cy="22" r="12" fill="black" />

                {/* Eye sockets */}
                <circle cx="35" cy="42" r="10" fill="#DDDDDD" />
                <circle cx="65" cy="42" r="10" fill="#DDDDDD" />

                {/* Eyes */}
                <motion.g animate={{ opacity: isPasswordFocused ? 0 : 1 }} transition={{ duration: 0.2 }}>
                    <motion.circle
                        cx={35 + (activeInputId ? eyePosition.x : mousePosition.x)}
                        cy={42 + (activeInputId ? eyePosition.y : mousePosition.y)}
                        r="6"
                        fill="black"
                    />
                    <motion.circle
                        cx={65 + (activeInputId ? eyePosition.x : mousePosition.x)}
                        cy={42 + (activeInputId ? eyePosition.y : mousePosition.y)}
                        r="6"
                        fill="black"
                    />
                </motion.g>

                {/* Eye shine */}
                <motion.g animate={{ opacity: isPasswordFocused ? 0 : 1 }} transition={{ duration: 0.2 }}>
                    <motion.circle
                        cx={37 + (activeInputId ? eyePosition.x : mousePosition.x)}
                        cy={40 + (activeInputId ? eyePosition.y : mousePosition.y)}
                        r="2"
                        fill="white"
                    />
                    <motion.circle
                        cx={67 + (activeInputId ? eyePosition.x : mousePosition.x)}
                        cy={40 + (activeInputId ? eyePosition.y : mousePosition.y)}
                        r="2"
                        fill="white"
                    />
                </motion.g>

                {/* Blindfold */}
                <motion.g
                    initial={{ y: -20, opacity: 0 }}
                    animate={{
                        y: isPasswordFocused ? 0 : -20,
                        opacity: isPasswordFocused ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <rect x="22" y="38" width="56" height="12" rx="6" fill="#15803d" />
                    <path d="M22 44 L12 36" stroke="#15803d" strokeWidth="3" />
                    <path d="M78 44 L88 36" stroke="#15803d" strokeWidth="3" />
                </motion.g>

                {/* Closed eyes (when blindfolded) */}
                <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isPasswordFocused ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <path d="M31 45 C35 42, 39 42, 43 45" stroke="black" strokeWidth="2" fill="none" />
                    <path d="M57 45 C61 42, 65 42, 69 45" stroke="black" strokeWidth="2" fill="none" />
                </motion.g>

                {/* Nose */}
                <circle cx="50" cy="55" r="5" fill="black" />

                {/* Mouth */}
                <motion.path
                    d="M40 65 C45 70, 55 70, 60 65"
                    stroke="black"
                    strokeWidth="2"
                    fill="none"
                    animate={{
                        d: isPasswordFocused
                            ? "M40 65 C45 72, 55 72, 60 65"
                            : activeInputId
                                ? "M40 62 C45 67, 55 67, 60 62"
                                : "M40 65 C45 70, 55 70, 60 65",
                    }}
                    transition={{ duration: 0.3 }}
                />

                {/* Cheeks */}
                <motion.g
                    animate={{
                        scale: isPasswordFocused ? 1.1 : 1,
                        y: isPasswordFocused ? 2 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <circle cx="30" cy="58" r="6" fill="#FFAAAA" fillOpacity="0.6" />
                    <circle cx="70" cy="58" r="6" fill="#FFAAAA" fillOpacity="0.6" />
                </motion.g>

                {/* Paws when typing in email */}
                <motion.g
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                        opacity: activeInputId === "email" ? 1 : 0,
                        y: activeInputId === "email" ? 0 : 20,
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <circle cx="30" cy="85" r="8" fill="black" />
                    <circle cx="70" cy="85" r="8" fill="black" />
                    <motion.circle
                        cx="30"
                        cy="85"
                        r="6"
                        fill="#FFAAAA"
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                    />
                    <motion.circle
                        cx="70"
                        cy="85"
                        r="6"
                        fill="#FFAAAA"
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 0.25 }}
                    />
                </motion.g>
            </svg>

            {/* Speech bubble when password field is focused */}
            <motion.div
                className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-lg shadow-md text-xs"
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{
                    opacity: isPasswordFocused ? 1 : 0,
                    scale: isPasswordFocused ? 1 : 0.8,
                    y: isPasswordFocused ? 0 : 10,
                }}
                transition={{ duration: 0.2 }}
            >
                I can&apos;t see your password!
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white"></div>
            </motion.div>

            {/* Speech bubble when typing in email */}
            <motion.div
                className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-lg shadow-md text-xs"
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{
                    opacity: activeInputId === "email" ? 1 : 0,
                    scale: activeInputId === "email" ? 1 : 0.8,
                    y: activeInputId === "email" ? 0 : 10,
                }}
                transition={{ duration: 0.2 }}
            >
                Type your email please!
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white"></div>
            </motion.div>
        </div>
    )
}

