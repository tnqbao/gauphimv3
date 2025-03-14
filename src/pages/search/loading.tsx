import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import PandaFamilyLoading from "@/components/content/loading/panda-family-loading"

export default function SearchPageLoading() {
    return (
        <div className="flex min-h-screen flex-col bg-[#f8f9fa] dark:bg-gray-900 transition-colors duration-300">
            <Header />

            <main className="flex-1 flex items-center justify-center">
                <PandaFamilyLoading />
            </main>

            <Footer />
        </div>
    )
}

