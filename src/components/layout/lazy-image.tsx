"use client"

import { useState, useEffect } from "react"
import Image, { type ImageProps } from "next/image"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"

interface LazyImageProps extends Omit<ImageProps, "onLoad"> {
    fadeIn?: boolean
    threshold?: number
    rootMargin?: string
}

export default function LazyImage({
                                      src,
                                      alt,
                                      className,
                                      fadeIn = true,
                                      threshold = 0.1,
                                      rootMargin = "200px 0px",
                                      ...props
                                  }: LazyImageProps) {
    const [isLoaded, setIsLoaded] = useState(false)
    const { ref, inView } = useInView({
        threshold,
        rootMargin,
        triggerOnce: true,
    })

    useEffect(() => {
        if (!fadeIn) {
            setIsLoaded(true)
        }
    }, [fadeIn])

    return (
        <div ref={ref} className="relative overflow-hidden">
            {inView ? (
                <Image
                    src={src || "/placeholder.svg"}
                    alt={alt}
                    className={cn(className, fadeIn && "transition-opacity duration-500", isLoaded ? "opacity-100" : "opacity-0")}
                    onLoadingComplete={() => setIsLoaded(true)}
                    {...props}
                />
            ) : (
                <div
                    className={cn("bg-muted animate-pulse", className)}
                    style={{
                        width: props.width || "100%",
                        height: props.height || "100%",
                    }}
                />
            )}
        </div>
    )
}

