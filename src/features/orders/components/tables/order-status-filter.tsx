import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {OrderStatus, statusOptions} from "@/features/orders/types";

interface OrdersStatusFilterProps {
    searchParams: URLSearchParams;
}



const OrdersStatusFilter = ({ searchParams }: OrdersStatusFilterProps) => {
    const router = useRouter();
    const pathname = usePathname();

    // Parse selected statuses from URL parameters
    const selectedStatusParam = searchParams.get("status") || "";
    const selectedStatuses = selectedStatusParam
        ? selectedStatusParam.split(",") as OrderStatus[]
        : statusOptions
            .filter(status => status.value !== OrderStatus.APPLICATION)
            .map(status => status.value);

    // Get counts for each status (in a real app you might fetch this from API)
    // For now, we'll just mock this
    const statusCounts = useMemo(() => {
        return statusOptions.reduce((acc, status) => {
            acc[status.value] = 10; // Mock count of 10 for each status
            return acc;
        }, {} as Record<OrderStatus, number>);
    }, []);

    const handleStatusChange = useCallback(
        (checked: boolean, value: OrderStatus) => {
            const newStatuses = [...selectedStatuses];

            if (checked) {
                if (!newStatuses.includes(value)) {
                    newStatuses.push(value);
                }
            } else {
                const index = newStatuses.indexOf(value);
                if (index > -1) {
                    newStatuses.splice(index, 1);
                }
            }

            // Create new search params
            const newSearchParams = new URLSearchParams(searchParams.toString());

            if (newStatuses.length === 0 ||
                (newStatuses.length === statusOptions.length)) {
                // If no statuses or all statuses selected, remove the parameter
                newSearchParams.delete("status");
            } else {
                newSearchParams.set("status", newStatuses.join(","));
            }

            // Preserve page parameter but reset to 1 when filter changes
            newSearchParams.set("page", "1");

            // Update URL with new parameters
            router.push(`${pathname}?${newSearchParams.toString()}`);
        },
        [selectedStatuses, searchParams, router, pathname]
    );

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">
                    <Filter
                        className="-ms-1 me-2 opacity-60"
                        size={16}
                        strokeWidth={2}
                        aria-hidden="true"
                    />
                    Status
                    {selectedStatuses.length < statusOptions.length && (
                        <span className="-me-1 ms-3 inline-flex h-5 max-h-full items-center rounded border border-border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
              {selectedStatuses.length}
            </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="min-w-36 p-3" align="start">
                <div className="space-y-3">
                    <div className="text-xs font-medium text-muted-foreground">Filters</div>
                    <div className="space-y-3">
                        {statusOptions.map((option, i) => (
                            <div key={option.value} className="flex items-center gap-2">
                                <Checkbox
                                    id={`status-${i}`}
                                    checked={selectedStatuses.includes(option.value)}
                                    onCheckedChange={(checked: boolean) =>
                                        handleStatusChange(checked, option.value)
                                    }
                                />
                                <Label
                                    htmlFor={`status-${i}`}
                                    className="flex grow justify-between gap-2 font-normal"
                                >
                                    {option.label}{" "}
                                    <span className="ms-2 text-xs text-muted-foreground">
                    {statusCounts[option.value]}
                  </span>
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default OrdersStatusFilter;