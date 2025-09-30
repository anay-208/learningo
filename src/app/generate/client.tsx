"use client";
import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";
import { generateLessons } from "@/actions/generate"
import { Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Client() {
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const onClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setLoading(true)
        generateLessons(prompt).then(data => {
            setLoading(false)
            if ("error" in data && data.error) {
                return toast(data.error)
            }
            if ("success" in data && data.success) {
                toast("Lessons generated successfully! Redirecting to your lessons page...");
                router.push(`/course/${data.id}`)
                return;
            }
            toast("An unknown error occured, please contact me@anayparaswani.dev!")
        }) 
    }, [prompt, router])
    return (
        <main className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-purple-950/20 dark:via-blue-950/20 dark:to-pink-950/20 relative overflow-hidden pt-20">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                {/* Header */}
                <div className="mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-200/50 dark:border-purple-800/50 mb-6">
                        <Sparkles className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                            AI-Powered Course Generation
                        </span>
                    </div>
                    
                    <h1 className="text-5xl sm:text-7xl lg:text-8xl text-center font-extrabold mb-6 select-none">
                        What do you want to{" "}
                        <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-gradient-x">
                            revise?
                        </span>
                    </h1>
                    
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Describe any topic and our AI will create a comprehensive revision course with lessons and quizzes tailored just for you.
                    </p>
                </div>

                {/* Form */}
                <div className="backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border border-gray-200/50 dark:border-gray-800/50 rounded-3xl shadow-2xl p-8 w-full max-w-3xl mx-auto">
                    <form className="w-full space-y-8">
                        <div className="space-y-4">
                            <label className="block text-left text-lg font-semibold text-gray-900 dark:text-white">
                                Describe your topic
                            </label>
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                className="w-full h-48 p-6 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 resize-none shadow-inner transition-all duration-300"
                                placeholder="Example: 'Photosynthesis in plants', 'World War 2 key events', 'Python programming basics', 'Calculus derivatives'..."
                                rows={6}
                            />
                            <div className="flex justify-between items-center text-sm text-muted-foreground">
                                <span>Be specific for better results</span>
                                <span>{prompt.length}/500</span>
                            </div>
                        </div>

                        <Button
                            onClick={onClick}
                            type="submit"
                            size="lg"
                            className="w-full text-xl font-bold rounded-2xl p-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white border-none shadow-2xl hover:shadow-purple-400/40 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-purple-400/60 flex justify-center items-center mx-auto relative overflow-hidden group hover:scale-105 disabled:hover:scale-100"
                            disabled={loading || !prompt.trim()}
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={24} className="animate-spin mr-3" />
                                    <span>Generating your course...</span>
                                </>
                            ) : (
                                <>
                                    <span className="mr-3">Generate Course</span>
                                    <Sparkles className="w-6 h-6 animate-pulse" />
                                    <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 blur-xl" />
                                </>
                            )}
                        </Button>
                    </form>

                    {/* Features */}
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2 p-3 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span className="font-medium text-purple-700 dark:text-purple-300">Lightning Fast</span>
                        </div>
                        <div className="flex items-center gap-2 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            <span className="font-medium text-blue-700 dark:text-blue-300">AI-Powered</span>
                        </div>
                        <div className="flex items-center gap-2 p-3 rounded-xl bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <span className="font-medium text-green-700 dark:text-green-300">Personalized</span>
                        </div>
                    </div>
                </div>

                {/* Tips */}
                <div className="mt-12 max-w-2xl mx-auto">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        💡 Tips for better results:
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div className="p-4 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
                            <strong className="text-gray-900 dark:text-white">Be specific:</strong> Instead of "Math", try "Quadratic equations and solving methods"
                        </div>
                        <div className="p-4 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
                            <strong className="text-gray-900 dark:text-white">Include context:</strong> Mention your level (beginner, intermediate, advanced)
                        </div>
                        <div className="p-4 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
                            <strong className="text-gray-900 dark:text-white">Add keywords:</strong> Include important terms or concepts you want to focus on
                        </div>
                        <div className="p-4 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
                            <strong className="text-gray-900 dark:text-white">Set scope:</strong> Mention if you want basics, deep dive, or exam prep
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}