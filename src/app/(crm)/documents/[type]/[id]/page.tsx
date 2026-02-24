import { Package } from 'lucide-react'
import { notFound } from 'next/navigation'

import { getDocumentById } from '@/features/documents/api/actions'
import DocumentActions from '@/features/documents/components/DocumentActions'
import DocumentItemsSection from '@/features/documents/components/DocumentItemsSection'
import DocumentLayout from '@/features/documents/components/DocumentLayout'
import { documentTypeConfigs } from '@/features/documents/lib/document-config'

type Props = {
  params: Promise<{ type: string; id: string }>
}

const Page = async ({ params }: Props) => {
  const { type, id } = await params

  const config = documentTypeConfigs[type]
  if (!config) return notFound()

  const document = await getDocumentById(Number(id))
  const { HeaderComponent } = config

  const showItems = type !== 'transfer'

  return (
    <DocumentLayout
      title={`Документ #${document.id}`}
      status={document.status}
      header={<HeaderComponent document={document} />}
      actions={<DocumentActions document={document} />}
    >
      {showItems ? (
        <DocumentItemsSection status={document.status} />
      ) : (
        <div className='flex flex-col items-center justify-center h-full rounded-lg border bg-card py-12 text-muted-foreground'>
          <Package className='size-10 mb-3 opacity-40' />
          <span className='text-sm'>Товары перемещения — в разработке</span>
        </div>
      )}
    </DocumentLayout>
  )
}

export default Page
