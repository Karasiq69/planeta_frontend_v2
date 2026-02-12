import {TypeMapping} from "@/types";
import {WarehouseTypeEnum} from "@/features/warehouse/types/warehouse";

export const warehouseTypeConfig: TypeMapping = {
    [WarehouseTypeEnum.MAIN]: {
        label: "Основной склад",
        variant: "success",
        description: "Основной склад для хранения товаров"
    },
    [WarehouseTypeEnum.WORKSHOP]: {
        label: "Мастерская",
        variant: "warning",
        description: "Склад мастерской"
    },
    [WarehouseTypeEnum.TRANSIT]: {
        label: "Транзитный",
        variant: "info",
        description: "Транзитный склад"
    },
    [WarehouseTypeEnum.DEFECTIVE]: {
        label: "Брак",
        variant: "destructive",
        description: "Склад бракованных товаров"
    }
};