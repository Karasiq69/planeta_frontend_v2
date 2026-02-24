'use client'

import { Button } from '@/components/ui/button'
import EditDocumentDialog from '@/features/documents/components/EditDocumentDialog'
import { DocumentStatus } from '@/features/documents/types'

import type { Document } from '@/features/documents/types'

interface Props {
  document: Document
}

const DocumentActions = ({ document }: Props) => {
  const isDraft = document.status === DocumentStatus.DRAFT

  return (
    <>
      <EditDocumentDialog document={document} disabled={!isDraft} />
      <Button disabled={!isDraft}>Провести</Button>
    </>
  )
}

export default DocumentActions
