import { paymentMethod } from "@/constant/order.const";
import PaymentMethodBadge from "../../badge/PaymentMethodBadge";
import PaidStatusBadge from "../../badge/PaidStatusBadge";

type PropsType = {
  method: typeof paymentMethod[number];
  isPaid: boolean;
  transactionId?: string;
  payment?: number;
};

export default function MO_PaymentMethodBadge({
  method,
  isPaid,
  transactionId,
  payment,
}: PropsType) {


  return (
    <div className="flex flex-col gap-1.5">
      {/* Payment Method Badge */}

      <PaymentMethodBadge method={method} />
      {/* Payment Status */}
      {isPaid && <PaidStatusBadge isPaid={isPaid} payment={payment} transactionId={transactionId} />}
    </div>
  );
}
