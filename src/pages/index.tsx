import { Suspense, lazy } from "react"
import Header from "@/components/header"
import {
  HeroSkeleton,
  CategorySkeleton,
  MovieSectionSkeleton,
  PandaPicksSkeleton,
  FooterSkeleton,
} from "@/components/loading-skeletons"
import BambooDecoration from "@/components/bamboo-decoration"
import PandaScrollProgress from "@/components/panda-scroll-progress"
import ThemeEffects from "@/components/theme-effects"

// Lazy load components
const Hero = lazy(() => import("@/components/hero"))
const Categories = lazy(() => import("@/components/categories"))
const MovieSection = lazy(() => import("@/components/movie-section"))
const PandaPicks = lazy(() => import("@/components/panda-picks"))
const Footer = lazy(() => import("@/components/footer"))
const FloatingLeaves = lazy(() => import("@/components/floating-leaves"))

// Sample data
export const categories = [
  { name: "Action", image: "https://congthanh.vn/uploads/images/in-poster-phim-anh-dep-.jpg" },
  { name: "Comedy", image: "https://congthanh.vn/uploads/images/in-poster-phim-anh-dep-.jpg" },
  { name: "Drama", image: "https://congthanh.vn/uploads/images/in-poster-phim-anh-dep-.jpg" },
  { name: "Horror", image: "https://congthanh.vn/uploads/images/in-poster-phim-anh-dep-.jpg" },
  { name: "Sci-Fi", image: "https://congthanh.vn/uploads/images/in-poster-phim-anh-dep-.jpg" },
  { name: "Family", image: "https://congthanh.vn/uploads/images/in-poster-phim-anh-dep-.jpg" },
]

export const trendingMovies = [
  { title: "Bamboo Warriors", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "8.5" },
  { title: "Panda Express", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "7.9" },
  { title: "Mountain Secrets", year: "2022", poster: "/placeholder.svg?height=300&width=200", rating: "8.2" },
  { title: "The Last Forest", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "7.6" },
  { title: "Black & White", year: "2022", poster: "/placeholder.svg?height=300&width=200", rating: "9.0" },
  { title: "Bamboo Tales", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "8.3" },
  { title: "Panda Kingdom", year: "2022", poster: "/placeholder.svg?height=300&width=200", rating: "8.7" },
]

export const newReleases = [
  { title: "Forest Kingdom", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "8.1" },
  { title: "Bamboo Tales", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "7.8" },
  { title: "Wild Journey", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "8.4" },
  { title: "Panda Family", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "9.2" },
  { title: "Nature's Call", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "7.5" },
  { title: "Mountain Adventure", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "8.6" },
  { title: "Bamboo Forest", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "8.9" },
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

