import type { Metadata } from 'next'

import './globals.css'
import { RootProvider } from '@/providers/RootProvider'
import { Toaster } from '@/components/ui/sonner'

import NextTopLoader from 'nextjs-toploader'

export const metadata: Metadata = {
  title: 'Вход | CRM Планета Мерседес',
  description: '',
}

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ru' suppressHydrationWarning>
      {/*<head>*/}
      {/*    <script*/}
      {/*        crossOrigin="anonymous"*/}
      {/*        src="//unpkg.com/react-scan/dist/auto.global.js"*/}
      {/*    />*/}
      {/*</head>*/}
      <body className='h-screen overflow-hidden antialiased'>
        <NextTopLoader />

        <RootProvider>{children}</RootProvider>
        <Toaster theme="light" richColors={true} />
      </body>
    </html>
  )
}
