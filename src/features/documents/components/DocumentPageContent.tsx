'use client'

import { notFound } from 'next/navigation'

import { useDocument } from '@/features/documents/api/queries'
import DocumentActions from '@/features/documents/components/DocumentActions'
import DocumentLayout from '@/features/documents/components/DocumentLayout'
import { documentTypeConfigs } from '@/features/documents/lib/document-config'

interface Props {
  documentId: number
  type: string
}

const DocumentPageContent = ({ documentId, type }: Props) => {
  const { data: document, isLoading } = useDocument(documentId)
  const config = documentTypeConfigs[type]

  if (isLoading) return 'loading...'
  if (!document || !config) return notFound()

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

export default DocumentPageContent
