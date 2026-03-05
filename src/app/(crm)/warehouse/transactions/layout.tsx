import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Движение товаров' }

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
