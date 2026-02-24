import { getDocumentById } from '@/features/documents/api/actions'
import DocumentActions from '@/features/documents/components/DocumentActions'
import DocumentItemsSection from '@/features/documents/components/DocumentItemsSection'
import DocumentLayout from '@/features/documents/components/DocumentLayout'
import ReceiptDocumentHeader from '@/features/documents/components/ReceiptDocumentHeader'

type Props = {
  params: Promise<{ type: string; id: string }>
}

const Page = async ({ params }: Props) => {
  const { id } = await params
  const document = await getDocumentById(Number(id))

  return (
    <DocumentLayout
      title={`Документ #${document.id}`}
      status={document.status}
      header={<ReceiptDocumentHeader document={document} />}
      actions={<DocumentActions document={document} />}
    >
      <DocumentItemsSection status={document.status} />
    </DocumentLayout>
  )
}

export default Page
