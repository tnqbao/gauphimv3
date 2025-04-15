import { forwardRef, useEffect, useRef } from "react"
import Hls from "hls.js"

interface HLSVideoPlayerProps {
    src: string
    poster: string
    className?: string
    onLoadedMetadata?: () => void
    onTimeUpdate?: () => void
    onTouchStart: () => void
    onTouchEnd: () => void
    onDoubleClick: () => void
}

const HLSVideoPlayer = forwardRef<HTMLVideoElement, HLSVideoPlayerProps>(
    function HLSVideoPlayerComponent(
        { src, poster, className, onLoadedMetadata, onTimeUpdate, onTouchStart, onTouchEnd, onDoubleClick },
        ref
    ) {
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

        useEffect(() => {

            const interval = setInterval(() => {
                const time = videoRef.current?.currentTime || 0
                const duration = videoRef.current?.duration || 0
                    if (videoRef.current && duration > 633 && time >= 596 && time < 633) {
                        videoRef.current.currentTime = 633
                    }
                    if (videoRef.current && duration < 633 - 2 && time >= 633) {
                        videoRef.current.currentTime = duration
                    }

                    if (videoRef.current && time >= 2429 && time < 2466) {
                        videoRef.current.currentTime = 2466
                    }
            }, 500)

            return () => clearInterval(interval)
        }, [])


        return (
            <video
                ref={(el) => {
                    videoRef.current = el
                    if (typeof ref === "function") ref(el)
                    else if (ref) ref.current = el
                }}
                className={className}
                poster={poster}
                onLoadedMetadata={onLoadedMetadata}
                onTimeUpdate={onTimeUpdate}
                onTouchStart={() => videoRef.current && onTouchStart()}
                onTouchEnd={() => videoRef.current && onTouchEnd()}
                onDoubleClick={() => videoRef.current && onDoubleClick()}
            >
                <source src={src} type="application/x-mpegURL" />
                Your browser does not support the video tag.
            </video>
        )
    }
)

HLSVideoPlayer.displayName = "HLSVideoPlayer"

export default HLSVideoPlayer
