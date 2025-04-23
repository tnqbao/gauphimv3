"use client"

import { useState, useRef, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useDebounce } from "@/hooks/use-debounce"
import Link from "next/link"
import { cn } from "@/lib/utils"
import axios from "axios";
import Image from "next/image";

interface SearchResult {
    id: number
    slug: string
    title: string
    year: number
    _highlight?: {
        id?: string
        slug?: string
        title?: string
        year?: string
    }
}

interface SearchResponse {
    hits: SearchResult[]
    total: number
}

export function HeaderSearch() {
    const [searchTerm, setSearchTerm] = useState("")
    const [results, setResults] = useState<SearchResult[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const debouncedSearchTerm = useDebounce(searchTerm, 500)
    const searchRef = useRef<HTMLDivElement>(null)

    // Handle outside clicks
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    // Fetch search results when debounced search term changes
    useEffect(() => {
        async function fetchResults() {
            if (!debouncedSearchTerm || debouncedSearchTerm.length < 2) {
                setResults([])
                setIsLoading(false)
                return
            }

            setIsLoading(true)
            try {
                const response = await axios.get(
                    `/api/search?keyword=${encodeURIComponent(debouncedSearchTerm)}`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                        }
                    }
                )
                const data: SearchResponse = await response.data
                setResults(data.hits || [])
            } catch (error) {
                console.error("Error fetching search results:", error)
                setResults([])
            } finally {
                setIsLoading(false)
            }
        }

        fetchResults()
    }, [debouncedSearchTerm])

    // Show results dropdown when typing
    useEffect(() => {
        if (debouncedSearchTerm && debouncedSearchTerm.length >= 2) {
            setShowResults(true)
        } else {
            setShowResults(false)
        }
    }, [debouncedSearchTerm])

    // Render highlighted text
    const renderHighlightedText = (text: string) => {
        if (!text) return ""

        // Replace <strong> tags with span elements with green text
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
        <div className="relative w-full md:w-[250px] lg:w-[300px]" ref={searchRef}>
            <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                    type="search"
                    placeholder="Tìm kiếm phim..."
                    className="w-full pl-8 bg-muted focus:ring-green-500 focus:border-green-500 transition-all h-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => {
                        if (results.length > 0) {
                            setShowResults(true)
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            window.location.href = `/search?keyword=${encodeURIComponent(searchTerm)}`
                        }
                    }}
                />
            </div>

            {/* Results dropdown */}
            {showResults && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md shadow-lg z-50 max-h-[400px] overflow-y-auto">
                    {isLoading ? (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                            <div className="flex items-center justify-center space-x-2">
                                <div className="h-3 w-3 animate-spin rounded-full border-2 border-green-600 border-t-transparent"></div>
                                <span>Đang tìm kiếm...</span>
                            </div>
                        </div>
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
                                            className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                        >
                                            <Image
                                                src={`https://img.ophim.live/uploads/movies/${result.slug}-thumb.jpg`}
                                                alt={result.title}
                                                className="w-10 h-14 object-cover rounded mr-4 flex-shrink-0"
                                                width={40}
                                                height={56}
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
                                    className={cn(
                                        "block text-center text-sm py-1.5 px-3 rounded-md transition-colors font-semibold",
                                        "text-green-600 hover:bg-green-50 dark:hover:bg-green-950/30"
                                    )}
                                >
                                    Toàn bộ kết quả
                                </Link>
                            </div>
                        </>
                    ) : debouncedSearchTerm.length >= 2 ? (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                            Không tìm thấy kết quả nào cho `{debouncedSearchTerm}`
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    )
}
