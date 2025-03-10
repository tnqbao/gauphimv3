"use client"

import { type ReactNode, useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import PandaLoading from "./panda-loading"

interface LazyLoadComponentProps {
    children: ReactNode
    placeholder?: ReactNode
    threshold?: number
    rootMargin?: string
}

export default function LazyLoadComponent({
                                              children,
                                              placeholder = <PandaLoading />,
                                              threshold = 0.1,
                                              rootMargin = "200px 0px",
                                          }: LazyLoadComponentProps) {
    const [isLoaded, setIsLoaded] = useState(false)
    const { ref, inView } = useInView({
        threshold,
        rootMargin,
        triggerOnce: true,
    })

    useEffect(() => {
        if (inView && !isLoaded) {
            setIsLoaded(true)
        }
    }, [inView, isLoaded])

    return (
        <div ref={ref} className="w-full">
            {isLoaded ? children : placeholder}
        </div>
    )
}

