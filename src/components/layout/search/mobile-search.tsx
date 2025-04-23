"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import axios from "axios"
import { useDebounce } from "@/hooks/use-debounce"
import Image from "next/image";

interface SearchResult {
    id: number
    slug: string
    title: string
    year: number
    thumbnail?: string
    _highlight?: {
        title?: string
    }
}

export default function MobileSearch() {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [results, setResults] = useState<SearchResult[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const debouncedSearchTerm = useDebounce(searchTerm, 300)

    useEffect(() => {
        if (!debouncedSearchTerm || debouncedSearchTerm.length < 2) {
            setResults([])
            return
        }

        const fetchResults = async () => {
            setIsLoading(true)
            try {
                const res = await axios.get(`/api/search?keyword=${encodeURIComponent(debouncedSearchTerm)}`)
                setResults(res.data.hits || [])
            } catch (error) {
                console.error("Search error", error)
                setResults([])
            } finally {
                setIsLoading(false)
            }
        }

        fetchResults()
    }, [debouncedSearchTerm])

    // Render highlighted text
    const renderHighlightedText = (text: string) => {
        if (!text) return ""

        return (
            <span
                dangerouslySetInnerHTML={{
                    __html: text
                        .replace(/<strong>/g, '<span class="text-green-600 font-medium">')
                        .replace(/<\/strong>/g, "</span>"),
                }}
            />
        )
    }

    return (
        <div className="xl:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)} className="h-9 w-9" aria-label="Tìm kiếm">
                <Search className="h-5 w-5" />
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 bg-white dark:bg-gray-900 p-4 flex flex-col overflow-auto"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-medium">Tìm Kiếm Phim</h2>
                            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Đóng tìm kiếm">
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                            <Input
                                type="search"
                                placeholder="Tìm phim, diễn viên, thể loại..."
                                className="pl-10 py-6 text-base"
                                autoFocus
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Results Section */}
                        {isLoading ? (
                            <div className="mt-4 text-center text-muted-foreground">Đang tìm kiếm...</div>
                        ) : results.length > 0 ? (
                            <>
                                <div className="px-4 py-2 text-sm font-semibold text-muted-foreground border-b dark:border-gray-800">
                                    Danh sách phim
                                </div>
                                <ul className="divide-y divide-gray-200 dark:divide-gray-800">
                                    {results.map((result) => (
                                        <li key={result.id}>
                                            <Link
                                                href={`/detail/${result.slug}`}
                                                onClick={() => setIsOpen(false)}
                                                className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                            >
                                                    <Image
                                                        src={`https://img.ophim.live/uploads/movies/${result.slug}-thumb.jpg`}
                                                        alt={result.title}
                                                        className="w-10 h-14 object-cover rounded mr-4 flex-shrink-0"
                                                        width={160}
                                                        height={240}
                                                    />
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-medium leading-tight">
                                                        {result._highlight?.title
                                                            ? renderHighlightedText(result._highlight.title)
                                                            : result.title}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground mt-1">
                                                        {result.year}
                                                    </div>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                <div className="border-t border-gray-200 dark:border-gray-800 p-2">
                                    <Link
                                        href={`/search?keyword=${encodeURIComponent(searchTerm)}`}
                                        onClick={() => setIsOpen(false)}
                                        className="block text-center text-sm py-1.5 px-3 rounded-md transition-colors font-semibold text-green-600 hover:bg-green-50 dark:hover:bg-green-950/30"
                                    >
                                        Toàn bộ kết quả
                                    </Link>
                                </div>
                            </>
                        ) : debouncedSearchTerm.length >= 2 ? (
                            <div className="mt-4 text-center text-sm text-muted-foreground">
                                Không tìm thấy kết quả nào cho `{debouncedSearchTerm}`
                            </div>
                        ) : null}

                        {/* Popular Search Terms */}
                        <div className="mt-6">
                            <h3 className="text-sm font-medium text-muted-foreground mb-2">Tìm Kiếm Phổ Biến</h3>
                            <div className="flex flex-wrap gap-2">
                                {["Hành Động", "Hài Hước", "Phim Gấu Trúc", "Phim Mới", "Đánh Giá Cao"].map((term) => (
                                    <Link key={term} href={`/search?q=${encodeURIComponent(term)}`} onClick={() => setIsOpen(false)}>
                                        <Button variant="outline" size="sm" className="rounded-full">
                                            {term}
                                        </Button>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
