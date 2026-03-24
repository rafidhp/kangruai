import { motion } from "framer-motion";

interface ClarityGaugeProps {
  score: number;
}

export function ClarityGauge({ score }: ClarityGaugeProps) {
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const progress = (score / 100) * circumference;
    const offset = circumference - progress;

    const getColor = (s: number) => {
        if (s >= 70) return "#10b981";
        if (s >= 50) return "#f59e0b";
        return "#8b5cf6";
    };

    const getLabel = (s: number) => {
        if (s >= 70) return "On Track";
        if (s >= 50) return "Growing";
        return "Exploring";
    };

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-48 h-48">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                    {/* background circle */}
                    <circle
                        cx="100"
                        cy="100"
                        r={radius}
                        fill="none"
                        strokeLinecap="round"
                        className="
                            stroke-[12]
                            dark:stroke-stone-500
                            stroke-gray-300
                        "
                    />
                    {/* progress circle */}
                    <motion.circle
                        cx="100"
                        cy="100"
                        r={radius}
                        fill="none"
                        stroke={getColor(score)}
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: offset }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                        key={score}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-4xl font-display font-bold text-foreground"
                    >
                        {score}%
                    </motion.span>
                    <span className="text-xs text-muted-foreground font-medium mt-1">
                        {getLabel(score)}
                    </span>
                </div>
            </div>
            <h3 className="font-display font-semibold text-foreground mt-3">
                Career Clarity Score
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
                Updated based on your activities
            </p>
        </div>
    );
}
