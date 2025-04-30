import { clearWishlist, selectCurrentWishlistProducts } from "@/redux/features/wishlist/wishlistSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Heart, Trash2Icon } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow
  } from "@/components/ui/table";
import WishlistRow from "@/components/modules/wishlist/WishlistRow";
export default function Wishlist() {
    const dispatch = useAppDispatch()
    const wishlistProducts = useAppSelector(selectCurrentWishlistProducts)
    if (wishlistProducts.length === 0) {
        return (
            <section className="py-8 px-4 max-w-4xl mx-auto text-center">
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <Heart className="w-16 h-16 text-gray-400" />
                    <h2 className="text-2xl font-semibold">Your wishlist is empty</h2>
                    <p className="text-gray-500">Add some products to your wishlist to see them here.</p>
                </div>
            </section>
        );
    }
    const handleClearWishlist = () => {
        dispatch(clearWishlist())
    }
    return (
        <section className="py-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Wishlist ({wishlistProducts.length})</h1>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                            <Trash2Icon className="mr-2 h-4 w-4" /> Clear Wishlist
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will remove all items from your wishlist. This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleClearWishlist}>Clear All</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[300px]">Product</TableHead>
                                <TableHead>Date Added</TableHead>
                                <TableHead className="w-[80px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {wishlistProducts.map((product) => (
                                <WishlistRow key={product._id} product={product} />
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </section>
    );
}