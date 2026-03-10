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
            </div>
        </AppLayout>
    )
}