import { useState, useEffect } from "react"
import { GetServerSideProps } from "next"
import Head from "next/head"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import Breadcrumb from "@/components/layout/breadcrumb"
import NationsLoading from "./loading"
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
        const timer = setTimeout(() => setLoading(false), 500) // Giả lập delay loading
        return () => clearTimeout(timer)
    }, [])

    if (loading) {
        return <NationsLoading />
    }

    return (
        <div className="flex min-h-screen flex-col bg-[#f8f9fa] dark:bg-gray-900 transition-colors duration-300">
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
