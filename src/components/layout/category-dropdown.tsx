"use client"
import Link from "next/link"
import { ChevronDown, Film, Clapperboard, Laugh, Skull, Rocket, Heart, Users } from "lucide-react"
import { motion } from "framer-motion"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export const categories = [
    { name: "Hành Động", slug: "hanh-dong", icon: <Clapperboard className="mr-2 h-4 w-4" /> },
    { name: "Hài Hước", slug: "hai-huoc", icon: <Laugh className="mr-2 h-4 w-4" /> },
    { name: "Tâm Lý", slug: "tam-ly", icon: <Users className="mr-2 h-4 w-4" /> },
    { name: "Kinh Dị", slug: "kinh-di", icon: <Skull className="mr-2 h-4 w-4" /> },
    { name: "Viễn Tưởng", slug: "vien-tuong", icon: <Rocket className="mr-2 h-4 w-4" /> },
    { name: "Tình Cảm", slug: "tinh-cam", icon: <Heart className="mr-2 h-4 w-4" /> },
]

interface CategoryDropdownProps {
    isMobile?: boolean
}

export default function CategoryDropdown({ isMobile = false }: CategoryDropdownProps) {
    if (isMobile) {
        return (
            <div className="py-2">
                <div className="mb-2 text-base font-medium">Thể Loại</div>
                <div className="grid grid-cols-1 gap-1">
                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            href={`/category/${category.slug}`}
                            className="flex items-center rounded-md px-3 py-2 text-sm hover:bg-muted transition-colors"
                        >
                            {category.icon}
                            {category.name}
                        </Link>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex items-center gap-1 px-2 py-1.5 text-base font-bold md:text-sm hover:bg-transparent hover:text-green-600 focus:bg-transparent h-9"
                >
                    <span>Thể Loại</span>
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" sideOffset={8} className="w-56 overflow-hidden rounded-xl p-2" asChild>
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="flex items-center gap-2 rounded-md bg-green-50 dark:bg-green-900/20 p-3 mb-2">
                        <Film className="h-5 w-5 text-green-600" />
                        <span className="text-sm font-medium">Thể Loại Phim</span>
                    </div>

                    {categories.map((category) => (
                        <DropdownMenuItem key={category.name} asChild>
                            <Link
                                href={`/category/${category.slug}`}
                                className="flex cursor-pointer items-center rounded-md px-3 py-2 text-sm hover:bg-muted transition-colors"
                            >
                                {category.icon}
                                {category.name}
                            </Link>
                        </DropdownMenuItem>
                    ))}

                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link
                            href="/categories"
                            className="flex cursor-pointer items-center rounded-md px-3 py-2 text-sm font-medium text-green-600 hover:bg-muted transition-colors"
                        >
                            Xem Tất Cả Thể Loại
                        </Link>
                    </DropdownMenuItem>
                </motion.div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

