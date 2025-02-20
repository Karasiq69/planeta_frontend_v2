export interface ProductBrand {
    id: number;
    name: string;
    slug: string | null;
    description: string | null;
    country: string | null;
    website: string | null;
    isPopular: boolean;
    createdAt: Date;
}

export interface ProductCategory {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    createdAt: Date;
}

export interface Product {
    id: number;
    categoryId: number;
    brandId: number;
    name: string;
    slug: string;
    sku: string;
    partNumber: string;
    description: string | null;
    price: number;
    isOriginal: boolean;
    weight: number | null;
    dimensions: string | null;
    isActive: boolean;
    brand: ProductBrand;
}
