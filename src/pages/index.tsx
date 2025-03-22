import { useEffect, useState, Suspense, lazy } from "react"
import Header from "@/components/layout/header"
import {
    HeroSkeleton,
    CategorySkeleton,
    MovieSectionSkeleton,
    PandaPicksSkeleton,
    FooterSkeleton,
} from "@/components/content/loading/loading-skeletons"
import BambooDecoration from "@/components/content/bamboo-decoration"
import PandaScrollProgress from "@/components/content/panda-scroll-progress"
import ThemeEffects from "@/components/content/theme-effects"
import axios from "axios";

const Hero = lazy(() => import("@/components/layout/hero"))
const Categories = lazy(() => import("@/components/content/categories"))
const MovieSection = lazy(() => import("@/components/content/movie-section"))
const PandaPicks = lazy(() => import("@/components/content/panda-picks"))
const Footer = lazy(() => import("@/components/layout/footer"))
const FloatingLeaves = lazy(() => import("@/components/content/floating-leaves"))

interface Movie {
    name: string
    year: string
    slug: string
    description?: string
}


export default function HomePage() {
    const [trendingMovies, setTrendingMovies] = useState([])
    const [newReleases, setNewReleases] = useState([])
    const [pandaPicks, setPandaPicks] = useState([])

    const categories = [
        { name: "Hành Động", image: "https://i.imgur.com/AoTce5E.jpeg", slug: "hanh-dong" },
        { name: "Hài", image: "https://i.imgur.com/AGaIiRo.jpeg" , slug: "hai-huoc"},
        { name: "Drama", image: "https://i.imgur.com/nmdPlNK.jpeg", slug: "chinh-kich" },
        { name: "Kinh Dị", image: "https://i.imgur.com/ChWVQ75.png", slug : "kinh-di" },
        { name: "Sci-Fi", image: "https://i.imgur.com/ny54LpZ.jpeg", slug: "vien-tuong" },
        { name: "Gia Đình", image: "https://i.imgur.com/thnZiRO.jpeg" , slug: "gia-dinh"},
    ]

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const { data } = await axios.get("{process.env.NEXT_PUBLIC_SERVERSIDE_API}/api/gauflix/home-page")

                setTrendingMovies(
                    data.featured.map((movie: Movie) => ({
                        title: movie.name,
                        year: movie.year,
                        slug: movie.slug,
                        rating: "N/A",
                        poster_url: `https://img.ophim.live/uploads/movies/${movie.slug}-poster.jpg`,
                        thumb_url: `https://img.ophim.live/uploads/movies/${movie.slug}-thumb.jpg`
                    }))
                )

                setNewReleases(
                    data.release.map((movie: Movie) => ({
                        title: movie.name,
                        year: movie.year,
                        slug: movie.slug,
                        rating: "N/A",
                        poster_url: `https://img.ophim.live/uploads/movies/${movie.slug}-poster.jpg`,
                        thumb_url: `https://img.ophim.live/uploads/movies/${movie.slug}-thumb.jpg`
                    }))
                )

                setPandaPicks(
                    data.hero.map((movie: Movie) => ({
                        title: movie.name,
                        description: movie.description,
                        year: "2025",
                        poster: `https://img.ophim.live/uploads/movies/${movie.slug}-thumb.jpg`,
                        rating: "8.5",
                    }))
                )
            } catch (error) {
                console.error("Lỗi khi fetch API:", error)
            }
        }

        fetchMovies()
    }, [])

    return (
        <div className="flex min-h-screen flex-col bg-[#f8f9fa] dark:bg-gray-900 overflow-hidden transition-colors duration-300">
            <ThemeEffects />
            <BambooDecoration />
            <Suspense fallback={null}>
                <FloatingLeaves />
            </Suspense>
            <PandaScrollProgress />
            <Header />

            <Suspense fallback={<HeroSkeleton />}>
                <Hero />
            </Suspense>
            <Suspense fallback={<CategorySkeleton />}>
                <Categories categories={categories} />
            </Suspense>

            <Suspense fallback={<MovieSectionSkeleton />}>
                <MovieSection title="Phim Nổi Bật" movies={trendingMovies} bgColor="bg-white dark:bg-gray-800" pageSlug={"phim-noi-bat"}/>
            </Suspense>

            <Suspense fallback={<MovieSectionSkeleton />}>
                <MovieSection title="Phim Mới Ra" movies={newReleases} bgColor="bg-[#f8f9fa] dark:bg-gray-900" pageSlug={"phim-moi"}/>
            </Suspense>

            <Suspense fallback={<PandaPicksSkeleton />}>
                <PandaPicks picks={pandaPicks} />
            </Suspense>

            <Suspense fallback={<FooterSkeleton />}>
                <Footer />
            </Suspense>
        </div>
    )
}
