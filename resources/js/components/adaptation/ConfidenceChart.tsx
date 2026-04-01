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
import { TrendingUp } from "lucide-react";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

export default function ConfidenceChart() {
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
    )
}