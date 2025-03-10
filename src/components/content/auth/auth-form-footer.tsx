import Link from "next/link"

interface AuthFormFooterProps {
    mode: "login" | "register"
}

export default function AuthFormFooter({ mode }: AuthFormFooterProps) {
    return (
        <div className="flex flex-col">
            <div className="mt-2 text-center text-sm">
                {mode === "login" ? (
                    <>
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="text-green-600 font-medium hover:underline">
                            Register
                        </Link>
                    </>
                ) : (
                    <>
                        Already have an account?{" "}
                        <Link href="/login" className="text-green-600 font-medium hover:underline">
                            Sign In
                        </Link>
                    </>
                )}
            </div>

            {/* Bamboo decoration */}
            <div className="mt-6 w-full flex justify-center">
                <svg width="200" height="10" viewBox="0 0 200 10" className="text-green-600/30">
                    {[...Array(10)].map((_, i) => (
                        <circle key={i} cx={i * 22 + 10} cy="5" r="2" fill="currentColor" />
                    ))}
                    <path d="M0,5 C50,2 150,8 200,5" stroke="currentColor" strokeWidth="1" fill="none" />
                </svg>
            </div>
        </div>
    )
}

