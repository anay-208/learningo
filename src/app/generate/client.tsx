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
            if("error" in data && data.error){
                return toast(data.error)
            }


            if("success" in data && data.success){
                toast("Lessons generated successfully! Redirecting to your lessons page...");
                router.push("/")
                return;
            }

            toast("An unknown error occured, please contact me@anayparaswani.dev!")

        })
    }, [prompt, router])
    return (
        <>
            <main className="flex flex-col items-center justify-center min-h-screen space-y-4">
                <h1 className="text-7xl text-center mx-2"> What do you want to learn? </h1>
                <form className="mt-8 w-full max-w-2xl text-center space-y-6">
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full h-48 p-4 text-2xl border border-gray-600 dark:border-gray-300  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter a few words..."
                    ></textarea>
                    <Button
                        onClick={onClick}
                        type="submit"
                        size="lg"
                        className="text-2xl rounded-sm p-6 bg-purple-600 hover:bg-purple-700 text-white border border-purple-800 shadow-lg shadow-purple-400/50 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-purple-400/60 flex justify-center items-center mx-auto"
                        disabled={loading}
                    >
                        {loading ? <Loader2 size={24} className="animate-spin" /> : <> <span className="leading-none -mt-1">Generate</span>
                        <Sparkles className="size-6 animate-pulse text-purple-200" /> </>}
                    </Button>

                </form>
            </main>
        </>
    )
}