"use client"

import { forwardRef, useEffect, useRef } from "react"
import Hls from "hls.js"

interface HLSVideoPlayerProps {
    src: string
    poster: string
    className?: string
    onLoadedMetadata?: () => void
    onTimeUpdate?: () => void
}

const HLSVideoPlayer = forwardRef<HTMLVideoElement, HLSVideoPlayerProps>(
    function HLSVideoPlayerComponent({ src, poster, className, onLoadedMetadata, onTimeUpdate }, ref) {
        const videoRef = useRef<HTMLVideoElement | null>(null)

        useEffect(() => {
            const video = videoRef.current
            if (!video) return

            if (Hls.isSupported()) {
                const hls = new Hls()
                hls.loadSource(src)
                hls.attachMedia(video)
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    video.play()
                })
            } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
                video.src = src
            }
        }, [src])

        return (
            <video
                ref={(el) => {
                    videoRef.current = el
                    if (typeof ref === "function") ref(el)
                    else if (ref) ref.current = el
                }}
                className={className}
                poster={poster}
                controls
                onLoadedMetadata={onLoadedMetadata}
                onTimeUpdate={onTimeUpdate}
            >
                <source src={src} type="application/x-mpegURL" />
                Your browser does not support the video tag.
            </video>
        )
    }
)

HLSVideoPlayer.displayName = "HLSVideoPlayer"

export default HLSVideoPlayer
