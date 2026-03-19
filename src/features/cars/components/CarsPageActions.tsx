'use client'

import { useState } from 'react'
import { BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CreateVehicleButton from '@/features/cars/components/CreateVehicleButton'
import { CarsReferencesSheet } from '@/features/cars/components/references/CarsReferencesSheet'

export function CarsPageActions() {
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <div className='flex items-center gap-2'>
      <Button variant='outline' size='sm' onClick={() => setSheetOpen(true)}>
        <BookOpen className='mr-1 h-4 w-4' />
        Справочники
      </Button>
      <CreateVehicleButton />
      <CarsReferencesSheet open={sheetOpen} onOpenChange={setSheetOpen} />
    </div>
  )
}
