"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import PandaLogo from "./panda-logo"
import { cn } from "@/lib/utils"
import ThemeToggle from "./theme-toggle"
import CategoryDropdown from "./category-dropdown"
import NationDropdown from "./nation-dropdown"
import MobileSearch from "./mobile-search"

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full transition-all duration-300",
                isScrolled
                    ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b shadow-sm"
                    : "bg-transparent border-b border-transparent",
            )}
        >
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                    <Link href="/public" className="flex items-center gap-2 group">
                        <PandaLogo className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
                        <span className="text-xl font-bold">PandaFlix</span>
                    </Link>
                </div>

                <nav
                    className={cn(
                        "fixed inset-0 top-16 z-50 flex flex-col bg-white dark:bg-gray-900 p-6 transition-transform duration-300 md:static md:flex md:flex-row md:items-center md:gap-6 md:bg-transparent md:p-0 md:translate-x-0",
                        isMenuOpen ? "translate-x-0" : "-translate-x-full",
                    )}
                >
                    <NavLink href="#" label="Home" />

                    {/* Desktop: Show dropdowns in the navbar */}
                    <div className="hidden md:block">
                        <CategoryDropdown />
                    </div>
                    <div className="hidden md:block">
                        <NationDropdown />
                    </div>

                    <NavLink href="#" label="TV Shows" />
                    <NavLink href="#" label="New Releases" />
                    <NavLink href="#" label="My List" />

                    {/* Mobile: Show dropdowns as expanded menus */}
                    <div className="md:hidden border-t mt-2 pt-2">
                        <CategoryDropdown isMobile />
                    </div>
                    <div className="md:hidden border-t mt-2 pt-2">
                        <NationDropdown isMobile />
                    </div>

                    <div className="mt-6 flex gap-2 md:hidden">
                        <Button
                            variant="outline"
                            className="flex-1 border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-950 transition-colors"
                            asChild
                        >
                            <Link href="/register">Register</Link>
                        </Button>
                        <Button className="flex-1 bg-green-600 hover:bg-green-700 transition-colors" asChild>
                            <Link href="/login">Sign In</Link>
                        </Button>
                    </div>
                </nav>

                <div className="flex items-center gap-4">
                    <form className="hidden md:block">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search movies..."
                                className="w-[200px] pl-8 md:w-[260px] bg-muted focus:ring-green-500 focus:border-green-500 transition-all"
                            />
                        </div>
                    </form>
                    <ThemeToggle />
                    <div className="hidden md:flex items-center gap-2">
                        <Button
                            variant="outline"
                            className="border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-950 transition-colors"
                            asChild
                        >
                            <Link href="/register">Register</Link>
                        </Button>
                        <Button className="bg-green-600 hover:bg-green-700 transition-colors" asChild>
                            <Link href="/login">Sign In</Link>
                        </Button>
                    </div>

                    {/* Mobile search */}
                    <MobileSearch />
                </div>
            </div>
        </header>
    )
}

function NavLink({ href, label }: { href: string; label: string }) {
    return (
        <Link
            href={href}
            className="relative py-3 text-lg font-medium md:text-sm md:py-0 hover:text-green-600 transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-green-600 after:transition-all hover:after:w-full"
        >
            {label}
        </Link>
    )
}

