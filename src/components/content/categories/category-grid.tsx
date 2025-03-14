import React, {JSX} from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Film, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Category {
    slug: string
    title: string
    description: string
}

interface CategoryGridProps {
    categories: Category[]
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
    const getCategoryIcon = (slug: string) => {
        const icons: Record<string, JSX.Element> = {
            "hanh-dong": <span className="text-2xl">🔥</span>,
            "tinh-cam": <span className="text-2xl">❤️</span>,
            "hai-huoc": <span className="text-2xl">😂</span>,
            "co-trang": <span className="text-2xl">🏯</span>,
            "tam-ly": <span className="text-2xl">🧠</span>,
            "hinh-su": <span className="text-2xl">🕵️</span>,
            "chien-tranh": <span className="text-2xl">💣</span>,
            "the-thao": <span className="text-2xl">⚽</span>,
            "vo-thuat": <span className="text-2xl">🥋</span>,
            "vien-tuong": <span className="text-2xl">🚀</span>,
            "phieu-luu": <span className="text-2xl">🧭</span>,
            "khoa-hoc": <span className="text-2xl">🔬</span>,
            "kinh-di": <span className="text-2xl">👻</span>,
            "am-nhac": <span className="text-2xl">🎵</span>,
            "than-thoai": <span className="text-2xl">🧙</span>,
            "tai-lieu": <span className="text-2xl">📚</span>,
            "gia-dinh": <span className="text-2xl">👨‍👩‍👧‍👦</span>,
            "chinh-kich": <span className="text-2xl">🎭</span>,
            "bi-an": <span className="text-2xl">🔍</span>,
            "hoc-duong": <span className="text-2xl">🏫</span>,
            "kinh-dien": <span className="text-2xl">🏆</span>,
        }

        return icons[slug] || <Film className="h-6 w-6" />
    }

    const getCategoryColor = (slug: string, index: number) => {
        const colors = [
            "from-red-500 to-orange-500",
            "from-blue-500 to-purple-500",
            "from-green-500 to-teal-500",
            "from-yellow-500 to-amber-500",
            "from-pink-500 to-rose-500",
            "from-indigo-500 to-blue-500",
            "from-emerald-500 to-green-500",
            "from-orange-500 to-amber-500",
            "from-purple-500 to-violet-500",
            "from-teal-500 to-cyan-500",
        ]

        const hash = slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
        return colors[hash % colors.length] || colors[index % colors.length]
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
            {categories.map((category, index) => (
                <motion.div
                    key={category.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                >
                    <Link href={`/category/${category.slug}`} className="block h-full">
                        <Card className="overflow-hidden h-full border-2 hover:border-green-500 transition-colors duration-300">
                            <div className={`h-2 bg-gradient-to-r ${getCategoryColor(category.slug, index)}`} />
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-center">
                                    <div className="p-2 rounded-full bg-muted flex items-center justify-center">
                                        {getCategoryIcon(category.slug)}
                                    </div>
                                    <CardTitle className="text-xl">{category.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-sm line-clamp-2">{category.description}</CardDescription>
                            </CardContent>
                            <CardFooter className="pt-0">
                                <Button variant="ghost" size="sm" className="ml-auto text-green-600 hover:text-green-700 p-0">
                                    Xem phim <ArrowRight className="h-4 w-4 ml-1" />
                                </Button>
                            </CardFooter>
                        </Card>
                    </Link>
                </motion.div>
            ))}
        </div>
    )
}