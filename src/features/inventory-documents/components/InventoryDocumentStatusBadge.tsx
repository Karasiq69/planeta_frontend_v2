// 'use client'
// import {Badge} from "@/components/ui/badge";
// import {getStatusLabel, getStatusVariant} from "@/features/__inventory-documents_/helpers/status-helper";
// import {formatRelativeTime} from "@/lib/format-date";
// import {useInventoryDocument} from "../../../../__inventory-documents_/api/queries";
//
// type Props = {
//     documentId: number
// };
// const InventoryDocumentStatusBadge = ({documentId}: Props) => {
//     const {data: document, isLoading} = useInventoryDocument(documentId)
//     return (
//         <div className={'flex gap-2 items-center'}>
//             {(!isLoading && document?.document.status) &&
//                 <>
//                     <Badge variant={getStatusVariant(document?.document?.status)}>
//                         {getStatusLabel(document?.document?.status)}
//                     </Badge>
//
//                     <div className={'text-xs text-muted-foreground flex-col gap-2'}>
//                         <p>
//                             Обновлен: {formatRelativeTime(document.document.updatedAt)}
//                         </p>
//                         <p>
//                             Создан: {formatRelativeTime(document.document.createdAt)}
//                         </p>
//                     </div>
//                 </>
//
//             }
//
//         </div>
//     );
// };
// export default InventoryDocumentStatusBadge;
