"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"

interface Category {
    name: string
    image: string
    slug: string
}

interface CategoriesProps {
    categories: Category[]
}

export default function Categories({ categories }: CategoriesProps) {
    const controls = useAnimation()
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })

    useEffect(() => {
        if (inView) {
            controls.start("visible")
        }
    }, [controls, inView])

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    }

    return (
        <section className="py-8 md:py-12 relative">
            <div className="container px-4 md:px-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                    <h2 className="mb-6 text-2xl font-bold flex items-center">
                        <span className="w-1 h-6 bg-green-600 mr-2 rounded-full"></span>
                        <span className="relative">
              Danh mục
              <motion.span
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-green-600"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  style={{ originX: 0 }}
              />
            </span>
                    </h2>
                </motion.div>

                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={controls}
                    className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6"
                >
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.name}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link href={`../category/${category.slug}`} className="group relative overflow-hidden rounded-lg bg-black block h-full">
                                <Image
                                    src={category.image || "/placeholder.svg"}
                                    alt={category.name + index}
                                    width={200}
                                    height={100}
                                    unoptimized
                                    className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-110 group-hover:opacity-50"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-white transition-transform duration-300 group-hover:scale-110">
                    {category.name}
                  </span>
                                </div>

                                {/* Panda paw print decoration */}
                                <motion.div
                                    className="absolute -bottom-6 -right-6 w-12 h-12 text-white/10"
                                    initial={{ opacity: 0, rotate: -30 }}
                                    whileHover={{ opacity: 1, rotate: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C9.5 2 7.5 3.5 7.5 5.5C7.5 7.5 9.5 9 12 9C14.5 9 16.5 7.5 16.5 5.5C16.5 3.5 14.5 2 12 2Z" />
                                        <path d="M6 4C4.5 4 3 5 3 6.5C3 8 4.5 9 6 9C7.5 9 9 8 9 6.5C9 5 7.5 4 6 4Z" />
                                        <path d="M18 4C16.5 4 15 5 15 6.5C15 8 16.5 9 18 9C19.5 9 21 8 21 6.5C21 5 19.5 4 18 4Z" />
                                        <path d="M12 10C8.5 10 6 12.5 6 15.5C6 18.5 8.5 21 12 21C15.5 21 18 18.5 18 15.5C18 12.5 15.5 10 12 10Z" />
                                    </svg>
                                </motion.div>

                                <div className="absolute bottom-0 left-0 w-full h-1 bg-green-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

