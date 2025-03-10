import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface PaginationProps {
    currentPage: number
    totalPages: number
    baseUrl: string
    className?: string
}

export default function Pagination({ currentPage, totalPages, baseUrl, className }: PaginationProps) {
    const getPageNumbers = () => {
        const pages = []
        const maxPagesToShow = 5

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            pages.push(1)

            let start = Math.max(2, currentPage - 1)
            let end = Math.min(totalPages - 1, currentPage + 1)

            if (currentPage <= 2) {
                end = 4
            } else if (currentPage >= totalPages - 1) {
                start = totalPages - 3
            }

            if (start > 2) {
                pages.push("ellipsis-start")
            }

            for (let i = start; i <= end; i++) {
                pages.push(i)
            }

            if (end < totalPages - 1) {
                pages.push("ellipsis-end")
            }

            if (totalPages > 1) {
                pages.push(totalPages)
            }
        }

        return pages
    }

    const pageNumbers = getPageNumbers()

    return (
        <div className={cn("flex items-center justify-center gap-1 py-8", className)}>
            <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                disabled={currentPage === 1}
                asChild={currentPage !== 1}
            >
                {currentPage === 1 ? (
                    <span>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Trang trước</span>
          </span>
                ) : (
                    <Link href={`${baseUrl}/${currentPage - 1}`}>
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Trang trước</span>
                    </Link>
                )}
            </Button>

            {pageNumbers.map((page, index) => {
                if (page === "ellipsis-start" || page === "ellipsis-end") {
                    return (
                        <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">
              ...
            </span>
                    )
                }

                const isCurrentPage = page === currentPage
                return (
                    <Button
                        key={`page-${page}`}
                        variant={isCurrentPage ? "default" : "outline"}
                        size="icon"
                        className={cn("h-8 w-8 rounded-full", isCurrentPage && "bg-green-600 hover:bg-green-700 text-white")}
                        asChild={!isCurrentPage}
                        aria-current={isCurrentPage ? "page" : undefined}
                    >
                        {isCurrentPage ? <span>{page}</span> : <Link href={`${baseUrl}/${page}`}>{page}</Link>}
                    </Button>
                )
            })}

            <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                disabled={currentPage === totalPages}
                asChild={currentPage !== totalPages}
            >
                {currentPage === totalPages ? (
                    <span>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Trang sau</span>
          </span>
                ) : (
                    <Link href={`${baseUrl}/${currentPage + 1}`}>
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only">Trang sau</span>
                    </Link>
                )}
            </Button>
        </div>
    )
}

