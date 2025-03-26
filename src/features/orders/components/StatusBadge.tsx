import { LucideIcon } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/features/orders/types";
import { cn } from "@/lib/utils";
import { getStatusData } from "@/features/orders/lib/statuses";

const StatusBadge = ({ status }: { status?: OrderStatus }) => {
    const { icon: StatusIcon, color, label } = getStatusData(status);

    return (
        <Badge
            variant={'outline'}
            className={cn(color, 'h-9 min-w-20 rounded-md')}
        >
            {StatusIcon && <StatusIcon className="w-4 h-4 mr-2" />}
            {label}
        </Badge>
    );
}

export default StatusBadge;