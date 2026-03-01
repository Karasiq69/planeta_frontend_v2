'use client'

import { Trash2 } from 'lucide-react'
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
import { Button } from '@/components/ui/button'
import LoaderSectionAnimated from '@/components/ui/LoaderSectionAnimated'
import { useDeleteOrganization } from '@/features/organizations/api/mutations'
import { useOrganization } from '@/features/organizations/api/queries'
import OrganizationForm from './forms/OrganizationForm'

interface OrganizationDetailPageProps {
  id: number
}

const OrganizationDetailPage = ({ id }: OrganizationDetailPageProps) => {
  const { data: organization, isLoading } = useOrganization(id)
  const deleteMutation = useDeleteOrganization()
  const router = useRouter()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const handleDelete = () => {
    deleteMutation.mutate(id, {
      onSuccess: () => router.push('/settings/organizations'),
    })
  }

  if (isLoading) return <LoaderSectionAnimated className='rounded p-10' />
  if (!organization) return <div className='p-4'>Организация не найдена</div>

  return (
    <div className='space-y-6'>
      <PageHeader
        title={organization.name}
        showBackButton
        elements={[
          <Button
            key='delete'
            variant='destructive'
            size='sm'
            onClick={() => setDeleteDialogOpen(true)}
          >
            <Trash2 className='mr-1.5 size-4' />
            Удалить
          </Button>,
        ]}
      />

      <div className='max-w-lg'>
        <OrganizationForm
          organization={organization}
          onSuccess={() => router.push('/settings/organizations')}
        />
      </div>

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
