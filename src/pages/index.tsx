import {useEffect, useState, Suspense, lazy} from "react"
import Head from 'next/head'
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
import {FirstVisitNotice} from "@/components/layout/notice/first-visited-notice";

const Hero = lazy(() => import("@/components/layout/hero"))
const Categories = lazy(() => import("@/components/content/categories"))
const MovieSection = lazy(() => import("@/components/content/movie-section"))
const PandaPicks = lazy(() => import("@/components/content/panda-picks"))
const Footer = lazy(() => import("@/components/layout/footer"))
const FloatingLeaves = lazy(() => import("@/components/content/floating-leaves"))

interface Movie {
    title: string
    name: string
    year: string
    slug: string
    description?: string
}


export default function HomePage() {
    const [trendingMovies, setTrendingMovies] = useState([])
    const [newReleases, setNewReleases] = useState([])
    const [singleMovies, setSingleMovies] = useState([])
    const [series, setSeries] = useState([])
    const [catoons, setCatoons] = useState([])
    const [pandaPicks, setPandaPicks] = useState([])

    const categories = [
        {name: "Hành Động", image: "https://i.imgur.com/AoTce5E.jpeg", slug: "hanh-dong"},
        {name: "Hài", image: "https://i.imgur.com/AGaIiRo.jpeg", slug: "hai-huoc"},
        {name: "Cổ Trang", image: "https://img.ophim.live/uploads/movies/quyen-sung-poster.jpg", slug: "co-trang"},
        {name: "Kinh Dị", image: "https://i.imgur.com/ChWVQ75.png", slug: "kinh-di"},
        {name: "Viễn Tưởng", image: "https://i.imgur.com/ny54LpZ.jpeg", slug: "vien-tuong"},
        {name: "Gia Đình", image: "https://i.imgur.com/thnZiRO.jpeg", slug: "gia-dinh"},
    ]

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const {data} = await axios.get("/api/home-page");
                setTrendingMovies(
                    data.featured.map((movie: Movie) => ({
                        title: movie.name,
                        year: movie.year,
                        slug: movie.slug,
                        rating: "N/A",
                        poster_url: `${movie.slug}-poster.jpg`,
                        thumb_url: `${movie.slug}-thumb.jpg`
                    }))
                )

                setNewReleases(
                    data.release.map((movie: Movie) => ({
                        title: movie.title,
                        // name: movie.
                        year: movie.year,
                        slug: movie.slug,
                        rating: "N/A",
                        poster_url: `${movie.slug}-poster.jpg`,
                        thumb_url: `${movie.slug}-thumb.jpg`
                    }))
                )

                setSingleMovies(
                    data.single.map((movie: Movie) => ({
                        title: movie.title,
                        year: movie.year,
                        slug: movie.slug,
                        rating: "N/A",
                        poster_url: `${movie.slug}-poster.jpg`,
                        thumb_url: `${movie.slug}-thumb.jpg`
                    }))
                )

                setSeries(
                    data.series.map((movie: Movie) => ({
                        title: movie.title,
                        year: movie.year,
                        slug: movie.slug,
                        rating: "N/A",
                        poster_url: `${movie.slug}-poster.jpg`,
                        thumb_url: `${movie.slug}-thumb.jpg`
                    }))
                )

                setCatoons(
                    data.cartoon.map((movie: Movie) => ({
                        title: movie.title,
                        year: movie.year,
                        slug: movie.slug,
                        rating: "N/A",
                        poster_url: `${movie.slug}-poster.jpg`,
                        thumb_url: `${movie.slug}-thumb.jpg`
                    }))
                )

                setPandaPicks(
                    data.hero.map((movie: Movie) => ({
                        title: movie.name,
                        name: movie.name,
                        description: movie.description,
                        year: movie.year,
                        poster: `${movie.slug}-thumb.jpg`,
                        rating: "8.5",
                        slug: movie.slug
                    }))
                )
            } catch (error) {
                console.error("Lỗi khi fetch API:", error)
            }
        }

        fetchMovies()
    }, [])

    return (
        <div
            className="flex min-h-screen flex-col bg-[#f8f9fa] dark:bg-gray-900 overflow-hidden transition-colors duration-300">
            <Head>
                <title>Gấu Phim - Xem Phim Online Full HD, Miễn Phí</title>
                <meta name="description"
                      content="Gấu Phim - Website xem phim online miễn phí với chất lượng cao, cập nhật nhanh chóng phim mới, phim hành động, kinh dị, hài hước, chiếu rạp hot nhất."/>
                <meta name="keywords"
                      content="xem phim, phim mới, phim hay, phim hành động, phim chiếu rạp, phim kinh dị, phim tình cảm"/>
                <meta name="robots" content="index, follow"/>

                <meta property="og:title" content="Gấu Phim - Xem Phim Online Full HD, Miễn Phí"/>
                <meta property="og:description" content="Xem phim online miễn phí, cập nhật phim mới nhanh nhất!"/>
                <meta property="og:image" content="https://i.imgur.com/sACJNuE.png"/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://xemphim.gauas.online/"/>

                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content="Gấu Phim - Xem Phim Online Chất Lượng Cao"/>
                <meta name="twitter:description" content="Cập nhật nhanh phim chiếu rạp hot nhất!"/>
                <meta name="twitter:image" content="https://i.imgur.com/YvZjVti.png"/>

                <link rel="canonical" href="https://xemphim.gauas.online/"/>

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "VideoStreamingService",
                        "name": "Gấu Phim",
                        "url": "https://xemphim.gauas.online/",
                        "description": "Xem phim online miễn phí với chất lượng cao, phim hành động, kinh dị, tình cảm hấp dẫn nhất.",
                        "image": "https://i.imgur.com/sACJNuE.png",
                        "publisher": {
                            "@type": "Organization",
                            "name": "Gấu Phim",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://i.imgur.com/YvZjVti.png"
                            }
                        },
                        "potentialAction": {
                            "@type": "SearchAction",
                            "target": "https://xemphim.gauas.online/search?q={search_term_string}",
                            "query-input": "required name=search_term_string"
                        }
                    })}
                </script>
            </Head>
            <ThemeEffects/>
            <BambooDecoration/>
            <Suspense fallback={null}>
                <FloatingLeaves/>
            </Suspense>
            <PandaScrollProgress/>
            <Header/>

            <Suspense fallback={<HeroSkeleton/>}>
                <Hero picks={pandaPicks}/>
            </Suspense>

            <Suspense fallback={<CategorySkeleton/>}>
                <Categories categories={categories}/>
            </Suspense>

            <Suspense fallback={<MovieSectionSkeleton/>}>
                <MovieSection title="Phim Nổi Bật" movies={trendingMovies} bgColor="bg-white dark:bg-gray-800"
                              pageSlug={"phim-moi"}/>
            </Suspense>

            <Suspense fallback={<MovieSectionSkeleton/>}>
                <MovieSection title="Phim Mới Hay Nhất" movies={newReleases} bgColor="bg-[#f8f9fa] dark:bg-gray-900"
                              pageSlug={"phim-moi"}/>
            </Suspense>


            <Suspense fallback={<MovieSectionSkeleton/>}>
                <MovieSection title="Phim Bộ Mới Ra" movies={series} bgColor="bg-[#f8f9fa] dark:bg-gray-900"
                              pageSlug={"phim-bo"}/>
            </Suspense>

            <Suspense fallback={<MovieSectionSkeleton/>}>
                <MovieSection title="Phim Lẻ Mới Nhất" movies={singleMovies} bgColor="bg-white dark:bg-gray-800"
                              pageSlug={"phim-le"}/>
            </Suspense>

            <Suspense fallback={<MovieSectionSkeleton/>}>
                <MovieSection title="Hoạt Hình" movies={catoons} bgColor="bg-white dark:bg-gray-800"
                              pageSlug={"hoat-hinh"}/>
            </Suspense>

            <Suspense fallback={<PandaPicksSkeleton/>}>
                <PandaPicks picks={pandaPicks}/>
            </Suspense>

            <Suspense fallback={<FooterSkeleton/>}>
                <Footer/>
            </Suspense>
            <FirstVisitNotice/>
        </div>
    )
}
