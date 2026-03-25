import { motion } from "framer-motion";
import { AlertTriangle, TrendingDown, ArrowRight } from "lucide-react";

export function BPSMarketInsight() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="rounded-3xl p-6 bg-card shadow-card border border-warning/20"
        >
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-warning/15 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                    <h3 className="font-display font-semibold text-foreground">
                        BPS Market Intelligence
                    </h3>
                    <p className="text-[10px] text-muted-foreground">
                        Badan Pusat Statistik • Latest Data
                    </p>
                </div>
            </div>

            {/* stats */}
            <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-destructive/5 text-center">
                    <p className="text-xl font-display font-bold text-destructive">7.35M</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Unemployed Nationally</p>
                </div>
                <div className="p-3 rounded-2xl bg-warning/10 text-center">
                    <p className="text-xl font-display font-bold text-warning">29.61%</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">SMA Graduates</p>
                </div>
                <div className="p-3 rounded-2xl bg-warning/10 text-center">
                    <p className="text-xl font-display font-bold text-warning">26.12%</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">SMK Graduates</p>
                </div>
            </div>

            {/* AI warning */}
            <div className="p-4 rounded-2xl bg-accent/50 border border-border">
                <div className="flex items-start gap-2">
                    <TrendingDown className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="text-sm font-medium text-foreground mb-1">AI Risk Assessment</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Based on BPS data, your chosen path currently has high competition. 
                            Over 55% of unemployed individuals are SMA/SMK graduates. Follow these steps to lower your risk:
                        </p>
                        <ul className="mt-2 space-y-1">
                            {[
                                "Complete your Values Assessment to identify unique strengths",
                                "Build a specialized skill portfolio in a high-growth sector",
                                "Gain practical experience through internships or projects",
                            ].map((step, i) => (
                                <li key={i} className="text-xs text-foreground flex items-start gap-1.5">
                                    <ArrowRight className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                                    {step}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
