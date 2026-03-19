'use client'

import { Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

import PageHeader from '@/components/common/PageHeader'
import { AppEmptyState } from '@/components/ds/composite/AppEmptyState'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import LoaderSectionAnimated from '@/components/ui/LoaderSectionAnimated'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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

type StatusFilter = 'active' | 'inactive' | 'all'

const OrganizationsPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('active')
  const { data, isLoading } = useAllOrganizations()
  const router = useRouter()

  const organizations = data?.data ?? []

  const filteredOrganizations = useMemo(() => {
    if (statusFilter === 'all') return organizations
    return organizations.filter((org) =>
      statusFilter === 'active' ? org.isActive : !org.isActive
    )
  }, [organizations, statusFilter])

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

      <div className='flex items-center gap-3'>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as StatusFilter)}>
          <SelectTrigger className='w-48'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='active'>Активные</SelectItem>
            <SelectItem value='inactive'>Отключённые</SelectItem>
            <SelectItem value='all'>Все</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <LoaderSectionAnimated className='rounded p-10' />
      ) : filteredOrganizations.length > 0 ? (
        <div className='rounded-lg border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Название</TableHead>
                <TableHead>ИНН</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Адрес</TableHead>
                <TableHead>Телефон</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrganizations.map((org) => (
                <TableRow
                  key={org.id}
                  className='cursor-pointer'
                  onClick={() => router.push(`/settings/organizations/${org.id}`)}
                >
                  <TableCell className='font-medium'>{org.name}</TableCell>
                  <TableCell>{org.inn}</TableCell>
                  <TableCell>
                    <Badge variant={org.isActive ? 'success' : 'light'}>
                      {org.isActive ? 'Активна' : 'Отключена'}
                    </Badge>
                  </TableCell>
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
        <AppEmptyState title='Нет организаций' />
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
