"use client"
import { useStep } from 'usehooks-ts'
import { QuestionType } from './types'
import Question from './question';
import { useCallback, useState } from 'react';
import ReviewMistakes from './review-mistakes';
import Completed from './completed';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
    questions: QuestionType[]
    id: string
}


export default function Questions(props: Props) {
    const [questions, setQuestions] = useState<QuestionType[]>(props.questions);
    const [currentStep, helpers] = useStep(questions.length + 1);

    const addQuestion = useCallback((question: QuestionType) => {
        if(questions.length === props.questions.length){
            // Add it twice since it won't be displayed the first time, because there would be review mistakes screen
            setQuestions((prev)=> [...prev, question, question])
        }
        setQuestions((prev) => [...prev, question]);
    }, []);

    const queryClient = new QueryClient()


    return (
        <QueryClientProvider client={queryClient}>
            <div className="flex flex-col items-center justify-center h-screen w-full max-w-3xl px-4 mx-auto">
                <AnimatePresence mode="wait">
                    {
                        currentStep !== (questions.length + 1) ? (
                            props.questions.length + 1 === currentStep ? (
                                <motion.div
                                    key="review-mistakes"
                                    initial={{ x: "100%", opacity: 0 }}
                                    animate={{ x: "0%", opacity: 1 }}
                                    exit={{ x: "-100%", opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className='w-full'
                                >
                                    <ReviewMistakes continueR={helpers.goToNextStep} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key={`question-${currentStep}`}
                                    initial={{ x: "100%", opacity: 0 }}
                                    animate={{ x: "0%", opacity: 1 }}
                                    exit={{ x: "-100%", opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className='w-full'
                                >
                                    <Question question={questions[currentStep - 1]} helpers={helpers} noOfQuestions={props.questions.length} addQuestion={addQuestion} />
                                </motion.div>
                            )
                        ) : (
                            <motion.div
                                key="completed"
                                initial={{ x: "100%", opacity: 0 }}
                                animate={{ x: "0%", opacity: 1 }}
                                exit={{ x: "-100%", opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className='w-full'
                            >
                                <Completed id={props.id} />
                            </motion.div>
                        )
                    }

                </AnimatePresence>
            </div>
        </QueryClientProvider>

    );
}
