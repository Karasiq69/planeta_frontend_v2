'use client'

import {QueryProvider} from './QueryProvider';
import {AuthProvider} from './AuthProvider';
import {SidebarProvider} from "@/components/ui/sidebar";

export function RootProvider({children}: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <QueryProvider>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </QueryProvider>
        </SidebarProvider>
    );
}