'use client'
import React from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import { useUpdateTransferDocument } from '@/features/inventory-documents/transfer/api/mutations'
import { useTransferDocument } from '@/features/inventory-documents/transfer/api/queries'
import TransferDocumentForm from '@/features/inventory-documents/transfer/components/forms/TransferDocumentForm'

import type { UpdateTransferDocumentDto } from '@/features/inventory-documents/transfer/components/forms/schema'

type Props = {
  documentId: number
}

const TransferFormContainer = ({ documentId }: Props) => {
  const { data: doc, isLoading: isDocumentLoading } = useTransferDocument(documentId)
  const { mutate: updateDocumentMutation, isPending: isUpdatePending } =
    useUpdateTransferDocument(documentId)

  const onSubmit = (data: UpdateTransferDocumentDto) => {
    updateDocumentMutation(data)
  }

  if (isDocumentLoading) {
    return <InventoryDocumentFormSkeleton />
  }

  return <TransferDocumentForm documentData={doc} onSubmit={onSubmit} />
}

export default TransferFormContainer

const InventoryDocumentFormSkeleton = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6'>
      {/* Type field */}
      <div className='flex flex-col lg:flex-row gap-1'>
        <Skeleton className='md:w-28 h-4' />
        <Skeleton className='w-full h-10' />
      </div>

      {/* Number field */}
      <div className='flex flex-col lg:flex-row gap-1'>
        <Skeleton className='md:w-28 h-4' />
        <div className='w-full grid grid-cols-[1fr_auto_1fr] items-center gap-2'>
          <Skeleton className='h-10' />
          <Skeleton className='h-4 w-8' />
          <Skeleton className='h-10' />
        </div>
      </div>

      {/* Supplier field */}
      <div className='flex flex-col lg:flex-row gap-1'>
        <Skeleton className='md:w-28 h-4' />
        <Skeleton className='w-full h-10' />
      </div>

      {/* Incoming number field */}
      <div className='flex flex-col lg:flex-row gap-1'>
        <Skeleton className='md:w-28 h-4' />
        <div className='w-full grid grid-cols-[1fr_auto_1fr] items-center gap-2'>
          <Skeleton className='h-10' />
          <Skeleton className='h-4 w-8' />
          <Skeleton className='h-10' />
        </div>
      </div>

      {/* Warehouse field */}
      <div className='flex flex-col lg:flex-row gap-1'>
        <Skeleton className='md:w-28 h-4' />
        <Skeleton className='w-full h-10' />
      </div>

      {/* Target warehouse field */}
      <div className='flex flex-col lg:flex-row gap-1'>
        <Skeleton className='md:w-28 h-4' />
        <Skeleton className='w-full h-10' />
      </div>

      {/* Note field (spanning both columns) */}
      <div className='col-span-1 lg:col-span-2 flex flex-col lg:flex-row gap-1'>
        <Skeleton className='md:w-28 h-4' />
        <Skeleton className='w-full h-10' />
      </div>
    </div>
  )
}
