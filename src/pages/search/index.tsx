import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import Breadcrumb from "@/components/layout/breadcrumb"
import MovieGrid from "@/components/content/movie-grid"
import Pagination from "@/components/layout/pagination"
import SearchForm from "@/components/layout/search/search-form"
import {searchMovies} from "@/utils/api"
import EmptySearchResults from "@/components/layout/search/empty-search-results"
import {GetServerSideProps} from "next"
import Head from "next/head"

interface SearchPageProps {
    searchParams: {
        keyword?: string
        page?: string
    }
    movies: {
        name: string
        year: number
        poster_url: string
        thumb_url: string
        slug: string
    }[]
    pagination: {
        currentPage: number
        totalPages: number
        totalItems: number
    }
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
    const keyword = query.keyword?.toString() || ""
    const page = query.page ? Number.parseInt(query.page as string) : 1

    const {movies, pagination} = await searchMovies(keyword, page)

    return {
        props: {
            searchParams: {keyword, page: page.toString()},
            movies,
            pagination,
        },
    }
}

export default function SearchPage({searchParams, movies, pagination}: SearchPageProps) {
    const keyword = searchParams.keyword || ""
    const totalResults = pagination.totalItems;

    return (
        <div className="flex min-h-screen flex-col bg-[#f8f9fa] dark:bg-gray-900 transition-colors duration-300">
            <Head>
                <title>{`Tìm kiếm phim: ${keyword || "Tất cả"}`}</title>
                <meta name="description" content={`Kết quả tìm kiếm cho ${keyword}`}/>
            </Head>

            <Header/>

            <main className="flex-1 container px-4 md:px-6 py-4">
                <Breadcrumb items={[{label: "Tìm Kiếm"}]}/>

                <div className="py-4">
                    <h1 className="text-3xl font-bold mb-2">Tìm Kiếm Phim</h1>
                    <p className="text-muted-foreground">
                        {totalResults > 0
                            ? `Kết quả tìm kiếm cho "${keyword}" (${totalResults} phim)`
                            : `Không tìm thấy kết quả cho "${keyword}"`}
                    </p>
                </div>

                <SearchForm initialKeyword={keyword}/>

                {totalResults === 0 ? (
                    <EmptySearchResults message={`Không tìm thấy kết quả nào cho "${keyword}"`}/>
                ) : (
                    <MovieGrid
                        movies={movies.map((movie) => ({
                            title: movie.name,
                            year: movie.year.toString(),
                            poster: movie.poster_url || movie.thumb_url,
                            slug: movie.slug,
                            thumb_url: movie.thumb_url,
                            poster_url: movie.poster_url,
                        }))}
                        title={`Kết quả tìm kiếm`}
                    />
                )}

                <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    baseUrl={`/search?keyword=${encodeURIComponent(keyword)}`}
                />
            </main>

            <Footer/>
        </div>
    )
}
