import { ArrowLeft, Wrench } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function OrderNotFound() {
  return (
    <div className='flex flex-1 items-start justify-center pt-[15vh]'>
      <div className='flex flex-col items-center gap-6 max-w-sm text-center'>
        <div className='relative animate-fade-in-up'>
          <div className='absolute inset-0 rounded-full bg-primary/8 blur-2xl scale-[2]' />
          <div className='relative flex items-center justify-center size-20 rounded-2xl bg-primary/8 border border-primary/15 animate-gentle-float'>
            <Wrench className='size-9 text-primary/70' strokeWidth={1.5} />
          </div>
        </div>

        <div className='space-y-2 animate-fade-in-up [animation-delay:100ms] opacity-0 [animation-fill-mode:forwards]'>
          <p className='text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-muted-foreground/60'>
            не найден
          </p>
          <h2 className='text-xl font-semibold tracking-tight text-foreground'>
            Заказ-наряд не найден
          </h2>
          <p className='text-sm text-muted-foreground/80 leading-relaxed'>
            Возможно, он был удалён или принадлежит другой организации.
            Проверьте выбранную компанию в боковом меню.
          </p>
        </div>

        <div className='animate-fade-in-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]'>
          <Button asChild variant='default' size='sm'>
            <Link href='/orders'>
              <ArrowLeft className='size-4' />
              К списку заказ-нарядов
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
