"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface MovieInfoDisplayProps {
    name: string
    year: string
    categories: { name: string; slug: string }[]
    description: string
    lightsOff: boolean
}

export default function MovieInfoDisplay({  year, categories, description, lightsOff }: MovieInfoDisplayProps) {
    return (
        <div className={cn("mt-6 transition-colors duration-300", lightsOff ? "bg-black text-gray-300" : "")}>
            <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="bg-green-600 text-white border-none">
                    {year}
                </Badge>
                {categories.map((category) => (
                    <Link key={category.slug} href={`/category/${category.slug}`}>
                        <Badge variant="outline" className="hover:bg-white/10 transition-colors">
                            {category.name}
                        </Badge>
                    </Link>
                ))}
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Nội dung phim</h3>
                <p className="text-gray-400">{description}</p>
            </div>
        </div>
    )
}

