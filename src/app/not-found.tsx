import { ArrowLeft, SearchX } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className='flex h-full w-full items-center justify-center bg-background px-4'>
      <div className='flex flex-col items-center gap-6 max-w-sm text-center'>
        <div className='relative animate-fade-in-up'>
          <div className='absolute inset-0 rounded-full bg-muted-foreground/5 blur-2xl scale-[2]' />
          <div className='relative flex items-center justify-center size-20 rounded-2xl bg-muted/60 border border-border/50 animate-gentle-float'>
            <SearchX className='size-9 text-muted-foreground/50' strokeWidth={1.5} />
          </div>
        </div>

        <div className='space-y-2 animate-fade-in-up [animation-delay:100ms] opacity-0 [animation-fill-mode:forwards]'>
          <p className='text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-muted-foreground/60'>
            ошибка 404
          </p>
          <h1 className='text-xl font-semibold tracking-tight text-foreground'>
            Страница не найдена
          </h1>
          <p className='text-sm text-muted-foreground/80 leading-relaxed'>
            Запрашиваемая страница не существует или была перемещена.
          </p>
        </div>

        <div className='animate-fade-in-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]'>
          <Button asChild variant='default' size='sm'>
            <Link href='/'>
              <ArrowLeft className='size-4' />
              На главную
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
