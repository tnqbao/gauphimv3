"use client"

import {motion} from "framer-motion"
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {ChevronLeft, Search, ArrowUpDown} from "lucide-react"
import {cn} from "@/lib/utils"
import type {Episode} from "./episode-card"
import {useState, useMemo} from "react"
import {Input} from "@/components/ui/input"

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
    const [searchQuery, setSearchQuery] = useState("")
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

    // Filter and sort episodes
    const filteredAndSortedEpisodes = useMemo(() => {
        let result = [...episodes]

        // Filter by search query
        if (searchQuery) {
            result = result.filter(ep =>
                ep.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        // Sort episodes
        result.sort((a, b) => {
            const numA = parseInt(a.name) || 0
            const numB = parseInt(b.name) || 0
            return sortOrder === "asc" ? numA - numB : numB - numA
        })

        return result
    }, [episodes, searchQuery, sortOrder])

    const toggleSortOrder = () => {
        setSortOrder(prev => prev === "asc" ? "desc" : "asc")
    }

    if (isMobile) {
        return (
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: 20}}
                className="fixed inset-0 z-50 bg-black/90 p-4 lg:hidden overflow-auto"
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-white">Danh sách tập</h3>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <ChevronLeft className="h-5 w-5"/>
                    </Button>
                </div>

                {/* Search and Sort Controls */}
                <div className="mb-4 space-y-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Tìm kiếm tập..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-gray-800 border-gray-700 text-white"
                        />
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={toggleSortOrder}
                        className="w-full bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                    >
                        <ArrowUpDown className="h-4 w-4 mr-2" />
                        {sortOrder === "asc" ? "Sắp xếp tăng dần" : "Sắp xếp giảm dần"}
                    </Button>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                    {filteredAndSortedEpisodes.map((episode) => (
                        <EpisodeItem
                            key={episode.name}
                            episode={episode}
                            isActive={episode.name === currentEpisode}
                            movieSlug={movieSlug}
                            onClick={onClose}
                        />
                    ))}
                </div>
                {filteredAndSortedEpisodes.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                        Không tìm thấy tập phim nào
                    </div>
                )}
            </motion.div>
        )
    }

    return (
        <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">Danh sách tập</h3>

                {/* Search and Sort Controls */}
                <div className="space-y-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Tìm kiếm tập..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                        />
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={toggleSortOrder}
                        className="w-full"
                    >
                        <ArrowUpDown className="h-4 w-4 mr-2" />
                        {sortOrder === "asc" ? "Sắp xếp tăng dần" : "Sắp xếp giảm dần"}
                    </Button>
                </div>
            </div>
            <div className="p-4 max-h-[600px] overflow-y-auto">
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2">
                    {filteredAndSortedEpisodes.map((episode) => (
                        <EpisodeItem
                            key={episode.name}
                            episode={episode}
                            isActive={episode.name === currentEpisode}
                            movieSlug={movieSlug}
                        />
                    ))}
                </div>
                {filteredAndSortedEpisodes.length === 0 && (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        Không tìm thấy tập phim nào
                    </div>
                )}
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
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            className={cn(
                "rounded-md overflow-hidden border transition-all aspect-square",
                isActive
                    ? "border-green-500 bg-green-500/20 shadow-lg shadow-green-500/20"
                    : "border-gray-300 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700",
            )}
        >
            <Link href={`/watch/${movieSlug}?ep=${episode.name}`} className="flex h-full w-full" onClick={onClick}>
                <div className="p-2 flex flex-col justify-center items-center flex-1">
                    <span className={cn(
                        "text-xs font-bold text-center leading-tight",
                        isActive ? "text-green-400" : "text-gray-900 dark:text-white"
                    )}>
                        Tập {episode.name}
                    </span>
                </div>
            </Link>
        </motion.div>
    )
}
