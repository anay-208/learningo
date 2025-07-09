import { useMutation } from "@tanstack/react-query";
import { markLessonAsCompleted } from "@/actions/lessons";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Completed({id, lessonId}: {id: string; lessonId: string;}) {
    const router = useRouter();
    const { mutate, isPending, data } = useMutation({
        mutationFn: async () => {
            return await markLessonAsCompleted(id);
        },
    });

    useEffect(() => {
        mutate();               
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {  
        if(isPending || !data) return;
        if(data.success){
            router.refresh();
            router.push(`/dashboard/${lessonId}`);
        } else {
            toast("An unknown error occured marking completed, please contact me@anayparaswani.dev");
        }
    }, [isPending, data, router, lessonId]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Congratulations!</h1>
            <p className="text-lg mb-4">You have completed the lesson. You&apos;ll be automatically redirected in a few seconds!</p>
        </div>
    );
}