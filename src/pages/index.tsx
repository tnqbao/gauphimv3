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
  { name: "Hành Động", image: "https://i.imgur.com/AoTce5E.jpeg", slug: "hanh-dong" },
  { name: "Hài", image: "https://i.imgur.com/AGaIiRo.jpeg" , slug: "hai-huoc"},
  { name: "Drama", image: "https://i.imgur.com/nmdPlNK.jpeg", slug: "chinh-kich" },
  { name: "Kinh Dị", image: "https://i.imgur.com/ChWVQ75.png", slug : "kinh-di" },
  { name: "Sci-Fi", image: "https://i.imgur.com/ny54LpZ.jpeg", slug: "vien-tuong" },
  { name: "Gia Đình", image: "https://i.imgur.com/thnZiRO.jpeg" , slug: "gia-dinh"},
]

export const trendingMovies = [
  { title: "Bamboo Warriors", year: "2023", slug: "", rating: "8.5", poster_url: "https://img.ophim.live/uploads" , thumb_url: "https://img.ophim.live/uploads" },
]

export const newReleases = [
    {
        title: "Tân Thế Giới",
        year: "2025",
        slug: "tan-the-gioi",
        rating: "8.1",
        poster_url: "tan-the-gioi-poster.jpg",
        thumb_url: "tan-the-gioi-thumb.jpg"
    },
    {
        title: "EXchange: Khởi Đầu Mới",
        year: "2025",
        slug: "exchange-khoi-dau-moi",
        rating: "N/A",
        poster_url: "exchange-khoi-dau-moi-poster.jpg",
        thumb_url: "exchange-khoi-dau-moi-thumb.jpg"
    },
    {
        title: "Nữ Thần Lớp E",
        year: "2025",
        slug: "nu-than-lop-e",
        rating: "N/A",
        poster_url: "nu-than-lop-e-poster.jpg",
        thumb_url: "nu-than-lop-e-thumb.jpg"
    },
    {
        title: "Bản Tình Ca Dành Cho Em",
        year: "2025",
        slug: "ban-tinh-ca-danh-cho-em",
        rating: "N/A",
        poster_url: "ban-tinh-ca-danh-cho-em-poster.jpg",
        thumb_url: "ban-tinh-ca-danh-cho-em-thumb.jpg"
    },
    {
        title: "Điệp Vụ Thanh Xuân",
        year: "2025",
        slug: "diep-vien-thanh-xuan",
        rating: "N/A",
        poster_url: "diep-vien-thanh-xuan-poster.jpg",
        thumb_url: "diep-vien-thanh-xuan-thumb.jpg"
    },
    {
        title: "Đội Đặc Nhiệm SWAT (Phần 8)",
        year: "2024",
        slug: "doi-dac-nhiem-swat-phan-8",
        rating: "N/A",
        poster_url: "doi-dac-nhiem-swat-phan-8-poster.jpg",
        thumb_url: "doi-dac-nhiem-swat-phan-8-thumb.jpg"
    }
];


export const pandaPicks = [
  {
      title: "Khi Cuộc Đời Cho Bạn Quả Quýt",
      description:
          "Ở Jeju, câu chuyện về một cô nàng nhiệt huyết và chàng trai kiên cường trên đảo nảy nở thành câu chuyện trọn đời đầy thăng trầm, minh chứng tình yêu vẫn trường tồn theo thời gian.",
    year: "2025",
    poster: "https://img.ophim.live/uploads/movies/khi-cuoc-doi-cho-ban-qua-quyt-thumb.jpg",
    rating: "8.7",
  },
  {
      title: "Cơ Quan Kỳ Môn",
      description:
          "Mặc Tâm cùng sư huynh và sư muội bước vào lăng mộ Quỷ Cốc, nơi cuộc tranh giành báu vật giữa Tề và Sở đẩy họ vào nguy hiểm tột cùng. Giữa những âm mưu và thử thách chết người, họ phải giải mã những bí ẩn cổ xưa để bảo vệ hòa bình, viết nên câu chuyện về trí tuệ, lòng dũng cảm và những bí mật khủng khiếp.",
    year: "2021",
    poster: "https://img.ophim.live/uploads/movies/co-quan-ky-mon-thumb.jpg",
    rating: "8.3",
  },
  {
      title: "Mục Thần Ký",
      description:
          "Tần Mục, một giáo chủ Thiên Ma giáo, từ thân thể phàm trần trở thành Nhân Hoàng, vượt qua chiến tranh và phát hiện sức mạnh Ma Thần. Anh dùng đạo pháp thần thông thay đổi vận mệnh, cải cách quốc gia, viết nên câu chuyện về sức mạnh và số phận.",
    year: "2023",
    poster: "https://img.ophim.live/uploads/movies/muc-than-ky-thumb.jpg",
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
          <MovieSection title="Phim Nổi Bật" movies={trendingMovies} bgColor="bg-white dark:bg-gray-800" pageSlug={"phim-noi-bat"}/>
        </Suspense>

        <Suspense fallback={<MovieSectionSkeleton />}>
          <MovieSection title="Phim Mới Ra" movies={newReleases} bgColor="bg-[#f8f9fa] dark:bg-gray-900" pageSlug={"phim-moi"}/>
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

