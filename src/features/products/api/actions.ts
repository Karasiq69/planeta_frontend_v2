"use server"
import apiClient from "@/lib/auth/client";
import {Product} from "@/features/products/types";
import {PRODUCTS_URL} from "@/lib/constants";
import {ProductsListParams, ProductsListResponse} from "@/features/products/types/params";

export const getAllProductsListFn = async (params: ProductsListParams): Promise<ProductsListResponse> => {
    try {
        const res = await apiClient.get<ProductsListResponse>(PRODUCTS_URL, {
            params
        });
        return res.data;
    } catch (e) {
        throw new Error('Failed to fetch products');
    }
}
export const getProductsById = async (id: number): Promise<Product> => {
    try {
        const res = await apiClient.get<Product>(`${PRODUCTS_URL}/${id}`);
        return res.data;
    } catch (e) {
        throw new Error('Failed to fetch client');
    }
}