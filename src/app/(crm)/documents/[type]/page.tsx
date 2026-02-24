import { notFound } from 'next/navigation'

import PageHeader from '@/components/common/PageHeader'
import CreateDocumentDialog from '@/features/documents/components/CreateDocumentDialog'
import DocumentsTable from '@/features/documents/components/DocumentsTable'
import { documentTypeConfigs } from '@/features/documents/lib/document-config'

type Props = { params: Promise<{ type: string }> }

const Page = async ({ params }: Props) => {
  const { type } = await params

  const config = documentTypeConfigs[type]
  if (!config) return notFound()

  return (
    <section>
      <div className='space-y-5'>
        <PageHeader title={config.title} showBackButton={false} />
        <div className='flex gap-3'>
          <CreateDocumentDialog type={type} />
        </div>
        <DocumentsTable type={type} />
      </div>
    </section>
  )
}

export default Page
