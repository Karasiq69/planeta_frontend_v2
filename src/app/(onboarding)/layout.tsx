import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import Logo from '@/components/common/Logo'

const font = Noto_Sans({
  weight: ['300', '400', '600', '700'],
  subsets: ['latin', 'cyrillic-ext'],
})

export const metadata: Metadata = {
  title: 'Настройка системы',
}

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`min-h-screen bg-muted/30 ${font.className}`}>
      <div className="absolute top-6 left-6">
        <Logo width={140} height={36} />
      </div>
      {children}
    </div>
  )
}
