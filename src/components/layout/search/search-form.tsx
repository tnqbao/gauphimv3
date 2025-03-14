import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface SearchFormProps {
  initialKeyword: string
}

export default function SearchForm({ initialKeyword }: SearchFormProps) {
  const [keyword, setKeyword] = useState(initialKeyword)
  const router = useRouter()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (keyword.trim()) {
      router.push(`/search?keyword=${encodeURIComponent(keyword.trim())}`)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8"
    >
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            placeholder="Nhập tên phim, diễn viên, thể loại..."
            className="pl-10 py-6 text-base focus:ring-green-500 focus:border-green-500"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <Button type="submit" className="bg-green-600 hover:bg-green-700 transition-colors" disabled={!keyword.trim()}>
          Tìm Kiếm
        </Button>
      </form>

      <div className="mt-4">
        <p className="text-sm text-muted-foreground">Tìm kiếm phổ biến:</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {["Hành Động", "Tình Cảm", "Hài Hước", "Kinh Dị", "Phim Mới", "Phim Bộ"].map((term) => (
            <Button
              key={term}
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={() => {
                setKeyword(term)
                router.push(`/search?keyword=${encodeURIComponent(term)}`)
              }}
            >
              {term}
            </Button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

