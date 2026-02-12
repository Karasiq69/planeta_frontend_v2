import {BadgeVariant} from "@/features/inventory-documents/receipt/helpers/status-helper";
import {TypeConfig, TypeMapping} from "@/types";
import {getTypeConfig} from "@/helpers/get-type-config";

export type OperationTypeEnum = (typeof OperationTypeEnum)[keyof typeof OperationTypeEnum];

export const OperationTypeEnum = {
    TRANSFER: 'TRANSFER',                    // Перемещение
    WRITE_OFF: 'WRITE_OFF',                 // Списание
    SEND_TO_REPAIR: 'SEND_TO_REPAIR',       // Передача в ремонт (основное)
    TRANSFER_IN_REPAIR: 'TRANSFER_IN_REPAIR', // Передача внутри ремонта
    RETURN_FROM_REPAIR: 'RETURN_FROM_REPAIR', // Возврат из ремонта
    RETURN_FROM_OPERATION: 'RETURN_FROM_OPERATION' // Возврат из эксплуатации
} as const;

export const operationTypeConfig: TypeMapping = {
    [OperationTypeEnum.TRANSFER]: {
        label: "Перемещение",
        variant: "info",
        description: "Перемещение товаров между складами"
    },
    [OperationTypeEnum.WRITE_OFF]: {
        label: "Списание",
        variant: "destructive",
        description: "Списание товаров"
    },
    [OperationTypeEnum.SEND_TO_REPAIR]: {
        label: "Передача в ремонт",
        variant: "warning",
        description: "Передача товаров в ремонт"
    },
    [OperationTypeEnum.TRANSFER_IN_REPAIR]: {
        label: "Перемещение в ремонте",
        variant: "secondary",
        description: "Внутренние перемещения в ремонте"
    },
    [OperationTypeEnum.RETURN_FROM_REPAIR]: {
        label: "Возврат из ремонта",
        variant: "success",
        description: "Возврат товаров из ремонта"
    },
    [OperationTypeEnum.RETURN_FROM_OPERATION]: {
        label: "Возврат из эксплуатации",
        variant: "info",
        description: "Возврат товаров из эксплуатации"
    }
};

export const getOperationTypeConfig = (type: OperationTypeEnum): TypeConfig => {
    return getTypeConfig(type, operationTypeConfig, "Неизвестная операция");
};

export const getOperationTypeLabel = (type: OperationTypeEnum): string => {
    return getOperationTypeConfig(type).label;
};

export const getOperationTypeVariant = (type: OperationTypeEnum): BadgeVariant => {
    return getOperationTypeConfig(type).variant;
};