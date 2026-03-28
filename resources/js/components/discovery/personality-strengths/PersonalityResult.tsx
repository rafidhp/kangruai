import { motion } from "framer-motion"
import { UserRoundSearch } from 'lucide-react';

interface DiscoveryAssesmentData {
    personality_result: string;
}

interface PersonalityResultProps {
    discoveryAssessment: DiscoveryAssesmentData | null;
}

export default function PersonalityResult({
    discoveryAssessment,
}: PersonalityResultProps) {
    const hasPersonality = discoveryAssessment?.personality_result != null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl p-6 shadow-sm border"
        >
            <h2 className="flex gap-3 align-items-center text-lg font-semibold mb-4">
                <UserRoundSearch className="h-5 w-5 mt-1" />
                Personality Result
            </h2>
            {!hasPersonality ? (
                <div className="uppercase tracking-wider font-semibold px-2 py-2 rounded-xl text-sm text-center bg-muted text-muted-foreground">
                    Complete Your Assessment to Unlock
                </div>
            ) : (
                <div className="text-md">
                    {discoveryAssessment?.personality_result}
                </div>
            )}
        </motion.div>
    )
}