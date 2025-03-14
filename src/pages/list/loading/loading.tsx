import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import Breadcrumb from "@/components/layout/breadcrumb"
import { MovieSectionSkeleton } from "@/components/content/loading/loading-skeletons"
import { Skeleton } from "@/components/ui/skeleton"

export default function ListPageLoading() {
    return (
        <div className="flex min-h-screen flex-col bg-[#f8f9fa] dark:bg-gray-900 transition-colors duration-300">
            <Header />

            <main className="flex-1 container px-4 md:px-6 py-4">
                <Breadcrumb items={[{ label: "Đang tải..." }]} />

                <div className="py-4">
                    <Skeleton className="h-8 w-48 mb-2" />
                    <Skeleton className="h-4 w-full max-w-2xl" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="md:col-span-4">
                        <MovieSectionSkeleton />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

