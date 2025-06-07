import {OperationType, OperationTypeEnum} from "@/features/inventory-documents/transfer/types";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {ControllerRenderProps} from "react-hook-form";
import {ArrowLeft, ArrowLeftRight, ArrowRightLeft, RotateCcw, Trash2, Wrench} from "lucide-react";

interface FormFieldSelectOperationProps {
    field: ControllerRenderProps<any, any>;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    id?: string;
}

const operationLabels = {
    [OperationType.TRANSFER]: 'Перемещение',
    [OperationType.WRITE_OFF]: 'Списание',
    [OperationType.SEND_TO_REPAIR]: 'Передача в ремонт',
    [OperationType.TRANSFER_IN_REPAIR]: 'Передача внутри ремонта',
    [OperationType.RETURN_FROM_REPAIR]: 'Возврат из ремонта',
    [OperationType.RETURN_FROM_OPERATION]: 'Возврат из эксплуатации'
};

const FormFieldSelectOperation: React.FC<FormFieldSelectOperationProps> = ({
                                                                               field,
                                                                               placeholder = "Выберите тип операции",
                                                                               disabled = false,
                                                                               className,
                                                                               id = "operation-select"
                                                                           }) => {
    return (
        <Select
            onValueChange={(value) => field.onChange(value)}
            value={field.value}
            disabled={disabled}
            name={field.name}
        >
            <SelectTrigger
                id={id}
                className={`[&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 [&>span_svg]:text-muted-foreground/80 ${className || ''}`}
            >
                <SelectValue placeholder={placeholder}/>
            </SelectTrigger>
            <SelectContent
                className="[&_*[role=option]>span>svg]:shrink-0 [&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2"
            >
                {Object.entries(operationLabels).map(([value, label]) => (
                    <SelectItem
                        key={value}
                        value={value}
                        className="flex gap-2"
                    >
                        {getOperationIcon(value as OperationTypeEnum)}
                        <span className="flex flex-col">
                            <span>{label}</span>
                        </span>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default FormFieldSelectOperation;

// Функция для получения иконки по типу операции
const getOperationIcon = (type: OperationTypeEnum) => {
    switch (type) {
        case OperationType.TRANSFER:
            return <ArrowRightLeft size={16} aria-hidden="true"/>;
        case OperationType.WRITE_OFF:
            return <Trash2 size={16} aria-hidden="true"/>;
        case OperationType.SEND_TO_REPAIR:
            return <Wrench size={16} aria-hidden="true"/>;
        case OperationType.TRANSFER_IN_REPAIR:
            return <ArrowLeftRight size={16} aria-hidden="true"/>;
        case OperationType.RETURN_FROM_REPAIR:
            return <RotateCcw size={16} aria-hidden="true"/>;
        case OperationType.RETURN_FROM_OPERATION:
            return <ArrowLeft size={16} aria-hidden="true"/>;
        default:
            return <ArrowRightLeft size={16} aria-hidden="true"/>;
    }
};