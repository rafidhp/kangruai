import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from "chart.js";
import { motion } from "framer-motion";
import { Radar } from "react-chartjs-2";

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

export default function CareerChart() {
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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-card rounded-2xl px-6 pt-6 shadow-sm border"
        >
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
        </motion.div>
    )
}