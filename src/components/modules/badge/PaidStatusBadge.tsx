import { Badge } from "@/components/ui/badge";

export default function PaidStatusBadge({
    transactionId,
    payment,
    isPaid,
}: {
    transactionId?: string;
    payment?: number;
    isPaid: boolean;
}) {
    return (
        <div className="flex flex-col gap-0.5">
            {isPaid ? (
                <Badge
                    variant="outline"
                    className="text-green-700 dark:text-green-300 border border-green-300 dark:border-green-600 bg-green-100/40 dark:bg-green-800/10 text-xs px-2 py-0.5 rounded-full shadow-sm w-fit"
                >
                    Paid {payment ? `৳${payment.toLocaleString()}` : ""}
                </Badge>
            ) : (
                <Badge
                    variant="outline"
                    className="text-red-700 dark:text-red-300 border border-red-300 dark:border-red-600 bg-red-100/40 dark:bg-red-800/10 text-xs px-2 py-0.5 rounded-full shadow-sm w-fit"
                >
                    Unpaid
                </Badge>
            )}

            {transactionId && isPaid && (
                <p
                    className="text-xs text-muted-foreground truncate max-w-[160px]"
                    title={transactionId}
                >
                    ID: {transactionId}
                </p>
            )}
        </div>
    );
}
