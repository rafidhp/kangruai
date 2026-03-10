import { Head } from "@inertiajs/react";

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
                <div className="flex flex-col align-items-center gap-2">
                    <h1 className="text-3xl font-bold">
                        Discovery Center
                    </h1>
                    <p className="text-muted-foreground">
                        Explore your strengths, values, and career paths
                    </p>
                </div>

                {/* values assessment */}
                <div className="bg-card rounded-2xl p-6 shadow-sm border">
                    <h2 className="text-lg font-semibold mb-4">
                        Values Assessment
                    </h2>
                    <div className="rounded-xl bg-emerald-50 border dark:bg-emerald-700 border-emerald-100 dark:border-emerald-600 px-6 py-6 flex flex-col items-center text-center gap-1">
                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-300 font-medium">
                            <span className="text-lg">✅</span>
                            <span>Assessment Complete!</span>
                        </div>
                        <p className="text-sm text-muted-foreground dark:text-white">
                            Your Career DNA has been updated
                        </p>
                        <button className="mt-4 text-base font-medium dark:font-bold text-purple-500 dark:text-purple-400 hover:text-purple-600 dark:hover:text-purple-500 transition">
                            Retake Assessment
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}