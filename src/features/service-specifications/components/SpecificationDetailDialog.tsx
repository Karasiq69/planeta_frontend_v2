'use client'

import LoaderSectionAnimated from '@/components/ui/LoaderSectionAnimated'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useSpecificationById } from '@/features/service-specifications/api/queries'
import { SpecificationForm } from './forms/SpecificationForm'
import { ProductPositions } from './positions/ProductPositions'
import { ServicePositions } from './positions/ServicePositions'

interface Props {
  specId: number | null
  onOpenChange: (open: boolean) => void
}

const SpecificationDetailDialog = ({ specId, onOpenChange }: Props) => {
  const { data: spec, isLoading } = useSpecificationById(specId ?? 0)

  return (
    <Dialog open={!!specId} onOpenChange={(open) => !open && onOpenChange(false)}>
      <DialogContent className='max-w-3xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Спецификация ТО</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <LoaderSectionAnimated className='rounded p-10' />
        ) : spec ? (
          <div className='space-y-6'>
            <SpecificationForm specificationData={spec} />
            <div className='space-y-6'>
              <ServicePositions specId={spec.id} services={spec.services} />
              <ProductPositions specId={spec.id} products={spec.products} />
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}

export default SpecificationDetailDialog
