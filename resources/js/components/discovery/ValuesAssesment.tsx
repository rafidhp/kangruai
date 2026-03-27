import { motion } from "framer-motion"
import { Star, ArrowRight } from "lucide-react";

interface ValuesAssesmentProps {
    onStartAssessment: () => void;
    assessmentDone?: boolean;
}

export default function ValuesAssesment({
    onStartAssessment,
    assessmentDone = false
}: ValuesAssesmentProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl p-6 shadow-sm border"
        >
            <h2 className="text-lg font-semibold mb-4">
                Values Assessment
            </h2>
            {assessmentDone ? (
                <div className="rounded-xl bg-emerald-50 border dark:bg-emerald-700 border-emerald-100 dark:border-emerald-600 px-6 py-6 flex flex-col items-center text-center gap-1">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-300 font-medium">
                        <span className="text-lg">✅</span>
                        <span>Assessment Complete!</span>
                    </div>
                    <p className="text-sm text-muted-foreground dark:text-white">
                        Your Career DNA has been updated
                    </p>
                    <button
                        onClick={onStartAssessment}
                        className="mt-4 text-base font-medium dark:font-bold text-purple-500 dark:text-purple-400 hover:text-purple-600 dark:hover:text-purple-500 transition"
                    >
                        Retake Assessment
                    </button>
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    {["Creativity & Innovation", "Helping Others", "Financial Security", "Work-Life Balance"].map(
                        (value) => (
                            <div
                                key={value}
                                onClick={onStartAssessment}
                                className="p-4 rounded-2xl bg-accent/50 hover:bg-accent transition-colors cursor-pointer flex items-center justify-between group"
                            >
                                <div className="flex items-center gap-3">
                                    <Star className="w-4 h-4 text-primary" />
                                    <span className="text-sm font-medium text-foreground">{value}</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                        )
                    )}
                    <button
                        onClick={onStartAssessment}
                        className="w-full py-3 rounded-2xl gradient-primary text-secondary-foreground font-semibold text-sm hover:text-violet-400 hover:cursor-pointer transition-shadow"
                    >
                        Start Assessment
                    </button>
                </div>
            )}
        </motion.div>
    )
}