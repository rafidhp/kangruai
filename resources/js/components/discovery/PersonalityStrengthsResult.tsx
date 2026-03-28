import PersonalityResult from "@/components/discovery/personality-strengths/PersonalityResult";
import StrengthsResult from "@/components/discovery/personality-strengths/StrengthsResult";

interface DiscoveryAssesmentData {
    personality_result: string;
    strengths_result: string;
}

interface PersonalityStrengthsResultProps {
    discoveryAssessment: DiscoveryAssesmentData | null;
}

export default function PersonalityStrengthsResult({
    discoveryAssessment,
}: PersonalityStrengthsResultProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PersonalityResult discoveryAssessment={discoveryAssessment} />
            <StrengthsResult discoveryAssessment={discoveryAssessment} />
        </div>
    )
}