"use client"

import { motion } from "framer-motion"
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, Lightbulb, ChevronLeft, ChevronRight } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import type { Episode } from "@/components/content/episode-card"

interface VideoControlsProps {
    title: string
    isPlaying: boolean
    isMuted: boolean
    isFullscreen: boolean
    progress: number
    duration: number
    currentTime: number
    volume: number
    lightsOff: boolean
    isEmbedVideo: boolean
    currentEpisode: string
    movieSlug: string
    episodes: Episode[]
    togglePlay: () => void
    toggleMute: () => void
    toggleFullscreen: () => void
    handleSeek: (value: number[]) => void
    handleVolumeChange: (value: number[]) => void
    setLightsOff: (value: boolean) => void
    toggleEpisodeList: () => void
}

export default function VideoControls({
                                          title,
                                          isPlaying,
                                          isMuted,
                                          isFullscreen,
                                          progress,
                                          duration,
                                          currentTime,
                                          volume,
                                          lightsOff,
                                          isEmbedVideo,
                                          currentEpisode,
                                          movieSlug,
                                          episodes,
                                          togglePlay,
                                          toggleMute,
                                          toggleFullscreen,
                                          handleSeek,
                                          handleVolumeChange,
                                          setLightsOff,
                                          toggleEpisodeList,
                                      }: VideoControlsProps) {
    // Format time (seconds to MM:SS)
    const formatTime = (time: number) => {
        if (!time || isNaN(time)) return "0:00"

        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
    }

    // Get next and previous episode numbers
    const currentEpisodeIndex = episodes.findIndex((ep) => ep.name === currentEpisode)
    const prevEpisode = currentEpisodeIndex > 0 ? episodes[currentEpisodeIndex - 1] : null
    const nextEpisode = currentEpisodeIndex < episodes.length - 1 ? episodes[currentEpisodeIndex + 1] : null

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-black/80 via-transparent to-black/40 z-20"
        >
            {/* Top controls */}
            <div className="flex items-center justify-between">
                <h2 className="text-white text-lg font-medium truncate max-w-[80%]">{title}</h2>

                <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={() => setLightsOff(!lightsOff)}
                >
                    <Lightbulb className={cn("h-5 w-5", lightsOff && "text-yellow-400")} />
                </Button>
            </div>

            {/* Center play/pause button */}
            {!isEmbedVideo && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.button
                        className="h-16 w-16 rounded-full bg-green-600/80 flex items-center justify-center pointer-events-auto"
                        onClick={togglePlay}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {isPlaying ? <Pause className="h-8 w-8 text-white" /> : <Play className="h-8 w-8 text-white ml-1" />}
                    </motion.button>
                </div>
            )}

            {/* Bottom controls */}
            <div className="space-y-2">
                {/* Progress bar */}
                {!isEmbedVideo && (
                    <div className="flex items-center gap-2">
                        <span className="text-white text-sm">{formatTime(currentTime)}</span>
                        <div className="flex-1">
                            <Slider
                                value={[progress]}
                                min={0}
                                max={100}
                                step={0.1}
                                onValueChange={handleSeek}
                                className="cursor-pointer"
                            />
                        </div>
                        <span className="text-white text-sm">{formatTime(duration)}</span>
                    </div>
                )}

                {/* Control buttons */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {!isEmbedVideo && (
                            <>
                                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={togglePlay}>
                                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                                </Button>

                                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={toggleMute}>
                                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                                </Button>

                                <div className="w-20 hidden sm:block">
                                    <Slider
                                        value={[isMuted ? 0 : volume]}
                                        min={0}
                                        max={1}
                                        step={0.01}
                                        onValueChange={handleVolumeChange}
                                    />
                                </div>
                            </>
                        )}

                        {/* Episode navigation */}
                        <div className="flex items-center gap-1 ml-2">
                            {prevEpisode ? (
                                <Link href={`/watch/${movieSlug}?ep=${prevEpisode.name}`}>
                                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                                        <ChevronLeft className="h-5 w-5" />
                                    </Button>
                                </Link>
                            ) : (
                                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 opacity-50" disabled>
                                    <ChevronLeft className="h-5 w-5" />
                                </Button>
                            )}

                            <span className="text-white text-sm hidden sm:inline">Tập {currentEpisode}</span>

                            {nextEpisode ? (
                                <Link href={`/watch/${movieSlug}?ep=${nextEpisode.name}`}>
                                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                                        <ChevronRight className="h-5 w-5" />
                                    </Button>
                                </Link>
                            ) : (
                                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 opacity-50" disabled>
                                    <ChevronRight className="h-5 w-5" />
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-white hover:bg-white/20 lg:hidden"
                            onClick={toggleEpisodeList}
                        >
                            Danh sách tập
                        </Button>

                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={toggleFullscreen}>
                            {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

