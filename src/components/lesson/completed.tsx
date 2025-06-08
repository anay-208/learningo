import { useQuery } from "@tanstack/react-query";
import { markLessonAsCompleted } from "@/actions/lessons";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export default function Completed({id}: {id: string}) {
    const router = useRouter()
    const {  isLoading, data } = useQuery({
        queryKey: ['lessonCompleted'],
        queryFn: async () => {
            console.log("marking completed")
            return await markLessonAsCompleted(id);
            
        },
    })

    useEffect(() => {
        console.log(isLoading, data)
        if(isLoading || !data) return;
        console.log(data)
        if(data.success){
        router.refresh();
        router.push(`/`);
        } else {
            toast("An unknown error occured marking completed, please contact me@anayparaswani.dev")
        }
    }, [isLoading, id, router, data])

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Congratulations!</h1>
            <p className="text-lg mb-4">You have completed the lesson. You&apos;ll be automatically redirected in a few seconds!</p>
        </div>
    );
}