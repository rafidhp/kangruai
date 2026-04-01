import type { PageProps } from "@inertiajs/core";
import { Head } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useState } from "react";

import CareerChart from "@/components/discovery/CareerChart";
import { DiscoveryAssessment } from "@/components/discovery/DiscoveryAssesment";
import IndustriesCard from "@/components/discovery/IndustriesCard";
import PersonalityStrengthsResult from "@/components/discovery/PersonalityStrengthsResult";
import RecommendedSectionIndex from "@/components/discovery/recommended-section/RecommendedSectionIndex";
// TODO: sync with user progress
// import SkillGap from "@/components/discovery/SkillGap";
import ValuesAssesment from "@/components/discovery/ValuesAssesment";
import AppLayout from '@/layouts/app-layout';
import { discovery } from "@/routes";
import type { BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Discovery Center',
        href: discovery().url,
    },
]

interface CareerDNA {
    logic: number;
    empathy: number;
    creativity: number;
    leadership: number;
    technical: number;
    communication: number;
}

interface DiscoveryAssesmentData {
    personality_result: string;
    strengths_result: string;
    skills_score: CareerDNA | null;
}

interface Industry {
    name: string;
    match: number;
    growth: string;
}

interface DiscoveryCareer {
    recommendedCareers: [];
    recommendedMajors: [];
    roadmapSummary: string;
}

interface DiscoveryAssesmentProps extends PageProps {
    discoveryAssessment: DiscoveryAssesmentData | null;
    industries: Industry[];
    discoveryCareer: DiscoveryCareer | null;
}

export default function Discovery() {
    const [quizOpen, setQuizOpen] = useState(false);
    const defaultDNA: CareerDNA = {
        logic: 30,
        empathy: 30,
        creativity: 30,
        leadership: 30,
        technical: 30,
        communication: 30
    };
    const { discoveryAssessment, industries, discoveryCareer } = usePage<DiscoveryAssesmentProps>().props;
    const assessmentDone = discoveryAssessment?.skills_score != null;
    const dna = discoveryAssessment?.skills_score ?? defaultDNA;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Discovery Center" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                {/* header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col align-items-center gap-2"
                >
                    <h1 className="text-3xl font-bold">
                        Discovery Center
                    </h1>
                    <p className="text-muted-foreground">
                        Explore your strengths, values, and career paths
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* values assessment */}
                    <ValuesAssesment
                        onStartAssessment={() => setQuizOpen(true)}
                        assessmentDone={assessmentDone}
                    />

                    {/* career dna */}
                    <CareerChart dna={dna} />
                </div>

                {/* personality and strengths result */}
                <PersonalityStrengthsResult discoveryAssessment={discoveryAssessment} />

                {/* industries card */}
                <IndustriesCard industries={industries} />

                {/* skill gap, on develop */}
                {/* <SkillGap /> */}

                {/* TODO: add recommendation careers and majors  */}
                <RecommendedSectionIndex discoveryCareer={discoveryCareer} />

                {/* discovery assesment */}
                <DiscoveryAssessment
                    open={quizOpen}
                    onClose={() => setQuizOpen(false)}
                />
            </div>
        </AppLayout>
    )
}