'use client'

import { Power, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import PageHeader from '@/components/common/PageHeader'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import LoaderSectionAnimated from '@/components/ui/LoaderSectionAnimated'
import {
  useDeleteOrganization,
  useToggleOrganizationActive,
} from '@/features/organizations/api/mutations'
import { useOrganization } from '@/features/organizations/api/queries'

import OrganizationForm from './forms/OrganizationForm'

interface OrganizationDetailPageProps {
  id: number
}

const OrganizationDetailPage = ({ id }: OrganizationDetailPageProps) => {
  const { data: organization, isLoading } = useOrganization(id)
  const deleteMutation = useDeleteOrganization()
  const toggleActiveMutation = useToggleOrganizationActive()
  const router = useRouter()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [toggleDialogOpen, setToggleDialogOpen] = useState(false)

  const handleDelete = () => {
    deleteMutation.mutate(id, {
      onSuccess: () => router.push('/settings/organizations'),
    })
  }

  const handleToggleActive = () => {
    if (!organization) return
    toggleActiveMutation.mutate(
      { id, isActive: !organization.isActive },
      { onSuccess: () => setToggleDialogOpen(false) }
    )
  }

  if (isLoading) return <LoaderSectionAnimated className='rounded p-10' />
  if (!organization) return <div className='p-4'>Организация не найдена</div>

  return (
    <div className='space-y-6'>
      <PageHeader title={organization.name} showBackButton />

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2'>
          <Card>
            <CardHeader>
              <CardTitle>Реквизиты</CardTitle>
            </CardHeader>
            <CardContent>
              <OrganizationForm
                organization={organization}
                onSuccess={() => router.push('/settings/organizations')}
              />
            </CardContent>
          </Card>
        </div>

        <div className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle className='text-base'>Статус</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Состояние</span>
                <Badge variant={organization.isActive ? 'success' : 'light'}>
                  {organization.isActive ? 'Активна' : 'Отключена'}
                </Badge>
              </div>
              <Separator />
              <Button
                variant='outline'
                size='sm'
                className='w-full'
                onClick={() => setToggleDialogOpen(true)}
              >
                <Power className='mr-1.5 size-4' />
                {organization.isActive ? 'Отключить' : 'Включить'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='text-base'>Опасная зона</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground mb-3'>
                Удаление возможно только для организаций без документов.
              </p>
              <Button
                variant='destructive'
                size='sm'
                className='w-full'
                onClick={() => setDeleteDialogOpen(true)}
              >
                <Trash2 className='mr-1.5 size-4' />
                Удалить организацию
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <AlertDialog open={toggleDialogOpen} onOpenChange={setToggleDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {organization.isActive ? 'Отключить организацию?' : 'Включить организацию?'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {organization.isActive
                ? 'Отключённая организация не будет отображаться в списках выбора.'
                : 'Организация снова будет доступна для выбора в документах.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleToggleActive}
              disabled={toggleActiveMutation.isPending}
            >
              {toggleActiveMutation.isPending
                ? 'Сохранение...'
                : organization.isActive
                  ? 'Отключить'
                  : 'Включить'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить организацию?</AlertDialogTitle>
            <AlertDialogDescription>
              Организация «{organization.name}» будет удалена. Это действие нельзя отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending ? 'Удаление...' : 'Удалить'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default OrganizationDetailPage
