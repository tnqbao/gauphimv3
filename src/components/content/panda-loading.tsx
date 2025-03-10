"use client"

import { motion } from "framer-motion"

export default function PandaLoading() {
    return (
        <div className="flex items-center justify-center p-8 h-full w-full min-h-[200px]">
            <div className="relative w-24 h-24">
                {/* Panda face */}
                <motion.div
                    className="absolute inset-0 bg-white dark:bg-gray-800 rounded-full border-2 border-black dark:border-white"
                    animate={{ scale: [0.9, 1, 0.9] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />

                {/* Ears */}
                <motion.div
                    className="absolute top-0 left-0 w-8 h-8 -translate-x-1/4 -translate-y-1/4 bg-black dark:bg-gray-900 rounded-full"
                    animate={{ rotate: [-5, 5, -5] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute top-0 right-0 w-8 h-8 translate-x-1/4 -translate-y-1/4 bg-black dark:bg-gray-900 rounded-full"
                    animate={{ rotate: [5, -5, 5] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />

                {/* Eyes */}
                <motion.div
                    className="absolute top-1/3 left-1/3 w-3 h-3 -translate-x-1/2 -translate-y-1/2 bg-black dark:bg-white rounded-full"
                    animate={{ scaleY: [1, 0.1, 1] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, times: [0, 0.1, 1], delay: 1 }}
                />
                <motion.div
                    className="absolute top-1/3 right-1/3 w-3 h-3 translate-x-1/2 -translate-y-1/2 bg-black dark:bg-white rounded-full"
                    animate={{ scaleY: [1, 0.1, 1] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, times: [0, 0.1, 1], delay: 1 }}
                />

                {/* Nose */}
                <div className="absolute top-1/2 left-1/2 w-4 h-3 -translate-x-1/2 -translate-y-1/2 bg-black dark:bg-gray-900 rounded-full" />

                {/* Mouth */}
                <motion.div
                    className="absolute bottom-1/3 left-1/2 w-6 h-2 -translate-x-1/2 translate-y-1/2 bg-transparent border-b-2 border-black dark:border-white rounded-full"
                    animate={{ scaleX: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />

                {/* Loading text */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-medium">Loading...</div>

                {/* Bamboo decoration */}
                <motion.div
                    className="absolute -left-8 top-1/2 -translate-y-1/2 w-4 h-16 bg-green-600/20 rounded-full"
                    animate={{ height: [64, 56, 64] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                    <div className="absolute top-1/4 w-full h-0.5 bg-green-600/30" />
                    <div className="absolute top-2/4 w-full h-0.5 bg-green-600/30" />
                    <div className="absolute top-3/4 w-full h-0.5 bg-green-600/30" />
                </motion.div>

                <motion.div
                    className="absolute -right-8 top-1/2 -translate-y-1/2 w-4 h-16 bg-green-600/20 rounded-full"
                    animate={{ height: [56, 64, 56] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                    <div className="absolute top-1/4 w-full h-0.5 bg-green-600/30" />
                    <div className="absolute top-2/4 w-full h-0.5 bg-green-600/30" />
                    <div className="absolute top-3/4 w-full h-0.5 bg-green-600/30" />
                </motion.div>
            </div>
        </div>
    )
}

