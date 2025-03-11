import { GetServerSideProps } from "next"
import Head from "next/head"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import Breadcrumb from "@/components/layout/breadcrumb"
import MovieGrid from "@/components/content/movie-grid"
import Pagination from "@/components/layout/pagination"
import FilterSidebar from "@/components/layout/filter-sidebar"
import { MovieSectionSkeleton } from "@/components/layout/loading-skeletons"
import {fetchMovieByList , Movie} from "@/utils/api"
import {ListType, listTypes} from "@/utils/types/listMovieType"

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

export default function ListPage({ slug, listType, movies, pagination }: ListPageProps) {
    const title = listType.title.toString();
    const totalPages = Math.ceil(pagination.totalItems / pagination.totalItemsPerPage) || 1;
    return (
        <div className="flex min-h-screen flex-col bg-[#f8f9fa] dark:bg-gray-900 transition-colors duration-300">
            <Head>
                <title>{ title } - Xem Phim Online</title>
                <meta name="description" content={listType.description} />
            </Head>

            <Header />

            <main className="flex-1 container px-4 md:px-6 py-4">
                <Breadcrumb items={[{ label: listType.breadcrumb }]} />

                <div className="py-4">
                    <h1 className="text-3xl font-bold mb-2">{listType.title}</h1>
                    <p className="text-muted-foreground">{listType.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="md:col-span-1">
                        <div className="sticky top-20 bg-background rounded-lg border p-4">
                            <FilterSidebar />
                        </div>
                    </div>

                    <div className="md:col-span-3">
                        {movies.length === 0 ? (
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
