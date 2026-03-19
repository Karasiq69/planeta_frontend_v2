'use client'

import { Card, CardContent } from '@/components/ui/card'
import OrgCashRegistersTab from '@/features/payments/components/OrgCashRegistersTab'
import { useOrganizationStore } from '@/stores/organization-store'

export default function CashRegistersPage() {
  const { organization } = useOrganizationStore()

  if (!organization) {
    return (
      <Card>
        <CardContent className='py-8 text-center text-muted-foreground'>
          Выберите организацию в боковом меню
        </CardContent>
      </Card>
    )
  }

  return <OrgCashRegistersTab orgId={organization.id} />
}
