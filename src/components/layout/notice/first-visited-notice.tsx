"use client"

import { useEffect, useState } from "react"
import PandaLogo from "@/components/content/panda-logo"
import { motion, AnimatePresence } from "framer-motion"

export function FirstVisitNotice() {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            const hasVisited = localStorage.getItem("hasVisited")
            if (!hasVisited) {
                setOpen(true)
            }
        }, 500)

        return () => clearTimeout(timer)
    }, [])

    const handleClose = () => {
        setOpen(false)
        localStorage.setItem("hasVisited", "true")
    }

    if (!open) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={handleClose}>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className="max-w-md border-2 border-green-600/20 dark:border-green-500/20 bg-white dark:bg-gray-800 shadow-lg relative overflow-hidden rounded-lg p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="absolute -right-16 -top-16 w-32 h-32 bg-green-100/30 dark:bg-green-500/20 rounded-full" />
                        <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-green-100/30 dark:bg-green-500/20 rounded-full" />

                        <div className="flex justify-center mb-4">
                            <PandaLogo className="w-16 h-16 text-black dark:text-white" />
                        </div>

                        <div className="text-center mb-4">
                            <h2 className="text-xl font-bold text-green-700 dark:text-green-400">Thông báo từ PandaFlix</h2>
                        </div>

                        <div className="my-4 space-y-3 text-center relative z-10">
                            <p className="text-gray-800 dark:text-gray-100 font-medium">
                                Gấu đang xử lý lại một số bộ phim dính quảng cáo khi tải phim về.
                            </p>
                            <p className="text-gray-700 dark:text-gray-100 font-medium">
                                Bạn có thể tua qua các đoạn quảng cáo đó để xem phim tiếp nhen, xin lỗi mọi người về sự bất tiện này 🐼
                            </p>
                        </div>

                        <div className="flex justify-center mt-6">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleClose}
                                className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-full font-medium"
                            >
                                OK, Đã hiểu!
                            </motion.button>
                        </div>

                        {/* Bamboo decoration */}
                        <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-24 bg-green-600/40 dark:bg-green-500/40 rounded-full">
                            <div className="absolute top-1/4 w-full h-0.5 bg-green-600/50 dark:bg-green-500/50" />
                            <div className="absolute top-2/4 w-full h-0.5 bg-green-600/50 dark:bg-green-500/50" />
                            <div className="absolute top-3/4 w-full h-0.5 bg-green-600/50 dark:bg-green-500/50" />
                        </div>

                        <div className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-24 bg-green-600/40 dark:bg-green-500/40 rounded-full">
                            <div className="absolute top-1/4 w-full h-0.5 bg-green-600/50 dark:bg-green-500/50" />
                            <div className="absolute top-2/4 w-full h-0.5 bg-green-600/50 dark:bg-green-500/50" />
                            <div className="absolute top-3/4 w-full h-0.5 bg-green-600/50 dark:bg-green-500/50" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
