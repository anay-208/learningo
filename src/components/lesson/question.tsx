import { useCallback, useEffect, useState } from 'react';
import { QuestionType } from './types'
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';
import { Button } from '../ui/button';

interface Props {
    question: QuestionType;
    helpers: {
        goToNextStep: () => void;
        goToPrevStep: () => void;
        reset: () => void;
        canGoToNextStep: boolean;
        canGoToPrevStep: boolean;
        setStep: (step: number) => void;
    };
    noOfQuestions: number;
    addQuestion: (question: QuestionType) => void;
}
export default function QuestionComponent({ question, helpers: {goToNextStep }, addQuestion }: Props) {
    const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
    const [answered, setAnswered] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);


    useEffect(() =>{
        // Reset state when question changes
        setIsAnswerCorrect(null);
        setAnswered(false);
        setSelectedOption(null);
    }, [question])

    const onClick = useCallback((option: number) => {
        if (answered) return;
        setIsAnswerCorrect(option === question.answer);
        setAnswered(true);
        setSelectedOption(option);
        if(option !== question.answer) {
            // If the answer is incorrect, added the question to a list for review later
            addQuestion({
                ...question,
            });
        }
    }, [answered, addQuestion, question]);

    const getRandomSuccessMessage = () => {
        const messages = ["Correct! Get ready for the next one", "Great job!", "Well done!", "You got it right!"];
        return messages[Math.floor(Math.random() * messages.length)];
    };

    return (
        <div className="relative w-full min-h-[600px] bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Question Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
                <div className="text-center space-y-2">
                    <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                        Question {question.questionNo}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                        {question.question}
                    </h2>
                </div>
            </div>

            {/* Answer Options */}
            <div className="p-6 space-y-4">
                <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
                    Select the correct answer:
                </p>
                <div className="space-y-3">
                    {question.answerChoices.map((choice, index) => {
                        const isCorrect = index === question.answer;
                        const isSelected = index === selectedOption;
                        const showCorrect = answered && isCorrect;
                        const showIncorrect = answered && isSelected && !isCorrect;
                        
                        return (
                            <button
                                key={index}
                                className={cn(
                                    "w-full p-4 text-left text-lg rounded-xl border-2 transition-all duration-300 font-medium",
                                    "hover:scale-[1.02] active:scale-[0.98]",
                                    {
                                        // Default state
                                        "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:border-purple-300 dark:hover:border-purple-600": !answered,
                                        // Correct answer
                                        "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300": showCorrect,
                                        // Incorrect selected answer
                                        "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300": showIncorrect,
                                        // Disabled state
                                        "opacity-50 cursor-not-allowed": answered && !isCorrect && !isSelected,
                                        // Interactive state
                                        "cursor-pointer": !answered,
                                    }
                                )}
                                onClick={() => onClick(index)}
                                disabled={answered}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold",
                                        {
                                            "border-gray-300 dark:border-gray-600": !answered || (answered && !isCorrect && !isSelected),
                                            "border-green-500 bg-green-500 text-white": showCorrect,
                                            "border-red-500 bg-red-500 text-white": showIncorrect
                                        }
                                    )}>
                                        {String.fromCharCode(65 + index)}
                                    </div>
                                    <span className="flex-1">{choice}</span>
                                    {showCorrect && <Check className="h-5 w-5 text-green-600" />}
                                    {showIncorrect && <X className="h-5 w-5 text-red-600" />}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Result Banner */}
            <div className={cn(
                "absolute bottom-0 left-0 right-0 p-6 transition-all duration-300 transform",
                isAnswerCorrect === null ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100',
                {
                    'bg-gradient-to-r from-green-500 to-emerald-500 text-white': isAnswerCorrect,
                    'bg-gradient-to-r from-red-500 to-pink-500 text-white': isAnswerCorrect === false
                }
            )}>
                {isAnswerCorrect !== null && (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {isAnswerCorrect ? (
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                    <Check className="h-6 w-6" />
                                </div>
                            ) : (
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                    <X className="h-6 w-6" />
                                </div>
                            )}
                            <div>
                                <div className="text-lg font-bold">
                                    {isAnswerCorrect ? getRandomSuccessMessage() : "Incorrect answer!"}
                                </div>
                                {!isAnswerCorrect && (
                                    <div className="text-sm opacity-90">
                                        The correct answer was: {question.answerChoices[question.answer]}
                                    </div>
                                )}
                            </div>
                        </div>
                        <Button 
                            onClick={goToNextStep}
                            className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-6 py-2"
                        >
                            Next Question
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}