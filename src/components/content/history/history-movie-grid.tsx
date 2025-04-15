"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import LazyImage from "@/components/layout/lazy-image"
import {History} from "@/utils/types/history";


interface HistoryMovieGridProps {
    movies: History[]
}

export default function HistoryMovieGrid({ movies }: HistoryMovieGridProps) {
    // Sort movies by createdAt in ascending order (oldest first)
    const sortedMovies = [...movies].sort((a, b) => new Date(a.create_at).getTime() - new Date(b.create_at).getTime())

    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {sortedMovies.map((movie, index) => (
                    <HistoryMovieCard key={movie.slug} movie={movie} index={index} />
))}
    </div>
)
}

function HistoryMovieCard({ movie, index }: { movie: History; index: number }) {
    const imageUrl = movie.poster_url || "/placeholder.svg?height=400&width=300"

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.05 }}
    className="flex flex-col"
    >
    <Link href={`/watch/${movie.slug}`} className="group">
    <div className="relative aspect-[2/3] overflow-hidden rounded-lg mb-2">
    <LazyImage
        src={`https://img.ophim.live/uploads/movies/${imageUrl}`}
    alt={movie.title}
    fill
    className="object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {/* Episode badge */}
        <div className="absolute bottom-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-md">
        Tập {movie.movie_episode}
    </div>

    {/* Bamboo frame decoration */}
    <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-500/30"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-500/30"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-500/30"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-500/30"></div>
        </div>

    {/* Hover overlay */}
    <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
    <span className="text-white font-medium">Xem chi tiết</span>
    </div>
    </div>

    <h3 className="font-medium line-clamp-1 text-sm group-hover:text-green-500 transition-colors">{movie.title}</h3>
        </Link>
        </motion.div>
)
}
