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
        <div className="shadow-md h-[100dvh] py-8 relative w-full overflow-hidden ">
            <div className='space-y-4'>
                <h1 className="text-3xl font-bold text-center">Question {question.questionNo}</h1>
                <h2 className="text-3xl font-bold text-center">{question.question}</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 absolute top-1/2 left-0 right-0 -translate-y-1/2 px-2">
                {question.answerChoices.map((choice, index) => (
                    <button
                        key={index}
                        className={cn("w-full py-4 px-6 text-lg font-medium bg-primary text-primary-foreground rounded-lg focus:outline-none", {
                            "focus:ring-2 focus:ring-blue-500": !answered,
                            'bg-correct text-correct-foreground': isAnswerCorrect !== null && index === question.answer,
                            'bg-incorrect text-incorrect-foreground': isAnswerCorrect === false && index === selectedOption,
                            'opacity-50 cursor-not-allowed': answered  && !(index === question.answer || index === selectedOption)
                        })}
                        onClick={() => onClick(index)}
                    >
                        {choice}
                    </button>
                ))}
            </div>

            {/* Bottom Banner for correct answer */}
            <div className={cn(`absolute bottom-0 left-0 right-0 rounded-t-2xl text-center py-4 transition duration-300`, 
                isAnswerCorrect === null ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100', 
                isAnswerCorrect ? 'bg-correct text-correct-foreground' : 'bg-incorrect text-incorrect-foreground'
            )}>
                {isAnswerCorrect !== null && (
                    <div className="flex justify-between px-4">
                    <div className="flex items-center justify-start">
                        {isAnswerCorrect ? <Check className="h-6 w-6" /> : <X className="h-6 w-6" />}
                        <span className="text-lg font-semibold  ml-2">
                            {isAnswerCorrect ? getRandomSuccessMessage() : "Incorrect answer!"}
                        </span>
                    </div>
                    <Button onClick={() => {
                        goToNextStep();
                    }}>
                        Next Question
                    </Button>
                    </div>
                )}


            </div>
        </div>
    );
}