// roadmap timeline
import { motion } from "framer-motion";
import { Check, Circle, ArrowRight } from "lucide-react";

interface RoadmapTimelineProps {
    predictive?: boolean;
}

const steps = [
    {
        grade: "Grade 10",
        title: "Exploration Phase",
        tasks: ["Career quiz completed", "Values assessment"],
        status: "completed" as const,
    },
    {
        grade: "Grade 11",
        title: "Skill Building",
        tasks: ["Internship search", "Portfolio building"],
        status: "current" as const,
    },
    {
        grade: "Grade 12",
        title: "Application Ready",
        tasks: ["University applications", "Final portfolio"],
        status: "upcoming" as const,
    },
];

export function RoadmapTimeline({ predictive = false }: RoadmapTimelineProps) {
    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold dark:text-gray-100 text-gray-900">
                    Active Roadmap
                </h3>
                <span className="text-xs font-medium px-3 py-1 rounded-full
                    dark:bg-stone-600 dark:text-gray-100
                    bg-[#f1f3f3] text-gray-900">
                    {predictive
                        ? "Predictive • Awaiting Assessment"
                        : "Career Development Path"}
                </span>
            </div>
            <div className="flex items-start gap-2">
                {steps.map((step, i) => {
                    const isComplete = step.status === "completed";
                    const isCurrent = step.status === "current";

                    return (
                        <motion.div
                            key={step.grade}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.15 }}
                            className="flex-1 relative"
                        >
                            <div className="flex items-center mb-3">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                                    ${
                                        isComplete
                                            ? "bg-emerald-500 text-white"
                                            : isCurrent
                                            ? "bg-violet-500 text-white animate-pulse"
                                            : "dark:bg-stone-600 bg-gray-200 text-gray-500"
                                    }`}
                                >
                                    {isComplete ? (
                                        <Check className="w-4 h-4" />
                                    ) : (
                                        <Circle className="w-3 h-3" />
                                    )}
                                </div>
                                {i < steps.length - 1 && (
                                    <div
                                        className={`flex-1 h-[2px] mx-2
                                        ${
                                            predictive
                                                ? "border-t-2 border-dashed dark:border-gray-500 border-gray-300"
                                                : isComplete
                                                ? "bg-emerald-500"
                                                : "dark:bg-stone-600 bg-gray-300"
                                        }`}
                                    />
                                )}
                            </div>
                            <div className="pr-4">
                                <p className="text-xs font-semibold uppercase tracking-wider
                                    dark:text-gray-400 text-gray-500">
                                    {step.grade}
                                </p>
                                <p className="text-sm font-semibold mt-1
                                    dark:text-gray-100 text-gray-900">
                                    {step.title}
                                </p>
                                <ul className="mt-2 space-y-1">
                                    {step.tasks.map((task) => (
                                        <li
                                            key={task}
                                            className="text-xs flex items-center gap-1.5
                                            dark:text-gray-300 text-gray-700"
                                        >
                                            <ArrowRight className="w-3 h-3 dark:text-violet-400 text-[#8b5cf6]" />
                                            {task}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}