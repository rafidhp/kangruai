import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

import { useAssessment } from "@/hooks/use-assessment";
import { discovery } from "@/routes";


type AdaptationExperience = {
    experience_type: string;
    title: string;
    description: string;
    status: string;
    created_at: string;
}

interface AdaptationHistoryProps {
    experiences: AdaptationExperience[];
}

// helpers
const humanize = (value: string) => value
    ?.toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

const formatDate = (date?: string) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    });
};

const typeColorMap: Record<string, string> = {
    INTERNSHIP: "bg-purple-500",
    PROJECT: "bg-blue-500",
    BUSINESS: "bg-emerald-500",
    COURSE: "bg-amber-500",
    VOLUNTEER: "bg-pink-500",
    OTHER: "bg-muted-foreground",
};

const statusColorMap: Record<string, string> = {
    COMPLETED: "bg-emerald-600",
    'IN PROGRESS': "bg-blue-500",
};

export default function AdaptationHistory({
    experiences,
}: AdaptationHistoryProps) {
    const { assessmentDone } = useAssessment();
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="
                p-6 rounded-3xl
                bg-card dark:bg-card
                border border-border
                shadow-sm
            "
        >
            {/* Header */}
            <h3 className="font-semibold text-foreground mb-5 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Roadmap History
            </h3>

            {!assessmentDone ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                    No entries yet. Please complete your <a className="text-sky-600" href={discovery.url()}>assessment</a> first 🚀
                </p>
            ) : (
                experiences.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">
                        No entries yet. Add your first achievement 🚀
                    </p>
                ) : (
                    <div className="space-y-2">
                        {experiences.map((exp, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex gap-4"
                            >
                                {/* timeline dot */}
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`w-3 h-3 rounded-full ${
                                            typeColorMap[exp.experience_type] ??
                                            "bg-muted-foreground"
                                        }`}
                                    />
                                    {i < experiences.length - 1 && (
                                        <div className="w-px flex-1 bg-border mt-1" />
                                    )}
                                </div>

                                {/* content */}
                                <div className="pb-4 flex-1">
                                    <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">
                                        {formatDate(exp.created_at)}
                                    </p>
                                    <p className="text-sm font-semibold text-foreground mt-0.5">
                                        {exp.title}
                                    </p>
                                    {exp.description && (
                                        <p className="text-xs text-muted-foreground italic mt-1 leading-relaxed">
                                            {exp.description}
                                        </p>
                                    )}
                                    <div className="flex align-items-center gap-2">
                                        <span
                                            className="
                                                inline-block mt-2
                                                text-[10px]
                                                px-2 py-0.5
                                                rounded-full
                                                bg-accent
                                                text-accent-foreground
                                                font-semibold
                                                tracking-wide
                                            "
                                        >
                                            {humanize(exp.experience_type)}
                                        </span>
                                        <span
                                            className={`
                                                inline-block mt-2
                                                text-[10px]
                                                px-2 py-0.5
                                                rounded-full
                                                text-accent-foreground
                                                font-semibold
                                                tracking-wide
                                                ${
                                                    statusColorMap[exp.status] ??
                                                    "bg-accent"
                                                }
                                            `}
                                        >
                                            {humanize(exp.status)}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )
            )}
        </motion.div>
    )
}