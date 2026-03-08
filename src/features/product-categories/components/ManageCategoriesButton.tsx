'use client'

import { Tags } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { CategoriesSheet } from './CategoriesSheet'

export const ManageCategoriesButton = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant='outline' size='sm' onClick={() => setOpen(true)}>
        <Tags className='mr-1.5 size-4' />
        Категории
      </Button>
      <CategoriesSheet open={open} onOpenChange={setOpen} />
    </>
  )
}
