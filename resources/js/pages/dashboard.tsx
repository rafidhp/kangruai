import { Head } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const progress = 35
    const radius = 90
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (progress / 100) * circumference
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                {/* header */}
                <div>
                    <h1 className="text-3xl font-bold">
                        Welcome back, test 👋
                    </h1>
                    <div className="flex items-center gap-3 mt-2">
                        <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700">
                            🎓 smp
                        </span>
                        <span className="px-3 py-1 text-sm rounded-full bg-purple-100 text-gray-700">
                            🎯 Target 2045
                        </span>
                    </div>
                </div>

                {/* card */}
                <div className="dark:bg-stone-600 bg-[#f1f3f3] rounded-2xl shadow-sm p-10 flex flex-col items-center">
                    {/* progress circle */}
                    <div className="relative w-56 h-56">
                        <svg className="w-full h-full -rotate-90">
                            {/* background */}
                            <circle
                                cx="112"
                                cy="112"
                                r={radius}
                                strokeWidth="14"
                                className="dark:stroke-gray-100 stroke-white"
                                fill="transparent"
                            />
                            {/* progress */}
                            <circle
                                cx="112"
                                cy="112"
                                r={radius}
                                strokeWidth="14"
                                className="stroke-purple-400"
                                fill="transparent"
                                strokeDasharray={circumference}
                                strokeDashoffset={offset}
                                strokeLinecap="round"
                            />
                        </svg>
                        {/* text center */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-bold">
                                {progress}%
                            </span>
                            <span className="dark:text-gray-100 text-gray-900 text-sm">
                                Exploring
                            </span>
                        </div>
                    </div>
                    {/* title */}
                    <div className="text-center mt-6">
                        <h3 className="font-semibold text-lg">
                            Career Clarity Score
                        </h3>
                        <p className="dark:text-gray-100 text-gray-900 text-sm">
                            Updated based on your activities
                        </p>
                    </div>
                </div>

                {/* AI reflection card */}
                <div className="dark:bg-stone-600 bg-[#f1f3f3] rounded-2xl shadow-sm p-6 flex gap-4 items-start">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full dark:bg-gray-100 bg-white text-white text-lg">
                        ⚖️
                    </div>
                    {/* content */}
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-col">
                            <span className="dark:text-gray-100 text-gray-900 font-semibold">
                                AI Reflection
                            </span>
                            <span className="dark:text-gray-100 text-gray-900 text-sm">
                                Daily prompt from your mentor
                            </span>
                        </div>
                        <p className="dark:text-gray-100 text-gray-900 italic mt-2 leading-relaxed">
                            "If you could solve one real-world problem with technology,
                            what would it be and why? Think about the skills you'd need to learn."
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
