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
                    <div className="md:col-span-1">
                        <div className="sticky top-20 bg-background rounded-lg border p-4">
                            <Skeleton className="h-6 w-40 mb-4" />
                            <Skeleton className="h-4 w-full mb-2" />

                            {/* Filter options */}
                            <div className="space-y-4 mt-4">
                                {Array(4)
                                    .fill(0)
                                    .map((_, i) => (
                                        <div key={i}>
                                            <Skeleton className="h-5 w-32 mb-2" />
                                            <div className="space-y-2">
                                                {Array(3)
                                                    .fill(0)
                                                    .map((_, j) => (
                                                        <div key={j} className="flex items-center">
                                                            <Skeleton className="h-4 w-4 mr-2 rounded" />
                                                            <Skeleton className="h-4 w-24" />
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    ))}
                            </div>

                            {/* Buttons */}
                            <div className="pt-4 space-y-2">
                                <Skeleton className="h-10 w-full rounded-md" />
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-3">
                        <MovieSectionSkeleton />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

