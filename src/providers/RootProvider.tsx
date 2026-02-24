'use client'

import { SidebarProvider } from '@/components/ui/sidebar'
import { ThemeProvider } from '@/providers/ThemeProvider'

import { AuthProvider } from './AuthProvider'
import { QueryProvider } from './QueryProvider'

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <QueryProvider>
        <AuthProvider>
          <ThemeProvider
            forcedTheme='light'
            attribute='class'
            defaultTheme='light'
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </AuthProvider>
      </QueryProvider>
    </SidebarProvider>
  )
}
