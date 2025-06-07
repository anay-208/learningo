import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Client from "./client";

export default async function GeneratePage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if(!session) {
        redirect("/sign-in");
    }
    return (
        <>
            <Client />
        </>
    )
}