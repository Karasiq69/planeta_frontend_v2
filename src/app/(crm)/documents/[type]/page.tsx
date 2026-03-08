import { notFound } from 'next/navigation'

import PageLayout from '@/components/common/PageLayout'
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
    <PageLayout>
      <PageLayout.Header
        title={config.title}
        actions={<CreateDocumentDialog type={type} />}
      />
      <PageLayout.Content>
        <DocumentsTable type={type} />
      </PageLayout.Content>
    </PageLayout>
  )
}

export default Page
