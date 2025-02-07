import {IClient} from "@/features/clients/types";

export type EngineType = 'diesel' | 'gasoline' | 'electric' | 'hybrid';

export interface ICarBrand {
    id: number;
    name: string;
    logo?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IEngine {
    id: number;
    brandId: number;            // Сделано обязательным
    engineType: EngineType;     // Сделано обязательным
    name: string;               // Сделано обязательным
    series: string;             // Сделано обязательным
    displacement: number;        // Сделано обязательным
    power: number;              // Сделано обязательным
    createdAt: string | Date;
    updatedAt: string | Date;
}

export interface ICarModel {
    id: number;
    brandId: number;
    name: string;
    series?: string;
    code?: string;
    engineId?: number;
    createdAt: string | Date;    // Раскомментировано
    updatedAt: string | Date;    // Раскомментировано
    engine?: IEngine;            // Добавлено для вложенной связи
}
export interface IMileage {
    id: number;
    carId: number;
    value: number;
    createdAt: Date;
    updatedAt: Date;
}

// Расширенные интерфейсы с отношениями
export interface ICarModelWithRelations extends ICarModel {
    engine?: IEngine;
}


// Базовый интерфейс для автомобиля
export interface ICar {
    id: number;
    ownerId: number;
    owner?: IClient
    brandId: number;          // Добавлено
    modelId: number;          // Добавлено
    year: number;
    vin: string;
    licensePlate: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    brand?: ICarBrand;
    model?: ICarModel;
    mileages: IMileage[]
}
// Типы для создания новых записей (без id и дат)
export type CreateCarBrand = Omit<ICarBrand, 'id' | 'createdAt' | 'updatedAt'>;
export type CreateEngine = Omit<IEngine, 'id' | 'createdAt' | 'updatedAt'>;
export type CreateCarModel = Omit<ICarModel, 'id' | 'createdAt' | 'updatedAt'>;
export type CreateCar = Omit<ICar, 'id' | 'createdAt' | 'updatedAt'>;
export type CreateMileage = Omit<IMileage, 'id' | 'createdAt' | 'updatedAt'>;

// Типы для обновления записей (все поля опциональны, кроме id)
export type UpdateCarBrand = Partial<Omit<ICarBrand, 'id'>> & { id: number };
export type UpdateEngine = Partial<Omit<IEngine, 'id'>> & { id: number };
export type UpdateCarModel = Partial<Omit<ICarModel, 'id'>> & { id: number };
export type UpdateCar = Partial<Omit<ICar, 'id'>> & { id: number };
export type UpdateMileage = Partial<Omit<IMileage, 'id'>> & { id: number };

// Типы для ответов API с вложенными отношениями
// export type CarResponse = ICarWithRelations;
// export type CarListResponse = ICarWithRelations[];