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
        </AppLayout>
    )
}