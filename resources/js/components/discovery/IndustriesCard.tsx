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

interface Industry {
    name: string;
    match: number;
    growth: string;
}

interface IndustriesCardProps {
    industries?: Industry[] | null;
}

export default function IndustriesCard({
    industries,
}: IndustriesCardProps) {
    const hasIndustries = Array.isArray(industries) && industries.length > 0;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const industryIcons: Record<string, any> = {
        "Creative Technology": Palette,
        "Biotech & Health": Brain,
        "Digital Marketing": TrendingUp,
        "Social Enterprise": Heart,
        "Engineering": Wrench,
        "Education Tech": Users,
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="py-2 rounded-3xl bg-card shadow-card"
        >
            <h2 className="font-display font-semibold text-foreground mb-4">Industry Explorer</h2>
            {!hasIndustries && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="p-5 rounded-3xl bg-card border border-border opacity-60"
                        >
                            <div className="w-10 h-10 rounded-2xl bg-muted flex items-center justify-center mb-3">
                                <Lock className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div className="h-4 w-32 bg-muted rounded mb-2" />
                            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                                Complete assessment to unlock
                            </span>
                        </div>
                    ))}
                </div>
            )}
            {hasIndustries && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {industries!.map((ind, i) => {
                        const Icon = industryIcons[ind.name] ?? TrendingUp;

                        return (
                            <motion.div
                                key={ind.name}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25 + i * 0.05 }}
                                className="p-5 rounded-3xl bg-card border border-border shadow-sm hover:border-primary/40 hover:bg-accent/30 transition-all hover:shadow-elevated group"
                            >
                                <div className="w-10 h-10 rounded-2xl bg-muted flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                                    <Icon className="w-5 h-5 dark:text-violet-300 text-violet-500" />
                                </div>
                                <p className="font-display font-semibold text-foreground">
                                    {ind.name}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-success/15 text-success">
                                        {ind.growth} Growth
                                    </span>
                                    <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-primary/15 dark:text-violet-300 text-violet-400">
                                        {ind.match}% Match
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </motion.div>
    )
}