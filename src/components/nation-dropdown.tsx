"use client"
import Link from "next/link"
import { ChevronDown, Globe, Flag } from "lucide-react"
import { motion } from "framer-motion"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const nations = [
    { name: "USA", flag: "🇺🇸" },
    { name: "Korea", flag: "🇰🇷" },
    { name: "Japan", flag: "🇯🇵" },
    { name: "China", flag: "🇨🇳" },
    { name: "India", flag: "🇮🇳" },
    { name: "UK", flag: "🇬🇧" },
    { name: "France", flag: "🇫🇷" },
    { name: "Thailand", flag: "🇹🇭" },
]

interface NationDropdownProps {
    isMobile?: boolean
}

export default function NationDropdown({ isMobile = false }: NationDropdownProps) {
    if (isMobile) {
        return (
            <div className="py-3">
                <div className="mb-2 text-lg font-medium">Nations</div>
                <div className="grid grid-cols-2 gap-2">
                    {nations.map((nation) => (
                        <Link
                            key={nation.name}
                            href={`/nation/${nation.name.toLowerCase()}`}
                            className="flex items-center rounded-md px-3 py-2 text-sm hover:bg-muted transition-colors"
                        >
                            <span className="mr-2 text-lg">{nation.flag}</span>
                            {nation.name}
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
                    className="flex items-center gap-1 px-2 py-1.5 text-base hover:bg-transparent hover:text-green-600 focus:bg-transparent"
                >
                    <span>Nations</span>
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
                        <Globe className="h-5 w-5 text-green-600" />
                        <span className="text-sm font-medium">Movie Nations</span>
                    </div>

                    <div className="grid grid-cols-2 gap-1">
                        {nations.map((nation) => (
                            <DropdownMenuItem key={nation.name} asChild>
                                <Link
                                    href={`/nation/${nation.name.toLowerCase()}`}
                                    className="flex cursor-pointer items-center rounded-md px-3 py-2 text-sm hover:bg-muted transition-colors"
                                >
                                    <span className="mr-2 text-lg">{nation.flag}</span>
                                    {nation.name}
                                </Link>
                            </DropdownMenuItem>
                        ))}
                    </div>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link
                            href="/nations"
                            className="flex cursor-pointer items-center rounded-md px-3 py-2 text-sm font-medium text-green-600 hover:bg-muted transition-colors"
                        >
                            <Flag className="mr-2 h-4 w-4" />
                            View All Nations
                        </Link>
                    </DropdownMenuItem>
                </motion.div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

