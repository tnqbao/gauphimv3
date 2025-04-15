import { useState, useEffect } from "react"
import { GetServerSideProps } from "next"
import Head from "next/head"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import Breadcrumb from "@/components/layout/breadcrumb"
import NationsLoading from "./loading/loading"
import { listNation } from "@/utils/types/listMovieType"
import NationGrid from "@/components/content/nation/nation-grid"

interface NationsPageProps {
    nations: {
        slug: string
        title: string
        description: string
    }[]
}

export const getServerSideProps: GetServerSideProps<NationsPageProps> = async () => {
    const nations = Object.entries(listNation).map(([slug, data]) => ({
        slug,
        title: data.title,
        description: data.description,
    }))

    return { props: { nations } }
}

export default function NationsPage({ nations }: NationsPageProps) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500) //
        return () => clearTimeout(timer)
    }, [])

    if (loading) {
        return <NationsLoading />
    }

    return (
        <div className="flex min-h-screen flex-col bg-[#f8f9fa] dark:bg-gray-900 transition-colors duration-300">
            <Head>
                <title>Chọn quốc gia phim - Xem phim miễn phí, chất lượng cao</title>
                <meta name="description" content="Khám phá các quốc gia phim hấp dẫn tại đây. Chọn quốc gia yêu thích và xem các bộ phim miễn phí, chất lượng cao." />
                <meta name="keywords" content="phim, quốc gia phim, phim miễn phí, phim chất lượng cao, chọn quốc gia phim, quốc gia phim hấp dẫn" />
                <meta property="og:title" content="Chọn quốc gia phim - Xem phim miễn phí, chất lượng cao" />
                <meta property="og:description" content="Khám phá các quốc gia phim hấp dẫn tại đây. Chọn quốc gia yêu thích và xem các bộ phim miễn phí, chất lượng cao." />
                <meta property="og:image" content="URL_to_image_for_nations_page" />
                <meta property="og:url" content="https://gauphim.daudoo.com/nations" />
                <meta name="twitter:card" content="https://i.imgur.com/aMY5YTJ.png" />
                <meta name="twitter:title" content="Chọn quốc gia phim - Xem phim miễn phí, chất lượng cao" />
                <meta name="twitter:description" content="Khám phá các quốc gia phim hấp dẫn tại đây. Chọn quốc gia yêu thích và xem các bộ phim miễn phí, chất lượng cao." />
                <meta name="twitter:image" content="https://i.imgur.com/GYttZ5B.png" />
            </Head>

            <Head>
                <title>Quốc Gia | PandaFlix</title>
                <meta
                    name="description"
                    content="Khám phá phim từ nhiều quốc gia trên thế giới tại PandaFlix - Nền tảng xem phim trực tuyến hàng đầu Việt Nam"
                />
            </Head>

            <Header />

            <main className="flex-1 container px-4 md:px-6 py-4">
                <Breadcrumb items={[{ label: "Quốc Gia" }]} />

                <div className="py-4">
                    <h1 className="text-3xl font-bold mb-2">Quốc Gia</h1>
                    <p className="text-muted-foreground">
                        Khám phá phim từ nhiều quốc gia trên thế giới, mỗi quốc gia mang đến phong cách điện ảnh độc đáo riêng
                    </p>
                </div>

                <NationGrid nations={nations} />
            </main>

            <Footer />
        </div>
    )
}
