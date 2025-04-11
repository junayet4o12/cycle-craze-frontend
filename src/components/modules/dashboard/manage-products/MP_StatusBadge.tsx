import { Badge } from "@/components/ui/badge"

const StatusBadge = ({ quantity }: { quantity: number }) => {
    const status = quantity <= 1 ? 'Out of Stock' : (quantity >= 0 && quantity <= 5) ? 'Low Stock' : 'In Stock'
    const variants = {
        "In Stock": "default",
        "Low Stock": "warning",
        "Out of Stock": "destructive",
    }
    type VariantType = "default" | "destructive" | "secondary" | "outline" | null | undefined
    return <Badge variant={variants[status] as VariantType}>{status}</Badge>
}

export default StatusBadge