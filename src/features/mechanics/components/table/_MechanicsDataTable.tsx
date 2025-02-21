// import React, {useMemo, useState} from "react";
// import {useSearchParams} from "next/navigation";
// import {getCoreRowModel, useReactTable} from "@tanstack/react-table";
// import LoaderSectionAnimated from "@/components/ui/LoaderSectionAnimated";
// import {useAllMechanics} from "@/features/mechanics/api/queries";
// import {_MechanicsColumnsDefs} from "@/features/mechanics/components/table/_MechanicsColumnsDefs";
// import DataTable from "@/components/common/table/data-table";
//
// type Props = {};
// const MechanicsDataTable = (props: Props) => {
//     const columns = useMemo(() => _MechanicsColumnsDefs, []);
//     const searchParams = useSearchParams();
//     const searchTerm = searchParams.get('search');
//     const [pagination, setPagination] = useState({
//         pageIndex: 0,
//         pageSize: 10
//     });
//
//     const {data, isLoading, isFetching} = useAllMechanics();
//
//     const table = useReactTable({
//         data: data || [],
//         columns: columns,
//         getCoreRowModel: getCoreRowModel(),
//     });
//
//     if (isLoading) return <LoaderSectionAnimated className={'rounded p-10'}/>;
//     if (!data) return <div className="p-4">No data available</div>;
//     return (
//         <>
//             <DataTable
//                 columns={columns}
//                 table={table}
//             />
//         </>
//     );
// };
// export default MechanicsDataTable;
