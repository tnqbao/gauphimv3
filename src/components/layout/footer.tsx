"use client"

import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import PandaLogo from "../content/panda-logo"
import { motion } from "framer-motion"
import { useRouter } from "next/router"

export default function Footer() {
    const router = useRouter()
    return (
        <footer className="border-t bg-white dark:bg-gray-800 dark:border-gray-700 py-6 md:py-8 relative transition-colors duration-300">
            <div className="absolute top-0 left-0 w-full overflow-hidden h-4 pointer-events-none">
                <div className="flex justify-between">
                    {[...Array(40)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-1 h-4 bg-green-800/10 rounded-b-full"
                            initial={{ y: -4 }}
                            animate={{ y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: i * 0.01,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                                repeatDelay: Math.random() * 2,
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="absolute top-8 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}>
                    {[10, 25, 40, 55, 70, 85].map((position, i) => (
                        <div key={`footprint-${i}`} className="absolute" style={{ left: `${position}%`, top: `${20 + i * 15}%` }}>
                            <svg
                                width="20"
                                height="24"
                                viewBox="0 0 20 24"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                                className={`text-black ${i % 2 === 0 ? "rotate-[20deg]" : "rotate-[-20deg]"}`}
                            >
                                <path d="M10 6C11.1 6 12 5.1 12 4C12 2.9 11.1 2 10 2C8.9 2 8 2.9 8 4C8 5.1 8.9 6 10 6Z" />
                                <path d="M14 6C15.1 6 16 5.1 16 4C16 2.9 15.1 2 14 2C12.9 2 12 2.9 12 4C12 5.1 12.9 6 14 6Z" />
                                <path d="M6 6C7.1 6 8 5.1 8 4C8 2.9 7.1 2 6 2C4.9 2 4 2.9 4 4C4 5.1 4.9 6 6 6Z" />
                                <path d="M10 22C13.3 22 16 19.3 16 16C16 12.7 13.3 10 10 10C6.7 10 4 12.7 4 16C4 19.3 6.7 22 10 22Z" />
                            </svg>
                        </div>
                    ))}
                </motion.div>
            </div>

            <div className="container px-4 md:px-6">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <Link href="/public" className="flex items-center gap-2 group">
                            <motion.div whileHover={{ rotate: [0, -10, 10, -10, 0] }} transition={{ duration: 0.5 }}>
                                <PandaLogo className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
                            </motion.div>
                            <span className="text-xl font-bold">PandaFlix</span>
                        </Link>
                        <p className="mt-2 text-sm text-muted-foreground">Your favorite movies and TV shows, all in one place.</p>
                        <div className="mt-4 flex space-x-4">
                            <SocialIcon icon="facebook" />
                            <SocialIcon icon="twitter" />
                            <SocialIcon icon="instagram" />
                            <SocialIcon icon="youtube" />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h3 className="mb-3 text-sm font-medium">Navigation</h3>
                        <ul className="grid gap-2 text-sm">
                            <FooterLink href="../" label="Trang Chủ" />
                            <FooterLink href="../list/phim-moi" label="Phim Mới" />
                            <FooterLink href="../list/tv-show" label="TV Shows" />
                            <FooterLink href="../list/phim-bo" label="Phim Bộ" />
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3 className="mb-3 text-sm font-medium">Legal</h3>
                        <ul className="grid gap-2 text-sm">
                            <FooterLink href="#" label="Terms of Service" />
                            <FooterLink href="#" label="Privacy Policy" />
                            <FooterLink href="#" label="Cookie Policy" />
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h3 className="mb-3 text-sm font-medium">Subscribe</h3>
                        <p className="mb-3 text-sm text-muted-foreground">
                            Subscribe to our newsletter for updates on new releases and features.
                        </p>
                        <form className="flex gap-2">
                            <Input
                                placeholder="Email"
                                type="email"
                                className="max-w-[220px] focus:ring-green-500 focus:border-green-500"
                            />
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                    type="submit"
                                    className="bg-green-600 hover:bg-green-700 transition-colors"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        const target = e.target as HTMLButtonElement
                                        const emailInput = target.previousElementSibling as HTMLInputElement
                                        router.push(`../auth/register?email=${emailInput.value}`)
                                    }}
                                >
                                    Subscribe
                                </Button>
                            </motion.div>
                        </form>
                    </motion.div>
                </div>

                <motion.div
                    className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <p>&copy; {new Date().getFullYear()} PandaFlix. All rights reserved.</p>
                </motion.div>
            </div>
        </footer>
    )
}

function FooterLink({ href, label }: { href: string; label: string }) {
    return (
        <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
            <Link
                href={href}
                className="text-muted-foreground hover:text-green-600 transition-colors hover:underline underline-offset-4"
            >
                {label}
            </Link>
        </motion.li>
    )
}

function SocialIcon({ icon }: { icon: string }) {
    return (
        <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.9 }}>
            <Link
                href="#"
                className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-green-100 transition-colors"
            >
                <span className="sr-only">{icon}</span>
                <div className="h-4 w-4 text-green-600" />
            </Link>
        </motion.div>
    )
}