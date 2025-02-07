import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import * as React from "react";
import {Row} from "@tanstack/react-table";
import {OrderService} from "@/features/orders/types";
import {ArrowDownFromLine, ArrowUpFromLine} from "lucide-react";

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
            // disabled={avatars.length < 1}
            onClick={() => row.toggleExpanded()}
            className={cn(
                'cursor-pointer px-0 w-full',
                row.getIsExpanded() && 'shadow-inner bg-gray-200', '')}>
            {/*<AvatarStack id="employees" variant="stack" avatars={avatars}/>*/}
            Исполнители
        </Button>
            </>
    );
};

export default EmployeesCell;