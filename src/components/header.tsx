import { db } from "@/db";
import { ModeToggle } from "./mode-toggle";
import StreakDropdown from "./streak-dropdown";

export default function Header() {
    return (
        <>
            <header className="px-4 py-4 flex justify-between absolute top-0 left-0 right-0">
                <h1 className="text-3xl">Learningo</h1>
                    <ModeToggle />
            </header>
        </>
    )
}