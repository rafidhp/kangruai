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
        </AppLayout>
    )
}