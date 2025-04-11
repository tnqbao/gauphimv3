import {useEffect, useState} from "react"
import Image from "next/image"
import {Info, Play, Plus} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {AnimatePresence, motion} from "framer-motion"
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

export default function Hero({picks}: PandaPicksProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % picks.length)
        }, 8000)

        return () => clearInterval(interval)
    }, [picks])

    const currentMovie = picks.length > 0 ? picks[currentIndex] : null
    const router = useRouter();
    return (
        <section className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 z-10"/>

            <div className="absolute inset-0 z-[5] opacity-10 pointer-events-none">
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid slice"
                    className="absolute right-0 bottom-0 w-1/2 h-auto"
                >
                    <path
                        d="M50,10 C30,10 15,25 15,45 C15,65 30,80 50,80 C70,80 85,65 85,45 C85,25 70,10 50,10 Z M35,35 C38,35 40,37 40,40 C40,43 38,45 35,45 C32,45 30,43 30,40 C30,37 32,35 35,35 Z M65,35 C68,35 70,37 70,40 C70,43 68,45 65,45 C62,45 60,43 60,40 C60,37 62,35 65,35 Z M50,65 C45,65 40,60 40,55 C40,50 45,50 50,50 C55,50 60,50 60,55 C60,60 55,65 50,65 Z"
                        fill="white"
                    />
                </svg>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 1}}
                    className="absolute inset-0"
                >
                    <Image
                        src={currentMovie?.slug
                            ? `https://img.ophim.live/uploads/movies/${currentMovie.slug}-poster.jpg`
                            : "/placeholder.svg"}
                        alt={currentMovie?.title || "Placeholder"}
                        fill
                        className="object-cover"
                        priority
                        unoptimized
                    />
                </motion.div>
            </AnimatePresence>

            <div className="container relative z-20 flex h-full flex-col items-start justify-center gap-4 px-4 md:px-6">
                <AnimatePresence mode="wait">
                    {currentMovie && (
                        <motion.div
                            key={currentMovie.slug}
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -20}}
                            transition={{duration: 0.5}}
                            className="max-w-[800px]"
                        >
                            <motion.div initial={{scale: 0}} animate={{scale: 1}} transition={{delay: 0.3, type: "spring"}}>
                                <Badge className="bg-green-600 hover:bg-green-700 mb-4">{currentMovie.year}</Badge>
                            </motion.div>

                            <motion.h1
                                className="text-lg sm:text-3xl font-bold text-white md:text-4xl lg:text-5xl mb-4"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.1, duration: 0.5}}
                            >
                                {currentMovie.title}
                            </motion.h1>

                            <motion.p
                                className="max-w-[600px] text-md text-white md:text-xl mb-6"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.2, duration: 0.5}}
                            >
                                {currentMovie.description}
                            </motion.p>

                            <motion.div
                                className="flex gap-4 flex-wrap"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.3, duration: 0.5}}
                            >
                                <Button
                                    className="bg-green-600 hover:bg-green-700 transition-all hover:scale-105"
                                    onClick={() => router.push(`../watch/${currentMovie.slug}`)}
                                >
                                    <Play className="mr-2 h-4 w-4"/> Xem ngay
                                </Button>
                                <Button
                                    className="text-black border-white hover:bg-white/20 transition-all hover:scale-105 bg-white/50 hover:text-white"
                                >
                                    <Plus className="mr-2 h-4 w-4"/> Thêm vào danh sách
                                </Button>
                                <Button
                                    className="text-black border-white hover:bg-white/20 transition-all hover:scale-105 bg-white/50 hover:text-white"
                                    onClick={() => router.push(`../detail/${currentMovie.slug}`)}
                                >
                                    <Info className="mr-2 h-4 w-4"/> Thông tin
                                </Button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                    {picks.map((_, index) => (
                        <button key={index} className="group relative" onClick={() => setCurrentIndex(index)}>
                            <motion.div
                                className={`w-2 h-2 rounded-full transition-all ${
                                    index === currentIndex ? "bg-white w-6" : "bg-white/50"
                                }`}
                                whileHover={{scale: 1.5}}
                            />
                            {index === currentIndex && (
                                <motion.div
                                    className="absolute -top-1 -left-1 -right-1 -bottom-1 rounded-full border border-white/50 animate-ping"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{duration: 1, repeat: Number.POSITIVE_INFINITY}}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    )
}