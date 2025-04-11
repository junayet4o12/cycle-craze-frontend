
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IProduct } from "@/types";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import StatusBadge from "./MP_StatusBadge";


export default function MP_ProductCard({ product }: { product: IProduct }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const openEditDialog = () => {
    // setSelectedProduct(product)
    setIsDialogOpen(true)
  }

  const handleDeleteProduct = () => {    
    // setProductList(productList.filter((product) => product.id !== id))
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{product.name}</CardTitle>
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
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center space-x-4">
          <img
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            width={80}
            height={80}
            className="rounded-md object-cover"
          />
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{product.category}</p>
            <p className="font-medium">${product.price.toFixed(2)}</p>
            <p className="text-sm">Stock: {product.quantity}</p>
            <StatusBadge quantity={product.quantity} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button variant="outline" size="sm" className="w-full" onClick={openEditDialog}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit Product
        </Button>
      </CardFooter>
    </Card>
  );
}