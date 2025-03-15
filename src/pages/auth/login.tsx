import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff } from "lucide-react"
import AuthLayout from "@/components/content/auth/auth-layout"
import PandaWindow from "@/components/content/auth/panda-window"
import AuthFormFooter from "@/components/content/auth/auth-form-footer"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isPasswordFocused, setIsPasswordFocused] = useState(false)
    const [activeInputId, setActiveInputId] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const emailInputRef = useRef<HTMLInputElement>(null)
    const passwordInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (!target) return

            if (emailInputRef.current && emailInputRef.current.contains(target)) {
                setActiveInputId("email")
                setIsPasswordFocused(false)
            } else if (passwordInputRef.current && passwordInputRef.current.contains(target)) {
                setActiveInputId("password")
                setIsPasswordFocused(true)
            } else {
                setActiveInputId(null)
                setIsPasswordFocused(false)
            }
        }

        document.addEventListener("click", handleClick)
        return () => document.removeEventListener("click", handleClick)
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (!email || !password) {
            setError("Có vẻ như bạn đã bỏ trống gì đó")
            return
        }

        try {
            setIsLoading(true)
            await new Promise((resolve) => setTimeout(resolve, 1500))

            window.location.href = "/"
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError("Invalid email or password")
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AuthLayout>
            <Card className="border-green-100 shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Chào mừng cậu trở lại</CardTitle>
                    <CardDescription className="text-center">Hãy đăng nhập để tận hưởng những bộ phim hay nhất nhé</CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="flex justify-center mb-6">
                        <PandaWindow isPasswordFocused={isPasswordFocused} activeInputId={activeInputId} mode="login" />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                ref={emailInputRef}
                                type="email"
                                placeholder="panda@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => {
                                    setActiveInputId("email")
                                    setIsPasswordFocused(false)
                                }}
                                className="focus:ring-green-500 focus:border-green-500"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Mật khẩu</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    ref={passwordInputRef}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => {
                                        setIsPasswordFocused(true)
                                        setActiveInputId("password")
                                    }}
                                    className="focus:ring-green-500 focus:border-green-500 pr-10"
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-gray-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                                </Button>
                            </div>
                        </div>

                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="text-red-500 text-sm p-2 bg-red-50 rounded-md"
                                >
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <Button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 transition-colors"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center">
                                    <svg
                                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Đang đăng nhập...
                                </div>
                            ) : (
                                "Đăng nhập"
                            )}
                        </Button>

                        <div className="text-center text-sm">
                            <Link href="#" className="text-green-600 hover:underline">
                                Bạn lỡ quên mật khẩu?
                            </Link>
                        </div>
                    </form>
                </CardContent>

                <CardFooter>
                    <AuthFormFooter mode="login" />
                </CardFooter>
            </Card>
        </AuthLayout>
    )
}