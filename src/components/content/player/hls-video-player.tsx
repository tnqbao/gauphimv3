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
    onDoubleClick: (event: React.MouseEvent<HTMLDivElement>) => void
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void
}

const HLSVideoPlayer = forwardRef<HTMLVideoElement, HLSVideoPlayerProps>(
    function HLSVideoPlayerComponent(
        { src, poster, className, onLoadedMetadata, onTimeUpdate, onTouchStart, onTouchEnd, onDoubleClick, onClick },
        ref
    ) {
        const videoRef = useRef<HTMLVideoElement | null>(null)

        useEffect(() => {
            const video = videoRef.current
            if (!video) return

            let hls: Hls | null = null

            if (Hls.isSupported()) {
                hls = new Hls()
                hls.loadSource(src)
                hls.attachMedia(video)
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    video.play()
                })
            } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
                video.src = src
            }

            return () => {
                if (hls) {
                    hls.destroy()
                }
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

                if (videoRef.current && time >= 4862 && time < 4899) {
                    videoRef.current.currentTime = 4899;
                }
            }, 500)

            return () => clearInterval(interval)
        }, [])


        return (
            <div
                className="relative w-full h-full"
                onDoubleClick={onDoubleClick}
                onClick={onClick}
            >
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
                />
            </div>
        )
    }
)

HLSVideoPlayer.displayName = "HLSVideoPlayer"

export default HLSVideoPlayer
