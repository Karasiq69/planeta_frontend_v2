'use client'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import ruLocale from '@fullcalendar/core/locales/ru';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';

import interactionPlugin from "@fullcalendar/interaction";
import React, {useRef, useState} from "react";
import {DateSelectArg, EventChangeArg, EventClickArg} from "@fullcalendar/core";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Popover, PopoverContent} from "@/components/ui/popover";
import {EventImpl} from "@fullcalendar/core/internal";
import {Separator} from "@/components/ui/separator";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {Trash} from "lucide-react";
import {useAddAppointment, useDeleteAppointment, useEditAppointment} from "@/features/appointments/api/mutations";
import {useAppointments} from "@/features/appointments/api/queries";
import {useUser} from "@/hooks/use-auth";

const MainCalendar = () => {
    const {data} = useUser()
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<EventImpl>();
    const [popoverPosition, setPopoverPosition] = useState({top: 0, left: 0});


    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [newEventTitle, setNewEventTitle] = useState<string>("");
    const [eventDesctiption, setEventDesctiption] = useState("");

    const [selectedResourceId, setSelectedResourceId] = useState<string>("A");
    const calendarRef = useRef<FullCalendar>(null);


    const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null);

    const {data: events, isLoading} = useAppointments()
    const {mutate: addEvent, isPending: isAddingEvent} = useAddAppointment();
    const {mutate: editAppointmentMutation, isPending} = useEditAppointment();
    const {mutate: deleteEvent, isPending: isDeletingEvent} = useDeleteAppointment();

    const isLoadingState = isLoading || isAddingEvent || isPending || isDeletingEvent
    const resources = [
        {id: 'A', title: 'Подъемник 1', eventColor: '#cfeea8', eventTextColor: '#062000', eventBorderColor: '#98af7a'},
        {id: 'B', title: 'Подъемник 2', eventColor: '#d6d5ff', eventTextColor: '#111030', eventBorderColor: '#a4a4c6'},
        {id: 'C', title: 'Подъемник 3', eventColor: '#feea8c', eventTextColor: '#433602', eventBorderColor: '#ccbc71'},
        {id: 'D', title: 'Диагност', eventColor: '#b8e6ff', eventTextColor: '#023350', eventBorderColor: '#87a9bc'},
        {id: 'E', title: 'Проход', eventColor: '#ffd6e5', eventTextColor: '#570228', eventBorderColor: '#c69dac'}
    ];
    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setNewEventTitle("");
        setEventDesctiption("");
        setSelectedResourceId("A");
    };


    const handleEventClick = (clickInfo: EventClickArg) => {
        const rect = clickInfo.el.getBoundingClientRect();
        const popoverWidth = 256; // Ширина вашего Popover (w-64 = 16rem = 256px)
        setPopoverPosition({
            top: rect.top,
            left: rect.left - popoverWidth - 10, // 10px отступ от события
        });
        setSelectedEvent(clickInfo.event);
        setPopoverOpen(true);
    };

    // function renderEventContent(eventInfo: any) {
    //     return (
    //         <div>
    //             <span className={'font-bolder text-ellipsis'}>{eventInfo.event?.title}</span>
    //             <p className={'font-light text-sm mb-0 '}>{eventInfo.timeText}</p>
    //             <p className={'font-light text-sm mb-0 '}>{eventInfo.event?.description}</p>
    //         </div>
    //     )
    // }

    const handleAddEvent = (e: React.FormEvent) => {
        e.preventDefault();
        if (newEventTitle && selectedDate) {
            const calendarApi = selectedDate.view.calendar;
            const newEvent = {
                // id: `${selectedDate.start.toISOString()}-${newEventTitle}`,
                title: newEventTitle,
                start: selectedDate.start,
                end: selectedDate.end,
                allDay: selectedDate.allDay,
                resource: selectedResourceId,
                description: eventDesctiption,
                createdBy: data?.userId
            };
            addEvent(newEvent);
            handleCloseDialog();
            calendarApi.unselect();
        }
    };

    const handleSelectDate = (selected: DateSelectArg) => {
        setSelectedDate(selected)
        if (selected.resource) {
            setSelectedResourceId(selected.resource.id)
        }
        setIsDialogOpen(true);
    }

    const handleEventChange = (changeInfo: EventChangeArg) => {
        const updatedEvent = {
            id: changeInfo.event.id,
            title: changeInfo.event.title,
            start: changeInfo.event.startStr,
            end: changeInfo.event.endStr,
            resource: changeInfo.event.getResources()[0]?.id,
            description: changeInfo.event.extendedProps.description, // Добавьте это


        };
        editAppointmentMutation(updatedEvent);
    };
    const handleDeleteEvent = (selectedEventId: string) => {
        deleteEvent(selectedEventId, {
            onSuccess: () => {
                setPopoverOpen(false)
            }
        })

    }
    return (
        <div className={'flex w-full gap-5'}>
            <section className={'w-full'}>
                {/*<> // card*/}
                <>
                    <>
                        <FullCalendar
                            ref={calendarRef}
                            locale={ruLocale}
                            timeZone="local"

                            firstDay={1}
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, resourceTimeGridPlugin]}
                            initialView="resourceTimeGridDay"
                            headerToolbar={{
                                left: "dayGridMonth,timeGridWeek,resourceTimeGridDay",
                                center: "title",
                                right: "prev,today,next",
                            }}
                            resources={resources}

                            height={"80svh"}
                            events={events}
                            editable selectable selectMirror
                            select={handleSelectDate}
                            eventChange={handleEventChange}
                            slotMinTime="09:00:00"
                            slotMaxTime="22:00:00"
                            // eventContent={renderEventContent} // custom render function
                            eventDisplay={'block'}
                            allDaySlot={false}
                            expandRows={true}
                            eventClick={handleEventClick}

                        />
                        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                            <PopoverContent align={'end'}
                                            className="w-64"
                                            style={{
                                                position: 'fixed', // Изменено с 'absolute' на 'fixed'
                                                top: `${popoverPosition.top}px`,
                                                left: `${popoverPosition.left}px`,
                                            }}
                            >
                                {selectedEvent && (
                                    <>
                                        <div className={'flex justify-between items-center'}>
                                            <h4>{selectedEvent.title} </h4>
                                            <Button
                                                size={'sm'}
                                                variant={'ghost'}
                                                disabled={isDeletingEvent}
                                                onClick={() => handleDeleteEvent(selectedEvent.id)}>
                                                <Trash className={'text-destructive'} size={18}/>
                                            </Button>
                                        </div>

                                        <div className={'mt-5 space-y-3'}>
                                            <Separator/>
                                            <div className={'text-sm text-muted-foreground'}>
                                                Начало:
                                                <p>{selectedEvent.start?.toLocaleString()}</p>
                                                Конец:
                                                <p>{selectedEvent.end?.toLocaleString()}</p>
                                            </div>
                                            <Separator/>
                                            <div className={'text-sm text-muted-foreground'}>
                                                Описание:
                                                <p> {selectedEvent.extendedProps.description || 'Нет описания'}</p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </PopoverContent>
                        </Popover>

                        {/*Form */}
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Новая запись
                                    </DialogTitle>
                                </DialogHeader>
                                <form className="space-y-4" onSubmit={handleAddEvent}>
                                    <Input
                                        type={"text"}
                                        name={'title'}
                                        placeholder={"Заголовок"}
                                        value={newEventTitle}
                                        onChange={(e) => setNewEventTitle(e.target.value)}
                                        required
                                        className="w-full"
                                    />
                                    <Select
                                        defaultValue={selectedResourceId}
                                        onValueChange={setSelectedResourceId}
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="" defaultValue={selectedResourceId}/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {resources.map((resource) => (
                                                <SelectItem key={resource.id} value={resource.id}>
                                                    {resource.title}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <Textarea name={'description'}
                                              value={eventDesctiption}
                                              onChange={(e) => setEventDesctiption(e.target.value)}
                                              placeholder="Описание записи (не обязателньо)"/>
                                    <Button
                                        variant={'default'}
                                        type="submit"
                                        size={'default'}
                                        className={'w-full'}
                                    >
                                        Создать
                                    </Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </>
                </>
            </section>
        </div>
    );
};
export default MainCalendar;