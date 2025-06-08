"use client"
import { useStep } from 'usehooks-ts'
import { QuestionType } from './types'
import Question from './question';
import { useCallback, useState } from 'react';
import ReviewMistakes from './review-mistakes';
import Completed from './completed';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

interface Props {
    questions: QuestionType[]
    id: string
}


export default function Questions(props: Props) {
    const [questions, setQuestions] = useState<QuestionType[]>(props.questions);
    const [currentStep, helpers] = useStep(questions.length + 1);

    const addQuestion = useCallback((question: QuestionType) => {
        setQuestions((prev) => [...prev, question]);
    }, []);

    const queryClient = new QueryClient()


    return (
        <QueryClientProvider client={queryClient}>
            <div className="flex flex-col items-center justify-center h-screen w-full max-w-3xl px-4 mx-auto">
                {/* Original length is given to Question */}

                {
                    currentStep !== (questions.length + 1) ?
                        props.questions.length + 1 === currentStep ?
                            <ReviewMistakes continueR={helpers.goToNextStep} /> :
                            <Question question={questions[currentStep - 1]} helpers={helpers} noOfQuestions={props.questions.length} addQuestion={addQuestion} /> :
                        <Completed id={props.id} />
                }

            </div>
        </QueryClientProvider>

    );
}
