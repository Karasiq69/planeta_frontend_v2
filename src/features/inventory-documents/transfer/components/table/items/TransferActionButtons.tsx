import { Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useRemoveTransferDocumentItem } from '@/features/inventory-documents/transfer/api/mutations'

import type { TransferDocumentItem } from '@/features/inventory-documents/transfer/types'

type Props = {
  documentItem: TransferDocumentItem
}

const TransferActionButtons = ({ documentItem }: Props) => {
  const documentId = Number(documentItem?.documentId)
  const { mutate, isPending } = useRemoveTransferDocumentItem(documentId)

  const handleDelete = () => {
    mutate(documentItem.id)
  }

  return (
    <div className='flex gap-1 justify-end'>
      <Button
        variant='ghost'
        size='icon'
        className='h-8 w-8 text-destructive'
        onClick={handleDelete}
        disabled={isPending}
      >
        <Trash2 className='h-4 w-4' />
      </Button>
    </div>
  )
}

export default TransferActionButtons
