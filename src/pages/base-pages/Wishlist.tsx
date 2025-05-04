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
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { CartProduct, IProduct, WishlistProductType } from "@/types";
import axios from "axios";
import { config } from "@/config/config";
import { toast } from "sonner";
import { addProduct } from "@/redux/features/cart/cartSlice";
import { Skeleton } from "@/components/ui/skeleton";
export default function Wishlist() {
    const [checkedProducts, setCheckedProducts] = useState<WishlistProductType[]>([]);
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useAppDispatch()
    const wishlistProducts = useAppSelector(selectCurrentWishlistProducts)
    const finalCheckedProducts = checkedProducts.filter(item => {
        const isItemExist = wishlistProducts.find(p => p._id === item._id)
        return isItemExist ? true : false
    });

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
    const handleCheckedChange = (value: boolean) => {
        if (value) {
            setCheckedProducts(wishlistProducts)
        } else {
            setCheckedProducts([])
        }

    }
    const isChecked = finalCheckedProducts.length === wishlistProducts.length;
    const handleAddToCart = async (products: WishlistProductType[]) => {

        const addToCartProduct: { product: CartProduct; quantity: number; }[] = []
        setIsLoading(true)
        for (const item of products) {
            try {
                const productItem = await axios.get(`${config.backend_api}/products/${item._id}?fields=quantity,name,images,price,brand`);
                const productItemData: IProduct = productItem.data.data;

                if (productItemData?._id) {
                    addToCartProduct.push({
                        product: {
                            _id: productItemData._id,
                            name: productItemData.name,
                            orderQuantity: 1,
                            image: productItemData.images[0],
                            price: productItemData.price,
                            brand: productItemData.brand,
                        },
                        quantity: productItemData.quantity
                    })
                }
            } catch {
                toast.error('Failed to fetch!!')

            }
        }
        if (addToCartProduct.length) {
            for (const item of addToCartProduct) {

                dispatch(addProduct(item))
            }
        }
        setIsLoading(false)

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
            <Card className="relative">
                {isLoading && <Skeleton className="absolute top-0 left-0 w-full h-full" />}
                <CardContent className="p-0 ">

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="min-w-[70px] w-[70px]">
                                    <div className="w-full flex justify-center items-center"> <Checkbox checked={isChecked} onCheckedChange={handleCheckedChange} /></div>
                                </TableHead>
                                <TableHead className="w-[300px]">Product</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Date Added</TableHead>
                                <TableHead className="w-[80px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {wishlistProducts.map((product) => (
                                <WishlistRow key={product._id} product={product} checkedProducts={finalCheckedProducts} setCheckedProducts={setCheckedProducts} />
                            ))}
                        </TableBody>
                    </Table>

                </CardContent>

            </Card>
            <div className="mt-4 space-x-4 text-end">
                <Button disabled={isLoading} onClick={() => handleAddToCart(finalCheckedProducts)} variant={"outline"}>Add selected to cart</Button>
                <Button disabled={isLoading} onClick={() => handleAddToCart(wishlistProducts)}>Add all to cart</Button>
            </div>
        </section>
    );
}