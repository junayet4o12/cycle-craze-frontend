import { Button } from "@/components/ui/button";
import { IProduct } from "@/types";
import { Pencil, Trash, FileText,  MoreHorizontal, GalleryVerticalEnd } from "lucide-react";
import { useState } from "react";
import StatusBadge from "./MP_StatusBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteProductMutation } from "@/redux/features/product/productApi";
import { errorMessageGenerator } from "@/utils/errorMessageGenerator";
import { toast } from "sonner";
import EditProduct from "./EditProduct";
import MP_ProductGallery from "./MP_ProductGallery";
import MP_EditSpecification from "./MP_EditSpecification";
export default function MP_SingleProduct({ product }: { product: IProduct }) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [specificationOpen, setSpecificationOpen] = useState(false)
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const handleDeleteProduct = async () => {
    const toastId = toast.loading(`"${product.name}" is Deleting from the database...`)
    try {
      await deleteProduct(product._id).unwrap();
      toast.success("Product deleted successfully", { id: toastId })
    } catch (error) {
      toast.error(errorMessageGenerator(error), { id: toastId })
    }
  };

  // const handleViewDetails = () => {
  //   // Implementation for viewing product details
  // };

  // const handleViewSpecifications = () => {
  //   // Implementation for viewing product specifications
  // };

  return (
    <>
      <TableRow>
        <TableCell>
          <Avatar className="h-10 w-10 w-full object-cover rounded-lg">
            <AvatarImage src={product.images[0] || "/product-placeholder.png"} alt="product" className="object-cover" />
            <AvatarFallback>{product.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </TableCell>
        <TableCell className="font-medium">{product.name}</TableCell>
        <TableCell>{product.category}</TableCell>
        <TableCell>৳{product.price}</TableCell>
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
              {/* <DropdownMenuItem className="cursor-pointer" onClick={() => { }}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem> */}
              <DropdownMenuItem className="cursor-pointer"
                onClick={() => {
                  setTimeout(() => {
                    setGalleryOpen(true);
                  }, 50); // ⏱ slight delay lets the dropdown fully close
                }}
              >
                <GalleryVerticalEnd className="mr-2 h-4 w-4"

                />
                Gallery
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer"
                onClick={() => {
                  setTimeout(() => {
                    setSpecificationOpen(true);
                  }, 50); // ⏱ slight delay lets the dropdown fully close
                }}
              >
                <FileText className="mr-2 h-4 w-4" />
                Specifications
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer"
                onClick={() => {
                  setTimeout(() => {
                    setIsEditOpen(true);
                  }, 50); // ⏱ slight delay lets the dropdown fully close
                }}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit Product
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer text-primary"
                onClick={() => {
                  setTimeout(() => {
                    setIsDeleteDialogOpen(true);
                  }, 50); // ⏱ slight delay lets the dropdown fully close
                }}
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product:{" "}
              <span className="font-semibold">{product.name}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProduct} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Yes, Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <EditProduct isDialogOpen={isEditOpen} setIsDialogOpen={setIsEditOpen} product={product} />
      <MP_ProductGallery isDialogOpen={galleryOpen} setIsDialogOpen={setGalleryOpen} images={product.images} productId={product._id} />
      <MP_EditSpecification isDialogOpen={specificationOpen} setIsDialogOpen={setSpecificationOpen} product={product} />
    </>
  );
}