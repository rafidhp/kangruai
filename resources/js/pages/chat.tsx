import { Head } from "@inertiajs/react";

import AppLayout from '@/layouts/app-layout';
import { chat } from "@/routes";
import type { BreadcrumbItem } from "@/types";
import ChatBox from "@/components/chat/ChatBox";

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
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                {/* header */}
                <div className="flex flex-col align-items-center gap-2">
                    <h1 className="text-3xl font-bold">
                        Real Talk
                    </h1>
                    <p className="text-muted-foreground">
                        Your AI career mentor, always here to help
                    </p>
                </div>

                <ChatBox />
            </div>
        </AppLayout>
    )
}