'use client'

import { ChevronsUpDown, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

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
import { useOrganizationStore } from '@/stores/organization-store'

export function TeamSwitcher() {
  const { isMobile } = useSidebar()
  const { data, isFetched } = useAllOrganizations()
  const { organization: activeOrg, setOrganization, clearOrganization } = useOrganizationStore()
  const router = useRouter()

  const organizations = data?.data ?? []

  useEffect(() => {
    if (!isFetched) return
    if (!organizations.length) {
      if (activeOrg) clearOrganization()
      return
    }
    if (!activeOrg || !organizations.some((o) => o.id === activeOrg.id)) {
      setOrganization(organizations[0])
    }
  }, [isFetched, activeOrg, organizations, setOrganization, clearOrganization])

  if (!activeOrg) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size='lg'
            onClick={() => router.push('/settings/organizations')}
          >
            <div className='flex aspect-square size-8 items-center justify-center rounded-lg border bg-background'>
              <Plus className='size-4' />
            </div>
            <span className='text-sm text-muted-foreground'>Добавить компанию</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
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
                onClick={() => setOrganization(org)}
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
              onClick={() => router.push('/settings/organizations')}
            >
              <div className='flex size-6 items-center justify-center rounded-md border bg-background'>
                <Plus className='size-4' />
              </div>
              <div className='font-medium text-muted-foreground'>Добавить компанию</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
