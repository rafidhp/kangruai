import RecommendedCareers from "@/components/discovery/recommended-section/RecommendedCareers";
import RecommendedMajors from "@/components/discovery/recommended-section/RecommendedMajors";

interface DiscoveryCareerData {
    recommendedCareers: [];
    recommendedMajors: [];
    roadmapSummary: string;
}

interface RecommendedSectionIndexProps {
    discoveryCareer: DiscoveryCareerData | null;
}

export default function RecommendedSectionIndex({
    discoveryCareer,
}: RecommendedSectionIndexProps) {
    return (
        <div className="flex flex-col">
            <RecommendedCareers discoveryCareer={discoveryCareer} />
            <RecommendedMajors discoveryCareer={discoveryCareer} />
        </div>
    )
}