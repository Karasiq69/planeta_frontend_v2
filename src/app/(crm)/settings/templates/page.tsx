import TemplatesPage from '@/features/document-templates/components/TemplatesPage'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Шаблоны документов' }

export default function Page() {
  return <TemplatesPage />
}
