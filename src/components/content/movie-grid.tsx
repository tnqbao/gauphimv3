"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import MovieCard from "./movie-card"
import { Button } from "@/components/ui/button"
import { Grid3X3, List } from "lucide-react"

interface Movie {
    title: string
    year: string
    poster: string
    rating?: string
}

interface MovieGridProps {
    movies: Movie[]
    title?: string
}

export default function MovieGrid({ movies, title }: MovieGridProps) {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

    return (
        <div className="py-6">
            {title && (
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <div className="flex items-center gap-2">
                        <Button
                            variant={viewMode === "grid" ? "default" : "outline"}
                            size="icon"
                            className="h-8 w-8 rounded-md"
                            onClick={() => setViewMode("grid")}
                        >
                            <Grid3X3 className="h-4 w-4" />
                            <span className="sr-only">Chế độ lưới</span>
                        </Button>
                        <Button
                            variant={viewMode === "list" ? "default" : "outline"}
                            size="icon"
                            className="h-8 w-8 rounded-md"
                            onClick={() => setViewMode("list")}
                        >
                            <List className="h-4 w-4" />
                            <span className="sr-only">Chế độ danh sách</span>
                        </Button>
                    </div>
                </div>
            )}

            {viewMode === "grid" ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
                >
                    {movies.map((movie, index) => (
                        <div key={movie.title}>
                            <MovieCard movie={movie} index={index} />
                        </div>
                    ))}
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                >
                    {movies.map((movie, index) => (
                        <motion.div
                            key={movie.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="flex gap-4 p-3 rounded-lg hover:bg-muted transition-all"
                        >
                            <div className="relative w-[100px] h-[150px] flex-shrink-0 overflow-hidden rounded-md">
                                <img
                                    src={movie.poster || "/placeholder.svg"}
                                    alt={movie.title}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="flex flex-col justify-center">
                                <h3 className="font-medium text-lg">{movie.title}</h3>
                                <p className="text-sm text-muted-foreground">{movie.year}</p>
                                {movie.rating && (
                                    <div className="flex items-center text-yellow-500 mt-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="h-4 w-4 mr-1"
                                        >
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                        <span>{movie.rating}/10</span>
                                    </div>
                                )}
                                <div className="flex gap-2 mt-3">
                                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                        Xem phim
                                    </Button>
                                    <Button size="sm" variant="outline">
                                        Chi tiết
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    )
}

