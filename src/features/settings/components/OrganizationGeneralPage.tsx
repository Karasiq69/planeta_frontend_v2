'use client'

import { useQueryClient } from '@tanstack/react-query'
import { Power, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import LoaderSectionAnimated from '@/components/ui/LoaderSectionAnimated'
import {
  useDeleteOrganization,
  useToggleOrganizationActive,
} from '@/features/organizations/api/mutations'
import { useCurrentOrganization, useOrganization } from '@/features/organizations/api/queries'
import OrganizationForm from '@/features/organizations/components/forms/OrganizationForm'
import TaxSettingsForm from './TaxSettingsForm'

export default function OrganizationGeneralPage() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { data: activeOrg } = useCurrentOrganization()
  const { data: org, isLoading } = useOrganization(activeOrg?.id ?? 0)
  const deleteMutation = useDeleteOrganization()
  const toggleActiveMutation = useToggleOrganizationActive()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [toggleDialogOpen, setToggleDialogOpen] = useState(false)

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

  const handleDelete = () => {
    deleteMutation.mutate(org.id, {
      onSuccess: () => {
        queryClient.clear()
        setDeleteDialogOpen(false)
        router.replace('/')
      },
    })
  }

  const handleToggleActive = () => {
    toggleActiveMutation.mutate(
      { id: org.id, isActive: !org.isActive },
      { onSuccess: () => setToggleDialogOpen(false) }
    )
  }

  return (
    <>
      <Tabs defaultValue='details'>
        <TabsList>
          <TabsTrigger value='details'>Реквизиты</TabsTrigger>
          <TabsTrigger value='tax'>Налоги</TabsTrigger>
        </TabsList>
        <TabsContent value='details' className='mt-4'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            <div className='lg:col-span-2'>
              <Card>
                <CardHeader>
                  <CardTitle>Реквизиты</CardTitle>
                  <CardDescription>Основные реквизиты и контактные данные организации</CardDescription>
                </CardHeader>
                <CardContent>
                  <OrganizationForm organization={org} />
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
                    <Badge variant={org.isActive ? 'success' : 'light'}>
                      {org.isActive ? 'Активна' : 'Отключена'}
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
                    {org.isActive ? 'Отключить' : 'Включить'}
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
        </TabsContent>
        <TabsContent value='tax' className='mt-4'>
          <TaxSettingsForm organization={org} />
        </TabsContent>
      </Tabs>

      <AlertDialog open={toggleDialogOpen} onOpenChange={setToggleDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {org.isActive ? 'Отключить организацию?' : 'Включить организацию?'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {org.isActive
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
                : org.isActive
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
              Организация «{org.name}» будет удалена. Это действие нельзя отменить.
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
    </>
  )
}
