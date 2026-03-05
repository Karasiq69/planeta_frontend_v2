import { notFound } from 'next/navigation'

import PageHeader from '@/components/common/PageHeader'
import { Card } from '@/components/ui/card'
import CreateDocumentDialog from '@/features/documents/components/CreateDocumentDialog'
import DocumentsTable from '@/features/documents/components/DocumentsTable'
import { documentTypeConfigs } from '@/features/documents/lib/document-config'

import type { Metadata } from 'next'

type Props = { params: Promise<{ type: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params
  const config = documentTypeConfigs[type]
  return { title: config?.title ?? 'Документы' }
}

const Page = async ({ params }: Props) => {
  const { type } = await params

  const config = documentTypeConfigs[type]
  if (!config) return notFound()

  return (
    <section className='flex flex-col h-full'>
      <div className='space-y-5 shrink-0'>
        <PageHeader title={config.title} showBackButton={false} />
        <div className='flex gap-3'>
          <CreateDocumentDialog type={type} />
        </div>
      </div>
      <Card className='mt-5 flex-1 min-h-0 flex flex-col'>
        <DocumentsTable type={type} />
      </Card>
    </section>
  )
}

export default Page
