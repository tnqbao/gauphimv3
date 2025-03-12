"use client"

import Image from "next/image"
import MoviePoster from "./movie-poster"
import MovieInfo from "./movie-info"
import MovieDescription from "./movie-description"
import MovieActors from "./movie-actors"
import EpisodeListTabs from "../episode-list-tabs"
import type { Episode } from "../episode-card"

interface MovieDetailProps {
    name: string
    origin_name: string
    poster_url: string
    thumb_url: string
    year: string
    episode_total: string
    content: string
    category: {
        id: string
        name: string
        slug: string
    }[]
    country: {
        id: string
        name: string
        slug: string
    }[]
    actors: string[]
    episodes: {
        server_name: string
        server_data: Episode[]
    }[]
    slug: string
    isSeries?: boolean
}

export default function MovieDetail({
                                        name,
                                        origin_name,
                                        poster_url,
                                        thumb_url,
                                        year,
                                        episode_total,
                                        content,
                                        category,
                                        country,
                                        actors,
                                        episodes,
                                        slug,
                                        isSeries = false,
                                    }: MovieDetailProps) {
    const server_data =
        episodes && episodes.length > 0 && Array.isArray(episodes[0].server_data) ? episodes[0].server_data : []

    return (
        <div className="relative">
            {/* Blurred background poster */}
            <div className="absolute inset-0 overflow-hidden h-[500px]">
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background z-10" />
                <Image
                    src={`https://img.ophim.live/uploads/movies/${poster_url}` || "/placeholder.svg"}
                    alt={name}
                    fill
                    className="object-cover blur-sm scale-110 opacity-50"
                    priority
                />
            </div>

            <div className="container relative z-20 px-4 md:px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Poster column */}
                    <MoviePoster poster={thumb_url} movieSlug={slug} />

                    {/* Info column */}
                    <div className="md:col-span-2">
                        <MovieInfo
                            title={name}
                            originalTitle={origin_name}
                            releaseYear={year}
                            duration={episode_total}
                            categories={category}
                            country={country}
                        />

                        <MovieDescription description={content} />

                        <MovieActors actors={actors} />

                        {isSeries && server_data.length > 0 && (
                            <EpisodeListTabs episodes={server_data} thumb_url={thumb_url} movieSlug={slug} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

