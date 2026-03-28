import { motion } from "framer-motion"
import { Gem } from 'lucide-react';

interface DiscoveryAssesmentData {
    strengths_result: string;
}

interface StrengthsResultProps {
    discoveryAssessment: DiscoveryAssesmentData | null;
}

export default function StrengthsResult({
    discoveryAssessment,
}: StrengthsResultProps) {
    const hasStrengths = discoveryAssessment?.strengths_result != null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl p-6 shadow-sm border"
        >
            <h2 className="flex align-items-center gap-3 text-lg font-semibold mb-4">
                <Gem className="h-5 w-5 mt-1" />
                Your Strength
            </h2>
            {!hasStrengths ? (
                <div className="uppercase tracking-wider font-semibold px-2 py-2 rounded-xl text-sm text-center bg-muted text-muted-foreground">
                    Complete Your Assessment to Unlock
                </div>
            ) : (
                <div className="text-md">
                    {discoveryAssessment?.strengths_result}
                </div>
            )}
        </motion.div>
    )
}