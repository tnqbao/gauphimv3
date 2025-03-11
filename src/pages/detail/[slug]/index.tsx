import { GetServerSideProps } from "next"
import { fetchMovieBySlug, MovieDetailType } from "@/utils/api"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import MovieDetail from "@/components/content/movie-detail"
import {notFound} from "next/navigation";

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
        props: { movieData }
    }
}

export default function MoviePage({ movieData }: MoviePageProps) {
    if (!movieData) {
        return notFound()
    }

    return (
        <div className="flex min-h-screen flex-col bg-[#f8f9fa] dark:bg-gray-900 transition-colors duration-300">
            <Header />

            <main className="flex-1">
                <div className="container px-4 md:px-6 py-4">
                </div>

                <MovieDetail
                    name={movieData.item.name}
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
                    isSeries={movieData.item.episodes[0].server_data.length > 1 }
                />
            </main>

            <Footer />
        </div>
    )
}
