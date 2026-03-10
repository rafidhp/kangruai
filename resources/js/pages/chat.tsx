import { Head } from "@inertiajs/react";

import AppLayout from '@/layouts/app-layout';
import { chat } from "@/routes";
import type { BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Real Talk',
        href: chat().url,
    }
]

export default function Chat() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Real Talk" />
        </AppLayout>
    )
}