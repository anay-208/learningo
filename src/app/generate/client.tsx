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
                router.push("/")
                return;
            }
            toast("An unknown error occured, please contact me@anayparaswani.dev!")
        })
    }, [prompt, router])
    return (
        <>
            <main className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 dark:from-purple-900 dark:via-indigo-900 dark:to-blue-900">
                <h1 className="text-5xl sm:text-7xl text-center mx-2 font-extrabold mb-8 select-none">
                    What do you want to <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x">revise?</span>
                </h1>
                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-2xl mx-4">
                    <form className="w-full text-center space-y-6">
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="w-full h-48 p-4 text-2xl border border-gray-600 dark:border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/20 text-white placeholder:text-gray-300 resize-none shadow-inner"
                            placeholder="Enter a few words..."
                        ></textarea>
                        <Button
                            onClick={onClick}
                            type="submit"
                            size="lg"
                            className="text-2xl rounded-md p-6 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 hover:from-purple-700 hover:via-pink-600 hover:to-blue-600 text-white border-none shadow-lg shadow-purple-400/40 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-purple-400/60 flex justify-center items-center mx-auto relative overflow-hidden group"
                            disabled={loading}
                            style={{ boxShadow: '0 0 24px 4px rgba(168,85,247,0.4)' }}
                        >
                            {loading ? <Loader2 size={24} className="animate-spin" /> : <>
                                <span className="leading-none -mt-1 mr-2">Generate</span>
                                <Sparkles className="size-6 animate-pulse text-purple-200" />
                                <span className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-60 transition-opacity duration-300 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 blur-lg z-0" />
                            </>}
                        </Button>
                    </form>
                </div>
            </main>
        </>
    )
}