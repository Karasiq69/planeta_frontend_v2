import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import * as React from "react";
import {Row} from "@tanstack/react-table";
import {OrderService} from "@/features/orders/types";
import {ArrowDownFromLine, ArrowUpFromLine, UsersRound} from "lucide-react";

interface Props {
    row: Row<OrderService>;
    table: any
}

const EmployeesCell: React.FC<Props> = ({row, table}) => {
    // const employees = row.originalSubRows;
    // if (!employees.length) {
    //     return null
    // }
    // const avatars = employees.map((emp: Mechanic) => ({
    //     name: emp.employee.full_name,
    //     url: emp.employee.avatar
    // }));


    return (
        <>
            <Button
            variant="outline"
            size={'sm'}
            // disabled={avatars.length < 1}
            onClick={() => row.toggleExpanded()}
            className={cn(
                'cursor-pointer ',
                row.getIsExpanded() && ' bg-gray-200', '')}>
            {/*<AvatarStack id="employees" variant="stack" avatars={avatars}/>*/}
                <UsersRound />
                <span className={'text-xs text-muted-foreground'}>{row.original.mechanics.length}</span>
        </Button>
            </>
    );
};

export default EmployeesCell;