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
        </AppLayout>
    )
}