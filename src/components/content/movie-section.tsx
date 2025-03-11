"use client"

import Link from "next/link"
import { useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import MovieCard from "./movie-card"
import { cn } from "@/lib/utils"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import LazyLoadComponent from "../layout/lazy-load-component"

interface Movie {
    title: string
    year: string
    poster_url: string
    thumb_url: string
    rating?: string
}

interface MovieSectionProps {
    title: string
    movies: Movie[]
    bgColor?: string
}

export default function MovieSection({ title, movies, bgColor = "bg-white" }: MovieSectionProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const controls = useAnimation()
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })

    useEffect(() => {
        if (inView) {
            controls.start("visible")
        }
    }, [controls, inView])

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef
            const scrollAmount = direction === "left" ? -current.offsetWidth / 2 : current.offsetWidth / 2
            current.scrollBy({ left: scrollAmount, behavior: "smooth" })
        }
    }

    // Bamboo decoration for section
    const BambooDecoration = () => (
        <div className="absolute -top-4 left-0 w-full overflow-hidden h-8 pointer-events-none">
            <div className="flex justify-between">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="w-2 h-8 bg-green-800/10 rounded-t-full"
                        initial={{ y: 8 }}
                        animate={{ y: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: i * 0.02,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                            repeatDelay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>
        </div>
    )

    return (
        <LazyLoadComponent>
            <section className={cn("py-8 md:py-12 relative transition-colors duration-300", bgColor)}>
                <BambooDecoration />

                <div className="container px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center justify-between mb-6"
                    >
                        <h2 className="text-2xl font-bold flex items-center">
                            <motion.span
                                className="w-1 h-6 bg-green-600 mr-2 rounded-full"
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{ duration: 0.5 }}
                                style={{ originY: 0 }}
                            />
                            <span className="relative">
                {title}
                                <motion.span
                                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-green-600"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    style={{ originX: 0 }}
                                />
              </span>
                        </h2>
                        <div className="flex items-center gap-2">
                            <div className="hidden md:flex gap-2">
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => scroll("left")}>
                                        <ChevronLeft className="h-4 w-4" />
                                        <span className="sr-only">Scroll left</span>
                                    </Button>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8 rounded-full"
                                        onClick={() => scroll("right")}
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                        <span className="sr-only">Scroll right</span>
                                    </Button>
                                </motion.div>
                            </div>
                            <Link href="#" className="text-sm font-medium text-green-600 hover:underline">
                                View All
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        ref={ref}
                        initial="hidden"
                        animate={controls}
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.05 } },
                        }}
                    >
                        <div
                            ref={scrollContainerRef}
                            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x"
                            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                        >
                            {movies.map((movie, index) => (
                                <div key={movie.title} className="flex-shrink-0 w-[160px] sm:w-[200px] snap-start">
                                    <MovieCard movie={movie} index={index} />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        </LazyLoadComponent>
    )
}

