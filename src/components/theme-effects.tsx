"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

export default function ThemeEffects() {
    const { theme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [showEffect, setShowEffect] = useState(false)
    const [prevTheme, setPrevTheme] = useState<string | undefined>(undefined)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (mounted && prevTheme !== undefined && prevTheme !== theme) {
            setShowEffect(true)
            const timer = setTimeout(() => {
                setShowEffect(false)
            }, 1500)
            return () => clearTimeout(timer)
        }
        setPrevTheme(theme)
    }, [theme, mounted, prevTheme])

    if (!mounted || !showEffect) return null

    const isDark = theme === "dark"

    return (
        <AnimatePresence>
            <motion.div
                key={theme}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, times: [0, 0.5, 1] }}
                    className={`w-40 h-40 rounded-full ${isDark ? "bg-gray-900" : "bg-white"} flex items-center justify-center`}
                >
                    <svg width="100" height="100" viewBox="0 0 100 100" className={isDark ? "text-white" : "text-black"}>
                        {/* Panda face */}
                        <circle cx="50" cy="50" r="40" fill={isDark ? "black" : "white"} stroke="currentColor" strokeWidth="2" />

                        {/* Ears */}
                        <circle cx="22" cy="22" r="12" fill={isDark ? "white" : "black"} />
                        <circle cx="78" cy="22" r="12" fill={isDark ? "white" : "black"} />

                        {/* Eyes */}
                        <motion.circle
                            cx="35"
                            cy="42"
                            r="6"
                            fill={isDark ? "white" : "black"}
                            animate={{ scaleY: [1, 0.1, 1] }}
                            transition={{ duration: 0.5, times: [0, 0.5, 1], delay: 0.3 }}
                        />
                        <motion.circle
                            cx="65"
                            cy="42"
                            r="6"
                            fill={isDark ? "white" : "black"}
                            animate={{ scaleY: [1, 0.1, 1] }}
                            transition={{ duration: 0.5, times: [0, 0.5, 1], delay: 0.3 }}
                        />

                        {/* Nose */}
                        <circle cx="50" cy="55" r="5" fill={isDark ? "white" : "black"} />

                        {/* Mouth */}
                        <motion.path
                            d="M40 65 C45 70, 55 70, 60 65"
                            stroke={isDark ? "white" : "black"}
                            strokeWidth="2"
                            fill="none"
                            animate={{
                                d: ["M40 65 C45 70, 55 70, 60 65", "M40 62 C45 67, 55 67, 60 62", "M40 65 C45 70, 55 70, 60 65"],
                            }}
                            transition={{ duration: 1, times: [0, 0.5, 1], delay: 0.3 }}
                        />
                    </svg>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

