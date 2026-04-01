import { Head } from "@inertiajs/react";

import AdaptationHistory from "@/components/adaptation/AdaptationHistory";
import AddExperience from "@/components/adaptation/AddExperience";
import ConfidenceChart from "@/components/adaptation/ConfidenceChart";
import AppLayout from '@/layouts/app-layout';
import { adaptation } from "@/routes";
import type { BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Adaptation Log',
        href: adaptation().url,
    },
]

interface DiscoveryCareerData {
    roadmapSummary: string,
}

interface AdaptationExperience {
    experienceType: string;
    title: string;
    description: string;
    status: string;
    createdAt: string;
}

interface AdaptationIndexProps {
    discoveryCareer: DiscoveryCareerData | null,
    adaptationExperience: AdaptationExperience[],
}

export default function AdaptationIndex({
    discoveryCareer,
    adaptationExperience,
}: AdaptationIndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Adaptation Log" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                {/* header */}
                <div className="flex flex-col align-items-center gap-2">
                    <h1 className="text-3xl font-bold">
                        Adaptation Log
                    </h1>
                    <p className="text-muted-foreground">
                        Track your growth, pivots, and achievements
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* add entry */}
                    <AddExperience discoveryCareer={discoveryCareer} />

                    {/* chart */}
                    <ConfidenceChart />
                </div>

                <AdaptationHistory experiences={adaptationExperience} />
            </div>
        </AppLayout>
    )
}