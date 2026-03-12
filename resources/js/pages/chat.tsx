import { Head } from "@inertiajs/react";
import { Send, Bot } from 'lucide-react';
import { useState } from "react";

import AppLayout from '@/layouts/app-layout';
import { chat } from "@/routes";
import type { BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Real Talk',
        href: chat().url,
    }
]

export default function Chat() {
    const suggestions = [
        "Parent Talk Guide",
        "IPA vs IPS",
        "Find Internship",
        "Study Plan"
    ];

    const [message, setMessage] = useState("");

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Real Talk" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                {/* header */}
                <div className="flex flex-col align-items-center gap-2">
                    <h1 className="text-3xl font-bold">
                        Real Talk
                    </h1>
                    <p className="text-muted-foreground">
                        Your AI career mentor, always here to help
                    </p>
                </div>
                {/* chat container */}
                <div className="flex flex-col flex-1 rounded-2xl border bg-background">
                    {/* suggestion buttons */}
                    <div className="flex flex-wrap gap-2 border-b p-4">
                        {suggestions.map((item) => (
                            <button
                                key={item}
                                onClick={() => setMessage(item)}
                                className="rounded-full bg-muted px-4 py-1 text-sm font-medium hover:bg-muted/70 transition hover:cursor-pointer"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                    {/* chat area */}
                    <div className="flex flex-1 flex-col gap-4 p-6">
                        {/* AI message */}
                        <div className="flex gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white dark:text-zinc-950">
                                <Bot classname="h-5 w-5" />
                            </div>
                            <div className="max-w-lg rounded-2xl bg-muted p-4 text-sm leading-relaxed">
                                Hi Andi! 👋 I've been reviewing your recent activities. I noticed your interest in design and biotech. Would you like to explore how these two fields might intersect in Creative Technology?
                            </div>
                        </div>
                    </div>
                    {/* input chat */}
                    <div className="flex items-center gap-3 border-t p-4">
                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Ask anything about your career path..."
                            className="flex-1 rounded-full bg-muted px-4 py-3 text-sm outline-none"
                        />
                        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-primary dark:bg-white text-white dark:text-zinc-950 hover:opacity-90">
                            <Send classname="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}