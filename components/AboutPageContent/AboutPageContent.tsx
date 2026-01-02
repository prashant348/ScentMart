"use client";

import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function AboutPageContent() {
    return (
        <div className="w-ful text-xl font-bold h-16 bg-[#0f0f0f] flex items-center gap-3 px-3">
            <button
                className="rounded-full p-2 active:bg-[#1f1f1f] cursor-pointer hover:bg-[#1f1f1f]"
                onClick={() => redirect("/dashboard")}
            >
                <ArrowLeft />
            </button>
            <span>
                About Us
            </span>
        </div>
    )
}
