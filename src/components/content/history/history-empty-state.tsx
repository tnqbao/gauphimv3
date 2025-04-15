"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function HistoryEmptyState() {
    return (
        <motion.div
            className="flex flex-col items-center justify-center py-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="relative w-32 h-32 mb-6">
                <motion.div
                    className="absolute inset-0"
                    animate={{
                        rotate: [0, 10, 0, -10, 0],
                        y: [0, -5, 0, -5, 0],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                    }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full text-gray-300 dark:text-gray-600">
                        <circle cx="50" cy="50" r="40" fill="currentColor" />
                        <circle cx="35" cy="40" r="6" fill="black" />
                        <circle cx="65" cy="40" r="6" fill="black" />
                        <path d="M 40 60 Q 50 70 60 60" stroke="black" strokeWidth="3" fill="none" />
                    </svg>
                </motion.div>
            </div>
            <h3 className="text-xl font-bold mb-2">Chưa có lịch sử xem phim</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
                Bạn chưa xem phim nào. Hãy khám phá các bộ phim mới và thú vị trên PandaFlix!
            </p>
            <Link href="/">
                <Button className="bg-green-600 hover:bg-green-700">Khám phá phim ngay</Button>
            </Link>
        </motion.div>
    )
}
