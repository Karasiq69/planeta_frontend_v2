import {Skeleton} from "@/components/ui/skeleton";
import {Card, CardHeader} from "@/components/ui/card";

const OrderSkeletonCard = () => {
    return (
        <>
            <Card className={'h-[150px]'}>
                <CardHeader>
                    <div className="flex flex-col space-y-5">
                        <Skeleton className="h-10 w-10 rounded-full"/>
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-[222px]"/>
                            <Skeleton className="h-4 w-[211px]"/>
                        </div>
                    </div>
                </CardHeader>
            </Card>
        </>
    );
};
export default OrderSkeletonCard;
