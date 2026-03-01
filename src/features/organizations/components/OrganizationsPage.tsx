'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import PageHeader from '@/components/common/PageHeader'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import LoaderSectionAnimated from '@/components/ui/LoaderSectionAnimated'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useAllOrganizations } from '@/features/organizations/api/queries'
import OrganizationForm from './forms/OrganizationForm'

const OrganizationsPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { data, isLoading } = useAllOrganizations()
  const router = useRouter()

  const organizations = data?.data ?? []

  return (
    <div className='space-y-6'>
      <PageHeader
        title='Организации'
        showBackButton
        elements={[
          <Button key='add' size='sm' onClick={() => setDialogOpen(true)}>
            <Plus className='mr-1.5 size-4' />
            Добавить организацию
          </Button>,
        ]}
      />

      {isLoading ? (
        <LoaderSectionAnimated className='rounded p-10' />
      ) : organizations.length > 0 ? (
        <div className='rounded-lg border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Название</TableHead>
                <TableHead>ИНН</TableHead>
                <TableHead>Адрес</TableHead>
                <TableHead>Телефон</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {organizations.map((org) => (
                <TableRow
                  key={org.id}
                  className='cursor-pointer'
                  onClick={() => router.push(`/settings/organizations/${org.id}`)}
                >
                  <TableCell className='font-medium'>{org.name}</TableCell>
                  <TableCell>{org.inn}</TableCell>
                  <TableCell className='text-muted-foreground'>
                    {org.actualAddress || org.legalAddress || '—'}
                  </TableCell>
                  <TableCell className='text-muted-foreground'>{org.phone || '—'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className='rounded-lg border p-8 text-center text-muted-foreground'>
          Нет организаций
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className='max-w-lg'>
          <DialogHeader>
            <DialogTitle>Новая организация</DialogTitle>
          </DialogHeader>
          <OrganizationForm onSuccess={() => setDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default OrganizationsPage
