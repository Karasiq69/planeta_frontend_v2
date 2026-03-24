export interface ProductBrand {
  id: number
  name: string
  slug: string | null
  description: string | null
  country: string | null
  website: string | null
  isPopular: boolean
  createdAt: Date
}

export interface ProductCategory {
  id: number
  name: string
  slug: string
  description: string | null
  createdAt: string
  productCount?: number
}

export interface Product {
  id: number
  categoryId: number | null
  brandId: number | null
  name: string
  slug: string
  sku: string
  partNumber: string
  description: string | null
  price: string
  unit: string
  isOriginal: boolean | null
  weight: string | null
  dimensions: string | null
  isActive: boolean | null
  brand: ProductBrand
  createdAt: string
  updatedAt: string
  totalStock: string
}

export interface CreateProductPayload {
  name: string
  price: number
  partNumber: string
  sku: string
  description?: string | null
  categoryId?: number | null
  brandId?: number | null
  isOriginal?: boolean
  weight?: number | null
  dimensions?: string | null
}

export interface UpdateProductPayload {
  name?: string
  price?: number
  partNumber?: string
  sku?: string
  description?: string
  categoryId?: number
  brandId?: number
  isOriginal?: boolean
  weight?: number | null
  dimensions?: string | null
  isActive?: boolean
}
