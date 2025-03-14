import { GetServerSideProps } from "next"
import Head from "next/head"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import Breadcrumb from "@/components/layout/breadcrumb"
import MovieGrid from "@/components/content/movie-grid"
import Pagination from "@/components/layout/pagination"
import { MovieSectionSkeleton } from "@/components/content/loading/loading-skeletons"
import { fetchMovieByList, Movie } from "@/utils/api"
import { ListType, listTypes } from "@/utils/types/listMovieType"
import { useState, useEffect } from "react"
import ListPageLoading from "@/pages/list/loading/loading";

interface ListPageProps {
    slug: string
    listType: ListType
    movies: Movie[]
    pagination: {
        currentPage: number
        totalItems: number
        totalItemsPerPage: number
    }
}

export const getServerSideProps: GetServerSideProps<ListPageProps> = async ({ params, query }) => {
    const slug = params?.slug as string
    const page = query.page ? Number(query.page) : 1

    if (!slug || !listTypes[slug]) {
        return { notFound: true }
    }

    const listType = listTypes[slug]

    const { movies, pagination } = await fetchMovieByList(slug, page)

    return {
        props: {
            slug,
            listType,
            movies,
            pagination,
        },
    }
}

const ListPage = ({ slug, listType, movies, pagination }: ListPageProps) => {
    const [loading, setLoading] = useState(true)
    const title = listType.title.toString();
    const totalPages = Math.ceil(pagination.totalItems / pagination.totalItemsPerPage) || 1;
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500)
        return () => clearTimeout(timer)
    }, [])


    if (loading) {
        return <ListPageLoading />;
    }

    return (
        <div className="flex min-h-screen flex-col bg-[#f8f9fa] dark:bg-gray-900 transition-colors duration-300">
            <Head>
                <title>{`Phim thể loại ${title} - Xem phim miễn phí, chất lượng cao`}</title>
                <meta name="description" content={`Khám phá các bộ phim thể loại ${title} tại đây. Xem các bộ phim hấp dẫn miễn phí, chất lượng cao.`} />
                <meta name="keywords" content={`phim ${title}, phim thể loại ${slug}, phim miễn phí, phim chất lượng cao, ${title} phim`} />
                <meta property="og:title" content={`Phim thể loại ${title} - Xem phim miễn phí, chất lượng cao`} />
                <meta property="og:description" content={`Khám phá các bộ phim thể loại ${title} tại đây. Xem các bộ phim hấp dẫn miễn phí, chất lượng cao.`} />
                <meta property="og:image" content={`https://img.ophim.live/uploads/movies/${movies[0].thumb_url}`} />
                <meta property="og:url" content={`https://gauphim.daudoo.com/list/${slug}`} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`Phim thể loại ${title} - Xem phim miễn phí, chất lượng cao`} />
                <meta name="twitter:description" content={`Khám phá các bộ phim thể loại ${title} tại đây. Xem các bộ phim hấp dẫn miễn phí, chất lượng cao.`} />
                <meta name="twitter:image" content={`https://img.ophim.live/uploads/movies/${movies[0].thumb_url}`} />
            </Head>

            <Header />

            <main className="flex-1 container px-4 md:px-6 py-4">
                <Breadcrumb items={[{ label: listType.breadcrumb }]} />

                <div className="py-4">
                    <h1 className="text-3xl font-bold mb-2">{listType.title}</h1>
                    <p className="text-muted-foreground">{listType.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="md:col-span-4">
                        {loading ? (
                            <MovieSectionSkeleton />
                        ) : (
                            <MovieGrid
                                movies={movies.map((movie) => ({
                                    title: movie.name,
                                    year: movie.year.toString(),
                                    slug: movie.slug,
                                    thumb_url: movie.thumb_url,
                                    poster_url: movie.poster_url,
                                }))}
                            />
                        )}

                        <Pagination
                            currentPage={pagination.currentPage}
                            totalPages={totalPages}
                            baseUrl={`/list/${slug}`}
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default ListPage;
