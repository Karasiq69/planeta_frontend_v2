'use client'

import { useState } from 'react'

import { AppButton, AppDialog, AppSheet, AppConfirmDialog } from '@/components/ds'

export function DialogsSection() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmDangerOpen, setConfirmDangerOpen] = useState(false)

  return (
    <section id="dialogs">
      <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Диалоги и Sheet</h2>

      <div className="flex flex-wrap gap-3">
        <AppButton variant="outline" onClick={() => setDialogOpen(true)}>
          Открыть Dialog
        </AppButton>
        <AppButton variant="outline" onClick={() => setSheetOpen(true)}>
          Открыть Sheet
        </AppButton>
        <AppButton variant="outline" onClick={() => setConfirmOpen(true)}>
          Confirm (default)
        </AppButton>
        <AppButton variant="outline" onClick={() => setConfirmDangerOpen(true)}>
          Confirm (danger)
        </AppButton>
      </div>

      <AppDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Пример диалога"
        description="Описание диалога"
        footer={
          <>
            <AppButton variant="outline" onClick={() => setDialogOpen(false)}>Отмена</AppButton>
            <AppButton onClick={() => setDialogOpen(false)}>Сохранить</AppButton>
          </>
        }
      >
        <p className="text-sm">Контент диалога</p>
      </AppDialog>

      <AppSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        title="Пример Sheet"
        description="Боковая панель"
        footer={<AppButton onClick={() => setSheetOpen(false)}>Закрыть</AppButton>}
      >
        <p className="text-sm">Контент боковой панели</p>
      </AppSheet>

      <AppConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Подтверждение"
        description="Вы уверены, что хотите выполнить это действие?"
        onConfirm={() => setConfirmOpen(false)}
      />

      <AppConfirmDialog
        open={confirmDangerOpen}
        onOpenChange={setConfirmDangerOpen}
        title="Удаление"
        description="Это действие нельзя отменить. Удалить запись?"
        onConfirm={() => setConfirmDangerOpen(false)}
        variant="danger"
        confirmText="Удалить"
      />
    </section>
  )
}
