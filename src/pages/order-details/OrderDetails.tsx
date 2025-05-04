import OD_Loader from "@/components/modules/order-details/OD_Loader";
import OD_NotFound from "@/components/modules/order-details/OD_NotFound";
import OD_OrderData from "@/components/modules/order-details/OD_OrderData";
import { useOrderQuery } from "@/redux/features/order/orderApi";
import { useParams } from "react-router-dom";

export default function OrderDetails() {
  const { id } = useParams();
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