import { Noto_Sans } from 'next/font/google'

import Navbar from '@/components/common/navbar/Navbar'
import { AppSidebar } from '@/components/common/sidebar/AppSidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import Hydration from '@/providers/Hydration'

const font = Noto_Sans({
  weight: ['300', '400', '600', '700'],
  subsets: ['latin', 'cyrillic-ext'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Hydration>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className='flex flex-col overflow-hidden'>
          <Navbar />
          <main
            className={`flex flex-1 flex-col gap-4 p-4 bg-muted/40 min-h-0 overflow-auto ${font.className}`}
          >
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </Hydration>
  )
}
