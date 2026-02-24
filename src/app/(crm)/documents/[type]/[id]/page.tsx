import { notFound } from 'next/navigation'

import { getDocumentById } from '@/features/documents/api/actions'
import DocumentActions from '@/features/documents/components/DocumentActions'
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
  const { HeaderComponent, ItemsSectionComponent } = config

  return (
    <DocumentLayout
      title={`Документ #${document.id}`}
      status={document.status}
      header={<HeaderComponent document={document} />}
      actions={<DocumentActions document={document} />}
    >
      <ItemsSectionComponent document={document} />
    </DocumentLayout>
  )
}

export default Page
