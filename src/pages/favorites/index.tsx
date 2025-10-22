import Head from "next/head"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Heart, Construction, Clock, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export default function FavoritePage() {
    return (
        <div className="flex min-h-screen flex-col bg-[#f8f9fa] dark:bg-gray-900">
            <Head>
                <title>Phim Yêu Thích - Gấu Flix</title>
                <meta name="description" content="Tính năng phim yêu thích đang được phát triển" />
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <Header />

            <main className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="max-w-2xl w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 text-center"
                    >
                        {/* Icon animated */}
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse",
                            }}
                            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-6"
                        >
                            <Heart className="w-12 h-12 text-white" fill="white" />
                        </motion.div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Phim Yêu Thích
                        </h1>

                        {/* Status Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-full mb-6">
                            <Construction className="w-5 h-5" />
                            <span className="font-medium">Đang Phát Triển</span>
                        </div>

                        {/* Description */}
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                            Tính năng <span className="font-semibold text-green-600 dark:text-green-400">Phim Yêu Thích</span> đang trong giai đoạn phát triển và sẽ sớm ra mắt trong bản cập nhật tiếp theo.
                        </p>

                        {/* Features Preview */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-left"
                            >
                                <div className="flex items-start gap-3">
                                    <Heart className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                            Lưu Phim Yêu Thích
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Lưu và quản lý danh sách phim bạn yêu thích
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-left"
                            >
                                <div className="flex items-start gap-3">
                                    <Clock className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                            Truy Cập Nhanh
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Xem lại phim yêu thích mọi lúc, mọi nơi
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-left"
                            >
                                <div className="flex items-start gap-3">
                                    <Sparkles className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                            Gợi Ý Thông Minh
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Nhận đề xuất phim dựa trên sở thích
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-left"
                            >
                                <div className="flex items-start gap-3">
                                    <Heart className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                            Đồng Bộ Đa Thiết Bị
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Danh sách yêu thích luôn được đồng bộ
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Call to Action */}
                        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                            <p className="text-lg font-medium mb-2">
                                🎬 Hãy đón chờ bản cập nhật sắp tới!
                            </p>
                            <p className="text-sm opacity-90">
                                Cảm ơn bạn đã đồng hành cùng Gấu Flix. Chúng mình đang nỗ lực hoàn thiện tính năng này để mang đến trải nghiệm tốt nhất cho bạn! 🐼💚
                            </p>
                        </div>

                        {/* Back Button */}
                        <motion.a
                            href="/"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-block mt-8 px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-lg hover:shadow-lg transition-shadow"
                        >
                            Quay Về Trang Chủ
                        </motion.a>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

