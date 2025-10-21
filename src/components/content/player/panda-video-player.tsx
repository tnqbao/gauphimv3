import {useEffect, useRef, useState} from "react"
import {AnimatePresence} from "framer-motion"
import {cn} from "@/lib/utils"
import VideoControls from "./video-controls"
import PandaLoadingIndicator from "./panda-loading-indicator"
import EpisodeList from "@/components/content/episode-list"
import MovieInfoDisplay from "./movie-info-display"
import HLSVideoPlayer from "./hls-video-player"
import type {Episode} from "@/components/content/episode-card"

interface MovieInfo {
    name: string
    year: string
    categories: { name: string; slug: string }[]
    description: string
}

interface PandaVideoPlayerProps {
    title: string
    poster: string
    source: string
    episodes: Episode[]
    currentEpisode: string
    movieSlug: string
    movieInfo: MovieInfo
}

export default function PandaVideoPlayer({
                                             title,
                                             poster,
                                             source,
                                             episodes,
                                             currentEpisode,
                                             movieSlug,
                                             movieInfo,
                                         }: PandaVideoPlayerProps) {
    const [isEmbedVideo, setIsEmbedVideo] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [showEpisodeList, setShowEpisodeList] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [volume, setVolume] = useState(1)
    const [lightsOff, setLightsOff] = useState(false)
    const [isPiP, setIsPiP] = useState(false)

    const playerRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement | null>(null)

    useEffect(() => {
        setIsEmbedVideo(source.includes("embed") || source.includes("iframe"))
    }, [source])

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement)
        }

        document.addEventListener("fullscreenchange", handleFullscreenChange)
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange)
        }
    }, [])
    const seekAmount = 10

    const handleLoadedMetadata = () => {
        setIsLoading(false)
        if (videoRef.current) {
            setDuration(videoRef.current.duration)
        }
    }

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime)
            setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100)
        }
    }

    const togglePlay = () => {
        if (!isEmbedVideo && videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    const toggleMute = () => {
        if (!isEmbedVideo && videoRef.current) {
            videoRef.current.muted = !isMuted
            setIsMuted(!isMuted)
        }
    }

    const toggleFullscreen = () => {
        if (!playerRef.current) return

        if (!document.fullscreenElement) {
            playerRef.current.requestFullscreen().catch((err) => console.error("Fullscreen error:", err))
        } else {
            document.exitFullscreen().catch((err) => console.error("Exit fullscreen error:", err))
        }
    }

    const handleSeek = (value: number[]) => {
        if (videoRef.current) {
            const seekTime = (value[0] / 100) * videoRef.current.duration
            videoRef.current.currentTime = seekTime
            setProgress(value[0])
        }
    }

    const handleVolumeChange = (value: number[]) => {
        if (videoRef.current) {
            videoRef.current.volume = value[0]
            setVolume(value[0])
            setIsMuted(value[0] === 0)
        }
    }

    const togglePiP = () => {
        if (videoRef.current && document.pictureInPictureEnabled) {
            if (!document.pictureInPictureElement) {
                videoRef.current.requestPictureInPicture()
                    .catch((err) => console.error("PiP error:", err))
            } else {
                document.exitPictureInPicture()
                    .catch((err) => console.error("Exit PiP error:", err))
            }
        } else {
            console.warn("Picture-in-Picture is not supported on this browser.")
        }
    }


    useEffect(() => {
        const handlePiPChange = () => {
            setIsPiP(document.pictureInPictureElement !== null)
        }

        document.addEventListener("enterpictureinpicture", handlePiPChange)
        document.addEventListener("leavepictureinpicture", handlePiPChange)

        return () => {
            document.removeEventListener("enterpictureinpicture", handlePiPChange)
            document.removeEventListener("leavepictureinpicture", handlePiPChange)
        }
    }, [])

    const toggleEpisodeList = () => setShowEpisodeList(!showEpisodeList)
    const [showControls, setShowControls] = useState(true)
    const controlsTimeout = useRef<NodeJS.Timeout | null>(null)

    const hideControls = () => {
        setShowControls(false)
    }

    const resetControlsTimeout = () => {
        if (controlsTimeout.current) {
            clearTimeout(controlsTimeout.current)
        }
        controlsTimeout.current = setTimeout(hideControls, 3000)
    }

    const handleMouseMove = () => {
        setShowControls(true)
        resetControlsTimeout()
    }

    const handleVideoPlayPause = () => {
        if (isPlaying) {
            resetControlsTimeout()
        }
    }

    const speedMultiplier = 2

    const handleTouchStart = () => {
        if (!videoRef.current) return

        videoRef.current.playbackRate = speedMultiplier
    }

    const handleTouchEnd = () => {
        if (!videoRef.current) return

        videoRef.current.playbackRate = 1
    }

    const handleDoubleClick = () => {
        if (!videoRef.current) return

        const clickX = window.innerWidth / 2
        const screenWidth = window.innerWidth

        if (clickX < screenWidth / 2) {
            videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - seekAmount) // Tua lùi
        } else {
            videoRef.current.currentTime = Math.min(videoRef.current.duration, videoRef.current.currentTime + seekAmount) // Tua nhanh
        }
    }

    useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("play", handleVideoPlayPause, true) // Listen to play/pause
        return () => {
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("play", handleVideoPlayPause)
        }
    }, [])

    return (
        <div ref={containerRef} className={cn("transition-colors duration-300", lightsOff ? "" : "")}>
            <div className="flex flex-col gap-6">
                <div className="w-full">
                    <div
                        ref={playerRef}
                        className="relative w-full h-[50vh] md:h-auto md:aspect-video bg-black md:rounded-lg overflow-hidden group"
                    >
                        {isLoading && <PandaLoadingIndicator/>}

                        {isEmbedVideo ? (
                            <iframe
                                src={source}
                                className="w-full h-full border-0"
                                allowFullScreen
                                onLoad={() => setIsLoading(false)}
                            ></iframe>
                        ) : (
                            <HLSVideoPlayer
                                ref={videoRef}
                                src={source}
                                poster={`https://img.ophim.live/uploads/movies/${poster}`}
                                onLoadedMetadata={handleLoadedMetadata}
                                onTimeUpdate={handleTimeUpdate}
                                onTouchStart={handleTouchStart}
                                onTouchEnd={handleTouchEnd}
                                onDoubleClick={handleDoubleClick}
                                className="w-full h-full object-contain"
                            />
                        )}

                        <AnimatePresence>
                            {showControls && (
                                <VideoControls
                                    title={title}
                                    isPlaying={isPlaying}
                                    isMuted={isMuted}
                                    isFullscreen={isFullscreen}
                                    progress={progress}
                                    duration={duration}
                                    currentTime={currentTime}
                                    volume={volume}
                                    lightsOff={lightsOff}
                                    isEmbedVideo={isEmbedVideo}
                                    currentEpisode={currentEpisode}
                                    movieSlug={movieSlug}
                                    episodes={episodes}
                                    togglePlay={togglePlay}
                                    toggleMute={toggleMute}
                                    toggleFullscreen={toggleFullscreen}
                                    handleSeek={handleSeek}
                                    handleVolumeChange={handleVolumeChange}
                                    setLightsOff={setLightsOff}
                                    toggleEpisodeList={toggleEpisodeList}
                                    togglePiP={togglePiP}
                                    isPiP={isPiP}
                                />
                            )}
                        </AnimatePresence>
                    </div>

                    <MovieInfoDisplay {...movieInfo} lightsOff={lightsOff}/>
                </div>

                {/* Episode list now appears below player on all screen sizes */}
                <div className="w-full">
                    <EpisodeList
                        episodes={episodes}
                        currentEpisode={currentEpisode}
                        movieSlug={movieSlug}
                        isVisible
                    />
                </div>

                {/* Mobile episode list overlay */}
                <AnimatePresence>
                    {showEpisodeList && (
                        <EpisodeList
                            episodes={episodes}
                            currentEpisode={currentEpisode}
                            movieSlug={movieSlug}
                            isVisible={showEpisodeList}
                            onClose={toggleEpisodeList}
                            isMobile={true}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}