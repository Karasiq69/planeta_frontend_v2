import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {OrderServiceMechanic} from "@/features/orders/types";
import * as React from "react";

interface MechanicCardProps {
    mechanic: OrderServiceMechanic;
    onUpdate: (mechanicId: number, data: Partial<OrderServiceMechanic>) => void;
}

interface MechanicCardProps {
    mechanic: OrderServiceMechanic;
}

export const MechanicCard = ({mechanic}: MechanicCardProps) => {
    const initials = mechanic.mechanic.name.split(" ").map((n) => n[0]).join("");
    const logoUrl = "";

    const getPaymentTypeText = (type: "percent" | "fixed") => {
        return type === "percent" ? "Процент" : "Фиксированный";
    };

    return (
        <div className="flex items-center justify-between gap-3 p-2 bg-white rounded-md shadow-xs border">
            <div className="flex gap-2 items-center">
                <Avatar className="size-7">
                    <AvatarImage src={logoUrl}/>
                    <AvatarFallback className="bg-blue-100">{initials}</AvatarFallback>
                </Avatar>

                <div className="text-sm text-muted-foreground min-w-[120px] truncate">
                    <p>{mechanic.mechanic.name}</p>
                    <p className="text-xs">{mechanic.mechanic.specialization}</p>
                </div>
            </div>

            <div className="text-sm text-muted-foreground">
                {getPaymentTypeText(mechanic.paymentType)}
            </div>

            <div className="text-sm text-muted-foreground">
                {mechanic.participationPercentage}%
            </div>

            <div className="text-sm text-muted-foreground">
                {mechanic.paymentRate}
            </div>
        </div>
    );
};