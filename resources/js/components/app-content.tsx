import { usePage } from '@inertiajs/react';
import React, { useEffect, useRef } from 'react';
import { Toaster, toast } from 'sonner';

import { SidebarInset } from '@/components/ui/sidebar';

type Props = React.ComponentProps<'main'> & {
    variant?: 'header' | 'sidebar';
};

export function AppContent({ variant = 'header', children, ...props }: Props) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { flash } = usePage().props as any
    const lastSuccess = useRef<string | null>(null);
    const lastError = useRef<string | null>(null);
    
    useEffect(() => {
        if (!flash) return;
    
        if (flash.success && flash.success !== lastSuccess.current) {
            toast.success(flash.success);
            lastSuccess.current = flash.success;
        }
        if (flash.error && flash.error !== lastError.current) {
            toast.error(flash.error);
            lastError.current = flash.error;
        }
    }, [flash]);

    if (variant === 'sidebar') {
        return (
            <>
                <SidebarInset {...props}>{children}</SidebarInset>
                 
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
