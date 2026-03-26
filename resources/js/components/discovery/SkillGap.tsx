import { motion } from "framer-motion"
import { BarChart3 } from "lucide-react"

const skillGap = [
    { skill: "UI/UX Design", current: 40, target: 80 },
    { skill: "Data Analysis", current: 25, target: 70 },
    { skill: "Public Speaking", current: 55, target: 85 },
    { skill: "Coding (Python)", current: 30, target: 75 },
];

export default function SkillGap() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="py-2 rounded-3xl bg-card shadow-card"
        >
            <h2 className="font-display font-semibold text-foreground mb-4 flex items-center align-items-center gap-2">
                <BarChart3 className="w-6 h-6 pb-1 text-primary" />
                Skill Gap Analysis
            </h2>
            <div className="space-y-4 rounded-3xl border bg-background/50 backdrop-blur p-5">
                {skillGap.map((item) => (
                    <div key={item.skill}>
                        <div className="flex items-center justify-between mb-1.5">
                            <span className="text-sm font-medium text-foreground">
                                {item.skill}
                            </span>
                            <span className="text-xs text-muted-foreground">
                                {item.current}% → {item.target}%
                            </span>
                        </div>
                        <div className="relative h-2.5 rounded-full bg-muted overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${item.current}%` }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="absolute inset-y-0 left-0 rounded-full bg-violet-400"
                            />
                            {/* mark */}
                            {/* <div
                                className="absolute inset-y-0 left-0 rounded-full border-r-2 border-dashed border-primary"
                                style={{ width: `${item.target}%` }}
                            /> */}
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}