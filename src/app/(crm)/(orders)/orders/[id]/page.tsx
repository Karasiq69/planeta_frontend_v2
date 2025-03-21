import OrderPageWrapper from "@/features/orders/components/OrderPageWrapper";


const Page = async ({ params }: { params: { id: string } }) => {
    return (
        <OrderPageWrapper orderId={Number(params.id)}/>
    );
};
export default Page;
