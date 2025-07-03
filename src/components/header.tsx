"use client";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./mode-toggle";

export default function Header() {
    const router = useRouter()
    return (
        <>
            <header className="px-4 py-4 flex justify-between absolute top-0 left-0 right-0">
                <h1 onClick={() => router.push("/dashboard")} className="text-3xl" role="button"  >Learningo</h1>
                    <ModeToggle />
            </header>
        </>
    )
}