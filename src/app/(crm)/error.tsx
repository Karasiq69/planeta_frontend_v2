'use client'

import { AlertTriangle, ArrowLeft, RotateCcw } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function CrmError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className='flex flex-1 items-start justify-center pt-[15vh]'>
      <div className='flex flex-col items-center gap-6 max-w-sm text-center'>
        <div className='relative animate-fade-in-up'>
          <div className='absolute inset-0 rounded-full bg-destructive/5 blur-2xl scale-[2]' />
          <div className='relative flex items-center justify-center size-20 rounded-2xl bg-destructive/8 border border-destructive/15 animate-gentle-float'>
            <AlertTriangle className='size-9 text-destructive/60' strokeWidth={1.5} />
          </div>
        </div>

        <div className='space-y-2 animate-fade-in-up [animation-delay:100ms] opacity-0 [animation-fill-mode:forwards]'>
          <p className='text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-muted-foreground/60'>
            ошибка
          </p>
          <h2 className='text-xl font-semibold tracking-tight text-foreground'>
            Что-то пошло не так
          </h2>
          <p className='text-sm text-muted-foreground/80 leading-relaxed'>
            {error.message || 'Произошла непредвиденная ошибка. Попробуйте обновить страницу.'}
          </p>
          {error.digest && (
            <p className='text-xs text-muted-foreground/50 font-mono'>
              Код: {error.digest}
            </p>
          )}
        </div>

        <div className='flex gap-2 animate-fade-in-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]'>
          <Button variant='outline' size='sm' onClick={reset}>
            <RotateCcw className='size-4' />
            Попробовать снова
          </Button>
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
