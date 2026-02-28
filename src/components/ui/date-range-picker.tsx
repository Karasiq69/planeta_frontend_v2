'use client'

import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

import type { DateRange } from 'react-day-picker'

interface DateRangePickerProps {
	value?: DateRange
	onChange?: (range: DateRange | undefined) => void
	className?: string
}

export function DateRangePicker({ value, onChange, className }: DateRangePickerProps) {
	return (
		<Popover modal>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					className={cn(
						'justify-start text-left font-normal',
						!value?.from && 'text-muted-foreground',
						className
					)}
				>
					<CalendarIcon className='mr-2 h-4 w-4' />
					{value?.from ? (
						value.to ? (
							<>
								{format(value.from, 'dd.MM.yyyy', { locale: ru })} –{' '}
								{format(value.to, 'dd.MM.yyyy', { locale: ru })}
							</>
						) : (
							format(value.from, 'dd.MM.yyyy', { locale: ru })
						)
					) : (
						'Выберите период'
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0' align='start'>
				<Calendar
					mode='range'
					selected={value}
					onSelect={onChange}
					locale={ru}
					numberOfMonths={2}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	)
}
