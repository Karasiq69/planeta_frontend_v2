'use client'

import { SidebarProvider } from '@/components/ui/sidebar'

import { AuthProvider } from './AuthProvider'
import { QueryProvider } from './QueryProvider'

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <QueryProvider>
        <AuthProvider>
          {/*<ThemeProvider*/}
          {/*    attribute="class"*/}
          {/*    defaultTheme="light"*/}
          {/*    // enableSystem*/}
          {/*    disableTransitionOnChange*/}
          {/*>*/}
          {children}
          {/*</ThemeProvider>*/}
        </AuthProvider>
      </QueryProvider>
    </SidebarProvider>
  )
}
