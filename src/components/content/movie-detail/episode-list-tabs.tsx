import { useRef } from "react"
import { Film, ChevronLeft, ChevronRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import EpisodeCard, { type Episode } from "../episode-card"
import { cn } from "@/lib/utils"

interface EpisodeListTabsProps {
    episodes: Episode[]
    thumb_url: string
    movieSlug: string
    movieName?: string
}

export default function EpisodeListTabs({ episodes, thumb_url, movieSlug, movieName }: EpisodeListTabsProps) {
    const tabsListRef = useRef<HTMLDivElement>(null)

    const scrollTabs = (direction: "left" | "right") => {
        if (tabsListRef.current) {
            const scrollAmount = direction === "left" ? -200 : 200
            tabsListRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
        }
    }

    const getEpisodesPerGroup = () => {
        const totalEpisodes = episodes.length
        if (totalEpisodes < 100) {
            return 10
        } else if (totalEpisodes < 1000) {
            return 20
        } else {
            return 100
        }
    }

    const episodesPerGroup = getEpisodesPerGroup()

    if (!episodes || episodes.length === 0) {
        return null
    }

    const groups = Array.from({ length: Math.ceil(episodes.length / episodesPerGroup) }, (_, i) => {
        const start = i * episodesPerGroup + 1
        const end = Math.min((i + 1) * episodesPerGroup, episodes.length)
        return { start, end }
    })

    return (
        <div>
            <h3 className="text-lg font-medium mb-3 flex items-center  text-white">
                <Film className="mr-2 h-5 w-5 text-black md:text-white dark:text-white" /> Danh sách tập
            </h3>

            <Tabs defaultValue="all" className="w-full">
                <div className="relative">
                    {/* Scroll buttons */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm md:hidden"
                        onClick={() => scrollTabs("left")}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm md:hidden"
                        onClick={() => scrollTabs("right")}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>

                    {/* Scrollable tabs list */}
                    <TabsList
                        ref={tabsListRef}
                        className={cn(
                            "mb-4 w-full h-auto bg-gray-800 p-1",
                            "flex overflow-x-auto scrollbar-hide",
                            "scroll-smooth snap-x snap-mandatory",
                            "relative", // For scroll buttons positioning
                        )}
                    >
                        <TabsTrigger value="all" className="flex-none snap-start data-[state=active]:bg-green-600 min-w-[80px]">
                            Tất cả
                        </TabsTrigger>
                        {groups.map(({ start, end }) => (
                            <TabsTrigger
                                key={start}
                                value={`group-${start}`}
                                className="flex-none snap-start data-[state=active]:bg-green-600 min-w-[80px]"
                            >
                                {start}-{end}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                <TabsContent value="all" className="mt-0">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                        {episodes.map((ep) => (
                            <EpisodeCard key={ep.name} episode={ep} thumb_url={thumb_url} movieSlug={movieSlug} movieName={movieName}/>
                        ))}
                    </div>
                </TabsContent>

                {groups.map(({ start, end }) => (
                    <TabsContent key={start} value={`group-${start}`} className="mt-0">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 " >
                            {episodes.slice(start - 1, end).map((ep) => (
                                <EpisodeCard key={ep.name} episode={ep} thumb_url={thumb_url} movieSlug={movieSlug} movieName={movieName} />
                            ))}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}
