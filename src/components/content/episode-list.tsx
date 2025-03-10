"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Episode {
    number: number
    title: string
    duration: string
    thumbnail: string
}

interface EpisodeListProps {
    episodes: Episode[]
    currentEpisode: number
    movieSlug: string
}

export default function EpisodeList({ episodes, currentEpisode, movieSlug }: EpisodeListProps) {
    const [searchQuery, setSearchQuery] = useState("")

    // Group episodes by 10
    const episodeGroups = episodes.reduce(
        (groups, episode) => {
            const groupIndex = Math.ceil(episode.number / 10)
            if (!groups[groupIndex]) {
                groups[groupIndex] = []
            }
            groups[groupIndex].push(episode)
            return groups
        },
        {} as Record<number, Episode[]>,
    )

    // Filter episodes based on search query
    const filteredEpisodes = searchQuery
        ? episodes.filter(
            (ep) =>
                ep.title.toLowerCase().includes(searchQuery.toLowerCase()) || ep.number.toString().includes(searchQuery),
        )
        : episodes

    // Find the group of the current episode
    const currentGroup = Math.ceil(currentEpisode / 10)

    return (
        <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
            <div className="p-4 border-b border-gray-800">
                <h3 className="text-lg font-medium mb-3">Danh sách tập</h3>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        type="search"
                        placeholder="Tìm tập phim..."
                        className="pl-9 bg-gray-800 border-gray-700 focus:ring-green-500 focus:border-green-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="p-4">
                {searchQuery ? (
                    <div className="space-y-2">
                        {filteredEpisodes.length > 0 ? (
                            filteredEpisodes.map((episode) => (
                                <EpisodeItem
                                    key={episode.number}
                                    episode={episode}
                                    isActive={episode.number === currentEpisode}
                                    movieSlug={movieSlug}
                                />
                            ))
                        ) : (
                            <div className="text-center py-8 text-gray-400">Không tìm thấy tập phim nào phù hợp</div>
                        )}
                    </div>
                ) : (
                    <Tabs defaultValue={`group-${currentGroup}`} className="w-full">
                        <TabsList className="mb-4 w-full flex flex-wrap h-auto bg-gray-800 p-1">
                            {Object.keys(episodeGroups).map((groupKey) => (
                                <TabsTrigger
                                    key={groupKey}
                                    value={`group-${groupKey}`}
                                    className="flex-1 data-[state=active]:bg-green-600"
                                >
                                    {(Number.parseInt(groupKey) - 1) * 10 + 1}-{Math.min(Number.parseInt(groupKey) * 10, episodes.length)}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {Object.entries(episodeGroups).map(([groupKey, groupEpisodes]) => (
                            <TabsContent key={groupKey} value={`group-${groupKey}`} className="mt-0 space-y-2">
                                {groupEpisodes.map((episode) => (
                                    <EpisodeItem
                                        key={episode.number}
                                        episode={episode}
                                        isActive={episode.number === currentEpisode}
                                        movieSlug={movieSlug}
                                    />
                                ))}
                            </TabsContent>
                        ))}
                    </Tabs>
                )}
            </div>
        </div>
    )
}

function EpisodeItem({ episode, isActive, movieSlug }: { episode: Episode; isActive: boolean; movieSlug: string }) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className={cn(
                "rounded-md overflow-hidden border transition-colors",
                isActive ? "border-green-600 bg-green-600/20" : "border-gray-700 hover:border-gray-600 bg-gray-800",
            )}
        >
            <Link href={`/watch/${movieSlug}?ep=${episode.number}`} className="flex h-full">
                <div className="relative w-24 h-16 flex-shrink-0">
                    <Image
                        src={episode.thumbnail || "/placeholder.svg"}
                        alt={`Tập ${episode.number}`}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                        <Play className="h-6 w-6 text-white" />
                    </div>
                </div>

                <div className="p-2 flex flex-col justify-center flex-1 min-w-0">
                    <div className="flex justify-between items-start">
            <span className={cn("text-sm font-medium", isActive ? "text-green-400" : "text-white")}>
              Tập {episode.number}
            </span>
                        <span className="text-xs text-gray-400">{episode.duration}</span>
                    </div>
                    <p className="text-xs text-gray-300 truncate">{episode.title}</p>
                </div>
            </Link>
        </motion.div>
    )
}

