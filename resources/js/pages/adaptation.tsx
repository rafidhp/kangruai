import { Head } from "@inertiajs/react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from "chart.js";
import type { ChartOptions, GridLineOptions } from "chart.js";
import { Plus, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Line } from "react-chartjs-2";

import AppLayout from '@/layouts/app-layout';
import { adaptation } from "@/routes";
import type { BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Adaptation Log',
        href: adaptation().url,
    },
]

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

export default function Adaptation() {
    const [type, setType] = useState("Achievement");
    const [title, setTitle] = useState("");

    const chartData = {
        labels: ["Start", "Now"],
        datasets: [
            {
                label: "Confidence",
                data: [30, 35],
                borderColor: "rgb(168, 139, 250)",
                backgroundColor: "rgba(168, 139, 250, 0.2)",
                tension: 0.4,
                pointBackgroundColor: "rgb(168, 139, 250)",
                pointRadius: 4,
            },
        ],
    };

    const chartOptions: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                min: 0,
                max: 100,
                grid: {
                    borderDash: [5, 5],
                } as Partial<GridLineOptions>,
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Adaptation Log" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                {/* header */}
                <div className="flex flex-col align-items-center gap-2">
                    <h1 className="text-3xl font-bold">
                        Adaptation Log
                    </h1>
                    <p className="text-muted-foreground">
                        Track your growth, pivots, and achievements
                    </p>
                </div>

                {/* adaptation grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* add entry */}
                    <div className="bg-card rounded-2xl p-6 shadow-sm border flex flex-col gap-4">
                        <h2 className="font-semibold text-lg flex items-center gap-2">
                            <Plus className="h-5 w-5" />
                            Add New Entry
                        </h2>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs text-muted-foreground font-medium">
                                TYPE
                            </label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="rounded-lg bg-muted px-3 py-2"
                            >
                                <option>Achievement</option>
                                <option>Certification</option>
                                <option>Career Pivot</option>
                                <option>Milestone</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs text-muted-foreground font-medium">
                                TITLE
                            </label>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g., Won Design Comp"
                                className="rounded-lg bg-muted px-3 py-2"
                            />
                        </div>
                        <button className="mt-2 bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-xl font-medium transition">
                            Add Entry
                        </button>
                    </div>

                    {/* chart */}
                    <div className="lg:col-span-2 bg-card rounded-2xl p-6 shadow-sm border">
                        <div className="flex flex-col gap-1 mb-4">
                            <h2 className="font-semibold text-lg flex items-center gap-2">
                                <TrendingUp className="h-5 w-5" />
                                Confidence & Sentiment Trend
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Your career confidence over time
                            </p>
                        </div>
                        <div className="h-[250px]">
                            <Line data={chartData} options={chartOptions} />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}