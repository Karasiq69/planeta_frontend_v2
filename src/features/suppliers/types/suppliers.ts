export interface Supplier {
    id: number;
    name: string;                // Название компании-поставщика
    contactPerson: string;       // ФИО контактного лица
    phone: string;               // Телефон
    email: string;               // Email
    address?: string | null;     // Адрес (опционально)
    inn?: string | null;         // ИНН (опционально)
    kpp?: string | null;         // КПП (опционально)
    isActive: boolean;           // Активен ли поставщик
    createdAt: string;           // Дата создания
    updatedAt: string;           // Дата обновления
}