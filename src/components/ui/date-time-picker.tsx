import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { forwardRef } from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'


interface DateTimePickerProps {
  value?: Date
  onChange?: (date: Date) => void
  disabled?: boolean
}

const DateTimePicker = forwardRef<HTMLButtonElement, DateTimePickerProps>(
  ({ value, onChange, disabled }, ref) => {
    function handleDateSelect(date: Date | undefined) {
      if (date && onChange) {
        // Сохраняем часы и минуты при изменении даты
        const newDate = new Date(date)
        if (value) {
          newDate.setHours(value.getHours(), value.getMinutes())
        }
        onChange(newDate)
      }
    }

    function handleTimeChange(type: 'hour' | 'minute', timeValue: string) {
      if (!onChange) return

      const currentDate = value || new Date()
      const newDate = new Date(currentDate)

      if (type === 'hour') {
        newDate.setHours(parseInt(timeValue, 10), newDate.getMinutes())
      } else {
        newDate.setMinutes(parseInt(timeValue, 10))
      }

      onChange(newDate)
    }

    return (
      <Popover modal={true}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant='outline'
            className={cn('w-full pl-3 text-left font-normal', !value && 'text-muted-foreground')}
            disabled={disabled}
          >
            {value ? format(value, 'dd.MM.yyyy HH:mm') : <span>ДД.ММ.ГГГГ ЧЧ:мм</span>}
            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0'>
          <div className='sm:flex'>
            <Calendar
              mode='single'
              selected={value}
              onSelect={handleDateSelect}
              initialFocus
              locale={ru}
            />
            <div className='flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x'>
              <ScrollArea className='w-64 sm:w-auto'>
                <div className='flex sm:flex-col p-2'>
                  {Array.from({ length: 24 }, (_, i) => i)
                    .reverse()
                    .map((hour) => (
                      <Button
                        key={hour}
                        size='icon'
                        variant={value && value.getHours() === hour ? 'default' : 'ghost'}
                        className='sm:w-full shrink-0 aspect-square'
                        onClick={() => handleTimeChange('hour', hour.toString())}
                      >
                        {hour}
                      </Button>
                    ))}
                </div>
                <ScrollBar orientation='horizontal' className='sm:hidden' />
              </ScrollArea>
              <ScrollArea className='w-64 sm:w-auto'>
                <div className='flex sm:flex-col p-2'>
                  {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                    <Button
                      key={minute}
                      size='icon'
                      variant={value && value.getMinutes() === minute ? 'default' : 'ghost'}
                      className='sm:w-full shrink-0 aspect-square'
                      onClick={() => handleTimeChange('minute', minute.toString())}
                    >
                      {minute.toString().padStart(2, '0')}
                    </Button>
                  ))}
                </div>
                <ScrollBar orientation='horizontal' className='sm:hidden' />
              </ScrollArea>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    )
  }
)

DateTimePicker.displayName = 'DateTimePicker'

export { DateTimePicker }
