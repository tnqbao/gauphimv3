import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import Breadcrumb from "@/components/layout/breadcrumb"
import MovieGrid from "@/components/content/movie-grid"
import Pagination from "@/components/layout/pagination"
import { MovieSectionSkeleton } from "@/components/content/loading/loading-skeletons"
import { listNation, ListType } from "@/utils/types/listMovieType"
import { fetchMovieByNation, Movie } from "@/utils/api"
import { GetServerSideProps } from "next"

interface NationPageProps {
    slug: string
    listType: ListType
    movies: Movie[]
    pagination: {
        currentPage: number
        totalItems: number
        totalItemsPerPage: number
    }
}

export const getServerSideProps: GetServerSideProps<NationPageProps> = async ({ params, query }) => {
    const slug = params?.slug as string
    const page = query.page ? Number(query.page) : 1

    if (!slug || !listNation[slug]) {
        return { notFound: true }
    }

    const listType = listNation[slug]

    const { movies, pagination } = await fetchMovieByNation(slug, page)

    return {
        props: {
            slug,
            listType,
            movies,
            pagination,
        },
    }
}

export default function NationPage({ slug, listType, movies, pagination }: NationPageProps) {
    const title = listType.title.toString();
    const totalPages = Math.ceil(pagination.totalItems / pagination.totalItemsPerPage) || 1;

    const flagMap: Record<string, string> = {
        "trung-quoc": "🇨🇳",
        "han-quoc": "🇰🇷",
        "nhat-ban": "🇯🇵",
        "thai-lan": "🇹🇭",
        "viet-nam": "🇻🇳",
        "au-my": "🌎",
        "anh": "🇬🇧",
        "phap": "🇫🇷",
        "duc": "🇩🇪",
        "nga": "🇷🇺",
        "uc": "🇦🇺",
        "brazil": "🇧🇷",
        "nhieu-quoc-gia": "🌍",
    }

    const nationFlag = flagMap[slug] || "🏳️"

    const isLoading = !movies.length;

    return (
        <div className="flex min-h-screen flex-col bg-[#f8f9fa] dark:bg-gray-900 transition-colors duration-300">
            <Header />

            <main className="flex-1 container px-4 md:px-6 py-4">
                <Breadcrumb items={[{ label: "Quốc Gia", href: "/nations" }, { label: listType.title }]} />

                <div className="py-4">
                    <h1 className="text-3xl font-bold mb-2 flex items-center">
                        <span className="mr-2 text-2xl">{nationFlag}</span>
                        Phim {title}
                    </h1>
                    <p className="text-muted-foreground">
                        Danh sách phim {listType.title} hay nhất, cập nhật mới nhất
                    </p>
                </div>

                {isLoading ? (
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

                <Pagination currentPage={pagination.currentPage} totalPages={totalPages} baseUrl={`/nation/${slug}`} />
            </main>

            <Footer />
        </div>
    )
}
