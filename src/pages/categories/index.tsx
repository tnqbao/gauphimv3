import { useState, useEffect } from "react"
import { GetServerSideProps } from "next"
import Head from "next/head"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import Breadcrumb from "@/components/layout/breadcrumb"
import CategoryGrid from "@/components/content/categories/category-grid"
import { listCategory } from "@/utils/types/listMovieType"
import CategoriesLoading from "./loading/loading" // Import file loading

interface CategoriesPageProps {
    categories: { slug: string; title: string; description: string }[]
}

export const getServerSideProps: GetServerSideProps = async () => {
    const categories = Object.entries(listCategory).map(([slug, data]) => ({
        slug,
        title: data.title,
        description: data.description,
    }))

    return {
        props: { categories },
    }
}

export default function CategoriesPage({ categories }: CategoriesPageProps) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500)
        return () => clearTimeout(timer)
    }, [])

    if (loading) {
        return <CategoriesLoading />
    }

    return (
        <div className="flex min-h-screen flex-col bg-[#f8f9fa] dark:bg-gray-900 transition-colors duration-300">
            <Head>
                <title>Chọn thể loại phim - Xem phim miễn phí, chất lượng cao</title>
                <meta name="description" content="Khám phá các thể loại phim hấp dẫn tại đây. Chọn thể loại yêu thích và xem các bộ phim miễn phí, chất lượng cao." />
                <meta name="keywords" content="phim, thể loại phim, phim miễn phí, phim chất lượng cao, chọn thể loại phim, thể loại phim hấp dẫn" />
                <meta property="og:title" content="Chọn thể loại phim - Xem phim miễn phí, chất lượng cao" />
                <meta property="og:description" content="Khám phá các thể loại phim hấp dẫn tại đây. Chọn thể loại yêu thích và xem các bộ phim miễn phí, chất lượng cao." />
                <meta property="og:image" content="URL_to_image_for_categories_page" />
                <meta property="og:url" content="https://gauphim.daudoo.com/categories" />
                <meta name="twitter:card" content="https://i.imgur.com/aMY5YTJ.png" />
                <meta name="twitter:title" content="Chọn thể loại phim - Xem phim miễn phí, chất lượng cao" />
                <meta name="twitter:description" content="Khám phá các thể loại phim hấp dẫn tại đây. Chọn thể loại yêu thích và xem các bộ phim miễn phí, chất lượng cao." />
                <meta name="twitter:image" content="https://i.imgur.com/GYttZ5B.png" />
            </Head>
            <Header />

            <main className="flex-1 container px-4 md:px-6 py-4">
                <Breadcrumb items={[{ label: "Thể Loại" }]} />

                <div className="py-4">
                    <h1 className="text-3xl font-bold mb-2">Thể Loại Phim</h1>
                    <p className="text-muted-foreground">
                        Khám phá các thể loại phim đa dạng trên PandaFlix, từ hành động kịch tính đến tình cảm lãng mạn
                    </p>
                </div>

                <CategoryGrid categories={categories} />
            </main>

            <Footer />
        </div>
    )
}
