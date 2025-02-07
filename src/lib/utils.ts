import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPhone = (phone: string) => {
  return phone.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '+7 ($1) $2-$3-$4');
};