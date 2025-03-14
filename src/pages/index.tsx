import { Suspense, lazy } from "react"
import Header from "@/components/layout/header"
import {
  HeroSkeleton,
  CategorySkeleton,
  MovieSectionSkeleton,
  PandaPicksSkeleton,
  FooterSkeleton,
} from "@/components/content/loading/loading-skeletons"
import BambooDecoration from "@/components/content/bamboo-decoration"
import PandaScrollProgress from "@/components/content/panda-scroll-progress"
import ThemeEffects from "@/components/content/theme-effects"

const Hero = lazy(() => import("@/components/layout/hero"))
const Categories = lazy(() => import("@/components/content/categories"))
const MovieSection = lazy(() => import("@/components/content/movie-section"))
const PandaPicks = lazy(() => import("@/components/content/panda-picks"))
const Footer = lazy(() => import("@/components/layout/footer"))
const FloatingLeaves = lazy(() => import("@/components/content/floating-leaves"))

export const categories = [
  { name: "Action", image: "https://congthanh.vn/uploads/images/in-poster-phim-anh-dep-.jpg" },
  { name: "Comedy", image: "https://congthanh.vn/uploads/images/in-poster-phim-anh-dep-.jpg" },
  { name: "Drama", image: "https://congthanh.vn/uploads/images/in-poster-phim-anh-dep-.jpg" },
  { name: "Horror", image: "https://congthanh.vn/uploads/images/in-poster-phim-anh-dep-.jpg" },
  { name: "Sci-Fi", image: "https://congthanh.vn/uploads/images/in-poster-phim-anh-dep-.jpg" },
  { name: "Family", image: "https://congthanh.vn/uploads/images/in-poster-phim-anh-dep-.jpg" },
]

export const trendingMovies = [
  { title: "Bamboo Warriors", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "8.5", poster_url: "https://img.ophim.live/uploads" , thumb_url: "https://img.ophim.live/uploads" },
  { title: "Panda Express", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "7.9" ,  poster_url: "https://img.ophim.live/uploads" , thumb_url: "https://img.ophim.live/uploads" },
  { title: "Mountain Secrets", year: "2022", poster: "/placeholder.svg?height=300&width=200", rating: "8.2" ,  poster_url: "https://img.ophim.live/uploads" , thumb_url: "https://img.ophim.live/uploads" },
  { title: "The Last Forest", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "7.6" ,  poster_url: "https://img.ophim.live/uploads" , thumb_url: "https://img.ophim.live/uploads" },
  { title: "Bamboo Tales", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "8.3"  ,  poster_url: "https://img.ophim.live/uploads" , thumb_url: "https://img.ophim.live/uploads"},
  { title: "Panda Kingdom", year: "2022", poster: "/placeholder.svg?height=300&width=200", rating: "8.7"  ,  poster_url: "https://img.ophim.live/uploads" , thumb_url: "https://img.ophim.live/uploads"},
]

export const newReleases = [
  { title: "Forest Kingdom", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "8.1"  ,  poster_url: "https://img.ophim.live/uploads" , thumb_url: "https://img.ophim.live/uploads"},
  { title: "Bamboo Tales", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "7.8"  ,  poster_url: "https://img.ophim.live/uploads" , thumb_url: "https://img.ophim.live/uploads"},
  { title: "Wild Journey", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "8.4" ,  poster_url: "https://img.ophim.live/uploads" , thumb_url: "https://img.ophim.live/uploads" },
  { title: "Panda Family", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "9.2" ,  poster_url: "https://img.ophim.live/uploads" , thumb_url: "https://img.ophim.live/uploads" },
  { title: "Nature's Call", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "7.5" ,  poster_url: "https://img.ophim.live/uploads" , thumb_url: "https://img.ophim.live/uploads" },
  { title: "Mountain Adventure", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "8.6"  ,  poster_url: "https://img.ophim.live/uploads" , thumb_url: "https://img.ophim.live/uploads"},
  { title: "Bamboo Forest", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "8.9" ,  poster_url: "https://img.ophim.live/uploads" , thumb_url: "https://img.ophim.live/uploads" },
]

export const pandaPicks = [
  {
    title: "Bamboo Chronicles",
    year: "2022",
    poster: "/placeholder.svg?height=100&width=70",
    description: "A heartwarming tale of a panda family's journey through the changing seasons.",
    rating: "8.7",
  },
  {
    title: "Mountain Legends",
    year: "2021",
    poster: "/placeholder.svg?height=100&width=70",
    description: "Discover the ancient legends of the misty mountains and their mystical guardians.",
    rating: "8.3",
  },
  {
    title: "Panda's Adventure",
    year: "2023",
    poster: "/placeholder.svg?height=100&width=70",
    description: "Join our hero on an epic adventure to save the bamboo forest from destruction.",
    rating: "9.1",
  },
]

export default function HomePage() {
  return (
      <div className="flex min-h-screen flex-col bg-[#f8f9fa] dark:bg-gray-900 overflow-hidden transition-colors duration-300">
        <ThemeEffects />
        <BambooDecoration />
        <Suspense fallback={null}>
          <FloatingLeaves />
        </Suspense>
        <PandaScrollProgress />
        <Header />

        <Suspense fallback={<HeroSkeleton />}>
          <Hero />
        </Suspense>
        <Suspense fallback={<CategorySkeleton />}>
          <Categories categories={categories} />
        </Suspense>

        <Suspense fallback={<MovieSectionSkeleton />}>
          <MovieSection title="Trending Now" movies={trendingMovies} bgColor="bg-white dark:bg-gray-800" />
        </Suspense>

        <Suspense fallback={<MovieSectionSkeleton />}>
          <MovieSection title="New Releases" movies={newReleases} bgColor="bg-[#f8f9fa] dark:bg-gray-900" />
        </Suspense>

        <Suspense fallback={<PandaPicksSkeleton />}>
          <PandaPicks picks={pandaPicks} />
        </Suspense>

        <Suspense fallback={<FooterSkeleton />}>
          <Footer />
        </Suspense>
      </div>
  )
}

