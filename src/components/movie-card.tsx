"use client"

import { useState } from "react"
import { Play, Star, Info, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import LazyImage from "./lazy-image"

interface Movie {
    title: string
    year: string
    poster: string
    rating?: string
}

interface MovieCardProps {
    movie: Movie
    index: number
}

export default function MovieCard({ movie, index }: MovieCardProps) {
    const [isHovered, setIsHovered] = useState(false)
    const [isLiked, setIsLiked] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ y: -10 }}
        >
            <Card
                className="overflow-hidden border-0 bg-transparent shadow-none transition-all duration-300"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
                    <LazyImage
                        src={movie.poster || "/placeholder.svg"}
                        alt={movie.title}
                        fill
                        className="object-cover transition-transform duration-500"
                        style={{ transform: isHovered ? "scale(1.1)" : "scale(1)" }}
                    />

                    {/* Bamboo frame decoration */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-500/30"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-500/30"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-500/30"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-500/30"></div>
                    </div>

                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/30"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="absolute bottom-0 p-4 w-full">
                                    <div className="flex justify-between items-center mb-2">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                                <Button
                                                    size="sm"
                                                    variant="secondary"
                                                    className="h-8 w-8 rounded-full p-0 bg-green-600 hover:bg-green-700 text-white"
                                                >
                                                    <Play className="h-4 w-4" />
                                                    <span className="sr-only">Play</span>
                                                </Button>
                                            </motion.div>
                                        </motion.div>

                                        <div className="flex gap-2">
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                exit={{ scale: 0 }}
                                                transition={{ duration: 0.2, delay: 0.05 }}
                                            >
                                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="h-8 w-8 rounded-full p-0 text-white"
                                                        onClick={() => setIsLiked(!isLiked)}
                                                    >
                                                        <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                                                        <span className="sr-only">Like</span>
                                                    </Button>
                                                </motion.div>
                                            </motion.div>

                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                exit={{ scale: 0 }}
                                                transition={{ duration: 0.2, delay: 0.1 }}
                                            >
                                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="h-8 w-8 rounded-full p-0 text-white"
                                                    >
                                                        <Info className="h-4 w-4" />
                                                        <span className="sr-only">Info</span>
                                                    </Button>
                                                </motion.div>
                                            </motion.div>
                                        </div>
                                    </div>

                                    {movie.rating && (
                                        <motion.div
                                            className="flex items-center text-yellow-400 text-xs"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.2, delay: 0.15 }}
                                        >
                                            <Star className="h-3 w-3 mr-1 fill-yellow-400" />
                                            <span>{movie.rating}/10</span>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <CardContent className="p-2">
                    <h3 className="font-medium line-clamp-1">{movie.title}</h3>
                    <p className="text-xs text-muted-foreground">{movie.year}</p>

                    {/* Animated underline on hover */}
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                className="h-0.5 bg-green-600 mt-1"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                exit={{ scaleX: 0 }}
                                transition={{ duration: 0.3 }}
                                style={{ originX: 0 }}
                            />
                        )}
                    </AnimatePresence>
                </CardContent>
            </Card>
        </motion.div>
    )
}