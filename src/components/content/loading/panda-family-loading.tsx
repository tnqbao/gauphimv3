import { motion } from "framer-motion"

export default function PandaFamilyLoading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[300px] w-full">
            <div className="relative w-64 h-64">
                {/* Ground with bamboo decoration */}
                <div className="absolute bottom-10 left-0 right-0 h-2 bg-green-100 dark:bg-green-900 rounded-full">
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute bottom-0 w-1 bg-green-600 rounded-full"
                            style={{
                                height: `${10 + Math.random() * 15}px`,
                                left: `${i * 30 + Math.random() * 10}px`,
                                opacity: 0.7,
                            }}
                        />
                    ))}
                </div>

                {/* Mother panda body */}
                <motion.div
                    className="absolute bottom-12 left-1/2 -translate-x-1/2"
                    animate={{
                        y: [0, -5, 0],
                        rotate: [0, 1, 0, -1, 0],
                    }}
                    transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 2,
                        ease: "easeInOut",
                    }}
                >
                    {/* Panda body */}
                    <div className="relative">
                        {/* Body */}
                        <div className="w-32 h-20 bg-white dark:bg-gray-100 rounded-3xl transform rotate-0"></div>

                        {/* Head */}
                        <div className="absolute -left-2 -top-12 w-24 h-20 bg-white dark:bg-gray-100 rounded-3xl transform -rotate-6">
                            {/* Ears */}
                            <div className="absolute -left-2 -top-2 w-8 h-8 bg-black dark:bg-gray-800 rounded-full"></div>
                            <div className="absolute -right-2 -top-2 w-8 h-8 bg-black dark:bg-gray-800 rounded-full"></div>

                            {/* Eyes */}
                            <div className="absolute left-4 top-6 w-4 h-5 bg-black dark:bg-gray-800 rounded-full"></div>
                            <div className="absolute right-4 top-6 w-4 h-5 bg-black dark:bg-gray-800 rounded-full"></div>

                            {/* Nose */}
                            <div className="absolute left-1/2 top-10 -translate-x-1/2 w-5 h-3 bg-black dark:bg-gray-800 rounded-full"></div>

                            {/* Mouth */}
                            <div className="absolute left-1/2 top-14 -translate-x-1/2 w-6 h-1 bg-black dark:bg-gray-800 rounded-full"></div>
                        </div>

                        {/* Legs */}
                        <motion.div
                            className="absolute -left-2 bottom-0 w-6 h-10 bg-black dark:bg-gray-800 rounded-lg"
                            animate={{ rotate: [0, 15, 0, -15, 0] }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
                        ></motion.div>
                        <motion.div
                            className="absolute left-8 bottom-0 w-6 h-10 bg-black dark:bg-gray-800 rounded-lg"
                            animate={{ rotate: [0, -15, 0, 15, 0] }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
                        ></motion.div>
                        <motion.div
                            className="absolute right-8 bottom-0 w-6 h-10 bg-black dark:bg-gray-800 rounded-lg"
                            animate={{ rotate: [0, 15, 0, -15, 0] }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
                        ></motion.div>
                        <motion.div
                            className="absolute -right-2 bottom-0 w-6 h-10 bg-black dark:bg-gray-800 rounded-lg"
                            animate={{ rotate: [0, -15, 0, 15, 0] }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
                        ></motion.div>

                        {/* Tail */}
                        <motion.div
                            className="absolute -right-8 top-2 w-8 h-6 bg-black dark:bg-gray-800 rounded-lg"
                            animate={{ rotate: [0, 10, 0, -10, 0] }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
                        ></motion.div>

                        {/* Baby panda */}
                        <motion.div
                            className="absolute left-1/2 -top-6 -translate-x-1/2"
                            animate={{
                                y: [0, -2, 0, -2, 0],
                                rotate: [0, 2, 0, -2, 0],
                            }}
                            transition={{
                                repeat: Number.POSITIVE_INFINITY,
                                duration: 2.5,
                                ease: "easeInOut",
                            }}
                        >
                            {/* Baby body */}
                            <div className="w-16 h-10 bg-white dark:bg-gray-100 rounded-2xl"></div>

                            {/* Baby head */}
                            <div className="absolute -left-1 -top-8 w-14 h-12 bg-white dark:bg-gray-100 rounded-2xl">
                                {/* Baby ears */}
                                <div className="absolute -left-1 -top-1 w-4 h-4 bg-black dark:bg-gray-800 rounded-full"></div>
                                <div className="absolute -right-1 -top-1 w-4 h-4 bg-black dark:bg-gray-800 rounded-full"></div>

                                {/* Baby eyes */}
                                <div className="absolute left-2 top-4 w-2 h-3 bg-black dark:bg-gray-800 rounded-full"></div>
                                <div className="absolute right-2 top-4 w-2 h-3 bg-black dark:bg-gray-800 rounded-full"></div>

                                {/* Baby nose */}
                                <div className="absolute left-1/2 top-6 -translate-x-1/2 w-3 h-2 bg-black dark:bg-gray-800 rounded-full"></div>
                            </div>

                            {/* Baby paws */}
                            <div className="absolute left-1 bottom-0 w-3 h-4 bg-black dark:bg-gray-800 rounded-lg"></div>
                            <div className="absolute right-1 bottom-0 w-3 h-4 bg-black dark:bg-gray-800 rounded-lg"></div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Bamboo decoration */}
                <div className="absolute -left-8 top-0 bottom-0 flex flex-col justify-end">
                    <motion.div
                        className="w-4 h-40 bg-green-600/20 rounded-full"
                        animate={{ height: [40, 35, 40] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    >
                        <div className="absolute top-1/4 w-full h-0.5 bg-green-600/30"></div>
                        <div className="absolute top-2/4 w-full h-0.5 bg-green-600/30"></div>
                        <div className="absolute top-3/4 w-full h-0.5 bg-green-600/30"></div>
                    </motion.div>
                </div>

                <div className="absolute -right-8 top-0 bottom-0 flex flex-col justify-end">
                    <motion.div
                        className="w-4 h-48 bg-green-600/20 rounded-full"
                        animate={{ height: [48, 42, 48] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
                    >
                        <div className="absolute top-1/4 w-full h-0.5 bg-green-600/30"></div>
                        <div className="absolute top-2/4 w-full h-0.5 bg-green-600/30"></div>
                        <div className="absolute top-3/4 w-full h-0.5 bg-green-600/30"></div>
                    </motion.div>
                </div>
            </div>

            <div className="mt-4 text-center">
                <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    className="text-lg font-medium text-green-600 dark:text-green-400"
                >
                    Đang tải...
                </motion.div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Xin vui lòng chờ trong giây lát</p>
            </div>
        </div>
    )
}

