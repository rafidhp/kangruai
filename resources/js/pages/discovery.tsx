import { Head } from "@inertiajs/react";
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

import AppLayout from '@/layouts/app-layout';
import { discovery } from "@/routes";
import type { BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Discovery Center',
        href: discovery().url,
    },
]

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

export default function Discovery() {
    const data = {
        labels: ["Logic", "Empathy", "Creativity", "Leadership", "Technical", "Communication"],
        datasets: [
            {
                label: "Career DNA",
                data: [65, 40, 50, 90, 70, 75],
                backgroundColor: "rgba(139, 92, 246, 0.25)",
                borderColor: "rgba(139, 92, 246, 0.9)",
                borderWidth: 2,
                pointBackgroundColor: "rgba(139, 92, 246, 1)",
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                angleLines: {
                    color: "#e5e7eb",
                },
                grid: {
                    color: "#e5e7eb",
                },
                pointLabels: {
                    color: "#64748b",
                    font: {
                        size: 14,
                    },
                },
                ticks: {
                    display: false,
                },
                suggestedMin: 0,
                suggestedMax: 100,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Discovery Center" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                {/* header */}
                <div className="flex flex-col align-items-center gap-2">
                    <h1 className="text-3xl font-bold">
                        Discovery Center
                    </h1>
                    <p className="text-muted-foreground">
                        Explore your strengths, values, and career paths
                    </p>
                </div>

                {/* values assessment */}
                <div className="bg-card rounded-2xl p-6 shadow-sm border">
                    <h2 className="text-lg font-semibold mb-4">
                        Values Assessment
                    </h2>
                    <div className="rounded-xl bg-emerald-50 border dark:bg-emerald-700 border-emerald-100 dark:border-emerald-600 px-6 py-6 flex flex-col items-center text-center gap-1">
                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-300 font-medium">
                            <span className="text-lg">✅</span>
                            <span>Assessment Complete!</span>
                        </div>
                        <p className="text-sm text-muted-foreground dark:text-white">
                            Your Career DNA has been updated
                        </p>
                        <button className="mt-4 text-base font-medium dark:font-bold text-purple-500 dark:text-purple-400 hover:text-purple-600 dark:hover:text-purple-500 transition">
                            Retake Assessment
                        </button>
                    </div>
                </div>

                {/* career dna */}
                <div className="bg-card rounded-2xl px-6 pt-6 shadow-sm border">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-lg font-semibold">
                            Career DNA
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Your unique strength profile
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <div className="w-[420px] h-[420px]">
                            <Radar data={data} options={options} />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}