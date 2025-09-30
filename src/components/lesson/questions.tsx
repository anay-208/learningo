"use client"
import { useStep } from 'usehooks-ts'
import { QuestionType } from './types'
import Question from './question';
import { useCallback, useState } from 'react';
import ReviewMistakes from './review-mistakes';
import Completed from './completed';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo } from 'react';

interface Props {
    questions: QuestionType[]
    id: string;
    lessonId: string;
} 
 
  
export default function Questions(props: Props) {
    const [questions, setQuestions] = useState<QuestionType[]>(props.questions);
    const [currentStep, helpers] = useStep(questions.length + 1);

    const addQuestion = useCallback((question: QuestionType) => {
        if (questions.length === props.questions.length) {
            // Add it twice since it won't be displayed the first time, because there would be review mistakes screen
            setQuestions((prev) => [...prev, question, question])
        } else {
            setQuestions((prev) => [...prev, question]);
        }
    }, [props.questions.length, questions.length]);

    const queryClient = useMemo(() => new QueryClient(), [])


    return (
        <QueryClientProvider client={queryClient}>
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/20">
                {/* Quiz Progress Bar */}
                <div className="fixed top-16 left-0 right-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b">
                    <div className="max-w-4xl mx-auto px-4 py-3">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Question {Math.min(currentStep, props.questions.length)} of {props.questions.length}
                            </span>
                            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                                {Math.round((Math.min(currentStep, props.questions.length) / props.questions.length) * 100)}% Complete
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                                className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${(Math.min(currentStep, props.questions.length) / props.questions.length) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center min-h-screen w-full max-w-4xl px-4 mx-auto pt-40 pb-24">
                    <div className="flex-1 flex flex-col items-center justify-center w-full mt-8">
                        <AnimatePresence mode="wait">
                        {
                            currentStep !== (questions.length + 1) ? (
                                props.questions.length + 1 === currentStep ? (
                                    <motion.div
                                        key="review-mistakes"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className='w-full'
                                    >
                                        <ReviewMistakes continueR={helpers.goToNextStep} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key={`question-${currentStep}`}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className='w-full'
                                    >
                                        <Question question={questions[currentStep - 1]} helpers={helpers} noOfQuestions={props.questions.length} addQuestion={addQuestion} />
                                    </motion.div>
                                )
                            ) : (   
                                <motion.div
                                    key="completed"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className='w-full'
                                >  
                                    <Completed id={props.id} lessonId={props.lessonId} />
                                </motion.div>
                            )
                        }
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </QueryClientProvider>

    );
}
