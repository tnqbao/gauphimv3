import { Skeleton } from "@/components/ui/skeleton"

export function MovieCardSkeleton() {
    return (
        <div className="flex flex-col space-y-2">
            <Skeleton className="aspect-[2/3] w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
        </div>
    )
}

export function HeroSkeleton() {
    return (
        <div className="relative h-[500px] w-full overflow-hidden">
            <Skeleton className="h-full w-full" />
            <div className="absolute inset-0 flex flex-col justify-center px-6">
                <Skeleton className="h-8 w-24 mb-4" />
                <Skeleton className="h-12 w-3/4 max-w-[600px] mb-4" />
                <Skeleton className="h-6 w-1/2 max-w-[500px] mb-6" />
                <div className="flex gap-4">
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-10 w-32" />
                </div>
            </div>
        </div>
    )
}

export function CategorySkeleton() {
    return (
        <div className="py-8 md:py-12">
            <div className="container px-4 md:px-6">
                <Skeleton className="h-8 w-40 mb-6" />
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                    {Array(6)
                        .fill(0)
                        .map((_, i) => (
                            <Skeleton key={i} className="aspect-video w-full rounded-lg" />
                        ))}
                </div>
            </div>
        </div>
    )
}

export function MovieSectionSkeleton() {
    return (
        <div className="py-8 md:py-12">
            <div className="container px-4 md:px-6">
                <div className="flex items-center justify-between mb-6">
                    <Skeleton className="h-8 w-40" />
                    <Skeleton className="h-8 w-20" />
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4">
                    {Array(7)
                        .fill(0)
                        .map((_, i) => (
                            <div key={i} className="flex-shrink-0 w-[160px] sm:w-[200px]">
                                <MovieCardSkeleton />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export function PandaPicksSkeleton() {
    return (
        <div className="py-8 md:py-12 bg-black text-white">
            <div className="container px-4 md:px-6">
                <Skeleton className="h-8 w-40 mb-8 bg-gray-700" />
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {Array(3)
                        .fill(0)
                        .map((_, i) => (
                            <div key={i} className="flex gap-4">
                                <Skeleton className="h-24 w-16 flex-shrink-0 rounded-md bg-gray-700" />
                                <div className="flex flex-col space-y-2">
                                    <Skeleton className="h-4 w-3/4 bg-gray-700" />
                                    <Skeleton className="h-3 w-1/2 bg-gray-700" />
                                    <Skeleton className="h-12 w-full bg-gray-700" />
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export function FooterSkeleton() {
    return (
        <div className="border-t py-6 md:py-8">
            <div className="container px-4 md:px-6">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {Array(4)
                        .fill(0)
                        .map((_, i) => (
                            <div key={i} className="flex flex-col space-y-3">
                                <Skeleton className="h-6 w-32" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

