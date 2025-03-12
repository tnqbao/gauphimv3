"use client"

import { motion } from "framer-motion"

export default function PandaLoadingIndicator() {
    return (
        <div className="absolute inset-0 bg-black flex items-center justify-center z-20 pointer-events-none">
            <div className="relative w-24 h-24">
                <motion.div
                    className="w-full h-full rounded-full bg-white"
                    animate={{ scale: [0.9, 1, 0.9] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute top-0 left-0 w-8 h-8 -translate-x-1/4 -translate-y-1/4 bg-black rounded-full"
                    animate={{ rotate: [-5, 5, -5] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute top-0 right-0 w-8 h-8 translate-x-1/4 -translate-y-1/4 bg-black rounded-full"
                    animate={{ rotate: [5, -5, 5] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />
                <div className="absolute top-1/3 left-1/3 w-3 h-3 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full" />
                <div className="absolute top-1/3 right-1/3 w-3 h-3 translate-x-1/2 -translate-y-1/2 bg-black rounded-full" />
                <div className="absolute top-1/2 left-1/2 w-4 h-3 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full" />
                <div className="absolute bottom-1/3 left-1/2 w-6 h-2 -translate-x-1/2 translate-y-1/2 bg-transparent border-b-2 border-black rounded-full" />
            </div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white">Đang tải...</div>
        </div>
    )
}

