import { Head } from "@inertiajs/react";
import { useState } from "react";

import AppLayout from '@/layouts/app-layout';
import { bridge } from "@/routes";
import type { BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Bridge',
        href: bridge().url,
    },
]

export default function Bridge() {
    const [privacy, setPrivacy] = useState({
        careerScore: true,
        interests: true,
        chatHistory: false,
        skills: false,
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Bridge" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                {/* header */}
                <div className="flex flex-col align-items-center gap-2">
                    <h1 className="text-3xl font-bold">
                        Bridge
                    </h1>
                    <p className="text-muted-foreground">
                        Manage collaboration with parents and counselors
                    </p>
                </div>

                {/* privacy dashboard */}
                <div className="bg-card rounded-2xl p-6 shadow-sm border">
                    <div className="flex flex-col gap-1 mb-6">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            🛡️ Privacy Dashboard
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Control what parents and teachers see
                        </p>
                    </div>
                    <div className="flex flex-col gap-4">
                        
                        {/* career clarity */}
                        <div className="flex items-center justify-between bg-muted/40 rounded-xl px-4 py-4">
                            <div>
                                <p className="font-medium">Career Clarity Score</p>
                                <p className="text-sm text-muted-foreground">
                                    Share your progress percentage
                                </p>
                            </div>
                            <button
                                onClick={() =>
                                    setPrivacy({
                                        ...privacy,
                                        careerScore: !privacy.careerScore,
                                    })
                                }
                                className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                                    privacy.careerScore ? "bg-purple-500" : "bg-gray-300"
                                }`}
                            >
                                <div
                                    className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                                        privacy.careerScore ? "translate-x-6" : ""
                                    }`}
                                />
                            </button>
                        </div>

                        {/* interest areas */}
                        <div className="flex items-center justify-between bg-muted/40 rounded-xl px-4 py-4">
                            <div>
                                <p className="font-medium">Interest Areas</p>
                                <p className="text-sm text-muted-foreground">
                                    Share discovered interests
                                </p>
                            </div>
                            <button
                                onClick={() =>
                                    setPrivacy({
                                        ...privacy,
                                        interests: !privacy.interests,
                                    })
                                }
                                className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                                    privacy.interests ? "bg-purple-500" : "bg-gray-300"
                                }`}
                            >
                                <div
                                    className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                                        privacy.interests ? "translate-x-6" : ""
                                    }`}
                                />
                            </button>
                        </div>

                        {/* chat history */}
                        <div className="flex items-center justify-between bg-muted/40 rounded-xl px-4 py-4">
                            <div>
                                <p className="font-medium">Chat History</p>
                                <p className="text-sm text-muted-foreground">
                                    Share AI conversation summaries
                                </p>
                            </div>
                            <button
                                onClick={() =>
                                    setPrivacy({
                                        ...privacy,
                                        chatHistory: !privacy.chatHistory,
                                    })
                                }
                                className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                                    privacy.chatHistory ? "bg-purple-500" : "bg-gray-300"
                                }`}
                            >
                                <div
                                    className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                                        privacy.chatHistory ? "translate-x-6" : ""
                                    }`}
                                />
                            </button>
                        </div>

                        {/* skill assessments */}
                        <div className="flex items-center justify-between bg-muted/40 rounded-xl px-4 py-4">
                            <div>
                                <p className="font-medium">Skill Assessments</p>
                                <p className="text-sm text-muted-foreground">
                                    Share quiz and test results
                                </p>
                            </div>
                            <button
                                onClick={() =>
                                    setPrivacy({
                                        ...privacy,
                                        skills: !privacy.skills,
                                    })
                                }
                                className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                                    privacy.skills ? "bg-purple-500" : "bg-gray-300"
                                }`}
                            >
                                <div
                                    className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                                        privacy.skills ? "translate-x-6" : ""
                                    }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}