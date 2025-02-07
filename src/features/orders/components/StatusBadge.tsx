import { LucideIcon } from 'lucide-react';
import { getStatusField } from "@/features/orders/lib/utils";
import { Badge } from "@/components/ui/badge";
import {OrderStatus} from "@/features/orders/types";

const StatusBadge = ({status}: { status?: OrderStatus }) => {
    const StatusIcon = getStatusField(status, 'icon') as LucideIcon;
    const color = getStatusField(status, 'color') as string;
    const statusLabel = getStatusField(status, 'label') as string;

    return (
        <Badge
            variant={'outline'}
            className={color}
        >
            {StatusIcon && <StatusIcon className="w-4 h-4 mr-2" />}
             {statusLabel}
        </Badge>
    );
}

export default StatusBadge;