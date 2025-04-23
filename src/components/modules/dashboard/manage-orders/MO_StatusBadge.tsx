import { Badge } from "@/components/ui/badge"
import { order_status } from "@/constant/order.const"

const MO_StatusBadge = ({ status }: { status: typeof order_status[number] }) => {
    const variants = {
        "PENDING": "default",
        "SHIPPED": "warning",
        "DELIVERED": "destructive",
    }
    type VariantType = "default" | "destructive" | "secondary" | "outline" | null | undefined
    return <Badge variant={variants[status] as VariantType}>{status}</Badge>
}

export default MO_StatusBadge