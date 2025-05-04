import { Badge } from "@/components/ui/badge";
import { paymentMethod } from "@/constant/order.const";
import { CreditCardIcon } from "lucide-react";


export default function PaymentMethodBadge({ method }: { method: typeof paymentMethod[number] }) {
    const isOnlinePayment = method === "Online Payment";
    return (
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
    );
}