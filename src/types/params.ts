// Общие параметры для списков
export type ListParams = {
    page?: number;
    pageSize?: number;
    searchTerm?: string;
}

// Общий ответ для списков, где T - тип данных (ICar, IService и т.д.)
export interface ListResponse<T> {
    data: T[];
    meta: {
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    };
}