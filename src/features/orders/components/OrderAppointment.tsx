'use client'

import { CalendarCheck, CalendarPlus } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  useAddAppointment,
  useEditAppointment,
  useDeleteAppointment,
} from '@/features/appointments/api/mutations'
import { useAppointmentsByOrder } from '@/features/appointments/api/queries'
import { AppointmentForm } from '@/features/appointments/components/forms/AppointmentForm'
import { formatUpcomingDate } from '@/lib/format-date'

import type { AppointmentInput } from '@/features/appointments/types/appointment'

type Props = {
  orderId: number
}

const OrderAppointment = ({ orderId }: Props) => {
  const { data: appointments } = useAppointmentsByOrder(orderId)
  const [open, setOpen] = useState(false)
  const { mutate: createAppointment } = useAddAppointment()
  const { mutate: editAppointment } = useEditAppointment()
  const { mutate: deleteAppointment } = useDeleteAppointment()

  const appointment = appointments?.[0]

  const handleCreate = (data: AppointmentInput) => {
    createAppointment(data)
  }

  const handleUpdate = (eventId: number) => (data: AppointmentInput) => {
    editAppointment({ eventId, updatedEvent: data })
  }

  const handleDelete = (eventId: number) => {
    deleteAppointment(eventId, { onSuccess: () => setOpen(false) })
  }

  const handleClose = () => setOpen(false)

  // Если есть запись — кнопка с датой, по клику форма редактирования
  if (appointment) {
    const appointmentData: AppointmentInput = {
      id: appointment.id,
      title: appointment.title,
      start: new Date(appointment.start),
      end: new Date(appointment.end),
      resource: appointment.resource,
      allDay: appointment.allDay,
      orderId: appointment.orderId,
      description: appointment.description,
      status: appointment.status,
    }

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant='outline' size='sm' className='gap-1.5'>
            <CalendarCheck className='size-4 text-green-600' />
            <span>{formatUpcomingDate(appointment.start)}</span>
          </Button>
        </DialogTrigger>
        <DialogContent className='max-w-3xl'>
          <DialogHeader>
            <DialogTitle>Редактирование записи</DialogTitle>
          </DialogHeader>
          <AppointmentForm
            appointmentData={appointmentData}
            orderId={orderId}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onSuccess={handleClose}
          />
        </DialogContent>
      </Dialog>
    )
  }

  // Нет записи — кнопка создания
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm'>
          <CalendarPlus className='mr-2 size-4' />
          Записать клиента
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-3xl'>
        <DialogHeader>
          <DialogTitle>Создание записи</DialogTitle>
        </DialogHeader>
        <AppointmentForm
          onCreate={handleCreate}
          orderId={orderId}
          onSuccess={handleClose}
        />
      </DialogContent>
    </Dialog>
  )
}

export default OrderAppointment
