import { IProduct } from "@/types";
import { TableCell, TableRow } from "@/components/ui/table"
import StatusBadge from "./MP_StatusBadge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useState } from "react";
export default function MP_ProductRow({ product }: { product: IProduct }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const openEditDialog = () => {
        // setSelectedProduct(product)
        setIsDialogOpen(true)
    }

    const handleDeleteProduct = () => {
        // setProductList(productList.filter((product) => product.id !== id))
    }
    return (
        <TableRow>
            <TableCell>
                <img
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    width={40}
                    height={40}
                    className="rounded-md object-cover"
                />
            </TableCell>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>${product.price.toFixed(2)}</TableCell>
            <TableCell>{product.quantity}</TableCell>
            <TableCell>
                <StatusBadge quantity={product.quantity} />
            </TableCell>
            <TableCell className="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={openEditDialog}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleDeleteProduct}>
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    );
}