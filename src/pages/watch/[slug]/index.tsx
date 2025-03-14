import { notFound } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import Breadcrumb from "@/components/layout/breadcrumb"
import PandaVideoPlayer from "@/components/content/player/panda-video-player"
import { fetchMovieBySlug, MovieDetailType } from "@/utils/api"
import { GetServerSideProps } from "next"
import Head from "next/head"

interface MoviePageProps {
    movieData: MovieDetailType | null
    episodeNumber: string
}

export const getServerSideProps: GetServerSideProps<MoviePageProps> = async ({ params, query }) => {
    const slug = params?.slug as string
    const episodeNumber = query.ep ? (query.ep as string) : "1";  // Default to string "1"

    const movieData = await fetchMovieBySlug(slug)

    if (!movieData) {
        return { notFound: true }
    }

    return {
        props: {
            movieData,
            episodeNumber,
        },
    }
}

export default function WatchPage({ movieData, episodeNumber }: MoviePageProps) {
    if (!movieData) {
        notFound()
    }

    const episodes = movieData.item.episodes && movieData.item.episodes.length > 0 ? movieData.item.episodes[0].server_data : []

    if (episodes.length === 0) {
        notFound()
    }

    const movieItemData = movieData.item
    const currentEpisode = episodes.find((ep) => ep.name === episodeNumber) || episodes[0]

    return (
        <div className="flex min-h-screen flex-col bg-[#0a0a0a] text-white">
            <Head>
                <title>{`${movieItemData.name} - Tập ${currentEpisode.name}`}</title>
            </Head>
            <Header />
            <main className="flex-1">
                <div className="container px-4 md:px-6 py-4">
                    <Breadcrumb
                        items={[
                            { label: "Phim", href: "/phim" },
                            { label: movieItemData.name, href: `/phim/${movieItemData.slug}` },
                            { label: `Tập ${currentEpisode.name}` },
                        ]}
                    />
                </div>

                <div className="container px-4 md:px-6 py-4">
                    <h1 className="text-xl md:text-2xl font-bold mb-4">
                        {movieItemData.name} - Tập {currentEpisode.name}
                    </h1>

                    <PandaVideoPlayer
                        title={`${movieItemData.name} - Tập ${currentEpisode.name}`}
                        poster={movieItemData.thumb_url}
                        source={currentEpisode.link_m3u8}
                        episodes={episodes}
                        currentEpisode={currentEpisode.name}
                        movieSlug={movieItemData.slug}
                        movieInfo={{
                            name: movieItemData.name,
                            year: movieItemData.year.toString(),
                            categories: movieItemData.category,
                            description: movieItemData.content,
                        }}
                    />
                </div>
            </main>

            <Footer />
        </div>
    )
}
