import { Badge } from "@/components/ui/badge";
import { order_status } from "@/constant/order.const";
import { CheckCircleIcon, ClockIcon, TruckIcon } from "lucide-react";

const MO_StatusBadge = ({ status }: { status: typeof order_status[number] }) => {
  const statusConfig = {
    PENDING: {
      icon: <ClockIcon className="h-4 w-4 mr-1" />,
      className:
        "bg-yellow-200/60 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-300 border border-yellow-300 dark:border-yellow-600 shadow-sm"
    },
    SHIPPED: {
      icon: <TruckIcon className="h-4 w-4 mr-1" />,
      className:
        "bg-sky-200/60 text-sky-800 dark:bg-sky-800/20 dark:text-sky-300 border border-sky-300 dark:border-sky-600 shadow-sm"
    },
    DELIVERED: {
      icon: <CheckCircleIcon className="h-4 w-4 mr-1" />,
      className:
        "bg-emerald-200/60 text-emerald-800 dark:bg-emerald-800/20 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-600 shadow-sm"
    }
  };

  const config = statusConfig[status] || statusConfig.PENDING;

  return (
    <Badge
      variant="outline"
      className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full transition-all ${config.className}`}
    >
      {config.icon}
      <span className="capitalize">{status.toLowerCase()}</span>
    </Badge>
  );
};

export default MO_StatusBadge;
