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
        if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1)

        const pages: (number | string)[] = []
        const maxPageNumbers = 5
        let startPage = Math.max(1, currentPage - 2)
        let endPage = Math.min(totalPages, currentPage + 2)

        if (currentPage <= 3) {
            startPage = 1
            endPage = Math.min(totalPages, maxPageNumbers)
        }

        if (currentPage > totalPages - 3) {
            endPage = totalPages
            startPage = Math.max(1, totalPages - (maxPageNumbers - 1))
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i)
        }

        if (startPage > 1) pages.unshift("...")
        if (endPage < totalPages) pages.push("...")

        return pages
    }

    return (
        <div className={cn("flex items-center justify-center gap-2 py-6", className)}>
            {/* Nút Previous */}
            <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                disabled={currentPage === 1}
                asChild
            >
                <Link href={`${baseUrl}?page=${currentPage - 1}`}>
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Trang trước</span>
                </Link>
            </Button>

            {getPageNumbers().map((page, index) =>
                page === "..." ? (
                    <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">...</span>
                ) : (
                    <Button
                        key={`page-${page}`}
                        variant={currentPage === page ? "default" : "outline"}
                        size="icon"
                        className={cn("h-8 w-8 rounded-full", currentPage === page && "bg-green-600 text-white")}
                        asChild={currentPage !== page}
                        aria-current={currentPage === page ? "page" : undefined}
                    >
                        <Link href={`${baseUrl}?page=${page}`}>{page}</Link>
                    </Button>
                )
            )}

            <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                disabled={currentPage === totalPages}
                asChild
            >
                <Link href={`${baseUrl}?page=${currentPage + 1}`}>
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Trang sau</span>
                </Link>
            </Button>
        </div>
    )
}
