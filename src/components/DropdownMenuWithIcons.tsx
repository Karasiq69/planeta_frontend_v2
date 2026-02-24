import Link from 'next/link'


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

export interface DropdownWithIconMenuItem {
  key: string
  title: string
  icon?: LucideIcon
  url?: string
  onClick?: () => void
  isDestructive?: boolean
}

// Component props
export interface SimpleDropdownMenuProps {
  items: DropdownWithIconMenuItem[]
  children: ReactNode
}

export function DropdownMenuWithIcons({ items, children }: SimpleDropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) min-w-20">
        {items.map((item) => {
          const Icon = item.icon

          // MenuItem with Link for navigation
          if (item.url) {
            return (
              <Link href={item.url} key={item.key} passHref legacyBehavior>
                <DropdownMenuItem
                  className={item.isDestructive ? 'text-destructive focus:text-destructive' : ''}
                >
                  {Icon && (
                    <Icon
                      size={16}
                      strokeWidth={2}
                      className='mr-2 opacity-60'
                      aria-hidden='true'
                    />
                  )}
                  {item.title}
                </DropdownMenuItem>
              </Link>
            )
          }

          // MenuItem with onClick handler
          return (
            <DropdownMenuItem
              key={item.key}
              className={item.isDestructive ? 'text-destructive focus:text-destructive' : ''}
              onClick={item.onClick}
            >
              {Icon && (
                <Icon size={16} strokeWidth={2} className='mr-2 opacity-60' aria-hidden='true' />
              )}
              {item.title}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
