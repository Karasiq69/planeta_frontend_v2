import {IClient} from "@/features/clients/types/index";

export type ClientListParams = {
    page?: number;
    pageSize?: number;
    searchTerm?: string;
}

export interface ClientListResponse {
    data: IClient[];
    meta: {
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    };
}