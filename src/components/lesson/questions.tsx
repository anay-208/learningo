"use client"
import { useStep } from 'usehooks-ts'
import { QuestionType } from './types'
import Question from './question';

interface Props {
    questions: QuestionType[]
}


export default function Questions({ questions }: Props) {
    const [currentStep, helpers] = useStep(questions.length + 1);
    
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Question question={questions[currentStep - 1]} />
        </div>
    );
}
