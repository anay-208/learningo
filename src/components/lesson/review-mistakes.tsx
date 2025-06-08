import { Info } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
    continueR: () => void;
}

export default function ReviewMistakes({ continueR }: Props) {
    

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Info className="h-16 w-16 text-blue-500 mb-4" />
            <h1 className="text-4xl font-bold mb-4">Review your Mistakes</h1>
            <Button className="mt-4 text-xl" size={"lg"} onClick={continueR}>
                Continue
            </Button>
        </div>
    );
}