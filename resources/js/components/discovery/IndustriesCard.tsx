import { motion } from "framer-motion";
import {
    Palette,
    Brain,
    TrendingUp,
    Heart,
    Wrench,
    Users,
    Lock
} from "lucide-react";

import { useAuth } from "@/hooks/use-auth";

export default function IndustriesCard() {
    const industries = [
        { name: "Creative Technology", growth: "High", icon: Palette, match: 82 },
        { name: "Biotech & Health", growth: "Very High", icon: Brain, match: 76 },
        { name: "Digital Marketing", growth: "Medium", icon: TrendingUp, match: 88 },
        { name: "Social Enterprise", growth: "High", icon: Heart, match: 79 },
        { name: "Engineering", growth: "High", icon: Wrench, match: 73 },
        { name: "Education Tech", growth: "Very High", icon: Users, match: 91 },
    ];

    const { user } = useAuth();
    // true temporary
    const assessmentDone = user?.assessment_completed ?? true;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="py-2 rounded-3xl bg-card shadow-card"
        >
            <h2 className="font-display font-semibold text-foreground mb-4">Industry Explorer</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {industries.map((ind, i) => {
                    const locked = !assessmentDone;

                    return (
                        <motion.div
                            key={ind.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 + i * 0.05 }}
                            className={`p-5 rounded-3xl bg-card border border-border shadow-sm hover:border-primary/40 hover:bg-accent/30 transition-all ${
                            locked ? "opacity-60" : "hover:shadow-elevated cursor-context-menu"
                            } group`}
                        >
                            <div className="w-10 h-10 rounded-2xl bg-muted flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                                {locked ? (
                                    <Lock className="w-5 h-5 text-muted-foreground" />
                                ) : (
                                    <ind.icon className="w-5 h-5 dark:text-violet-300 text-violet-500" />
                                )}
                            </div>
                            <p className="font-display font-semibold text-foreground">
                                {ind.name}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-success/15 text-success">
                                    {ind.growth} Growth
                                </span>
                                {locked ? (
                                    <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                                        Locked
                                    </span>
                                ) : (
                                    <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-primary/15 dark:text-violet-300 text-violet-400">
                                        {ind.match}% Match
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    )
}