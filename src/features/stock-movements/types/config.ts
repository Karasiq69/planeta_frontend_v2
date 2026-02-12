import {DocumentMovementTypeEnum} from "@/features/inventory-documents/types";
import {TypeMapping} from "@/types";


export const movementTypeConfig: TypeMapping = {
    [DocumentMovementTypeEnum.RECEIPT]: {
        label: "Поступление",
        variant: "success",
        description: "Поступление товаров на склад"
    },
    [DocumentMovementTypeEnum.RESERVED]: {
        label: "Резервирование",
        variant: "warning",
        description: "Резервирование товаров"
    },
    [DocumentMovementTypeEnum.WRITE_OFF]: {
        label: "Списание",
        variant: "destructive",
        description: "Списание товаров со склада"
    },
    [DocumentMovementTypeEnum.RETURN]: {
        label: "Возврат",
        variant: "info",
        description: "Возврат товаров"
    },
    [DocumentMovementTypeEnum.INVENTORY]: {
        label: "Инвентаризация",
        variant: "secondary",
        description: "Инвентаризация товаров"
    },
    [DocumentMovementTypeEnum.TRANSFER]: {
        label: "Перемещение",
        variant: "default",
        description: "Перемещение товаров"
    }
};


