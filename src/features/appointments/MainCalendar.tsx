'use client'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import ruLocale from '@fullcalendar/core/locales/ru';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import React, {memo, useRef, useState} from "react";
import {DateSelectArg, EventChangeArg, EventClickArg, EventContentArg} from "@fullcalendar/core";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Card, CardHeader} from "@/components/ui/card";
import {useAddAppointment, useDeleteAppointment, useEditAppointment} from "@/features/appointments/api/mutations";
import {useAppointments} from "@/features/appointments/api/queries";
import {useUser} from "@/hooks/use-auth";
import {AppointmentForm} from "@/features/appointments/components/forms/AppointmentForm";
import {AppointmentInput} from "@/features/appointments/types";
import {getTimeFromDate} from "@/lib/format-date";

const MainCalendar = () => {
    const {data: userData} = useUser();
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [dialogTitle, setDialogTitle] = useState<string>("Новая запись");
    const [currentAppointment, setCurrentAppointment] = useState<AppointmentInput | null>(null);
    const calendarRef = useRef<FullCalendar>(null);

    const {data: events, isLoading} = useAppointments();
    const {mutate: addEvent, isPending: isAddingEvent} = useAddAppointment();
    const {mutate: editAppointmentMutation, isPending: isEditingEvent} = useEditAppointment();
    const {mutate: deleteEvent, isPending: isDeletingEvent} = useDeleteAppointment();

    const isLoadingState = isLoading || isAddingEvent || isEditingEvent || isDeletingEvent;

    // Ресурсы для calendar
    const resources = [
        {id: 'A', title: 'Подъемник 1', eventColor: '#cfeea8', eventTextColor: '#062000', eventBorderColor: '#98af7a'},
        {id: 'B', title: 'Подъемник 2', eventColor: '#d6d5ff', eventTextColor: '#111030', eventBorderColor: '#a4a4c6'},
        {id: 'C', title: 'Подъемник 3', eventColor: '#feea8c', eventTextColor: '#433602', eventBorderColor: '#ccbc71'},
        {id: 'D', title: 'Диагност', eventColor: '#b8e6ff', eventTextColor: '#023350', eventBorderColor: '#87a9bc'},
        {id: 'E', title: 'Проход', eventColor: '#ffd6e5', eventTextColor: '#570228', eventBorderColor: '#c69dac'}
    ];

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setCurrentAppointment(null);
    };

    const handleEventClick = (clickInfo: EventClickArg) => {
        const event = clickInfo.event;

        // Проверяем наличие дат и создаем корректные объекты Date
        const startDate = event.start ? new Date(event.start) : new Date();
        const endDate = event.end ? new Date(event.end) : new Date(startDate.getTime() + 60 * 60 * 1000); // +1 час по умолчанию

        // Формируем данные для формы из существующего события
        setCurrentAppointment({
            id: event.id,
            title: event.title,
            start: startDate,
            end: endDate,
            allDay: event.allDay,
            resource: event.getResources()[0]?.id || 'A',
            description: event.extendedProps.description || '',
            orderId: event.extendedProps.orderId,
            createdBy: event.extendedProps.createdBy
        });

        setDialogTitle("Редактирование записи");
        setIsDialogOpen(true);
    };

    const handleSelectDate = (selected: DateSelectArg) => {
        // Проверяем наличие дат и создаем корректные объекты Date
        const startDate = selected.start ? new Date(selected.start) : new Date();
        const endDate = selected.end ? new Date(selected.end) : new Date(startDate.getTime() + 60 * 60 * 1000); // +1 час по умолчанию

        // Формируем новое событие на основе выбранных дат
        setCurrentAppointment({
            title: "",
            start: startDate,
            end: endDate,
            allDay: selected.allDay,
            resource: selected.resource ? selected.resource.id : 'A',
            description: "",
            createdBy: userData?.userId
        });

        setDialogTitle("Новая запись");
        setIsDialogOpen(true);
    };

    const handleEventChange = (changeInfo: EventChangeArg) => {
        const updatedEvent = {
            title: changeInfo.event.title,
            start: changeInfo.event.startStr,
            end: changeInfo.event.endStr,
            resource: changeInfo.event.getResources()[0]?.id,
            description: changeInfo.event.extendedProps.description,
            orderId: changeInfo.event.extendedProps.orderId
        };

        editAppointmentMutation({
            eventId: Number(changeInfo.event.id),
            updatedEvent: updatedEvent
        });
    };

    const handleCreateAppointment = (data: AppointmentInput) => {
        addEvent(data, {
            onSuccess: () => {
                handleCloseDialog();
                if (calendarRef.current) {
                    calendarRef.current.getApi().unselect();
                }
            }
        });
    };

    const handleUpdateAppointment = (eventId: number, data: AppointmentInput) => {
        editAppointmentMutation({
            eventId: eventId,
            updatedEvent: data
        }, {
            onSuccess: () => {
                handleCloseDialog();
            }
        });
    };

    const handleDeleteAppointment = (eventId: number) => {
        deleteEvent(String(eventId), {
            onSuccess: () => {
                handleCloseDialog();
            }
        });
    };

    // Кастомный рендер содержимого события
    const renderEventContent = (eventInfo: EventContentArg) => {
        const {event} = eventInfo;
        const orderId = event.extendedProps.orderId;
        const description = event.extendedProps.description;

        return (
            <div className="w-full overflow-hidden ">
                <div className="bg-background/50 rounded-t-sm p-1 text-xs">{getTimeFromDate(event.start)} -  {getTimeFromDate(event.end)}</div>
                <div className="font-semibold">{event.title}</div>

                {orderId && (
                    <div className="text-xs font-medium">
                        Заказ №{orderId}
                    </div>
                )}

                {description && (
                    <div className="text-xs mt-1 line-clamp-2">
                        {description}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="flex w-full gap-5">
            <section className="w-full">
                <Card>
                    <CardHeader>
                        <FullCalendar
                            ref={calendarRef}
                            locale={ruLocale}
                            timeZone="local"
                            firstDay={1}
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, resourceTimeGridPlugin]}
                            initialView="timeGridWeek"
                            headerToolbar={{
                                left: "dayGridMonth,timeGridWeek,resourceTimeGridDay",
                                center: "title",
                                right: "prev,today,next",
                            }}
                            resources={resources}
                            height={"80svh"}
                            events={events}
                            editable
                            selectable
                            selectMirror
                            select={handleSelectDate}
                            eventChange={handleEventChange}
                            slotMinTime="09:00:00"
                            slotMaxTime="22:00:00"
                            eventDisplay={"block"}
                            allDaySlot={false}
                            expandRows={true}
                            eventClick={handleEventClick}
                            eventContent={renderEventContent}
                        />

                        {/* Единая форма для создания и редактирования событий */}
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogContent className={'max-w-3xl'}>
                                <DialogHeader>
                                    <DialogTitle>{dialogTitle}</DialogTitle>
                                    <DialogDescription className={'sr-only'}></DialogDescription>
                                </DialogHeader>

                                {currentAppointment && (
                                    <AppointmentForm
                                        appointmentData={currentAppointment}
                                        onCreate={handleCreateAppointment}
                                        onUpdate={(eventId) => (data: AppointmentInput) => handleUpdateAppointment(eventId, data)}
                                        onDelete={handleDeleteAppointment}
                                        onSuccess={handleCloseDialog}
                                    />
                                )}
                            </DialogContent>
                        </Dialog>
                    </CardHeader>
                </Card>
            </section>
        </div>
    );
};

export default memo(MainCalendar);