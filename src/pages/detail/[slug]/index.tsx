import { Suspense } from "react"
import { notFound } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import Breadcrumb from "@/components/layout/breadcrumb"
import MovieDetail from "@/components/content/movie-detail"
import { nations } from "@/components/layout/nation-dropdown"
import { MovieSectionSkeleton } from "@/components/layout/loading-skeletons"

const movieData = {
    title: "Vương Quốc Gấu Trúc",
    originalTitle: "Panda Kingdom",
    slug: "vuong-quoc-gau-truc",
    poster: "/placeholder.svg?height=600&width=400",
    thumbnail: "/placeholder.svg?height=300&width=500",
    releaseYear: "2023",
    duration: "120 phút",
    rating: "8.7",
    description:
        "Trong một vương quốc kỳ diệu nơi gấu trúc cai trị, một chú gấu trúc nhỏ phải học cách trở thành nhà lãnh đạo và cứu người dân của mình khỏi mối đe dọa ngày càng tăng. Cuộc hành trình của chú sẽ dạy cho chú về lòng dũng cảm, tình bạn và sức mạnh của niềm tin.",
    categories: [
        { name: "Hành Động", slug: "hanh-dong" },
        { name: "Phiêu Lưu", slug: "phieu-luu" },
        { name: "Hoạt Hình", slug: "hoat-hinh" },
    ],
    nation: nations[2], // Nhật Bản
    actors: [
        { name: "Nguyễn Văn A", character: "Panda Vua", image: "/placeholder.svg?height=100&width=100" },
        { name: "Trần Thị B", character: "Panda Hoàng Hậu", image: "/placeholder.svg?height=100&width=100" },
        { name: "Lê Văn C", character: "Panda Tướng Quân", image: "/placeholder.svg?height=100&width=100" },
        { name: "Phạm Thị D", character: "Panda Công Chúa", image: "/placeholder.svg?height=100&width=100" },
        { name: "Hoàng Văn E", character: "Panda Hiền Triết", image: "/placeholder.svg?height=100&width=100" },
        { name: "Đỗ Thị F", character: "Panda Phù Thủy", image: "/placeholder.svg?height=100&width=100" },
    ],
    episodes: [
        {
            number: 1,
            title: "Khởi Đầu Vương Quốc",
            duration: "45 phút",
            thumbnail: "/placeholder.svg?height=150&width=250",
        },
        { number: 2, title: "Mối Đe Dọa", duration: "42 phút", thumbnail: "/placeholder.svg?height=150&width=250" },
        {
            number: 3,
            title: "Cuộc Hành Trình Bắt Đầu",
            duration: "44 phút",
            thumbnail: "/placeholder.svg?height=150&width=250",
        },
        { number: 4, title: "Người Bạn Mới", duration: "46 phút", thumbnail: "/placeholder.svg?height=150&width=250" },
        { number: 5, title: "Rừng Tre Bí Ẩn", duration: "43 phút", thumbnail: "/placeholder.svg?height=150&width=250" },
        { number: 6, title: "Kẻ Thù Cũ", duration: "45 phút", thumbnail: "/placeholder.svg?height=150&width=250" },
        { number: 7, title: "Bí Mật Vương Triều", duration: "47 phút", thumbnail: "/placeholder.svg?height=150&width=250" },
        {
            number: 8,
            title: "Trận Chiến Đầu Tiên",
            duration: "48 phút",
            thumbnail: "/placeholder.svg?height=150&width=250",
        },
        { number: 9, title: "Sức Mạnh Thật Sự", duration: "44 phút", thumbnail: "/placeholder.svg?height=150&width=250" },
        {
            number: 10,
            title: "Vương Quốc Trong Nguy Hiểm",
            duration: "50 phút",
            thumbnail: "/placeholder.svg?height=150&width=250",
        },
        { number: 11, title: "Đồng Minh Bất Ngờ", duration: "45 phút", thumbnail: "/placeholder.svg?height=150&width=250" },
        {
            number: 12,
            title: "Trận Chiến Cuối Cùng",
            duration: "55 phút",
            thumbnail: "/placeholder.svg?height=150&width=250",
        },
    ],
    isSeries: true,
}

interface MoviePageProps {
    params: {
        slug: string
    }
}

export default function MoviePage({ params }: MoviePageProps) {
    const { slug } = params
    if (slug !== movieData.slug) {
        notFound()
    }

    return (
        <div className="flex min-h-screen flex-col bg-[#f8f9fa] dark:bg-gray-900 transition-colors duration-300">
            <Header />

            <main className="flex-1">
                <div className="container px-4 md:px-6 py-4">
                    <Breadcrumb items={[{ label: "Phim", href: "/phim" }, { label: movieData.title }]} />
                </div>

                <Suspense fallback={<MovieSectionSkeleton />}>
                    <MovieDetail
                        title={movieData.title}
                        originalTitle={movieData.originalTitle}
                        poster={movieData.poster}
                        thumbnail={movieData.thumbnail}
                        releaseYear={movieData.releaseYear}
                        duration={movieData.duration}
                        rating={movieData.rating}
                        description={movieData.description}
                        categories={movieData.categories}
                        nation={movieData.nation}
                        actors={movieData.actors}
                        episodes={movieData.episodes}
                        isSeries={movieData.isSeries}
                    />
                </Suspense>
            </main>

            <Footer />
        </div>
    )
}

