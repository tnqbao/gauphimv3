"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"

export default function MobileSearch() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 bg-white dark:bg-gray-900 p-4 flex flex-col"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-medium">Search Movies</h2>
                            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                                <X className="h-5 w-5" />
                                <span className="sr-only">Close</span>
                            </Button>
                        </div>

                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search movies, actors, genres..."
                                className="pl-10 py-6 text-lg"
                                autoFocus
                            />
                        </div>

                        <div className="mt-6">
                            <h3 className="text-sm font-medium text-muted-foreground mb-2">Popular Searches</h3>
                            <div className="flex flex-wrap gap-2">
                                {["Action", "Comedy", "Panda Movies", "New Releases", "Top Rated"].map((term) => (
                                    <Button
                                        key={term}
                                        variant="outline"
                                        size="sm"
                                        className="rounded-full"
                                        onClick={() => {
                                            // Handle search
                                        }}
                                    >
                                        {term}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

