import {useEffect, useState} from "react"
import Link from "next/link"
import { logout, selectAuth} from "@/store/slices/authSlice";
import {usePathname, useRouter} from "next/navigation"
import { Menu, Search, User, X} from "lucide-react"
import {cn} from "@/lib/utils"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import ThemeToggle from "@/components/content/theme-toggle"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import MobileSearch from "@/components/layout/search/mobile-search"
import LogoImage from "./logo-image"
import CategoryDropdown from "./category-dropdown"
import NationDropdown from "./nation-dropdown"
import { useSelector} from "react-redux";


export default function Header() {

    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [searchKeyword, setSearchKeyword] = useState("")
    const pathname = usePathname()
    const router = useRouter()
    const {user_id, fullname} = useSelector(selectAuth);
    const isAuthed = user_id !== null

    useEffect(() => {
        setIsMenuOpen(false)
    }, [pathname])

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }

        if (isMenuOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }

        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
            document.body.style.overflow = ""
        }
    }, [isMenuOpen])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchKeyword.trim()) {
            router.push(`/search?keyword=${encodeURIComponent(searchKeyword.trim())}`)
        }
    }

    const UserProfileDropdown = ({fullname}: { fullname: string | null }) => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" alt="User avatar"/>
                        <AvatarFallback>
                            <User className="h-4 w-4"/>
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-xs leading-none text-muted-foreground">{fullname}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>
                    <Link href="../profile" className="w-full">
                        Hồ sơ
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="../favorites" className="w-full">
                        Phim yêu thích
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="../history" className="w-full">
                        Lịch sử xem
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={() => logout()}>Đăng xuất</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )

    const AuthButtons = ({isMobile = false}) => (
        <>
            {isAuthed ? (
                <UserProfileDropdown fullname={fullname}/>
            ) : (
                <>
                    <Button
                        variant="outline"
                        className={cn(
                            "border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-950 transition-colors",
                            isMobile ? "flex-1" : "hidden lg:flex",
                            !isMobile && "size-sm",
                        )}
                        asChild
                    >
                        <Link href="../auth/register">Đăng ký</Link>
                    </Button>
                    <Button
                        className={cn(
                            "bg-green-600 hover:bg-green-700 transition-colors",
                            isMobile ? "flex-1" : "",
                            !isMobile && "size-sm",
                        )}
                        asChild
                    >
                        <Link href="../auth/login">Đăng nhập</Link>
                    </Button>
                </>
            )}
        </>
    )

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full transition-all duration-300",
                isScrolled
                    ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b shadow-sm"
                    : "bg-transparent border-b border-transparent",
            )}
        >
            <div className="container flex h-16 items-center justify-between px-3 sm:px-4 md:px-6">
                <div className="flex items-center gap-1 sm:gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden mr-1"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? <X className="h-5 w-5"/> : <Menu className="h-5 w-5"/>}
                    </Button>
                    <LogoImage size={isScrolled ? "small" : "medium"} className="transition-all duration-300"/>
                </div>
                {isMenuOpen && (
                    <div
                        className="fixed inset-0 bg-black/20 dark:bg-black/50 z-40 md:hidden"
                        onClick={() => setIsMenuOpen(false)}
                        aria-hidden="true"
                    />
                )}

                <nav
                    className={cn(
                        "fixed inset-0 top-16 z-50 flex flex-col bg-white dark:bg-gray-900 p-4 sm:p-6 transition-all duration-300 md:static md:flex md:flex-row md:items-center md:gap-1 lg:gap-6 md:bg-transparent md:p-0 md:translate-x-0 overflow-y-auto md:overflow-visible",
                        isMenuOpen ? "translate-x-0" : "-translate-x-full",
                        "max-w-[300px] md:max-w-none w-4/5 md:w-auto",
                    )}
                >
                    <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 lg:space-x-6">
                        <NavLink href="../list/phim-bo" label="Phim Bộ"/>
                        <NavLink href="../list/phim-le" label="Phim Lẻ"/>
                        <NavLink href="../list/phim-moi" label="Phim Mới"/>
                        <NavLink href="../list/hoat-hinh" label="Hoạt Hình"/>
                        <div className="hidden md:block">
                            <CategoryDropdown/>
                        </div>
                        <div className="hidden md:block">
                            <NationDropdown/>
                        </div>
                    </div>

                    <div className="md:hidden border-t mt-4 pt-4 space-y-4">
                        <CategoryDropdown isMobile/>
                    </div>
                    <div className="md:hidden border-t mt-4 pt-4">
                        <NationDropdown isMobile/>
                    </div>

                    <div className="mt-6 flex gap-2 md:hidden">
                        <AuthButtons isMobile={true}/>
                    </div>
                </nav>

                <div className="flex items-center gap-2 sm:gap-4">
                    <form className="hidden md:block relative" onSubmit={handleSearch}>
                        <Search
                            className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"/>
                        <Input
                            type="search"
                            placeholder="Tìm kiếm phim..."
                            className="w-[180px] pl-8 lg:w-[260px] bg-muted focus:ring-green-500 focus:border-green-500 transition-all h-9"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                        />
                    </form>
                    <ThemeToggle/>

                    {/* Desktop auth buttons */}
                    <div className="hidden md:flex items-center gap-2">
                        <AuthButtons/>
                    </div>

                    <MobileSearch/>
                </div>
            </div>
        </header>
    )
}

function NavLink({href, label}: { href: string; label: string }) {
    const pathname = usePathname()
    const isActive = pathname === href || pathname.startsWith(`${href}/`)

    const getHref = () => {
        switch (label) {
            case "Phim Bộ":
                return "../list/phim-bo"
            case "Phim Mới":
                return "../list/phim-moi"
            default:
                return href
        }
    }
    return (
        <Link
            href={getHref()}
            className={cn(
                "relative py-2 text-base font-bold md:text-sm md:py-2 hover:text-green-600 transition-colors",
                "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-green-600 after:transition-all hover:after:w-full",
                isActive && "text-green-600 after:w-full",
            )}
        >
            {label}
        </Link>
    )
}

