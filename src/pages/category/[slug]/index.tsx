import { useState, useEffect } from "react"
import { GetServerSideProps } from "next"
import Head from "next/head"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import Breadcrumb from "@/components/layout/breadcrumb"
import MovieGrid from "@/components/content/movie-grid"
import Pagination from "@/components/layout/pagination"
import { fetchMovieByCategory, Movie } from "@/utils/api"
import { ListType, listCategory } from "@/utils/types/listMovieType"
import CategoryDetailLoading from "../loading/loading"

interface CategoryPageProps {
    slug: string
    listType: ListType
    movies: Movie[]
    pagination: {
        currentPage: number
        totalItems: number
        totalItemPerPage: number
    }
}

export const getServerSideProps: GetServerSideProps<CategoryPageProps> = async ({ params, query }) => {
    const slug = params?.slug as string
    const page = query.page ? Number(query.page) : 1

    if (!slug || !listCategory[slug]) {
        return { notFound: true }
    }

    const listType = listCategory[slug]
    const { movies, pagination } = await fetchMovieByCategory(slug, page)

    return {
        props: {
            slug,
            listType,
            movies,
            pagination,
        },
    }
}

export default function CategoryPage({ slug, listType, movies, pagination }: CategoryPageProps) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500)
        return () => clearTimeout(timer)
    }, [])

    if (loading) {
        return <CategoryDetailLoading />
    }
    const defaultImage = `https://img.ophim.live/uploads/movies/${movies?.[0]?.thumb_url}`;
    const ogImage = movies?.[0]?.poster_url
        ? `https://img.ophim.live/uploads/movies/${movies[0].poster_url}`
        : defaultImage;
    const title = listType.title.toString()
    const totalPages = Math.ceil(pagination.totalItems / pagination.totalItemPerPage) || 1

    return (
        <div className="flex min-h-screen flex-col bg-[#f8f9fa] dark:bg-gray-900 transition-colors duration-300">
            <Head>
                <title>{`Phim ${title} hay nhất | Xem phim ${title} Full HD Vietsub miễn phí`}</title>
                <meta name="description"
                      content={`Tổng hợp phim ${title} hot nhất. Xem ngay các bộ phim ${title} hấp dẫn, Vietsub Full HD miễn phí tại Gấu Phim. Cập nhật liên tục!`}/>
                <meta name="robots" content="index, follow"/>
                <meta name="keywords"
                      content={`phim ${title}, xem phim ${title} online, phim ${title} hay, phim ${title} miễn phí, phim ${title} vietsub, xem phim ${title} Full HD, phim ${title} mới nhất, top phim ${title}`}/>

                <meta property="og:title" content={`Top phim ${title} hay nhất - Vietsub Full HD miễn phí`}/>
                <meta property="og:description"
                      content={`Xem ngay danh sách phim ${title} hot nhất, Vietsub Full HD miễn phí. Cập nhật phim mới liên tục!`}/>
                <meta property="og:image" content={ogImage}/>
                <meta property="og:image:width" content="1200"/>
                <meta property="og:image:height" content="630"/>
                <meta property="og:url" content={`https://xemphim.gauas.online/category/${slug}`}/>

                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content={`Top phim ${title} hay nhất - Vietsub Full HD miễn phí`}/>
                <meta name="twitter:description"
                      content={`Xem ngay danh sách phim ${title} hot nhất, Vietsub Full HD miễn phí. Cập nhật phim mới liên tục!`}/>
                <meta name="twitter:image" content={ogImage}/>

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        "name": `Phim ${title}`,
                        "description": `Danh sách phim ${title} hấp dẫn, Vietsub Full HD miễn phí tại Gấu Phim.`,
                        "url": `https://xemphim.gauas.online/category/${slug}`,
                        "numberOfItems": movies.length,
                        "itemListElement": movies.slice(0, 5).map((movie, index) => ({
                            "@type": "Movie",
                            "position": index + 1,
                            "name": movie.title,
                            "url": `https://xemphim.gauas.online/detail/${movie.slug}`,
                            "image": movie.poster_url ? `https://img.ophim.live/uploads/movies/${movie.poster_url}` : "https://i.imgur.com/sACJNuE.png",
                            "datePublished": movie.year || "2024",
                            "genre": movie.category?.map(cat => cat.name) || []
                        }))
                    })}
                </script>

            </Head>

            <Header/>

            <main className="flex-1 container px-4 md:px-6 py-4">
            <Breadcrumb items={[{label: "Thể Loại", href: "/categories"}, {label: listType.breadcrumb}]}/>

                <div className="py-4">
                <h1 className="text-3xl font-bold mb-2">{listType.title}</h1>
                    <p className="text-muted-foreground">{listType.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="md:col-span-4">
                        <MovieGrid
                            movies={movies.map((movie) => ({
                                title: movie.title,
                                year: movie.year.toString(),
                                slug: movie.slug,
                                thumb_url: movie.thumb_url,
                                poster_url: movie.poster_url,
                            }))}
                        />

                        <Pagination currentPage={pagination.currentPage} totalPages={totalPages} baseUrl={`/category/${slug}`} />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
