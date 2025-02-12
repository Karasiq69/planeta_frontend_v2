
export type ListParams = {
    page?: number;
    pageSize?: number;
    searchTerm?: string;
}

export interface ListResponse<T> {
    data: T[];
    meta: {
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    };
}