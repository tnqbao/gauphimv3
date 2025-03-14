import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import Breadcrumb from "@/components/layout/breadcrumb"
import { MovieDetailSkeleton } from "@/components/content/loading/loading-skeletons"

export default function MovieDetailLoading() {
    return (
        <div className="flex min-h-screen flex-col bg-[#f8f9fa] dark:bg-gray-900 transition-colors duration-300">
            <Header />

            <main className="flex-1">
                <div className="container px-4 md:px-6 py-4">
                    <Breadcrumb items={[{ label: "Phim", href: "/phim" }, { label: "Đang tải..." }]} />
                </div>
                <MovieDetailSkeleton />
            </main>

            <Footer />
        </div>
    )
}

