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
                <title>{`${title} - Xem phim Full HD miễn phí | GauPhim`}</title>
                <meta name="description"
                      content={`Xem phim ${title} miễn phí với chất lượng cao, cập nhật mới nhất. Thưởng thức phim Full HD Vietsub ngay tại GauPhim!`}/>
                <meta name="keywords"
                      content={`phim ${title}, xem phim ${title} miễn phí, ${title} vietsub, phim ${slug}, phim HD`}/>
                <meta name="robots" content="index, follow"/>

                <meta property="og:title"
                      content={`Danh sách phim thể loại ${title} - Xem phim miễn phí, chất lượng cao | Gấu Phim`}/>
                <meta property="og:description"
                      content={`Danh sách phim thể loại ${title}, cập nhật mới nhất với chất lượng cao, Full HD Vietsub. Xem ngay trên Gấu Phim!`}/>
                <meta property="og:image"
                      content={movies?.length ? `https://img.ophim.live/uploads/movies/${movies[0].thumb_url}` : "https://i.imgur.com/sACJNuE.png"}/>
                <meta property="og:type" content="website"/>
                <meta property="og:url"
                      content={`https://gauphim.daudoo.com/list/${slug}?page=${pagination.currentPage}`}/>

                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content={`Phim thể loại ${title} - Xem phim miễn phí, chất lượng cao`}/>
                <meta name="twitter:description"
                      content={`Danh sách phim thể loại ${title}, cập nhật mới nhất với chất lượng cao, Full HD Vietsub. Xem ngay trên Gấu Phim!`}/>
                <meta name="twitter:image"
                      content={movies?.length ? `https://img.ophim.live/uploads/movies/${movies[0].thumb_url}` : "https://i.imgur.com/sACJNuE.png"}/>

                {pagination.currentPage === 1 && (
                    <link rel="canonical" href={`https://gauphim.daudoo.com/list/${slug}`} />
                )}

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        "name": `Phim thể loại ${title}`,
                        "url": `https://gauphim.daudoo.com/list/${slug}?page=${pagination.currentPage}`,
                        "itemListElement": movies?.slice(0, 10).map((movie, index) => ({
                            "@type": "ListItem",
                            "position": index + 1,
                            "item": {
                                "@type": "Movie",
                                "name": movie.name,
                                "url": `https://gauphim.daudoo.com/detail/${movie.slug}`,
                                "image": `https://img.ophim.live/uploads/movies/${movie.thumb_url}`,
                                "datePublished": movie.year?.toString() || "2024",
                                "genre": title,
                                "description": `Xem phim ${movie.name} miễn phí với chất lượng cao, Full HD Vietsub.`
                            }
                        }))
                    })}
                </script>
            </Head>


            <Header/>

            <main className="flex-1 container px-4 md:px-6 py-4">
                <Breadcrumb items={[{label: listType.breadcrumb}]}/>

                <div className="py-4">
                    <h1 className="text-3xl font-bold mb-2">{listType.title}</h1>
                    <p className="text-muted-foreground">{listType.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="md:col-span-4">
                        {loading ? (
                            <MovieSectionSkeleton/>
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
