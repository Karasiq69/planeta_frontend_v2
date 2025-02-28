import { Skeleton } from "@/components/ui/skeleton";

export const InventoryDocumentFormSkeleton = () => {
    return (
        <div className="space-y-4">
            {/* Type field */}
            <div className="flex items-center">
                <Skeleton className="h-4 w-28 mr-4" />
                <Skeleton className="h-10 flex-1" />
            </div>

            {/* Number field */}
            <div className="flex items-center">
                <Skeleton className="h-4 w-28 mr-4" />
                <Skeleton className="h-10 flex-1 mr-2" />
                <Skeleton className="h-4 w-8 mr-2" />
                <Skeleton className="h-10 w-[240px]" />
            </div>

            {/* Supplier field */}
            <div className="flex items-center">
                <Skeleton className="h-4 w-28 mr-4" />
                <Skeleton className="h-10 flex-1" />
            </div>

            {/* Incoming number field */}
            <div className="flex items-center">
                <Skeleton className="h-4 w-28 mr-4" />
                <Skeleton className="h-10 flex-1 mr-2" />
                <Skeleton className="h-4 w-8 mr-2" />
                <Skeleton className="h-10 w-[240px]" />
            </div>

            {/* Warehouse field */}
            <div className="flex items-center">
                <Skeleton className="h-4 w-28 mr-4" />
                <Skeleton className="h-10 flex-1" />
            </div>

        </div>
    );
};