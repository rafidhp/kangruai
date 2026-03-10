import { Head } from "@inertiajs/react";

import AppLayout from '@/layouts/app-layout';
import { adaptation } from "@/routes";
import type { BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Adaptation Log',
        href: adaptation().url,
    },
]

export default function Adaptation() {
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
            </div>
        </AppLayout>
    )
}