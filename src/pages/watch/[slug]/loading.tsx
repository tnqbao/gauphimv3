import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import Breadcrumb from "@/components/layout/breadcrumb"
import { VideoPlayerSkeleton } from "@/components/content/loading/loading-skeletons"

export default function WatchPageLoading() {
    return (
        <div className="flex min-h-screen flex-col bg-[#0a0a0a] text-white">
            <Header />

            <main className="flex-1">
                <div className="container px-4 md:px-6 py-4">
                    <Breadcrumb
                        items={[{ label: "Phim", href: "/phim" }, { label: "Đang tải...", href: "#" }, { label: "Đang tải..." }]}
                    />
                </div>

                <div className="container px-4 md:px-6 py-4">
                    <div className="h-8 w-64 bg-gray-800 rounded-md animate-pulse mb-4"></div>
                    <VideoPlayerSkeleton />
                </div>
            </main>

            <Footer />
        </div>
    )
}

