'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ModelsTab } from './ModelsTab'
import { EnginesTab } from './EnginesTab'
import { BrandsDialog } from './BrandsDialog'

interface CarsReferencesSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CarsReferencesSheet({ open, onOpenChange }: CarsReferencesSheetProps) {
  const [brandsOpen, setBrandsOpen] = useState(false)

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className='flex flex-col sm:max-w-4xl'>
          <SheetHeader className='flex flex-row items-center justify-between'>
            <SheetTitle>Справочники</SheetTitle>
            <Button variant='outline' size='sm' onClick={() => setBrandsOpen(true)}>
              Бренды
            </Button>
          </SheetHeader>
          <Tabs defaultValue='models' className='flex-1 flex flex-col min-h-0'>
            <TabsList>
              <TabsTrigger value='models'>Модели</TabsTrigger>
              <TabsTrigger value='engines'>Двигатели</TabsTrigger>
            </TabsList>
            <TabsContent value='models' className='flex-1 min-h-0'>
              <ModelsTab />
            </TabsContent>
            <TabsContent value='engines' className='flex-1 min-h-0'>
              <EnginesTab />
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>
      <BrandsDialog open={brandsOpen} onOpenChange={setBrandsOpen} />
    </>
  )
}
