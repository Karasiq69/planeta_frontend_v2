 import {ICar} from "@/features/cars/types/index";

export type CarListParams = {
    page?: number;
    pageSize?: number;
    searchTerm?: string;
}

export interface CarListResponse {
    data: ICar[];
    meta: {
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    };
}