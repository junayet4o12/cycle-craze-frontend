import { useParams } from "react-router-dom";

import { useOrderQuery } from "@/redux/features/order/orderApi";
import { useAppDispatch } from "@/redux/hooks";
import { clearCart } from "@/redux/features/cart/cartSlice";
import OS_Loader from "@/components/modules/Order_Success/OS_Loader";
import OS_OrderNotFound from "@/components/modules/Order_Success/OS_OrderNotFound";
import OS_OrderDetails from "@/components/modules/Order_Success/OS_OrderDetails";
export default function COD_Success() {
  const { id } = useParams();
  const dispatch = useAppDispatch()
  const { data, isLoading } = useOrderQuery(id || 'not-found', {
    skip: !id
  })

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