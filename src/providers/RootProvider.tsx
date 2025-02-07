'use client'

import {QueryProvider} from './QueryProvider';
import {AuthProvider} from './AuthProvider';
import {SidebarProvider} from "@/components/ui/sidebar";
import {OrderProvider} from "@/providers/OrderProvider";

export function RootProvider({children}: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <QueryProvider>
                <AuthProvider>
                    <OrderProvider>
                        {children}
                    </OrderProvider>
                </AuthProvider>
            </QueryProvider>
        </SidebarProvider>
    );
}