import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

const OrderSummarySkeleton = () => {
    return (
        <div className="space-y-6">
            {/* Первая карточка */}
            <div className="bg-muted rounded-lg border">
                {/* Заголовок */}
                <div className="flex flex-row items-start justify-between p-6 bg-background/80 rounded-t-lg border-b">
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-[150px]" />
                        <div className="space-y-1">
                            <Skeleton className="h-4 w-[200px]" />
                            <Skeleton className="h-4 w-[120px]" />
                        </div>
                    </div>
                    <Skeleton className="h-9 w-[130px]" />
                </div>

                {/* Контент */}
                <div className="p-6 space-y-5">
                    <div className="space-y-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                    <Separator />
                    <div className="space-y-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                </div>
            </div>

            {/* Вторая карточка */}
            <div className="bg-muted rounded-lg border">
                <div className="p-6 space-y-4 text-sm">
                    {/* Информация о заказе */}
                    <div className="space-y-3">
                        <Skeleton className="h-5 w-[140px]" />
                        <ul className="grid gap-3">
                            {[...Array(4)].map((_, i) => (
                                <li key={i} className="flex items-center justify-between">
                                    <Skeleton className="h-4 w-[100px]" />
                                    <Skeleton className="h-4 w-[50px]" />
                                </li>
                            ))}
                        </ul>
                    </div>

                    <Separator className="my-4" />

                    {/* Информация об оплате */}
                    <div className="space-y-3">
                        <Skeleton className="h-5 w-[140px]" />
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-4 w-[80px]" />
                            <Skeleton className="h-4 w-[100px]" />
                        </div>
                    </div>
                </div>

                {/* Футер */}
                <div className="border-t bg-muted/50 px-6 py-3">
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
        </div>
    )
}

export default OrderSummarySkeleton