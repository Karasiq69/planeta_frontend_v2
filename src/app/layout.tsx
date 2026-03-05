import { Toaster } from '@/components/ui/sonner'
// eslint-disable-next-line import/order
import { APP_NAME, APP_SHORT_NAME } from '@/lib/constants'

import './globals.css'
import { RootProvider } from '@/providers/RootProvider'

import type { Metadata } from 'next'

// eslint-disable-next-line import/order
import NextTopLoader from 'nextjs-toploader'

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: `${APP_SHORT_NAME} | ${APP_NAME}`,
  },
  description: `${APP_SHORT_NAME} — система управления ${APP_NAME}`,
  other: {
    'apple-mobile-web-app-title': APP_SHORT_NAME,
  },
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
        <Toaster theme='light' richColors={true} />
      </body>
    </html>
  )
}
