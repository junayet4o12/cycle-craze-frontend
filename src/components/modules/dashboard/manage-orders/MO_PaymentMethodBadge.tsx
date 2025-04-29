import { Badge } from "@/components/ui/badge";
import { paymentMethod } from "@/constant/order.const";
import { CreditCardIcon } from "lucide-react";

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
  const isOnlinePayment = method === "Online Payment";

  return (
    <div className="flex flex-col gap-1.5">
      {/* Payment Method Badge */}
      <Badge
        variant="outline"
        className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full transition-all shadow-sm 
          ${isOnlinePayment
            ? "text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-600 bg-purple-100/40 dark:bg-purple-800/10"
            : "text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600 bg-neutral-100/40 dark:bg-neutral-800/10"
          }`}
      >
        <CreditCardIcon className="h-4 w-4" />
        {method}
      </Badge>

      {/* Payment Status */}
      {isPaid && (
        <div className="flex flex-col gap-0.5">
          <Badge
            variant="outline"
            className="text-green-700 dark:text-green-300 border border-green-300 dark:border-green-600 bg-green-100/40 dark:bg-green-800/10 text-xs px-2 py-0.5 rounded-full shadow-sm w-fit"
          >
            Paid {payment ? `৳${payment.toLocaleString()}` : ""}
          </Badge>

          {transactionId && (
            <p
              className="text-xs text-muted-foreground truncate max-w-[160px]"
              title={transactionId}
            >
              ID: {transactionId}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
