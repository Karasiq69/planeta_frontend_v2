'use client'

import { Card, CardContent } from '@/components/ui/card'
import { useCurrentOrganization } from '@/features/organizations/api/queries'
import OrgCashRegistersTab from '@/features/payments/components/OrgCashRegistersTab'

export default function CashRegistersPage() {
  const { data } = useCurrentOrganization()

  if (!data) {
    return (
      <Card>
        <CardContent className='py-8 text-center text-muted-foreground'>
          Выберите организацию в боковом меню
        </CardContent>
      </Card>
    )
  }

  return <OrgCashRegistersTab />
}
