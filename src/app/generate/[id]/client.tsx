"use client";
import { generateQuestions } from '@/actions/generate';
import { useQuery } from '@tanstack/react-query';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Link from 'next/link';
export  default function Client({id}: {id: string}) {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <Content id={id}/>
        </QueryClientProvider>
    );
    
}

function Content({ id }: { id: string }) {
    const { data, isLoading, error } = useQuery({
        queryKey: ['generateQuestions'],
        queryFn: () => generateQuestions(id),
    });

    return (
        <div className="flex flex-col items-center justify-center h-[100dvh] space-y-8">
            {isLoading ? (
                <>
                    <h1 className="text-4xl font-bold">Generating Lessons</h1>
                    <p className="text-xl text-center">Hang tight, your lessons are being generated</p>
                    <div className="w-12 h-12 border-4 border-white border-b-transparent rounded-full animate-spin"></div>
                </>
            ) : (
                <>
                    {error && <p className="text-red-500">Error: {error.message}</p>}
                    {(data && data.success) ? (
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl font-semibold">Lessons Generated</h2>
                            <p className="text-lg">Lessons have been generated successfully!</p>
                            <Link href={`/lesson/${id}`}>
                                Go to Lesson
                            </Link>
                        </div>
                    ): (
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl font-semibold">No Lessons Generated</h2>
                            <p className="text-lg">There was an issue generating your lessons. Please try again later or contact me at me@anayparaswani.dev.</p>
                            <Link href={`/`}>
                                Go Back Home
                            </Link>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}