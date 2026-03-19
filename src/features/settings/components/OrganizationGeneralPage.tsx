'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { useOrganization } from '@/features/organizations/api/queries'
import OrganizationForm from '@/features/organizations/components/forms/OrganizationForm'
import { useOrganizationStore } from '@/stores/organization-store'
import LoaderSectionAnimated from '@/components/ui/LoaderSectionAnimated'
import TaxSettingsForm from './TaxSettingsForm'

export default function OrganizationGeneralPage() {
  const { organization: activeOrg } = useOrganizationStore()
  const { data: org, isLoading } = useOrganization(activeOrg?.id ?? 0)

  if (!activeOrg) {
    return (
      <Card>
        <CardContent className='py-8 text-center text-muted-foreground'>
          Выберите организацию в боковом меню
        </CardContent>
      </Card>
    )
  }

  if (isLoading) return <LoaderSectionAnimated />

  if (!org) return null

  return (
    <Tabs defaultValue='details'>
      <TabsList>
        <TabsTrigger value='details'>Реквизиты</TabsTrigger>
        <TabsTrigger value='tax'>Налоги</TabsTrigger>
      </TabsList>
      <TabsContent value='details' className='mt-4'>
        <Card>
          <CardContent className='pt-6'>
            <OrganizationForm organization={org} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value='tax' className='mt-4'>
        <TaxSettingsForm organization={org} />
      </TabsContent>
    </Tabs>
  )
}
