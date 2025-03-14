import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Nation {
    slug: string
    title: string
    description: string
}

interface NationGridProps {
    nations: Nation[]
}

export default function NationGrid({ nations }: NationGridProps) {
    const getNationFlag = (slug: string) => {
        const flags: Record<string, string> = {
            "trung-quoc": "🇨🇳",
            "han-quoc": "🇰🇷",
            "nhat-ban": "🇯🇵",
            "thai-lan": "🇹🇭",
            "au-my": "🇺🇸",
            "viet-nam": "🇻🇳",
            anh: "🇬🇧",
            phap: "🇫🇷",
            duc: "🇩🇪",
            nga: "🇷🇺",
            uc: "🇦🇺",
            brazil: "🇧🇷",
            "nhieu-quoc-gia": "🌎",
        }

        return flags[slug] || "🌍"
    }

    const getNationPattern = (slug: string, index: number) => {
        const patterns = [
            "bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzR2LTRoLTJ2NGgtNHYyaDR2NGgydi00aDR2LTJoLTR6bTAtMzBWMGgtMnY0aC00djJoNHY0aDJWNmg0VjRoLTR6TTYgMzR2LTRINHY0SDB2MmgzdjRoMnYtNGg0di0ySDZ6TTYgNFYwSDR2NEgwdjJoNHY0aDJWNmg0VjRINnoiLz48L2c+PC9nPjwvc3ZnPg==')]",
        ]

        const hash = slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
        return patterns[hash % patterns.length] || patterns[index % patterns.length]
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
            {nations.map((nation, index) => (
                <motion.div
                    key={nation.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                >
                    <Link href={`/nation/${nation.slug}`} className="block h-full">
                        <Card
                            className={`overflow-hidden h-full border-2 hover:border-green-500 transition-colors duration-300 ${getNationPattern(nation.slug, index)}`}
                        >
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-center">
                                    <div className="text-4xl">{getNationFlag(nation.slug)}</div>
                                    <CardTitle className="text-xl">{nation.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-sm line-clamp-2">{nation.description}</CardDescription>
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

