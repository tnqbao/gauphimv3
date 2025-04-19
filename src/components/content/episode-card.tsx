"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Play } from 'lucide-react'
import Link from "next/link"

export interface Episode {
    name: string;
    slug: string;
    filename: string;
    link_embed: string;
    link_m3u8: string;
}

interface EpisodeCardProps {
    episode: Episode;
    thumb_url: string;
    movieSlug: string;
    movieName?: string;
}

export default function EpisodeCard({ episode, thumb_url, movieSlug, movieName }: EpisodeCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.03 }}
            className="relative overflow-hidden rounded-md border border-border group cursor-pointer"
        >
            <Link href={`/watch/${movieSlug}?ep=${episode.name}`}>
                <div className="relative aspect-video">
                    <Image
                        src={`https://img.ophim.live/uploads/movies/${thumb_url}` || "/placeholder.svg"}
                        alt={`Tập ${episode.name}: ${episode.filename}`}
                        fill
                        className=" object-contain transition-transform duration-300 group-hover:scale-110"
                        unoptimized
                        objectFit={"cover"}
                    />
                    <div
                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center ">
                        <Play className="h-8 w-8 text-white"/>
                    </div>
                </div>
                <div className="p-2">
                    <p className="text-sm truncate md:text-white">Tập {episode.name} - {movieName}</p>
                </div>
            </Link>
        </motion.div>
    )
}
