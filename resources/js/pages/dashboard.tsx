import appLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { dashboard } from "@/routes";
import type { BreadcrumbItem } from "@/types";

import { motion } from "framer-motion";
import { ClarityGauge } from "@/components/dashboard/ClarityGauge";
import { RoadmapTimeline } from "@/components/dashboard/RoadmapTimeline";
import { AIReflectionCard } from "@/components/dashboard/AIReflectionCard";
import { useAuth } from "@/hooks/use-auth";
import { GraduationCap, Target } from "lucide-react";
import AppLayout from "@/layouts/app-layout";
import { BPSMarketInsight } from "@/components/dashboard/BPSMarketInsight";
import { ActionItems } from "@/components/dashboard/ActionItems";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
]

export default function Dashboard() {
    const { profile } = useAuth();
    const clarityScore = 35;

    const userName = profile?.name || "Student";
    const schoolName = profile?.school || "Your School";
    const assessmentDone = profile?.assessment_completed ?? false;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between"
                >
                    {/* header */}
                    <div className="flex flex-col align-items-center gap-2">
                        <h1 className="text-3xl font-bold dark:text-gray-100 text-gray-900">
                            Welcome back,{" "}
                            <span className="text-[#8b5cf6]">{userName}</span> 👋
                        </h1>
                        <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center gap-1.5 text-sm dark:text-gray-300 text-gray-600">
                                <GraduationCap className="w-4 h-4" />
                                <span>{schoolName}</span>
                            </div>
                            <div
                                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold
                                dark:bg-stone-600 dark:text-gray-100
                                bg-[#f1f3f3] text-gray-900"
                            >
                                <Target className="w-3 h-3" />
                                Target 2045
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Gauge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="lg:col-span-1 p-6 rounded-2xl shadow-sm
                        dark:bg-stone-600 bg-[#f1f3f3]
                        flex items-center justify-center"
                    >
                        <ClarityGauge score={clarityScore} />
                    </motion.div>

                    {/* Reflection + Roadmap */}
                    <div className="lg:col-span-2 space-y-6">
                        <AIReflectionCard />

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="p-6 rounded-2xl shadow-sm
                            dark:bg-stone-600 bg-[#f1f3f3]"
                        >
                            <RoadmapTimeline predictive={!assessmentDone} />
                        </motion.div>
                    </div>
                </div>

                <BPSMarketInsight />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <ActionItems />
                </motion.div>
            </div>
        </AppLayout>
    );
}