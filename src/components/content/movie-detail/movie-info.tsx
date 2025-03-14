import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"

interface MovieInfoProps {
    title: string
    originalTitle: string
    releaseYear: string
    duration: string
    categories: {
        id: string
        name: string
        slug: string
    }[]
    country: {
        id: string
        name: string
        slug: string
    }[]
}

export default function MovieInfo({
                                      title,
                                      originalTitle,
                                      releaseYear,
                                      duration,
                                      categories,
                                      country,
                                  }: MovieInfoProps) {
    return (
        <>
            <h1
                className="text-3xl font-bold mb-1 md:text-white text-black"
                style={{ textShadow: "3px 3px 6px rgba(0, 0, 0, 0.8)", WebkitTextStroke: "0.5px black" }}
            >
                {title}
            </h1>
            <h2
                className="text-xl md:text-white text-black mb-4"
                style={{ textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)"}}
            >
                {originalTitle}
            </h2>

            <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((category) => (
                    <Link key={category.slug} href={`/category/${category.slug}`}>
                        <Badge variant="secondary" className="hover:bg-green-600 transition-colors hover:text-white">
                            {category.name}
                        </Badge>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="flex flex-col">
          <span
              className="text-lg md:text-sm md:text-yellow-400 text-black"
              style={{
                  textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
                  WebkitTextStroke: "0.1px white",
              }}
          >
            Đánh giá
          </span>
                    <div className="flex items-center">{/* Star rating or other content */}</div>
                </div>

                <div className="flex flex-col">
          <span
              className="text-lg md:text-sm md:text-yellow-400 text-black"
              style={{
                  textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
                  WebkitTextStroke: "0.1px white",
              }}
          >
            Thời lượng
          </span>
                    <div className="flex items-center">
                        <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                        <span
                            className="text-sm md:text-white text-black"
                            style={{
                                textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)",
                                WebkitTextStroke: "0.1px black",
                            }}
                        >
              {duration}
            </span>
                    </div>
                </div>

                <div className="flex flex-col">
          <span
              className="text-lg md:text-sm md:text-yellow-400 text-black"
              style={{
                  textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
                  WebkitTextStroke: "0.1px white",
              }}
          >
            Năm phát hành
          </span>
                    <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-muted-foreground mr-1" />
                        <span
                            className="text-sm md:text-white text-black"
                            style={{
                                textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)",
                                WebkitTextStroke: "0.1px black",
                            }}
                        >
              {releaseYear}
            </span>
                    </div>
                </div>

                <div className="flex flex-col">
          <span
              className="text-lg md:text-sm md:text-yellow-400 text-black"
              style={{
                  textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
                  WebkitTextStroke: "0.1px white",
              }}
          >
            Quốc gia
          </span>
                    {country.map((nation) => (
                        <div key={nation.slug} className="flex items-center">
                            <Link
                                href={`/nation/${nation.slug}`}
                                className="flex items-center hover:text-green-600 transition-colors"
                            >
                <span
                    className="text-sm md:text-white text-black"
                    style={{
                        textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)",
                        WebkitTextStroke: "0.1px black",
                    }}
                >
                  {nation.name}
                </span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

