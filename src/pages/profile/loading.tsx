import { Loader2 } from "lucide-react"

export default function ProfileLoading() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <div className="h-10 w-64 bg-muted animate-pulse rounded-md mx-auto mb-2"></div>
                    <div className="h-5 w-48 bg-muted animate-pulse rounded-md mx-auto"></div>
                </div>

                <div className="mb-6 border border-green-200 dark:border-green-800 rounded-lg p-6">
                    <div className="flex flex-col items-center">
                        <div className="h-32 w-32 bg-muted animate-pulse rounded-full"></div>
                        <div className="h-6 w-48 bg-muted animate-pulse rounded-md mt-4"></div>
                        <div className="h-4 w-32 bg-muted animate-pulse rounded-md mt-2"></div>
                        <div className="h-6 w-24 bg-muted animate-pulse rounded-full mt-2"></div>
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                </div>
            </div>
        </div>
    )
}

