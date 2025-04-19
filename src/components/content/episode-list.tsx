"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Episode } from "./episode-card"

interface EpisodeListProps {
    episodes: Episode[]
    currentEpisode: string
    movieSlug: string
    isVisible: boolean
    onClose?: () => void
    isMobile?: boolean
}

export default function EpisodeList({
                                        episodes,
                                        currentEpisode,
                                        movieSlug,
                                        onClose,
                                        isMobile = false,
                                    }: EpisodeListProps) {
    if (isMobile) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed inset-0 z-50 bg-black/90 p-4 lg:hidden overflow-auto"
            >
                <div className="flex justify-between items-center mb-4 ">
                    <h3 className="text-lg font-medium text-white">Danh sách tập</h3>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {episodes.map((episode) => (
                        <EpisodeItem
                            key={episode.name}
                            episode={episode}
                            isActive={episode.name === currentEpisode}
                            movieSlug={movieSlug}
                            onClick={onClose}
                        />
                    ))}
                </div>
            </motion.div>
        )
    }

    return (
        <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
            <div className="p-4 border-b border-gray-800">
                <h3 className="text-lg font-medium">Danh sách tập</h3>
            </div>
            <div className="p-4 max-h-[600px] overflow-y-auto">
                <div className="space-y-2">
                    {episodes.map((episode) => (
                        <EpisodeItem
                            key={episode.name}
                            episode={episode}
                            isActive={episode.name === currentEpisode}
                            movieSlug={movieSlug}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

function EpisodeItem({
                         episode,
                         isActive,
                         movieSlug,
                         onClick,
                     }: {
    episode: Episode
    isActive: boolean
    movieSlug: string
    onClick?: () => void
}) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className={cn(
                "rounded-md overflow-hidden border transition-colors",
                isActive ? "border-green-600 bg-green-600/20" : "border-gray-700 hover:border-gray-600 bg-gray-800",
            )}
        >
            <Link href={`/watch/${movieSlug}?ep=${episode.name}`} className="flex h-full" onClick={onClick}>
                <div className="p-2 flex flex-col justify-center flex-1 min-w-0">
                    <div className="flex justify-between items-start">
            <span className={cn("text-sm font-medium", isActive ? "text-green-400" : "text-white")}>
              Tập {episode.name}
            </span>
                    </div>
                    <p className="text-xs text-gray-300 truncate">{episode.name}</p>
                </div>
            </Link>
        </motion.div>
    )
}

