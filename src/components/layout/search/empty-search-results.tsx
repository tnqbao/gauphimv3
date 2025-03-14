import { motion } from "framer-motion"
import { SearchX } from "lucide-react"

interface EmptySearchResultsProps {
    message: string
}

export default function EmptySearchResults({ message }: EmptySearchResultsProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-16 text-center"
        >
            <div className="relative mb-6">
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, 0, -5, 0],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                    }}
                    className="relative w-24 h-24"
                >
                    {/* Panda face */}
                    <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-full border-2 border-black dark:border-white"></div>

                    {/* Ears */}
                    <div className="absolute top-0 left-0 w-8 h-8 -translate-x-1/4 -translate-y-1/4 bg-black dark:bg-gray-900 rounded-full"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 translate-x-1/4 -translate-y-1/4 bg-black dark:bg-gray-900 rounded-full"></div>

                    {/* Eyes */}
                    <div className="absolute top-1/3 left-1/3 w-3 h-3 -translate-x-1/2 -translate-y-1/2 bg-black dark:bg-white rounded-full"></div>
                    <div className="absolute top-1/3 right-1/3 w-3 h-3 translate-x-1/2 -translate-y-1/2 bg-black dark:bg-white rounded-full"></div>

                    {/* Nose */}
                    <div className="absolute top-1/2 left-1/2 w-4 h-3 -translate-x-1/2 -translate-y-1/2 bg-black dark:bg-gray-900 rounded-full"></div>

                    {/* Mouth - sad expression */}
                    <div className="absolute bottom-1/3 left-1/2 w-8 h-4 -translate-x-1/2 translate-y-1/2 border-b-2 border-black dark:border-white rounded-full transform rotate-180"></div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                    className="absolute -bottom-2 -right-2 bg-red-100 dark:bg-red-900 rounded-full p-2"
                >
                    <SearchX className="h-6 w-6 text-red-500 dark:text-red-300" />
                </motion.div>
            </div>

            <h3 className="text-xl font-medium mb-2">Không tìm thấy kết quả</h3>
            <p className="text-muted-foreground max-w-md">{message}</p>

            <div className="mt-6 text-sm text-muted-foreground">
                <p>Gợi ý:</p>
                <ul className="list-disc list-inside mt-2">
                    <li>Kiểm tra lỗi chính tả</li>
                    <li>Sử dụng các từ khóa ngắn hơn</li>
                    <li>Thử tìm kiếm bằng tên phim hoặc diễn viên</li>
                    <li>Thử tìm kiếm bằng thể loại phim</li>
                </ul>
            </div>
        </motion.div>
    )
}

