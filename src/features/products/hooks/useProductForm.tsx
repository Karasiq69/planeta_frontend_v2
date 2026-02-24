import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { useCreateProduct, useEditProduct } from '@/features/products/api/mutations'
import { productSchema } from '@/features/products/components/forms/schema'

import type { ProductFormData} from '@/features/products/components/forms/schema';
import type { Product } from '@/features/products/types'

export type ProductFormProps = {
  productData?: Product
  onCreate?: (data: Product) => void
  onUpdate?: (productId: number) => Product
}

export const useProductForm = ({ productData, onCreate, onUpdate }: ProductFormProps) => {
  const { mutate: createProduct, isPending: isCreating } = useCreateProduct()
  const { mutate: updateProduct, isPending: isUpdating } = useEditProduct(productData?.id as number)

  const defaultValues = useMemo(() => {
    return {
      name: productData?.name ?? '',
      description: productData?.description ?? '',
      price: productData?.price ?? 0,
      partNumber: productData?.partNumber ?? '',
      sku: productData?.sku ?? '',
      categoryId: productData?.categoryId ?? 1,
      brandId: productData?.brandId ?? 1,
      isOriginal: productData?.isOriginal ?? false,
      weight: productData?.weight ?? null,
      dimensions: productData?.dimensions ?? null,
    }
  }, [productData])

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    mode: 'onSubmit',
    defaultValues: defaultValues,
  })

  const onSubmit = (data: ProductFormData) => {
    if (productData) {
      updateProduct(
        {
          name: data.name,
          description: data.description,
          price: data.price,
          partNumber: data.partNumber,
          sku: data.sku,
          categoryId: data.categoryId,
          brandId: data.brandId,
          isOriginal: data.isOriginal,
          weight: data.weight,
          dimensions: data.dimensions,
        },
        {
          onSuccess: (data: Product) => onUpdate && onUpdate(data.id),
        }
      )
    } else {
      createProduct(
        {
          name: data.name,
          description: data.description,
          price: data.price,
          partNumber: data.partNumber,
          sku: data.sku,
          categoryId: data.categoryId,
          brandId: data.brandId,
          isOriginal: data.isOriginal,
          weight: data.weight,
          dimensions: data.dimensions,
        },
        {
          onSuccess: (data: Product) => onCreate && onCreate(data),
        }
      )
    }
  }

  const isLoading = isCreating || isUpdating

  return { form, onSubmit, isLoading, isUpdating, isCreating }
}
