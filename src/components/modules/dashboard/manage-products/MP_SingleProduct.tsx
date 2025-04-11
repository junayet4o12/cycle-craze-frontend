import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { IProduct } from "@/types";
import { Pencil, Trash, FileText, Eye, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import StatusBadge from "./MP_StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableCell, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
export default function MP_SingleProduct({ product, viewMode }: { product: IProduct, viewMode: 'grid' | 'table' }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openEditDialog = () => {
    // setSelectedProduct(product)
    setIsDialogOpen(true);
  };

  const handleDeleteProduct = () => {
    // setProductList(productList.filter((product) => product.id !== id))
  };

  const handleViewDetails = () => {
    // Implementation for viewing product details
  };

  const handleViewSpecifications = () => {
    // Implementation for viewing product specifications
  };

  return (
    <>
      {viewMode === 'grid' ? <Card className="h-full flex flex-col shadow-sm hover:shadow-md transition-shadow duration-200">
        {/* Product Image with Category Badge */}
        <div className="relative">
          <div className="h-52 w-full overflow-hidden">
            <Avatar className="w-full h-full w-full object-cover rounded-lg">
              <AvatarImage src={product.images[0] || "/public/product-placeholder.png"} alt="/public/product-placeholder.png" className="object-cover" />
              <AvatarFallback>{product.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
          <Badge className="absolute top-3 left-3 bg-primary/90 hover:bg-primary">
            {product.category}
          </Badge>
          <StatusBadge quantity={product.quantity} />
        </div>

        {/* Product Information */}
        <CardHeader>
          <CardTitle className="text-lg font-medium line-clamp-1">{product.name}</CardTitle>
        </CardHeader>

        <CardContent className="flex-grow">
          <div className="flex justify-between items-center mb-3">
            <p className="font-semibold text-lg">${product.price.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">Stock: {product.quantity}</p>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description || "No description available for this product."}
          </p>
        </CardContent>

        <Separator />

        {/* Action Buttons */}
        <CardFooter className="grid grid-cols-2 gap-3 pt-4">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center justify-center"
            onClick={handleViewDetails}
          >
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center justify-center"
            onClick={handleViewSpecifications}
          >
            <FileText className="mr-2 h-4 w-4" />
            Specifications
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center justify-center"
            onClick={openEditDialog}
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit Product
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center justify-center text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleDeleteProduct}
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </CardFooter>
      </Card> :
        <TableRow>
          <TableCell>
            <Avatar className="h-10 w-10 w-full object-cover rounded-lg">
              <AvatarImage src={product.images[0] || "/public/product-placeholder.png"} alt="/public/product-placeholder.png" className="object-cover" />
              <AvatarFallback>{product.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
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
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDeleteProduct}>
                  <FileText className="mr-2 h-4 w-4" />
                  Specifications
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDeleteProduct}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Product
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDeleteProduct}>
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>}
    </>
  );
}