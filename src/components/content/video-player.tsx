"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, Settings, ChevronLeft, ChevronRight } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface VideoSource {
    src: string
    quality: string
}

interface VideoPlayerProps {
    title: string
    poster: string
    sources: VideoSource[]
}

export default function VideoPlayer({ title, poster, sources }: VideoPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [volume, setVolume] = useState(1)
    const [showControls, setShowControls] = useState(true)
    const [selectedQuality, setSelectedQuality] = useState(sources[0].quality)
    const [controlsTimeout, setControlsTimeout] = useState<NodeJS.Timeout | null>(null)
    const [isEmbedVideo, setIsEmbedVideo] = useState(false)

    const videoRef = useRef<HTMLVideoElement>(null)
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const playerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const currentSource = sources.find((source) => source.quality === selectedQuality) || sources[0]
        setIsEmbedVideo(currentSource.src.includes("embed") || currentSource.src.includes("iframe"))
    }, [sources, selectedQuality])

    const togglePlay = () => {
        if (isEmbedVideo) {
            return
        }

        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    const toggleMute = () => {
        if (isEmbedVideo) return

        if (videoRef.current) {
            videoRef.current.muted = !isMuted
            setIsMuted(!isMuted)
        }
    }

    const toggleFullscreen = () => {
        if (!playerRef.current) return

        if (!isFullscreen) {
            if (playerRef.current.requestFullscreen) {
                playerRef.current.requestFullscreen()
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen()
            }
        }
    }

    const updateProgress = () => {
        if (isEmbedVideo) return

        if (videoRef.current) {
            const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100
            setProgress(currentProgress)
            setCurrentTime(videoRef.current.currentTime)
        }
    }

    const handleLoadedMetadata = () => {
        if (isEmbedVideo) return

        if (videoRef.current) {
            setDuration(videoRef.current.duration)
        }
    }

    const handleSeek = (value: number[]) => {
        if (isEmbedVideo) return

        if (videoRef.current) {
            const seekTime = (value[0] / 100) * videoRef.current.duration
            videoRef.current.currentTime = seekTime
            setProgress(value[0])
        }
    }

    const handleVolumeChange = (value: number[]) => {
        if (isEmbedVideo) return

        if (videoRef.current) {
            videoRef.current.volume = value[0]
            setVolume(value[0])
            setIsMuted(value[0] === 0)
        }
    }

    const changeQuality = (quality: string) => {
        if (isEmbedVideo) {
            setSelectedQuality(quality)
            return
        }

        const currentTime = videoRef.current?.currentTime || 0
        setSelectedQuality(quality)

        if (videoRef.current) {
            videoRef.current.currentTime = currentTime
            if (isPlaying) {
                videoRef.current.play()
            }
        }
    }

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
    }

    const handleMouseMove = () => {
        if (isEmbedVideo) return

        setShowControls(true)

        if (controlsTimeout) {
            clearTimeout(controlsTimeout)
        }

        const timeout = setTimeout(() => {
            if (isPlaying) {
                setShowControls(false)
            }
        }, 3000)

        setControlsTimeout(timeout)
    }

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement)
        }

        document.addEventListener("fullscreenchange", handleFullscreenChange)

        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange)
        }
    }, [])

    useEffect(() => {
        return () => {
            if (controlsTimeout) {
                clearTimeout(controlsTimeout)
            }
        }
    }, [controlsTimeout])

    // Get current source based on selected quality
    const currentSource = sources.find((source) => source.quality === selectedQuality) || sources[0]

    return (
        <div
            ref={playerRef}
            className="relative w-full aspect-video bg-black rounded-lg overflow-hidden group"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isPlaying && setShowControls(false)}
        >
            {isEmbedVideo ? (
                <iframe
                    ref={iframeRef}
                    src={currentSource.src}
                    className="w-full h-full border-0"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
            ) : (
                <video
                    ref={videoRef}
                    className="w-full h-full object-contain"
                    poster={poster}
                    onTimeUpdate={updateProgress}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={() => setIsPlaying(false)}
                    onClick={togglePlay}
                >
                    <source src={currentSource.src} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}

            {!isEmbedVideo && !isPlaying && !currentTime && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                    <motion.div
                        className="relative w-24 h-24 cursor-pointer"
                        onClick={togglePlay}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                            {/* Panda face */}
                            <circle cx="50" cy="50" r="40" fill="white" />

                            {/* Ears */}
                            <circle cx="25" cy="25" r="12" fill="black" />
                            <circle cx="75" cy="25" r="12" fill="black" />

                            {/* Eyes */}
                            <circle cx="35" cy="40" r="8" fill="black" />
                            <circle cx="65" cy="40" r="8" fill="black" />

                            {/* Eye shine */}
                            <circle cx="38" cy="38" r="2" fill="white" />
                            <circle cx="68" cy="38" r="2" fill="white" />

                            {/* Nose */}
                            <circle cx="50" cy="55" r="5" fill="black" />

                            {/* Play triangle */}
                            <path
                                d="M45,65 L60,50 L45,35"
                                fill="none"
                                stroke="black"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </motion.div>
                </div>
            )}

            {!isEmbedVideo && (
                <AnimatePresence>
                    {showControls && (
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

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                                            <Settings className="h-5 w-5" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-40">
                                        <div className="p-2 text-sm font-medium">Chất lượng</div>
                                        {sources.map((source) => (
                                            <DropdownMenuItem
                                                key={source.quality}
                                                className={cn(
                                                    "cursor-pointer",
                                                    selectedQuality === source.quality && "bg-green-600 text-white",
                                                )}
                                                onClick={() => changeQuality(source.quality)}
                                            >
                                                {source.quality}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

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

                            {/* Bottom controls */}
                            <div className="space-y-2">
                                {/* Progress bar */}
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

                                {/* Control buttons */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={togglePlay}>
                                            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                                        </Button>

                                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                                            <ChevronLeft className="h-5 w-5" />
                                        </Button>

                                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                                            <ChevronRight className="h-5 w-5" />
                                        </Button>

                                        <div className="flex items-center gap-2 ml-2">
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
                                        </div>
                                    </div>

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-white hover:bg-white/20"
                                        onClick={toggleFullscreen}
                                    >
                                        {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </div>
    )
}

