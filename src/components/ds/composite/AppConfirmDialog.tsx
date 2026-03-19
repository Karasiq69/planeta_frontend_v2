'use client'

import { AppButton } from '../base/AppButton'
import { AppDialog } from '../base/AppDialog'

interface AppConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  onConfirm: () => void
  confirmText?: string
  cancelText?: string
  variant?: 'default' | 'danger'
  loading?: boolean
}

function AppConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmText = 'Подтвердить',
  cancelText = 'Отмена',
  variant = 'default',
  loading,
}: AppConfirmDialogProps) {
  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      size="sm"
      footer={
        <>
          <AppButton variant="outline" onClick={() => onOpenChange(false)}>
            {cancelText}
          </AppButton>
          <AppButton
            variant={variant === 'danger' ? 'destructive' : 'default'}
            onClick={onConfirm}
            loading={loading}
          >
            {confirmText}
          </AppButton>
        </>
      }
    >
      <></>
    </AppDialog>
  )
}

export { AppConfirmDialog, type AppConfirmDialogProps }
