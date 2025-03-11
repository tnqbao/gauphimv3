// import { Suspense } from "react"
// import { notFound } from "next/navigation"
// import Header from "@/components/layout/header"
// import Footer from "@/components/layout/footer"
// import Breadcrumb from "@/components/layout/breadcrumb"
// import VideoPlayer from "@/components/content/video-player"
// import EpisodeList from "@/components/content/episode-list"
// import { MovieSectionSkeleton } from "@/components/layout/loading-skeletons"
//
// // Sample movie data
// const movieData = {
//     title: "Vương Quốc Gấu Trúc",
//     originalTitle: "Panda Kingdom",
//     slug: "vuong-quoc-gau-truc",
//     poster: "/placeholder.svg?height=600&width=400",
//     thumbnail: "/placeholder.svg?height=300&width=500",
//     releaseYear: "2023",
//     duration: "120 phút",
//     rating: "8.7",
//     description:
//         "Trong một vương quốc kỳ diệu nơi gấu trúc cai trị, một chú gấu trúc nhỏ phải học cách trở thành nhà lãnh đạo và cứu người dân của mình khỏi mối đe dọa ngày càng tăng.",
//     categories: [
//         { name: "Hành Động", slug: "hanh-dong" },
//         { name: "Phiêu Lưu", slug: "phieu-luu" },
//         { name: "Hoạt Hình", slug: "hoat-hinh" },
//     ],
//     episodes: [
//         {
//             number: 1,
//             title: "Khởi Đầu Vương Quốc",
//             duration: "45 phút",
//             thumbnail: "/placeholder.svg?height=150&width=250",
//         },
//         { number: 2, title: "Mối Đe Dọa", duration: "42 phút", thumbnail: "/placeholder.svg?height=150&width=250" },
//         {
//             number: 3,
//             title: "Cuộc Hành Trình Bắt Đầu",
//             duration: "44 phút",
//             thumbnail: "/placeholder.svg?height=150&width=250",
//         },
//         { number: 4, title: "Người Bạn Mới", duration: "46 phút", thumbnail: "/placeholder.svg?height=150&width=250" },
//         { number: 5, title: "Rừng Tre Bí Ẩn", duration: "43 phút", thumbnail: "/placeholder.svg?height=150&width=250" },
//         { number: 6, title: "Kẻ Thù Cũ", duration: "45 phút", thumbnail: "/placeholder.svg?height=150&width=250" },
//         { number: 7, title: "Bí Mật Vương Triều", duration: "47 phút", thumbnail: "/placeholder.svg?height=150&width=250" },
//         {
//             number: 8,
//             title: "Trận Chiến Đầu Tiên",
//             duration: "48 phút",
//             thumbnail: "/placeholder.svg?height=150&width=250",
//         },
//         { number: 9, title: "Sức Mạnh Thật Sự", duration: "44 phút", thumbnail: "/placeholder.svg?height=150&width=250" },
//         {
//             number: 10,
//             title: "Vương Quốc Trong Nguy Hiểm",
//             duration: "50 phút",
//             thumbnail: "/placeholder.svg?height=150&width=250",
//         },
//         { number: 11, title: "Đồng Minh Bất Ngờ", duration: "45 phút", thumbnail: "/placeholder.svg?height=150&width=250" },
//         {
//             number: 12,
//             title: "Trận Chiến Cuối Cùng",
//             duration: "55 phút",
//             thumbnail: "/placeholder.svg?height=150&width=250",
//         },
//     ],
//     isSeries: true,
//     currentEpisode: 1,
// }

interface WatchPageProps {
    params: {
        slug: string
    }
    searchParams: {
        ep?: string
    }
}

export default function WatchPage({  }: WatchPageProps) {
    // const slug  = "conan";
    // const episodeNumber = searchParams.ep ? Number.parseInt(searchParams.ep) : 1

    // In a real app, you would fetch the movie data based on the slug
    // For this example, we'll just check if the slug matches our sample data
    // if (slug !== movieData.slug) {
    //     notFound()
    // }

    // Find the current episode
    // const currentEpisode = movieData.episodes.find((ep) => ep.number === episodeNumber) || movieData.episodes[0]

    return (
        <div>
        {/*// <div className="flex min-h-screen flex-col bg-[#0a0a0a] text-white">*/}
        {/*//     <Header />*/}

        {/*    <main className="flex-1">*/}
        {/*        <div className="container px-4 md:px-6 py-4">*/}
        {/*            <Breadcrumb*/}
        {/*                items={[*/}
        {/*                    { label: "Phim", href: "/phim" },*/}
        {/*                    { label: movieData.title, href: `/phim/${movieData.slug}` },*/}
        {/*                    { label: `Tập ${currentEpisode.number}: ${currentEpisode.title}` },*/}
        {/*                ]}*/}
        {/*            />*/}
        {/*        </div>*/}

        {/*        <Suspense fallback={<MovieSectionSkeleton />}>*/}
        {/*            <div className="container px-4 md:px-6 py-4">*/}
        {/*                <h1 className="text-xl md:text-2xl font-bold mb-2">*/}
        {/*                    {movieData.title} - Tập {currentEpisode.number}: {currentEpisode.title}*/}
        {/*                </h1>*/}

        {/*                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">*/}
        {/*                    <div className="lg:col-span-2">*/}
        {/*                        <VideoPlayer*/}
        {/*                            title={`${movieData.title} - Tập ${currentEpisode.number}`}*/}
        {/*                            poster={currentEpisode.thumbnail}*/}
        {/*                            sources={[*/}
        {/*                                { src: "https://example.com/video.mp4", quality: "1080p" },*/}
        {/*                                { src: "https://example.com/video-720.mp4", quality: "720p" },*/}
        {/*                                { src: "https://example.com/video-480.mp4", quality: "480p" },*/}
        {/*                            ]}*/}
        {/*                        />*/}

        {/*                        <div className="mt-4 flex flex-wrap gap-2">*/}
        {/*                            {movieData.categories.map((category) => (*/}
        {/*                                <a*/}
        {/*                                    key={category.slug}*/}
        {/*                                    href={`/category/${category.slug}`}*/}
        {/*                                    className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-full text-sm transition-colors"*/}
        {/*                                >*/}
        {/*                                    {category.name}*/}
        {/*                                </a>*/}
        {/*                            ))}*/}
        {/*                        </div>*/}

        {/*                        <div className="mt-6">*/}
        {/*                            <h2 className="text-lg font-medium mb-2">Nội dung phim</h2>*/}
        {/*                            <p className="text-gray-400">{movieData.description}</p>*/}
        {/*                        </div>*/}
        {/*                    </div>*/}

        {/*                    <div className="lg:col-span-1">*/}
        {/*                        <EpisodeList episodes={movieData.episodes} currentEpisode={episodeNumber} movieSlug={movieData.slug} />*/}
        {/*                    </div>*/}
        {/*                </div>*/}
        {/*            </div>*/}
        {/*        </Suspense>*/}
        {/*    </main>*/}

        {/*    <Footer />*/}
        {/*</div>*/}
   </div>
    )
}

