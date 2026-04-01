interface DiscoveryCareerData {
    recommendedCareers: [];
}

interface RecommendedCareerProps {
    discoveryCareer: DiscoveryCareerData | null;
}

export default function RecommendedCareers({
    discoveryCareer,
}: RecommendedCareerProps) {
    const hasRecomCareers = discoveryCareer?.recommendedCareers != null;

    return (
        <div>{hasRecomCareers}</div>
    )
}