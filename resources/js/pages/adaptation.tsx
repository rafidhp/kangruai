import type { PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';

import AdaptationIndex from "@/components/adaptation/AdaptationIndex";

interface DiscoveryCareer {
    roadmapSummary: string,
}

interface AdaptationExperience {
    experienceType: string,
    title: string,
    description: string,
    status: string,
    createdAt: string,
}

interface AdaptationProps extends PageProps {
    discoveryCareer: DiscoveryCareer | null,
    adaptationExperience: AdaptationExperience[],
}

export default function Adaptation() {
    const { discoveryCareer, adaptationExperience } = usePage<AdaptationProps>().props;

    return (
        <AdaptationIndex
            discoveryCareer={discoveryCareer}
            adaptationExperience={adaptationExperience}
        />
    )
}