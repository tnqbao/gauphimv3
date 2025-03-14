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

// New skeleton components for categories and nations pages
export function CategorySkeletonGrid() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
            {Array(12)
                .fill(0)
                .map((_, i) => (
                    <div key={i} className="overflow-hidden rounded-lg border-2 border-gray-200 dark:border-gray-700">
                        <div className="h-2 bg-gray-200 dark:bg-gray-700"></div>
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-4">
                                <Skeleton className="h-10 w-10 rounded-full" />
                                <Skeleton className="h-6 w-24" />
                            </div>
                            <Skeleton className="h-4 w-full mb-4" />
                            <Skeleton className="h-4 w-3/4" />
                            <div className="flex justify-end mt-4">
                                <Skeleton className="h-8 w-24" />
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export function NationSkeletonGrid() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
            {Array(12)
                .fill(0)
                .map((_, i) => (
                    <div key={i} className="overflow-hidden rounded-lg border-2 border-gray-200 dark:border-gray-700">
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-4">
                                <Skeleton className="h-12 w-12 rounded-full" />
                                <Skeleton className="h-6 w-24" />
                            </div>
                            <Skeleton className="h-4 w-full mb-4" />
                            <Skeleton className="h-4 w-3/4" />
                            <div className="flex justify-end mt-4">
                                <Skeleton className="h-8 w-24" />
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export function MovieDetailSkeleton() {
    return (
        <div className="relative">
            {/* Blurred background poster */}
            <div className="absolute inset-0 overflow-hidden h-[500px]">
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background z-10" />
                <Skeleton className="h-full w-full" />
            </div>

            <div className="container relative z-20 px-4 md:px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Poster column */}
                    <div className="md:col-span-1">
                        <Skeleton className="aspect-[2/3] w-full rounded-lg" />
                        <div className="mt-4 flex flex-col gap-3">
                            <Skeleton className="h-10 w-full rounded-md" />
                            <div className="flex gap-2">
                                <Skeleton className="h-10 w-full rounded-md" />
                                <Skeleton className="h-10 w-full rounded-md" />
                            </div>
                        </div>
                    </div>

                    {/* Info column */}
                    <div className="md:col-span-2">
                        <Skeleton className="h-8 w-3/4 mb-1" />
                        <Skeleton className="h-6 w-1/2 mb-4" />

                        <div className="flex flex-wrap gap-2 mb-4">
                            {Array(4)
                                .fill(0)
                                .map((_, i) => (
                                    <Skeleton key={i} className="h-6 w-20 rounded-full" />
                                ))}
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                            {Array(4)
                                .fill(0)
                                .map((_, i) => (
                                    <div key={i} className="flex flex-col">
                                        <Skeleton className="h-4 w-20 mb-2" />
                                        <Skeleton className="h-6 w-24" />
                                    </div>
                                ))}
                        </div>

                        <div className="mb-6">
                            <Skeleton className="h-6 w-40 mb-2" />
                            <Skeleton className="h-4 w-full mb-1" />
                            <Skeleton className="h-4 w-full mb-1" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>

                        <div className="mb-6">
                            <Skeleton className="h-6 w-40 mb-3" />
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {Array(8)
                                    .fill(0)
                                    .map((_, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <Skeleton className="h-10 w-10 rounded-full" />
                                            <div>
                                                <Skeleton className="h-4 w-20" />
                                                <Skeleton className="h-3 w-16" />
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        <div>
                            <Skeleton className="h-6 w-40 mb-3" />
                            <div className="mb-4">
                                <Skeleton className="h-10 w-full rounded-md" />
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                {Array(8)
                                    .fill(0)
                                    .map((_, i) => (
                                        <div key={i}>
                                            <Skeleton className="aspect-video w-full rounded-md mb-2" />
                                            <Skeleton className="h-4 w-full" />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function VideoPlayerSkeleton() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-24 h-24">
                            <Skeleton className="w-full h-full rounded-full" />
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <Skeleton className="w-12 h-12 rounded-full" />
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                        <Skeleton className="h-4 w-full mb-2" />
                        <div className="flex justify-between items-center">
                            <Skeleton className="h-8 w-24" />
                            <Skeleton className="h-8 w-24" />
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <Skeleton className="h-6 w-40 mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
            </div>

            <div className="lg:col-span-1">
                <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                    <div className="p-4 border-b border-gray-800">
                        <Skeleton className="h-6 w-40" />
                    </div>
                    <div className="p-4 max-h-[600px] overflow-y-auto">
                        <div className="space-y-2">
                            {Array(10)
                                .fill(0)
                                .map((_, i) => (
                                    <div key={i} className="rounded-md overflow-hidden border border-gray-700 bg-gray-800">
                                        <div className="p-2 flex items-center">
                                            <Skeleton className="h-16 w-24 rounded-md mr-2" />
                                            <div className="flex-1">
                                                <Skeleton className="h-4 w-20 mb-1" />
                                                <Skeleton className="h-3 w-full" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

