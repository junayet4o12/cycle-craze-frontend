import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";

const StatusBadge = ({ quantity }: { quantity: number }) => {
  const status =
    quantity <= 0
      ? "Out of Stock"
      : quantity <= 5
      ? "Low Stock"
      : "In Stock";

  const statusConfig = {
    "In Stock": {
      icon: <CheckCircle2 className="h-4 w-4 mr-1" />,
      className:
        "bg-green-200/60 text-green-800 dark:bg-green-800/20 dark:text-green-300 border border-green-300 dark:border-green-600 shadow-sm",
    },
    "Low Stock": {
      icon: <AlertCircle className="h-4 w-4 mr-1" />,
      className:
        "bg-yellow-200/60 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-300 border border-yellow-300 dark:border-yellow-600 shadow-sm",
    },
    "Out of Stock": {
      icon: <XCircle className="h-4 w-4 mr-1" />,
      className:
        "bg-red-200/60 text-red-800 dark:bg-red-800/20 dark:text-red-300 border border-red-300 dark:border-red-600 shadow-sm",
    },
  };

  const config = statusConfig[status];

  return (
    <Badge
      variant="outline"
      className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full transition-all ${config.className} h-max`}
    >
      {config.icon}
      <span className="capitalize">{status}</span>
    </Badge>
  );
};

export default StatusBadge;
