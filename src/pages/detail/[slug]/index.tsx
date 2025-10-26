import {useEffect, useState} from "react"
import {GetServerSideProps} from "next"
import Head from "next/head"
import {fetchMovieBySlug, MovieDetailType} from "@/utils/api"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import MovieDetail from "@/components/content/movie-detail"
import MovieDetailLoading from "../loading/loading"

interface MoviePageProps {
    movieData: MovieDetailType | null
}

export const getServerSideProps: GetServerSideProps<MoviePageProps> = async ({params}) => {
    const slug = params?.slug as string
    const movieData = await fetchMovieBySlug(slug)
    if (!movieData) {
        return {notFound: true}
    }

    return {
        props: {movieData},
    }
}

export default function MoviePage({movieData}: MoviePageProps) {
    const [loading, setLoading] = useState(true)
    const title = movieData?.item.name || ""
    const {poster_url, slug} = movieData?.item || {}
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500)
        return () => clearTimeout(timer)
    }, [])

    if (loading) {
        return <MovieDetailLoading/>
    }


    return (
        <div className="flex min-h-screen flex-col bg-[#f8f9fa] dark:bg-gray-900 transition-colors duration-300">
            <Head>
                <title>{`${title} (${movieData?.item.year || "N/A"}) | Xem Full HD Vietsub miễn phí - Gấu Phim`}</title>
                <meta name="robots" content="index, follow"/>
                <link rel="canonical" href={`https://xemphim.gauas.online/detail/${slug}`}/>
                <meta name="description"
                      content={`Xem ${title} (${movieData?.item.year || "N/A"}) Vietsub Full HD miễn phí tại Gấu Phim. Xem trailer, lịch chiếu và đánh giá mới nhất!`}/>
                <meta name="keywords"
                      content={`phim ${title}, phim miễn phí, phim chất lượng cao, trailer ${title}, thông tin phim ${title}, Gấu Flix`}/>
                <meta property="og:title" content={`${title} - Xem phim tại Gấu Flix`}/>
                <meta property="og:description"
                      content={`Xem phim ${title} tại Gấu Flix. Cập nhật thông tin mới nhất về bộ phim, đánh giá, trailer, và các thông tin chi tiết khác.`}/>
                <meta property="og:image"
                      content={poster_url ? `https://img.ophim.live/uploads/movies/${poster_url}` : "https://i.imgur.com/sACJNuE.png"}/>
                <meta property="og:url" content={`https://xemphim.gauas.online/detail/${slug}`}/>
                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content={`${title} - Xem phim tại Gấu Flix`}/>
                <meta name="twitter:description"
                      content={`Xem phim ${title} tại Gấu Flix. Cập nhật thông tin mới nhất về bộ phim, đánh giá, trailer, và các thông tin chi tiết khác.`}/>
                <meta name="twitter:image"
                      content={poster_url ? `https://img.ophim.live/uploads/movies/${poster_url}` : "https://i.imgur.com/sACJNuE.png"}/>

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Movie",
                        "name": title,
                        "url": `https://xemphim.gauas.online/detail/${slug}`,
                        "image": poster_url ? `https://img.ophim.live/uploads/movies/${poster_url}` : "/default-thumbnail.jpg",
                        "datePublished": movieData?.item.year?.toString() || "2024",
                        "duration": movieData?.item.time || "N/A",
                        "genre": movieData?.item.category?.map(cat => cat.name) || [],
                        "actor": movieData?.item.actor?.map(name => ({"@type": "Person", "name": name})) || [],
                        "trailer": movieData?.item.trailer_url ? {
                            "@type": "VideoObject",
                            "name": `Trailer ${title}`,
                            "embedUrl": movieData.item.trailer_url
                        } : null
                    })}
                </script>

            </Head>

            <Header/>

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
                        time={movieData.item.time}
                        category={movieData.item.category}
                        country={movieData.item.country}
                        actors={movieData.item.actor}
                        episodes={movieData.item.episodes}
                        isSeries={movieData.item.episodes[0].server_data.length > 1}
                    />
                )}
            </main>

            <Footer/>
        </div>
    )
}
