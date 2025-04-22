import {useEffect, useState} from "react"
import {useRouter} from "next/router"
import Breadcrumb from "@/components/layout/breadcrumb"
import HistoryMovieGrid from "@/components/content/history/history-movie-grid"
import Pagination from "@/components/layout/pagination"
import PandaFamilyLoading from "@/components/content/loading/panda-family-loading"
import HistoryEmptyState from "@/components/content/history/history-empty-state"
import axios from "axios"
import {History} from "@/utils/types/history";


const HistoryClientPage: React.FC = () => {
    const router = useRouter()
    const {page} = router.query
    const [movies, setMovies] = useState<History[]>([])
    const [loading, setLoading] = useState(true)
    const [totalPages, setTotalPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)

    const handlerDeleteButtonClick = async () => {
        try {
            const response = await axios.delete(`/api/history`)
            if (response.status != 200) {
                console.log("Error deleting history")
            }

            console.log("Deleted")
        } catch {
            console.log("Error deleting history")
        }
    }
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                setLoading(true)
                const current = page ? Number(page) : 1
                const res = await axios.get(`api/history`, {
                    params: {
                        page: current,
                    }
                })
                const {history, total_page, current_page} = res.data

                setMovies(history)
                setTotalPages(total_page)
                setCurrentPage(current_page)
            } catch (error) {
                console.error("Lỗi fetch lịch sử:", error)
            } finally {
                setLoading(false)
            }
        }

        if (router.isReady) {
            fetchHistory()
        }
    }, [page, router.isReady])

    const hasHistory = movies.length > 0

    return (
        <div className="container px-4 py-8 mx-auto">
            <title> Lịch sử</title>
            <Breadcrumb
                items={[
                    {label: "Trang chủ", href: "/"},
                    {label: "Lịch sử xem", href: "/history"},
                ]}
            />

            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Lịch sử xem phim</h1>
                {hasHistory && (
                    <button
                        className="px-4 py-2 text-sm font-medium text-white transition-colors bg-red-500 rounded-md hover:bg-red-600"
                        onClick={() => handlerDeleteButtonClick}
                    >
                        Xóa lịch sử
                    </button>
                )}
            </div>

            {loading ? (
                <PandaFamilyLoading/>
            ) : hasHistory ? (
                <>
                    <HistoryMovieGrid movies={movies}/>
                    <div className="mt-8">
                        <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/history"/>
                    </div>
                </>
            ) : (
                <HistoryEmptyState/>
            )}
        </div>
    )
}

export default HistoryClientPage
