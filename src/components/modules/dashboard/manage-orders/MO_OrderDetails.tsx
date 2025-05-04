import { useOrderQuery } from "@/redux/features/order/orderApi";
import OD_Loader from "../../order-details/OD_Loader";
import OD_NotFound from "../../order-details/OD_NotFound";
import OD_OrderData from "../../order-details/OD_OrderData";


export default function MO_OrderDetails({ id }: { id: string }) {

    const { data, isLoading } = useOrderQuery(id as string, {
        skip: !id
    });

    if (isLoading) {
        return (
            <div className="container mx-auto py-8 px-4">
                <OD_Loader />
            </div>
        );
    }

    const orderData = data?.data;

    if (!orderData) {
        return <OD_NotFound />
    }

    return <OD_OrderData orderData={orderData} />
}