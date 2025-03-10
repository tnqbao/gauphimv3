import { Suspense } from "react"
import { notFound } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import Breadcrumb from "@/components/layout/breadcrumb"
import MovieGrid from "@/components/content/movie-grid"
import Pagination from "@/components/layout/pagination"
import FilterSidebar from "@/components/layout/filter-sidebar"
import { MovieSectionSkeleton } from "@/components/layout/loading-skeletons"

// Sample movie data
const movies = [
    { title: "Chiến Binh Tre", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "8.5" },
    { title: "Panda Nhanh Trí", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "7.9" },
    { title: "Bí Mật Núi Rừng", year: "2022", poster: "/placeholder.svg?height=300&width=200", rating: "8.2" },
    { title: "Khu Rừng Cuối Cùng", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "7.6" },
    { title: "Đen & Trắng", year: "2022", poster: "/placeholder.svg?height=300&width=200", rating: "9.0" },
    { title: "Chuyện Tre", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "8.3" },
    { title: "Vương Quốc Gấu Trúc", year: "2022", poster: "/placeholder.svg?height=300&width=200", rating: "8.7" },
    { title: "Vương Quốc Rừng Xanh", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "8.1" },
    { title: "Hành Trình Hoang Dã", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "8.4" },
    { title: "Gia Đình Gấu Trúc", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "9.2" },
    { title: "Tiếng Gọi Thiên Nhiên", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "7.5" },
    { title: "Phiêu Lưu Núi Rừng", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "8.6" },
    { title: "Rừng Tre", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "8.9" },
    { title: "Biên Niên Sử Tre", year: "2022", poster: "/placeholder.svg?height=300&width=200", rating: "8.7" },
    { title: "Huyền Thoại Núi Rừng", year: "2021", poster: "/placeholder.svg?height=300&width=200", rating: "8.3" },
]

// List types configuration
const listTypes = {
    "phim-le": {
        title: "Phim Lẻ",
        description: "Danh sách phim lẻ mới nhất, chất lượng cao",
        breadcrumb: "Phim Lẻ",
    },
    "phim-bo": {
        title: "Phim Bộ",
        description: "Danh sách phim bộ đang chiếu và hoàn thành",
        breadcrumb: "Phim Bộ",
    },
    "phim-moi": {
        title: "Phim Mới",
        description: "Phim mới cập nhật trong tuần, tháng",
        breadcrumb: "Phim Mới",
    },
    "phim-chieu-rap": {
        title: "Phim Chiếu Rạp",
        description: "Những bộ phim đang chiếu và sắp chiếu tại rạp",
        breadcrumb: "Phim Chiếu Rạp",
    },
    "phim-hoat-hinh": {
        title: "Phim Hoạt Hình",
        description: "Phim hoạt hình, anime mới nhất",
        breadcrumb: "Phim Hoạt Hình",
    },
    "danh-sach-yeu-thich": {
        title: "Danh Sách Yêu Thích",
        description: "Những bộ phim bạn đã đánh dấu yêu thích",
        breadcrumb: "Yêu Thích",
    },
}

interface ListPageProps {
    params: {
        slug: string
    }
}

export default function ListPage({ params }: ListPageProps) {
    const { slug } = params

    // Check if the slug is valid
    if (!listTypes[slug as keyof typeof listTypes]) {
        notFound()
    }

    const listType = listTypes[slug as keyof typeof listTypes]

    return (
        <div className="flex min-h-screen flex-col bg-[#f8f9fa] dark:bg-gray-900 transition-colors duration-300">
            <Header />

            <main className="flex-1 container px-4 md:px-6 py-4">
                <Breadcrumb items={[{ label: listType.breadcrumb }]} />

                <div className="py-4">
                    <h1 className="text-3xl font-bold mb-2">{listType.title}</h1>
                    <p className="text-muted-foreground">{listType.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="md:col-span-1">
                        <div className="sticky top-20 bg-background rounded-lg border p-4">
                            <FilterSidebar />
                        </div>
                    </div>

                    <div className="md:col-span-3">
                        <Suspense fallback={<MovieSectionSkeleton />}>
                            <MovieGrid movies={movies} />
                        </Suspense>

                        <Pagination currentPage={1} totalPages={10} baseUrl={`/list/${slug}`} />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

