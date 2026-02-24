'use client'

import { Logs, Settings, UserRoundCog, Wrench } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface NavMainProps {
  isOpen?: boolean
}

export const settingsMenuItems = [
  {
    title: 'Настройки',
    url: '/settings',
    icon: Settings,
  },
  {
    title: 'Услуги',
    url: '/services',
    icon: Logs,
  },
  {
    title: 'Механики',
    url: '/mechanics',
    icon: UserRoundCog,
  },
  {
    title: 'Запчасти и товары',
    url: '/products',
    icon: Wrench,
  },
]

export function NavSettings({ isOpen }: NavMainProps) {
  const pathname = usePathname()

  const getIsActive = (item: any) => {
    return pathname.startsWith(item.url)
  }

  return (
    <nav className='mt-8 w-full'>
      <ul className='flex flex-col    items-start space-y-1 px-2'>
        <li className='w-full pt-5'>
          {isOpen || isOpen === undefined ? (
            <p className='text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate'>
              Настройки
            </p>
          ) : null}

          {settingsMenuItems.map((item) => (
            <div className='w-full' key={item.title}>
              <TooltipProvider disableHoverableContent>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={getIsActive(item) ? 'secondary' : 'ghost'}
                      className={cn(
                        getIsActive(item) &&
                          'flex gap-2 rounded-lg hover:bg-background/70 items-center h-10 border ',
                        'w-full justify-start h-10 mb-1'
                      )}
                      asChild
                    >
                      <Link href={item.url}>
                        <span className={cn(isOpen === false ? '' : 'mr-4')}>
                          <item.icon size={18} />
                        </span>
                        <p
                          className={cn(
                            'max-w-[200px] truncate',
                            isOpen === false
                              ? '-translate-x-96 opacity-0'
                              : 'translate-x-0 opacity-100'
                          )}
                        >
                          {item.title}
                        </p>
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  {isOpen === false && <TooltipContent side='right'>{item.title}</TooltipContent>}
                </Tooltip>
              </TooltipProvider>
            </div>
          ))}
        </li>
      </ul>
    </nav>
  )
}
