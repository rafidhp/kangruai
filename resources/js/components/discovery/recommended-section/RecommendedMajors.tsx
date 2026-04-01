interface DiscoveryCareerData {
    recommendedMajors: [];
}

interface RecommendedMajorsProps {
    discoveryCareer: DiscoveryCareerData | null;
}

export default function RecommendedMajors({
    discoveryCareer,
}: RecommendedMajorsProps) {
    const hasRecomMajors = discoveryCareer?.recommendedMajors != null;
    return (
        <div>{hasRecomMajors}</div>
    )
}