import { Head } from "@inertiajs/react";

import AppLayout from '@/layouts/app-layout';
import { bridge } from "@/routes";
import type { BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Bridge',
        href: bridge().url,
    },
]

export default function Bridge() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Bridge" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                {/* header */}
                <div className="flex flex-col align-items-center gap-2">
                    <h1 className="text-3xl font-bold">
                        Bridge
                    </h1>
                    <p className="text-muted-foreground">
                        Manage collaboration with parents and counselors
                    </p>
                </div>
            </div>
        </AppLayout>
    )
}