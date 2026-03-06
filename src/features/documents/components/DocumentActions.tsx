'use client'

import { Button } from '@/components/ui/button'
import { useConfirmDocument } from '@/features/documents/api/mutations'
import EditDocumentDialog from '@/features/documents/components/EditDocumentDialog'
import { DocumentStatus } from '@/features/documents/types'

import type { Document } from '@/features/documents/types'

interface Props {
  document: Document
}

const DocumentActions = ({ document }: Props) => {
  const isDraft = document.status === DocumentStatus.DRAFT
  const { mutate: confirm, isPending } = useConfirmDocument(document.id)

  return (
    <>
      <EditDocumentDialog document={document} disabled={!isDraft} />
      <Button disabled={!isDraft || isPending} onClick={() => confirm()}>
        {isPending ? 'Проведение...' : 'Провести'}
      </Button>
    </>
  )
}

export default DocumentActions
