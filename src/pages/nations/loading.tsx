import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import Breadcrumb from "@/components/layout/breadcrumb"
import { NationSkeletonGrid } from "@/components/content/loading/loading-skeletons"

export default function NationsLoading() {
    return (
        <div className="flex min-h-screen flex-col bg-[#f8f9fa] dark:bg-gray-900 transition-colors duration-300">
            <Header />

            <main className="flex-1 container px-4 md:px-6 py-4">
                <Breadcrumb items={[{ label: "Quốc Gia" }]} />

                <div className="py-4">
                    <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mb-2"></div>
                    <div className="h-4 w-full max-w-2xl bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                </div>

                <NationSkeletonGrid />
            </main>

            <Footer />
        </div>
    )
}

