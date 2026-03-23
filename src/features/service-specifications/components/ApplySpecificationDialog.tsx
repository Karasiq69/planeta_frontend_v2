'use client'

import { useApplySpecification } from '@/features/orders/api/mutations'
import { useOrderSpecifications } from '@/features/orders/api/queries'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface ApplySpecificationDialogProps {
  orderId: number
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ApplySpecificationDialog({
  orderId,
  open,
  onOpenChange,
}: ApplySpecificationDialogProps) {
  const { data: specs, isLoading } = useOrderSpecifications(orderId)
  const { mutate: applySpec, isPending } = useApplySpecification(orderId)

  const handleApply = (specId: number) => {
    applySpec(specId, {
      onSuccess: () => {
        onOpenChange(false)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-lg'>
        <DialogHeader>
          <DialogTitle>Применить спецификацию</DialogTitle>
        </DialogHeader>

        <div className='flex flex-col gap-2 max-h-[60vh] overflow-y-auto py-1'>
          {isLoading && (
            <p className='text-sm text-muted-foreground text-center py-6'>Загрузка...</p>
          )}

          {!isLoading && (!specs || specs.length === 0) && (
            <p className='text-sm text-muted-foreground text-center py-6'>
              Нет доступных спецификаций
            </p>
          )}

          {specs?.map((spec) => (
            <button
              key={spec.id}
              onClick={() => handleApply(spec.id)}
              disabled={isPending}
              className='text-left rounded-md border px-4 py-3 hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <div className='font-medium text-sm'>{spec.name}</div>
              <div className='text-xs text-muted-foreground mt-1 flex gap-4'>
                <span>Модель: {spec.model?.name ?? '—'}</span>
                <span>Двигатель: {spec.engine?.name ?? '—'}</span>
                <span>Работ: {spec.services.length}</span>
                <span>Товаров: {spec.products.length}</span>
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
