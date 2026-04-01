import type { PageProps } from "@inertiajs/core";
import { usePage } from "@inertiajs/react";

interface DiscoveryAssessmentData {
    userId: number | null;
}

interface GlobalProps extends PageProps {
    discoveryAssessment?: DiscoveryAssessmentData | null;
}

export function useAssessment() {
    const { discoveryAssessment } = usePage<GlobalProps>().props;

    const assessmentDone = !!discoveryAssessment?.userId;

    return {
        discoveryAssessment,
        assessmentDone,
    };
}