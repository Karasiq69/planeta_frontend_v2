# Documents Cash Register Modal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** When confirming a RECEIPT document, show a modal to select a cash register, then POST to the universal `/documents/:id/confirm` endpoint; migrate TRANSFER confirmation to the same endpoint (no modal needed).

**Architecture:** A shared `confirmDocument` action and `useConfirmDocument` mutation hook are added at the `inventory-documents` feature level. A reusable `CashRegisterSelectDialog` component wraps the existing shadcn `Dialog` + `Select` pattern. `ReceiptSubmitButton` opens the dialog; `TransferSubmitButton` calls confirm directly. Old per-type `complete` actions and hooks are removed.

**Tech Stack:** Next.js 14, React, TanStack Query (useMutation, useQueryClient), shadcn/ui (Dialog, Select, Button), Axios via `apiClient`, sonner (toast)

---

## File Map

| Action | Path |
|--------|------|
| **Create** | `src/features/inventory-documents/api/actions.ts` |
| **Create** | `src/features/inventory-documents/api/mutations.ts` |
| **Create** | `src/features/inventory-documents/components/CashRegisterSelectDialog.tsx` |
| **Modify** | `src/features/inventory-documents/receipt/api/actions.ts` |
| **Modify** | `src/features/inventory-documents/receipt/api/mutations.ts` |
| **Modify** | `src/features/inventory-documents/receipt/components/forms/ReceiptSubmitButton.tsx` |
| **Modify** | `src/features/inventory-documents/transfer/api/actions.ts` |
| **Modify** | `src/features/inventory-documents/transfer/api/mutations.ts` |
| **Modify** | `src/features/inventory-documents/transfer/components/forms/TransferSubmitButton.tsx` |

---

### Task 1: Shared `confirmDocument` action and `useConfirmDocument` hook

**Files:**
- Create: `src/features/inventory-documents/api/actions.ts`
- Create: `src/features/inventory-documents/api/mutations.ts`

- [ ] **Step 1: Create the shared confirm action**

Create `src/features/inventory-documents/api/actions.ts`:

```typescript
import apiClient from '@/lib/auth/client'
import { DOCUMENTS_URL } from '@/lib/constants'

export const confirmDocument = async (
  id: number,
  cashRegisterId?: number
): Promise<unknown> => {
  const response = await apiClient.post(
    `${DOCUMENTS_URL}/${id}/confirm`,
    cashRegisterId != null ? { cashRegisterId } : undefined
  )
  return response.data
}
```

Note: `DOCUMENTS_URL = '/documents'` already exists in `src/lib/constants.ts:23`.

- [ ] **Step 2: Create the shared mutation hook**

Create `src/features/inventory-documents/api/mutations.ts`:

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { confirmDocument } from './actions'

import type { QueryKey } from '@tanstack/react-query'

export const useConfirmDocument = (id: number, queryKeysToInvalidate: QueryKey[]) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (cashRegisterId?: number) => confirmDocument(id, cashRegisterId),
    onSuccess: () => {
      toast.success('Документ проведён')
      queryKeysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      )
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd /Users/karasiq/PycharmProjects/planeta_frontend_v2 && npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors related to the new files.

- [ ] **Step 4: Commit**

```bash
cd /Users/karasiq/PycharmProjects/planeta_frontend_v2
git add src/features/inventory-documents/api/actions.ts src/features/inventory-documents/api/mutations.ts
git commit -m "feat(documents): add shared confirmDocument action and useConfirmDocument hook"
```

---

### Task 2: `CashRegisterSelectDialog` component

**Files:**
- Create: `src/features/inventory-documents/components/CashRegisterSelectDialog.tsx`

- [ ] **Step 1: Create the dialog component**

Create `src/features/inventory-documents/components/CashRegisterSelectDialog.tsx`:

```typescript
'use client'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCashRegisters } from '@/features/payments/api/queries'
import LoaderAnimated from '@/components/ui/LoaderAnimated'

interface CashRegisterSelectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (cashRegisterId: number) => void
  isPending: boolean
}

const CashRegisterSelectDialog = ({
  open,
  onOpenChange,
  onConfirm,
  isPending,
}: CashRegisterSelectDialogProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const { data: cashRegisters, isLoading } = useCashRegisters()

  const activeCashRegisters = cashRegisters?.filter((cr) => cr.isActive) ?? []

  const handleConfirm = () => {
    if (selectedId != null) {
      onConfirm(selectedId)
    }
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) setSelectedId(null)
    onOpenChange(isOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Выберите кассу</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center py-4">
            <LoaderAnimated />
          </div>
        ) : activeCashRegisters.length === 0 ? (
          <p className="text-sm text-muted-foreground py-2">Нет активных касс</p>
        ) : (
          <Select onValueChange={(v) => setSelectedId(Number(v))}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите кассу" />
            </SelectTrigger>
            <SelectContent>
              {activeCashRegisters.map((cr) => (
                <SelectItem key={cr.id} value={cr.id.toString()}>
                  {cr.name} — {cr.balance.toLocaleString('ru')} ₽
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isPending}
          >
            Отмена
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={selectedId == null || isPending || activeCashRegisters.length === 0}
          >
            {isPending && <LoaderAnimated className="text-primary-foreground" />}
            Провести
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CashRegisterSelectDialog
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/karasiq/PycharmProjects/planeta_frontend_v2 && npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd /Users/karasiq/PycharmProjects/planeta_frontend_v2
git add src/features/inventory-documents/components/CashRegisterSelectDialog.tsx
git commit -m "feat(documents): add CashRegisterSelectDialog component"
```

---

### Task 3: Update `ReceiptSubmitButton` — open dialog, confirm with cashRegisterId

**Files:**
- Modify: `src/features/inventory-documents/receipt/api/actions.ts`
- Modify: `src/features/inventory-documents/receipt/api/mutations.ts`
- Modify: `src/features/inventory-documents/receipt/components/forms/ReceiptSubmitButton.tsx`

- [ ] **Step 1: Remove `completeReceiptDocument` from receipt actions**

In `src/features/inventory-documents/receipt/api/actions.ts`, remove lines 54–58:

```typescript
// DELETE these lines:
// Подтверждение приходного документа
export const completeReceiptDocument = async (id: number): Promise<ReceiptDocument> => {
  const response = await apiClient.post<ReceiptDocument>(`${RECEIPT_DOCUMENTS_URL}/${id}/complete`)
  return response.data
}
```

- [ ] **Step 2: Remove `useCompleteReceiptDocument` from receipt mutations**

In `src/features/inventory-documents/receipt/api/mutations.ts`:

1. Remove `completeReceiptDocument` from the import on line 8.
2. Remove the entire `useCompleteReceiptDocument` export (lines 78–96).

After edit, the import block at the top should be:
```typescript
import {
  addReceiptDocumentItem,
  cancelReceiptDocument,
  createReceiptDocument,
  deleteReceiptDocument,
  removeReceiptDocumentItem,
  updateReceiptDocument,
  updateReceiptDocumentItem,
} from './actions'
```

- [ ] **Step 3: Rewrite `ReceiptSubmitButton`**

Replace the full content of `src/features/inventory-documents/receipt/components/forms/ReceiptSubmitButton.tsx`:

```typescript
'use client'
import { useState } from 'react'
import { useIsMutating } from '@tanstack/react-query'
import { CheckCheck, Save } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import LoaderAnimated from '@/components/ui/LoaderAnimated'
import { useConfirmDocument } from '@/features/inventory-documents/api/mutations'
import CashRegisterSelectDialog from '@/features/inventory-documents/components/CashRegisterSelectDialog'
import { useReceiptDocument } from '@/features/inventory-documents/receipt/api/queries'
import { receiptDocumentsQueryKeys } from '@/features/inventory-documents/receipt/api/query-keys'
import { InventoryDocumentStatus } from '@/features/inventory-documents/types'

type Props = {
  documentId: number
}

const ReceiptSubmitButton = ({ documentId }: Props) => {
  const isMutating = useIsMutating()
  const [dialogOpen, setDialogOpen] = useState(false)
  const { data } = useReceiptDocument(documentId)
  const { mutate: confirm, isPending: isConfirmPending } = useConfirmDocument(documentId, [
    receiptDocumentsQueryKeys.detail(documentId),
    receiptDocumentsQueryKeys.lists(),
  ])

  const handleDialogConfirm = (cashRegisterId: number) => {
    confirm(cashRegisterId, {
      onSuccess: () => setDialogOpen(false),
    })
  }

  const isDocumentEditable = data?.status === InventoryDocumentStatus.DRAFT

  return (
    <>
      {isDocumentEditable && (
        <>
          <Button
            type="button"
            size="sm"
            onClick={() => setDialogOpen(true)}
            disabled={isConfirmPending}
          >
            {isMutating > 0 ? (
              <LoaderAnimated className="text-primary-foreground" />
            ) : (
              <CheckCheck />
            )}
            Сохранить и провести
          </Button>
          <Button
            type="submit"
            size="sm"
            form="receiptDocumentForm"
            variant="outline"
            disabled={isMutating > 0}
          >
            {isMutating > 0 ? <LoaderAnimated className="text-primary-foreground" /> : <Save />}
            Сохранить черновик
          </Button>

          <CashRegisterSelectDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            onConfirm={handleDialogConfirm}
            isPending={isConfirmPending}
          />
        </>
      )}
    </>
  )
}

export default ReceiptSubmitButton
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
cd /Users/karasiq/PycharmProjects/planeta_frontend_v2 && npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
cd /Users/karasiq/PycharmProjects/planeta_frontend_v2
git add \
  src/features/inventory-documents/receipt/api/actions.ts \
  src/features/inventory-documents/receipt/api/mutations.ts \
  src/features/inventory-documents/receipt/components/forms/ReceiptSubmitButton.tsx
git commit -m "feat(documents): migrate receipt confirm to universal endpoint with cash register modal"
```

---

### Task 4: Update `TransferSubmitButton` — confirm directly, no modal

**Files:**
- Modify: `src/features/inventory-documents/transfer/api/actions.ts`
- Modify: `src/features/inventory-documents/transfer/api/mutations.ts`
- Modify: `src/features/inventory-documents/transfer/components/forms/TransferSubmitButton.tsx`

- [ ] **Step 1: Remove `completeTransferDocument` from transfer actions**

In `src/features/inventory-documents/transfer/api/actions.ts`, remove lines 77–83:

```typescript
// DELETE these lines:
// Подтверждение документа перемещения
export const completeTransferDocument = async (id: number): Promise<TransferDocument> => {
  const response = await apiClient.post<TransferDocument>(
    `${TRANSFER_DOCUMENTS_URL}/${id}/complete`
  )
  return response.data
}
```

- [ ] **Step 2: Remove `useCompleteTransferDocument` from transfer mutations**

In `src/features/inventory-documents/transfer/api/mutations.ts`:

1. Remove `completeTransferDocument` from the import on lines 6–13.
2. Remove the entire `useCompleteTransferDocument` export (lines 122–140).

After edit, the import block should be:
```typescript
import {
  addTransferDocumentItem,
  cancelTransferDocument,
  createTransferDocumentFn,
  removeTransferDocumentItem,
  updateTransferDocumentFn,
  updateTransferDocumentItem,
} from '@/features/inventory-documents/transfer/api/actions'
```

- [ ] **Step 3: Rewrite `TransferSubmitButton`**

Replace the full content of `src/features/inventory-documents/transfer/components/forms/TransferSubmitButton.tsx`:

```typescript
'use client'
import { useIsMutating } from '@tanstack/react-query'
import { CheckCheck, Save } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import LoaderAnimated from '@/components/ui/LoaderAnimated'
import { useConfirmDocument } from '@/features/inventory-documents/api/mutations'
import { useTransferDocument } from '@/features/inventory-documents/transfer/api/queries'
import { transferDocumentsQueryKeys } from '@/features/inventory-documents/transfer/api/query-keys'
import { InventoryDocumentStatus } from '@/features/inventory-documents/types'

type Props = {
  documentId: number
}

const TransferSubmitButton = ({ documentId }: Props) => {
  const isMutating = useIsMutating()
  const { data } = useTransferDocument(documentId)
  const { mutate: confirm, isPending: isConfirmPending } = useConfirmDocument(documentId, [
    transferDocumentsQueryKeys.detail(documentId),
    transferDocumentsQueryKeys.lists(),
  ])

  const isDocumentEditable = data?.status === InventoryDocumentStatus.DRAFT

  return (
    <>
      {isDocumentEditable && (
        <>
          <Button
            type="button"
            size="sm"
            onClick={() => confirm(undefined)}
            disabled={isConfirmPending}
          >
            {isMutating > 0 ? (
              <LoaderAnimated className="text-primary-foreground" />
            ) : (
              <CheckCheck />
            )}
            Сохранить и провести
          </Button>
          <Button
            type="submit"
            size="sm"
            form="transferDocumentForm"
            variant="outline"
            disabled={isMutating > 0}
          >
            {isMutating > 0 ? <LoaderAnimated className="text-primary-foreground" /> : <Save />}
            Сохранить черновик
          </Button>
        </>
      )}
    </>
  )
}

export default TransferSubmitButton
```

Note: component was previously named `ReceiptSubmitButton` by mistake — corrected to `TransferSubmitButton`.

- [ ] **Step 4: Verify TypeScript compiles with no errors**

```bash
cd /Users/karasiq/PycharmProjects/planeta_frontend_v2 && npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
cd /Users/karasiq/PycharmProjects/planeta_frontend_v2
git add \
  src/features/inventory-documents/transfer/api/actions.ts \
  src/features/inventory-documents/transfer/api/mutations.ts \
  src/features/inventory-documents/transfer/components/forms/TransferSubmitButton.tsx
git commit -m "feat(documents): migrate transfer confirm to universal endpoint, remove old complete action"
```

---

## Manual Verification Checklist

After all tasks are complete:

**RECEIPT flow:**
- [ ] Open a RECEIPT document in DRAFT status
- [ ] Click "Сохранить и провести" → modal appears with active cash registers + balances
- [ ] Without selecting a register — "Провести" button is disabled
- [ ] Select a register → "Провести" enables
- [ ] Click "Провести" → request sent to `POST /api/documents/:id/confirm` with `{ cashRegisterId }`
- [ ] On success: modal closes, document status changes to CONFIRMED, toast "Документ проведён"
- [ ] If balance is insufficient: modal stays open, toast with backend error message

**TRANSFER flow:**
- [ ] Open a TRANSFER document in DRAFT status
- [ ] Click "Сохранить и провести" → no modal, direct API call to `POST /api/documents/:id/confirm` (no body)
- [ ] On success: document status changes to CONFIRMED, toast "Документ проведён"
