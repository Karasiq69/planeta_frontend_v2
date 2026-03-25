'use client'

import { ChevronsUpDown, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { useAllOrganizations } from '@/features/organizations/api/queries'
import OrganizationForm from '@/features/organizations/components/forms/OrganizationForm'
import { useOrganizationStore } from '@/stores/organization-store'

export function TeamSwitcher() {
  const { isMobile } = useSidebar()
  const { data, isSuccess } = useAllOrganizations()
  const { organization: activeOrg, setOrganization, clearOrganization, _hasHydrated } =
    useOrganizationStore()
  const [dialogOpen, setDialogOpen] = useState(false)

  const organizations = data?.data ?? []

  useEffect(() => {
    if (!_hasHydrated || !isSuccess) return
    if (!organizations.length) {
      if (activeOrg) clearOrganization()
      return
    }
    if (!activeOrg || !organizations.some((o) => o.id === activeOrg.id)) {
      setOrganization(organizations[0])
    }
  }, [_hasHydrated, isSuccess, activeOrg, organizations, setOrganization, clearOrganization])

  if (!activeOrg) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size='lg'
            onClick={() => setDialogOpen(true)}
          >
            <div className='flex aspect-square size-8 items-center justify-center rounded-lg border bg-background'>
              <Plus className='size-4' />
            </div>
            <span className='text-sm text-muted-foreground'>Добавить компанию</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <CreateOrganizationDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      </SidebarMenu>
    )
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground text-sm font-bold'>
                {activeOrg.name.charAt(0).toUpperCase()}
              </div>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>{activeOrg.name}</span>
                <span className='truncate text-xs'>{activeOrg.inn}</span>
              </div>
              <ChevronsUpDown className='ml-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
            align='start'
            side='bottom'
            sideOffset={4}
          >
            <DropdownMenuLabel className='text-xs text-muted-foreground'>
              Компании
            </DropdownMenuLabel>
            {organizations.map((org, index) => (
              <DropdownMenuItem
                key={org.id}
                onClick={() => {
                  setOrganization(org)
                  window.location.href = '/'
                }}
                className='gap-2 p-2'
              >
                <div className='flex size-6 items-center justify-center rounded-sm border text-xs font-bold'>
                  {org.name.charAt(0).toUpperCase()}
                </div>
                {org.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='gap-2 p-2'
              onClick={() => setDialogOpen(true)}
            >
              <div className='flex size-6 items-center justify-center rounded-md border bg-background'>
                <Plus className='size-4' />
              </div>
              <div className='font-medium text-muted-foreground'>Добавить компанию</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <CreateOrganizationDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

function CreateOrganizationDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-lg'>
        <DialogHeader>
          <DialogTitle>Новая организация</DialogTitle>
        </DialogHeader>
        <OrganizationForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  )
}
