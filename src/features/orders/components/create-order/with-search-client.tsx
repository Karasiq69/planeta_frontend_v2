'use client'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Search} from "lucide-react";
import * as React from "react";
import {useClientsList} from "@/features/clients/api/queries";
import useDebouncedSearch from "@/hooks/use-debounced-search";
import {useRouter} from "next/navigation";
import {useCreateOrder} from "@/features/orders/api/mutations";
import {IClient} from "@/features/clients/types";
import {ORDERS_URL} from "@/lib/constants";
import {formatPhone} from "@/lib/utils";
import {ComboboxSearch} from "@/components/ComboboxSearch";

type Props = {};
const WithSearchClient = (props: Props) => {
    const router = useRouter()
    // const [selectedClient, setSelectedClient] = useState("")
    const {searchTerm, searchError, debouncedHandleSearch} = useDebouncedSearch()
    const {data: clients, isLoading, isFetching} = useClientsList({
        searchTerm: searchTerm || undefined,
    })
    const {mutate: createOrder, isPending} = useCreateOrder()

    const handleSelectClient = (client: IClient) => {
        createOrder({clientId: client.id}, {
            onSuccess: (createdOrder) => {
                router.push(`${ORDERS_URL}/${createdOrder.id}`)
            }
        })
    }

    return (
        <Card className="flex-1">
            <CardHeader>
                <CardTitle className="text-lg flex gap-2 items-center">
                    <Search size={17}/>
                    Поиск клиента
                </CardTitle> <CardDescription>
                Найти существующего клиента и сразу добавить его автомобиль
            </CardDescription>
            </CardHeader>
            <CardContent>
                <ComboboxSearch<IClient>
                    data={clients}
                    isLoading={isLoading || isFetching || isPending}
                    onSearch={debouncedHandleSearch}
                    onSelect={handleSelectClient}
                    getDisplayValue={(client) => client.firstName}
                    renderItem={(client) => (
                        <div className="flex flex-col">
                            <span className="font-semibold">{formatPhone(client.phone)}</span>
                            {client.firstName && (
                                <span className="text-xs text-muted-foreground">
                            {client.firstName}
                        </span>
                            )}
                        </div>
                    )}
                    searchError={searchError}
                    placeholder="Выберите клиента..."
                />
            </CardContent>
        </Card>
    );
};
export default WithSearchClient;
