import { useState, useEffect } from "react"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { fetchMovieBySlug, MovieDetailType } from "@/utils/api"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import MovieDetail from "@/components/content/movie-detail"
import MovieDetailLoading from "./loading"

interface MoviePageProps {
    movieData: MovieDetailType | null
}

export const getServerSideProps: GetServerSideProps<MoviePageProps> = async ({ params }) => {
    const slug = params?.slug as string
    const movieData = await fetchMovieBySlug(slug)

    if (!movieData) {
        return { notFound: true }
    }

    return {
        props: { movieData },
    }
}

export default function MoviePage({ movieData }: MoviePageProps) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500) // Giả lập delay loading
        return () => clearTimeout(timer)
    }, [])

    if (loading) {
        return <MovieDetailLoading />
    }

    return (
        <div className="flex min-h-screen flex-col bg-[#f8f9fa] dark:bg-gray-900 transition-colors duration-300">
            <Head>
                <title>{movieData?.item.name} - Xem Phim Online</title>
                <meta name="description" content={movieData?.item.content.substring(0, 150)} />
            </Head>

            <Header />

            <main className="flex-1">
                <div className="container px-4 md:px-6 py-4"></div>

                {movieData && (
                    <MovieDetail
                        name={movieData.item.name}
                        slug={movieData.item.slug}
                        origin_name={movieData.item.origin_name}
                        poster_url={movieData.item.poster_url}
                        thumb_url={movieData.item.thumb_url}
                        year={movieData.item.year}
                        episode_total={movieData.item.episode_total}
                        content={movieData.item.content}
                        category={movieData.item.category}
                        country={movieData.item.country}
                        actors={movieData.item.actor}
                        episodes={movieData.item.episodes}
                        isSeries={movieData.item.episodes[0].server_data.length > 1}
                    />
                )}
            </main>

            <Footer />
        </div>
    )
}
