# Frontend: Cash Register Selection Modal for Document Confirmation

**Date:** 2026-03-31
**Status:** Approved
**Backend spec:** `crm_backend_express/docs/superpowers/specs/2026-03-31-income-documents-cash-deduction-design.md`

---

## Overview

When confirming ("провести") an inventory document, some document types require a cash register selection. This spec covers the frontend changes needed to:

1. Show a cash register selection modal for document types that require it (RECEIPT, EXPENSE)
2. Migrate all document types to the new universal confirm endpoint
3. Handle backend error responses (insufficient funds, etc.)

---

## Backend API Contract

**Endpoint:** `POST /documents/:id/confirm`
**Base URL:** `/api` (set in apiClient)
**Full call:** `apiClient.post('/documents/:id/confirm', { cashRegisterId? })`

**Request body:**
```typescript
{ cashRegisterId?: number }  // optional — required only for RECEIPT/EXPENSE
```

**Success:** Returns updated document with `status: 'CONFIRMED'`

**Error responses:**

| Message | Condition |
|---|---|
| `'Необходимо выбрать кассу'` | RECEIPT/EXPENSE confirmed without cashRegisterId |
| `'Недостаточно средств в кассе. Баланс: X ₽, требуется: Y ₽'` | RECEIPT: cash register balance < document total |
| `'Касса деактивирована'` | Selected cash register is inactive |
| `'Касса не найдена'` | cashRegisterId doesn't exist |
| `'Можно провести только черновик'` | Document is not in DRAFT status |
| `'Документ не содержит позиций'` | Document has no line items |

---

## Document Types & Cash Register Requirement

| Type | Requires cashRegisterId | Frontend exists |
|---|---|---|
| RECEIPT | Yes | Yes (`receipt/`) |
| EXPENSE | Yes | No (future) |
| TRANSFER | No | Yes (`transfer/`) |
| WRITE_OFF | No | No (future) |

---

## Architecture

### New files

**`src/features/inventory-documents/api/actions.ts`**
Shared confirm action replacing per-type `complete` actions:
```typescript
export const confirmDocument = async (
  id: number,
  cashRegisterId?: number
): Promise<InventoryDocument> => {
  const response = await apiClient.post(`/documents/${id}/confirm`,
    cashRegisterId ? { cashRegisterId } : undefined
  )
  return response.data
}
```

**`src/features/inventory-documents/api/mutations.ts`**
Shared mutation hook:
```typescript
export const useConfirmDocument = (id: number, queryKeysToInvalidate: QueryKey[]) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (cashRegisterId?: number) => confirmDocument(id, cashRegisterId),
    onSuccess: () => {
      toast.success('Документ проведён')
      queryKeysToInvalidate.forEach(key =>
        queryClient.invalidateQueries({ queryKey: key })
      )
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })
}
```

**`src/features/inventory-documents/components/CashRegisterSelectDialog.tsx`**
Reusable dialog for selecting a cash register before confirming:

- Fetches active cash registers via existing `useCashRegisters()` hook
- Each `SelectItem` shows: `{name} — {balance.toLocaleString('ru')} ₽`
- Local `useState<number | null>` for selected register ID
- "Провести" button disabled until register is selected or while `isPending`
- If no active registers: shows message "Нет активных касс" and disabled button
- Follows shadcn `Dialog` + `Select` pattern (same as `CashRegistersTable` + `CreatePaymentForm`)

```typescript
interface CashRegisterSelectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (cashRegisterId: number) => void
  isPending: boolean
}
```

### Modified files

**`receipt/api/actions.ts`** — remove `completeReceiptDocument`
**`receipt/api/mutations.ts`** — remove `useCompleteReceiptDocument`
**`receipt/components/forms/ReceiptSubmitButton.tsx`**:
- Import `useConfirmDocument`, `CashRegisterSelectDialog`
- Add `useState<boolean>` for dialog open state
- On "Провести" click → `setDialogOpen(true)`
- On dialog confirm → `confirmDocument(cashRegisterId)`, close dialog

**`transfer/api/actions.ts`** — remove `completeTransferDocument`
**`transfer/api/mutations.ts`** — remove `useCompleteTransferDocument`
**`transfer/components/forms/TransferSubmitButton.tsx`**:
- Import `useConfirmDocument`
- On "Провести" click → `confirmDocument()` directly (no modal)

---

## Component Structure

```
src/features/inventory-documents/
├── api/
│   ├── actions.ts          (NEW: confirmDocument)
│   └── mutations.ts        (NEW: useConfirmDocument)
├── components/
│   └── CashRegisterSelectDialog.tsx   (NEW)
├── receipt/
│   ├── api/
│   │   ├── actions.ts      (MODIFIED: remove completeReceiptDocument)
│   │   └── mutations.ts    (MODIFIED: remove useCompleteReceiptDocument)
│   └── components/forms/
│       └── ReceiptSubmitButton.tsx    (MODIFIED: open dialog → confirm)
└── transfer/
    ├── api/
    │   ├── actions.ts      (MODIFIED: remove completeTransferDocument)
    │   └── mutations.ts    (MODIFIED: remove useCompleteTransferDocument)
    └── components/forms/
        └── TransferSubmitButton.tsx   (MODIFIED: call confirm directly)
```

---

## UX Flow

**RECEIPT "Провести" click:**
1. Dialog opens with active cash register list + balances
2. User selects a register → "Провести" button enables
3. User clicks "Провести" → `POST /documents/:id/confirm` with `{ cashRegisterId }`
4. Success: toast "Документ проведён", document refreshes to CONFIRMED status, dialog closes
5. Error: toast with backend error message (e.g. "Недостаточно средств..."), dialog stays open

**TRANSFER "Провести" click:**
1. Directly calls `POST /documents/:id/confirm` with no body
2. Success/error handled same as before via toast

---

## What is NOT changing

- Query key structures for receipt and transfer documents
- Document status rendering logic
- All other document mutations (cancel, update, etc.)
- Cash register CRUD components and API
