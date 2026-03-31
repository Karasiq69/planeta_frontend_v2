'use client'

import { useState } from 'react'

import { AppSheet } from '@/components/ds/base/AppSheet'
import { Button } from '@/components/ui/button'
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
      <AppSheet
        open={open}
        onOpenChange={onOpenChange}
        title='Справочники'
        size='4xl'
        headerActions={
          <Button variant='outline' size='sm' onClick={() => setBrandsOpen(true)}>
            Бренды
          </Button>
        }
      >
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
      </AppSheet>
      <BrandsDialog open={brandsOpen} onOpenChange={setBrandsOpen} />
    </>
  )
}
