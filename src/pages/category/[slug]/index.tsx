import { Suspense } from "react"
import { notFound } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import Breadcrumb from "@/components/layout/breadcrumb"
import MovieGrid from "@/components/content/movie-grid"
import Pagination from "@/components/layout/pagination"
import { categories } from "@/components/layout/category-dropdown"
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

interface CategoryPageProps {
    params: {
        slug: string
    }
}

export default function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = params

    const category = categories.find((cat) => cat.slug === slug)

    if (!category) {
        notFound()
    }


    return (
        <div className="flex min-h-screen flex-col bg-[#f8f9fa] dark:bg-gray-900 transition-colors duration-300">
            <Header />

            <main className="flex-1 container px-4 md:px-6 py-4">
                <Breadcrumb items={[{ label: "Thể Loại", href: "/categories" }, { label: category.name }]} />

                <div className="py-4">
                    <h1 className="text-3xl font-bold mb-2">Phim {category.name}</h1>
                    <p className="text-muted-foreground">Danh sách phim thể loại {category.name} hay nhất, cập nhật mới nhất</p>
                </div>

                <Suspense fallback={<MovieSectionSkeleton />}>
                    <MovieGrid movies={movies} />
                </Suspense>

                <Pagination currentPage={1} totalPages={10} baseUrl={`/category/${slug}`} />
            </main>

            <Footer />
        </div>
    )
}

