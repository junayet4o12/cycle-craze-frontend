import { useParams } from "react-router-dom";
import { useOrderByTranIdQuery } from "@/redux/features/order/orderApi";
import { useAppDispatch } from "@/redux/hooks";
import { clearCart } from "@/redux/features/cart/cartSlice";
import OS_Loader from "@/components/modules/Order_Success/OS_Loader";
import OS_OrderNotFound from "@/components/modules/Order_Success/OS_OrderNotFound";
import OS_OrderDetails from "@/components/modules/Order_Success/OS_OrderDetails";
export default function OP_Success() {
    const { tranId } = useParams();
    const dispatch = useAppDispatch()
    const { data, isLoading } = useOrderByTranIdQuery(tranId || 'not-found')

    if (isLoading) {
        return (
            <OS_Loader />
        );
    }
    const orderData = data?.data
    if (!orderData) {
        return (
            <OS_OrderNotFound />
        );
    }
    dispatch(clearCart())
    return (
        <OS_OrderDetails orderData={orderData} />
    );
}