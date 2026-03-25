import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";


import CareerChart from "@/components/discovery/CareerChart";
import IndustriesCard from "@/components/discovery/IndustriesCard";
import SkillGap from "@/components/discovery/SkillGap";
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

export default function Discovery() {
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
                    <ValuesAssesment />

                    {/* career dna */}
                    <CareerChart />
                </div>

                {/* industries card */}
                <IndustriesCard />

                {/* skill gap */}
                <SkillGap />
            </div>
        </AppLayout>
    )
}