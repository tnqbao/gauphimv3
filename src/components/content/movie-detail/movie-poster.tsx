"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart, Play, Share2 } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface MoviePosterProps {
    poster: string
    movieSlug: string
}

export default function MoviePoster({ poster, movieSlug }: MoviePosterProps) {
    const [isLiked, setIsLiked] = useState(false)

    return (
        <div className="md:col-span-1">
            <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-lg border border-white/10">
                <Image
                    src={`https://img.ophim.live/uploads/movies/${poster}` || "/placeholder.svg"}
                    alt="Movie poster"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="mt-4 flex flex-col gap-3">
                <Link href={`/watch/${movieSlug}`}>
                    <Button className="bg-green-600 hover:bg-green-700 transition-colors w-full">
                        <Play className="mr-2 h-4 w-4" /> Xem Phim
                    </Button>
                </Link>

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
    )
}

