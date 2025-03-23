"use client"

import { useState, useEffect } from "react"
import { Star, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import PandaLogo from "./panda-logo"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import LazyLoadComponent from "../layout/lazy-load-component"
import LazyImage from "../layout/lazy-image"
import {useRouter} from "next/router";

interface Pick {
    title: string
    year: string
    poster: string
    description: string
    rating: string
    slug: string
}

interface PandaPicksProps {
    picks: Pick[]
}

export default function PandaPicks({ picks }: PandaPicksProps) {
    const controls = useAnimation()
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })

    useEffect(() => {
        if (inView) {
            controls.start("visible")
        }
    }, [controls, inView])

    return (
        <LazyLoadComponent>
            <section className="py-8 md:py-12 bg-black text-white relative overflow-hidden">
                {/* Animated bamboo pattern */}
                <div className="absolute inset-0 opacity-5">
                    <motion.div
                        className="absolute top-0 left-0 w-full h-full"
                        animate={{
                            backgroundPositionY: ["0%", "100%"],
                        }}
                        transition={{
                            duration: 60,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "loop",
                            ease: "linear",
                        }}
                        style={{
                            backgroundImage:
                                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                            backgroundSize: "30px 30px",
                        }}
                    />
                </div>

                {/* Panda silhouette background */}
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <motion.div
                        className="absolute right-0 top-0 w-1/2 h-full"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
                            <path
                                d="M50,10 C30,10 15,25 15,45 C15,65 30,80 50,80 C70,80 85,65 85,45 C85,25 70,10 50,10 Z M35,35 C38,35 40,37 40,40 C40,43 38,45 35,45 C32,45 30,43 30,40 C30,37 32,35 35,35 Z M65,35 C68,35 70,37 70,40 C70,43 68,45 65,45 C62,45 60,43 60,40 C60,37 62,35 65,35 Z M50,65 C45,65 40,60 40,55 C40,50 45,50 50,50 C55,50 60,50 60,55 C60,60 55,65 50,65 Z"
                                fill="white"
                            />
                        </svg>
                    </motion.div>
                </div>

                <div className="container px-4 md:px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-2 mb-8"
                    >
                        <motion.div
                            animate={{
                                rotate: [0, 10, 0, -10, 0],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "loop",
                                ease: "easeInOut",
                            }}
                        >
                            <PandaLogo className="h-8 w-8 text-white" />
                        </motion.div>
                        <h2 className="text-2xl font-bold">Panda Picks</h2>
                        <motion.div
                            className="ml-2 h-0.5 flex-grow bg-green-600 rounded-full"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            style={{ originX: 0 }}
                        />
                    </motion.div>

                    <motion.div
                        ref={ref}
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.1 } },
                        }}
                        initial="hidden"
                        animate={controls}
                        className="grid grid-cols-1 gap-6 md:grid-cols-3"
                    >
                        {picks.map((pick, index) => (
                            <PickCard key={pick.title} pick={pick} index={index} />
                        ))}
                    </motion.div>

                    {/* Bamboo decoration at bottom */}
                    <div className="mt-8 flex justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <svg width="200" height="30" viewBox="0 0 200 30" className="text-green-600/30">
                                <path d="M0,15 C50,5 150,25 200,15" stroke="currentColor" strokeWidth="2" fill="none" />
                                <path d="M0,15 C50,25 150,5 200,15" stroke="currentColor" strokeWidth="2" fill="none" />
                                {[...Array(10)].map((_, i) => (
                                    <circle key={i} cx={i * 22 + 10} cy="15" r="3" fill="currentColor" />
                                ))}
                            </svg>
                        </motion.div>
                    </div>
                </div>
            </section>
        </LazyLoadComponent>
    )
}

function PickCard({ pick }: { pick: Pick; index: number }) {
    const [isHovered, setIsHovered] = useState(false)
    const router = useRouter()
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            whileHover={{ scale: 1.03 }}
            className={`flex gap-4 p-4 rounded-lg transition-all duration-300 ${isHovered ? "bg-white/10" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative h-24 w-16 flex-shrink-0 overflow-hidden rounded-md" onClick={() => router.push(`../detail/${pick.slug}`)}>
                <LazyImage
                    src={`https://img.ophim.live/uploads/movies/${pick.poster}`}
                    alt={pick.title}
                    fill
                    className="object-cover transition-transform duration-300"
                    style={{ transform: isHovered ? "scale(1.1)" : "scale(1)" }}
                />

                {/* Panda paw print overlay */}
                <motion.div
                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0"
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Button
                        size="sm"
                        variant="secondary"
                        className="h-7 w-7 rounded-full p-0 bg-green-600 hover:bg-green-700 text-white"
                    >
                        <Play className="h-3 w-3" />
                    </Button>
                </motion.div>

                {/* Bamboo frame */}
                <motion.div
                    className="absolute inset-0 border-2 border-green-500/0 pointer-events-none"
                    animate={{ borderColor: isHovered ? "rgba(34, 197, 94, 0.3)" : "rgba(34, 197, 94, 0)" }}
                    transition={{ duration: 0.3 }}
                />
            </div>
            <div className="flex flex-col justify-center">
                <div className="flex items-center">
                    <h3 className="font-medium">{pick.title}</h3>
                    <div className="ml-2 flex items-center text-yellow-400 text-xs">
                        <Star className="h-3 w-3 mr-0.5 fill-yellow-400" />
                        <span>{pick.rating}</span>
                    </div>
                </div>
                <p className="text-sm text-gray-400">{pick.year}</p>
                <p className="mt-1 text-xs text-gray-400 line-clamp-2">{pick.description}</p>

                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-0.5 bg-green-600 mt-2 origin-left"
                />
            </div>
        </motion.div>
    )
}

