import { Badge } from "@/components/ui/badge";
import { TRole } from "@/types";
import { ShieldCheckIcon, UserIcon } from "lucide-react"; // More meaningful icons

const UserRoleBadge = ({ role }: { role: TRole }) => {
  const statusConfig = {
    user: {
      icon: <UserIcon className="h-4 w-4 mr-1" />,
      className:
        "bg-gray-200/60 text-gray-800 dark:bg-gray-700/30 dark:text-gray-200 border border-gray-300 dark:border-gray-500 shadow-sm",
    },
    admin: {
      icon: <ShieldCheckIcon className="h-4 w-4 mr-1" />,
      className:
        "bg-red-200/60 text-red-800 dark:bg-red-800/20 dark:text-red-300 border border-red-300 dark:border-red-600 shadow-sm",
    },
  };

  const config = statusConfig[role] || statusConfig.user;

  return (
    <Badge
      variant="outline"
      className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full transition-all ${config.className}`}
    >
      {config.icon}
      <span className="capitalize">{role.toLowerCase()}</span>
    </Badge>
  );
};

export default UserRoleBadge;
