import {notFound} from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import Breadcrumb from "@/components/layout/breadcrumb"
import PandaVideoPlayer from "@/components/content/player/panda-video-player"
import {fetchMovieBySlug, MovieDetailType} from "@/utils/api"
import {GetServerSideProps} from "next"
import Head from "next/head"
import axios from "axios";
import {parse} from "cookie";
import {useEffect, useState} from "react";

interface MoviePageProps {
    movieData: MovieDetailType | null
    episodeNumber: string
}

export const getServerSideProps: GetServerSideProps<MoviePageProps> = async ({req, params, query}) => {
    const slug = params?.slug as string
    const episodeNumber = query.ep ? (query.ep as string) : "1";


    const movieData = await fetchMovieBySlug(slug)

    if (!movieData) {
        return {
            notFound: true,
        }
    }
    const cookies = parse(req.headers.cookie || "");
    const access_token = cookies.access_token;
    if (access_token) {
        try {
            await axios.post(`${process.env.SERVERSIDE_API}/api/gauflix/history`, {
                title: movieData.item.name,
                slug: movieData.item.slug,
                poster_url: movieData.item.poster_url,
                movie_episode: episodeNumber,
            }, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
        } catch (error) {
            console.error('Failed to update history:', {
                    error
                }
            );
        }
    }
    return {
        props: {
            movieData,
            episodeNumber,
        },
    }
}

export default function WatchPage({movieData, episodeNumber}: MoviePageProps) {
    if (!movieData) {
        notFound()
    }
    const [showWarning, setShowWarning] = useState(true);
    const episodes = movieData.item.episodes && movieData.item.episodes.length > 0 ? movieData.item.episodes[0].server_data : []

    if (episodes.length === 0) {
        notFound()
    }

    useEffect(() => {
        const timer = setTimeout(() => setShowWarning(false), 30000);
        return () => clearTimeout(timer);
    }, []);

    const movieItemData = movieData.item
    const currentEpisode = episodes.find((ep) => ep.name === episodeNumber) || episodes[0]
    const {name: title, poster_url, slug} = movieItemData
    return (
        <div className="flex min-h-screen flex-col bg-[#f8f9fa] dark:bg-gray-900 transition-colors duration-300">
            <Head>
                <title>{`${title} Tập ${episodeNumber} - Vietsub Full HD | Gấu Flix`}</title>
                <meta name="description"
                      content={`Xem ${title} tập ${episodeNumber} Vietsub Full HD miễn phí tại Gấu Flix. Cập nhật nhanh, xem ngay!`}/>
                <meta name="keywords"
                      content={`Xem phim ${title} tập ${episodeNumber} Vietsub, Full HD, ${title} ${episodeNumber}, ${title} online miễn phí, Gấu Flix`}/>
                <meta name="robots" content="index, follow"/>
                {episodeNumber === "1" && (
                    <link rel="canonical" href={`https://gauphim.daudoo.com/watch/${slug}`}/>
                )}

                <meta property="og:title" content={`${title} - Tập ${episodeNumber} - Xem phim tại Gấu Flix`}/>
                <meta property="og:description"
                      content={`Xem ngay ${title} - Tập ${episodeNumber} trên Gấu Flix. Phim chất lượng cao, hỗ trợ Vietsub, miễn phí 100%!`}/>
                <meta property="og:type" content="video.episode"/>
                <meta property="og:image"
                      content={poster_url ? `https://img.ophim.live/uploads/movies/${poster_url}` : "https://i.imgur.com/sACJNuE.png"}/>
                <meta property="og:image:alt" content={`Poster phim ${title}`}/>
                <meta property="og:image:width" content="1200"/>
                <meta property="og:image:height" content="630"/>

                {currentEpisode?.link_m3u8 && (
                    <>
                        <meta property="og:video" content={currentEpisode.link_m3u8}/>
                        <meta property="og:video:type" content="application/x-mpegURL"/>
                        <meta property="og:video:width" content="1280"/>
                        <meta property="og:video:height" content="720"/>
                    </>
                )}
                <meta property="og:url" content={`https://gauphim.daudoo.com/watch/${slug}?ep=${episodeNumber}`}/>

                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content={`${title} - Tập ${episodeNumber} - Xem phim tại Gấu Flix`}/>
                <meta name="twitter:description"
                      content={`Thưởng thức ${title} - Tập ${episodeNumber} với chất lượng Full HD tại Gấu Flix. Xem miễn phí ngay hôm nay!`}/>
                <meta name="twitter:image" content={`https://img.ophim.live/uploads/movies/${poster_url}`}/>

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "VideoObject",
                        "name": `${title} - Tập ${episodeNumber}`,
                        "description": `Xem phim ${title} tập ${episodeNumber} Vietsub, Full HD miễn phí tại Gấu Flix.`,
                        "thumbnailUrl": `https://img.ophim.live/uploads/movies/${poster_url}`,
                        "uploadDate": new Date().toISOString(),
                        "contentUrl": currentEpisode.link_m3u8,
                        "embedUrl": `https://gauphim.daudoo.com/watch/${slug}?ep=${episodeNumber}`,
                        "publisher": {
                            "@type": "Organization",
                            "name": "Gấu Flix",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://i.imgur.com/sACJNuE.png"
                            }
                        }
                    })}
                </script>
            </Head>
            <Header/>
            <main className="flex-1">
                <div className="container px-4 md:px-6 py-4 text-sm sm:text-xl md:text-2xl">
                    <Breadcrumb
                        items={[
                            {label: "Phim", href: "../list/phim-moi"},
                            {label: movieItemData.name, href: `/detail/${movieItemData.slug}`},
                            {label: `Tập ${currentEpisode.name}`},
                        ]}
                    />
                </div>

                <div className="container px-0 md:px-6 py-4">
                    <div className="px-4 md:px-0">
                        <h1 className="text-xl md:text-2xl font-bold mb-4">
                            {movieItemData.name} - Tập {currentEpisode.name}
                        </h1>
                    </div>
                    <div className="relative mx-0 md:w-full">
                        <PandaVideoPlayer
                            title={`${movieItemData.name} - Tập ${currentEpisode.name}`}
                            poster={movieItemData.poster_url}
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
                </div>
                {showWarning && (
                    <div className=" my-4 px-4 py-3 border-l-4 text-sm md:text-base rounded shadow-lg bg-green-500 dark:bg-green-700 text-white dark:text-green-200 opacity-100 animate-pulse md:mx-2">
                        <strong>⚠️ Cảnh báo:</strong> Hiện nay khi xem phim ở một số bộ phim có hiển thị đường dẫn không rõ nguồn gốc chạy ngang qua, mọi người tuyệt đối không truy cập vào các đường link lạ đó nhen. Gấu đang nỗ lực khắc phục vấn đề này, cảm ơn các bạn iu của Gấu ^^.
                    </div>
                )}

            </main>

            <Footer/>
        </div>
    )
}
