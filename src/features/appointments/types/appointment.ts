import { EventInput } from '@fullcalendar/core';

export interface AppointmentInput extends EventInput {
    resource: string;
    orderId?: number;
    description?: string;
    status?: string;
}

export interface AppointmentResponse {
    id: number;
    title: string;
    description?: string;
    start: string;
    end: string;
    allDay: boolean;
    resource: string;
    orderId?: number;
    createdBy: number;
    status: string;
    createdAt: string;
    updatedAt: string;
}