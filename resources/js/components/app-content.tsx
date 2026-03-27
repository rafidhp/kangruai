import * as React from 'react';
import { Toaster } from 'sonner';

import { SidebarInset } from '@/components/ui/sidebar';

type Props = React.ComponentProps<'main'> & {
    variant?: 'header' | 'sidebar';
};

export function AppContent({ variant = 'header', children, ...props }: Props) {
    if (variant === 'sidebar') {
        return (
            <>
                <SidebarInset {...props}>{children}</SidebarInset>;
                 
                <Toaster
                    theme="system"
                    position="bottom-right"
                    richColors
                />
            </>
        );

    }

    return (
        <>
            <main
                className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl"
                {...props}
            >
                {children}
            </main>

            <Toaster
                theme="system"
                position="bottom-right"
                richColors
            />
        </>
    );
}
