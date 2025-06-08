import { useQuery } from "@tanstack/react-query";
import { markLessonAsCompleted } from "@/actions/lessons";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Completed({id}: {id: string}) {
    const router = useRouter()
    const {  isLoading } = useQuery({
        queryKey: ['lessonCompleted'],
        queryFn: async () => {
            await markLessonAsCompleted(id);
            return true
        },
    })

    useEffect(() => {
        if(isLoading) return;
        router.refresh();
        router.push(`/lesson/${id}`);
    }, [isLoading, id, router])

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Congratulations!</h1>
            <p className="text-lg mb-4">You have completed the lesson. You&apos;ll be automatically redirected in a few seconds!</p>
        </div>
    );
}