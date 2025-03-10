"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Play, Star, Heart, Share2, Clock, Calendar, Film, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface Actor {
    name: string
    character?: string
    image: string
}

interface Episode {
    number: number
    title: string
    duration: string
    thumbnail: string
}

interface MovieDetailProps {
    title: string
    originalTitle: string
    poster: string
    thumbnail: string
    releaseYear: string
    duration: string
    rating: string
    description: string
    categories: { name: string; slug: string }[]
    nation: { name: string; flag: string; slug: string }
    actors: Actor[]
    episodes?: Episode[]
    isSeries?: boolean
}

export default function MovieDetail({
                                        title,
                                        originalTitle,
                                        poster,
                                        releaseYear,
                                        duration,
                                        rating,
                                        description,
                                        categories,
                                        nation,
                                        actors,
                                        episodes = [],
                                        isSeries = false,
                                    }: MovieDetailProps) {
    const [isLiked, setIsLiked] = useState(false)

    return (
        <div className="relative">
            {/* Blurred background poster */}
            <div className="absolute inset-0 overflow-hidden h-[500px]">
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background z-10" />
                <Image
                    src={poster || "/placeholder.svg"}
                    alt={title}
                    fill
                    className="object-cover blur-sm scale-110 opacity-50"
                    priority
                />
            </div>

            {/* Movie detail content */}
            <div className="container relative z-20 px-4 md:px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Poster column */}
                    <div className="md:col-span-1">
                        <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-lg border border-white/10">
                            <Image src={poster || "/placeholder.svg"} alt={title} fill className="object-cover" priority />
                        </div>

                        <div className="mt-4 flex flex-col gap-3">
                            <Button className="bg-green-600 hover:bg-green-700 transition-colors w-full">
                                <Play className="mr-2 h-4 w-4" /> Xem Phim
                            </Button>

                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    className={cn("flex-1 transition-colors", isLiked && "text-red-500 border-red-500")}
                                    onClick={() => setIsLiked(!isLiked)}
                                >
                                    <Heart className={cn("mr-2 h-4 w-4", isLiked && "fill-red-500")} />
                                    {isLiked ? "Đã Thích" : "Yêu Thích"}
                                </Button>
                                <Button variant="outline" className="flex-1">
                                    <Share2 className="mr-2 h-4 w-4" /> Chia Sẻ
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Info column */}
                    <div className="md:col-span-2">
                        <h1 className="text-3xl font-bold mb-1">{title}</h1>
                        <h2 className="text-xl text-muted-foreground mb-4">{originalTitle}</h2>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {categories.map((category) => (
                                <Link key={category.slug} href={`/danh-muc/${category.slug}`}>
                                    <Badge variant="outline" className="hover:bg-muted transition-colors">
                                        {category.name}
                                    </Badge>
                                </Link>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                            <div className="flex flex-col">
                                <span className="text-sm text-muted-foreground">Đánh giá</span>
                                <div className="flex items-center">
                                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                                    <span className="font-medium">{rating}/10</span>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-sm text-muted-foreground">Thời lượng</span>
                                <div className="flex items-center">
                                    <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                                    <span className="font-medium">{duration}</span>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-sm text-muted-foreground">Năm phát hành</span>
                                <div className="flex items-center">
                                    <Calendar className="h-4 w-4 text-muted-foreground mr-1" />
                                    <span className="font-medium">{releaseYear}</span>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-sm text-muted-foreground">Quốc gia</span>
                                <Link
                                    href={`/quoc-gia/${nation.slug}`}
                                    className="flex items-center hover:text-green-600 transition-colors"
                                >
                                    <span className="mr-1">{nation.flag}</span>
                                    <span className="font-medium">{nation.name}</span>
                                </Link>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-medium mb-2">Nội dung phim</h3>
                            <p className="text-muted-foreground">{description}</p>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-medium mb-3 flex items-center">
                                <User className="mr-2 h-5 w-5 text-green-600" /> Diễn viên
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {actors.map((actor) => (
                                    <div key={actor.name} className="flex items-center gap-2">
                                        <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                            <Image src={actor.image || "/placeholder.svg"} alt={actor.name} fill className="object-cover" />
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="font-medium text-sm truncate">{actor.name}</p>
                                            {actor.character && <p className="text-xs text-muted-foreground truncate">{actor.character}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {isSeries && episodes.length > 0 && (
                            <div>
                                <h3 className="text-lg font-medium mb-3 flex items-center">
                                    <Film className="mr-2 h-5 w-5 text-green-600" /> Danh sách tập
                                </h3>

                                <Tabs defaultValue="all" className="w-full">
                                    <TabsList className="mb-4">
                                        <TabsTrigger value="all">Tất cả</TabsTrigger>
                                        {Array.from(new Set(episodes.map((ep) => Math.ceil(ep.number / 10)))).map((group) => (
                                            <TabsTrigger key={group} value={`group-${group}`}>
                                                {(group - 1) * 10 + 1}-{Math.min(group * 10, episodes.length)}
                                            </TabsTrigger>
                                        ))}
                                    </TabsList>

                                    <TabsContent value="all" className="mt-0">
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                            {episodes.map((episode) => (
                                                <EpisodeCard key={episode.number} episode={episode} />
                                            ))}
                                        </div>
                                    </TabsContent>

                                    {Array.from(new Set(episodes.map((ep) => Math.ceil(ep.number / 10)))).map((group) => (
                                        <TabsContent key={group} value={`group-${group}`} className="mt-0">
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                                {episodes
                                                    .filter((ep) => Math.ceil(ep.number / 10) === group)
                                                    .map((episode) => (
                                                        <EpisodeCard key={episode.number} episode={episode} />
                                                    ))}
                                            </div>
                                        </TabsContent>
                                    ))}
                                </Tabs>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

function EpisodeCard({ episode }: { episode: Episode }) {
    return (
        <motion.div
            whileHover={{ scale: 1.03 }}
            className="relative overflow-hidden rounded-md border border-border group cursor-pointer"
        >
            <div className="relative aspect-video">
                <Image
                    src={episode.thumbnail || "/placeholder.svg"}
                    alt={`Tập ${episode.number}: ${episode.title}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Play className="h-8 w-8 text-white" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <div className="flex justify-between items-center">
                        <span className="text-white text-sm font-medium">Tập {episode.number}</span>
                        <span className="text-white/80 text-xs">{episode.duration}</span>
                    </div>
                </div>
            </div>
            <div className="p-2">
                <p className="text-sm truncate">{episode.title}</p>
            </div>
        </motion.div>
    )
}

