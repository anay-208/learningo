"use client";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./mode-toggle";
import { motion } from "framer-motion";
import { Home, BookOpen, Sparkles } from "lucide-react";

export default function Header() {
    const router = useRouter()
    return (
        <motion.header 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed top-0 left-0 right-0 z-50 px-4 py-4 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-800/50 shadow-lg"
        >
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push("/dashboard")} 
                    className="flex items-center gap-2 cursor-pointer group"
                    role="button"
                >
                    <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg group-hover:shadow-xl transition-all duration-300">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                        Learningo
                    </h1>
                </motion.div>

                <div className="flex items-center gap-4">
                    <nav className="hidden sm:flex items-center gap-2">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => router.push("/")}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                        >
                            <Home className="w-4 h-4" />
                            Home
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => router.push("/dashboard")}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                        >
                            <BookOpen className="w-4 h-4" />
                            Dashboard
                        </motion.button>
                    </nav>
                    <ModeToggle />
                </div>
            </div>
        </motion.header>
    )
}