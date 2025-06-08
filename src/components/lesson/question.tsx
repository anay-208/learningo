import { useCallback, useState } from 'react';
import { QuestionType } from './types'
import { cn } from '@/lib/utils';

interface Props {
    question: QuestionType
}
export default function QuestionComponent({ question }: Props) {
    const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
    const [answered, setAnswered] = useState<boolean>(false);
    const onClick = useCallback((option: number) => {
        if (answered) return;
        setIsAnswerCorrect(option === question.answer);
        setAnswered(true)
    }, []);

    return (
        <div className="shadow-md h-[100dvh] py-8 relative w-full max-w-3xl">
            <div className='space-y-2'>
                <h1 className="text-3xl font-bold text-center">Question {question.questionNo}</h1>
                <h2 className="text-3xl font-bold text-center">{question.question}</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 absolute top-1/2 left-0 right-0 -translate-y-1/2 px-2">
                {question.answerChoices.map((choice, index) => (
                    <button
                        key={index}
                        className={cn("w-full py-4 px-6 text-lg font-medium bg-primary text-primary-foreground rounded-lg focus:outline-none", {
                            "focus:ring-2 focus:ring-blue-500": !answered,
                            'bg-green-500 text-white': isAnswerCorrect === true && index === question.answer,
                            'bg-red-500 text-white': isAnswerCorrect === false && index === question.answer,
                            'opacity-50 cursor-not-allowed': answered 
                        })}
                        onClick={() => onClick(index)}
                    >
                        {choice}
                    </button>
                ))}
            </div>
            <div className={cn(`absolute bottom-0 left-0 right-0 rounded-t-4xl text-center py-4 transition-transform duration-300`, 
                isAnswerCorrect === null ? 'translate-y-full' : 'translate-y-0', 
                isAnswerCorrect ? 'bg-green-500' : 'bg-red-500'
            )}>
                {isAnswerCorrect !== null && (
                    <p className={`text-lg text-white`}>
                        {isAnswerCorrect ? 'Correct!' : 'Incorrect, try again!'}
                    </p>
                )}
            </div>
        </div>
    );
}