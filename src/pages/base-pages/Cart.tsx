import { selectCurrentCartProducts } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  increaseQuantity,
  decreaseQuantity,
  removeProduct,
  clearCart
} from "@/redux/features/cart/cartSlice";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
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
import { MinusIcon, PlusIcon, Trash2Icon, ShoppingCartIcon } from "lucide-react";
import { toast } from "sonner";

export default function Cart() {
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector(selectCurrentCartProducts);

  const totalPrice = cartProducts.reduce(
    (total, product) => total + product.price * product.orderQuantity,
    0
  );

  const handleIncrease = (id: string) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = (id: string) => {
    dispatch(decreaseQuantity(id));
  };

  const handleRemove = (id: string) => {
    if (id) {
      dispatch(removeProduct(id));
      toast.success("Product removed from cart");
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("All items removed from cart");
  };


  if (cartProducts.length === 0) {
    return (
      <section className="py-8 px-4 max-w-4xl mx-auto text-center">
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <ShoppingCartIcon className="w-16 h-16 text-gray-400" />
          <h2 className="text-2xl font-semibold">Your cart is empty</h2>
          <p className="text-gray-500">Add some products to your cart to see them here.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 px-4 max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Shopping Cart ({cartProducts.length})</h1>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <Trash2Icon className="mr-2 h-4 w-4" /> Clear Cart
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will remove all items from your cart. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleClearCart}>Clear All</AlertDialogAction>
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
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartProducts.map((product) => (
                <TableRow key={product._id}>
                  <TableCell className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/api/placeholder/64/64";
                          }}
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">{product.name}</h3>
                        <p className="text-xs text-gray-500">{product.brand}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>৳{product.price}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleDecrease(product._id)}
                        disabled={product.orderQuantity <= 1}
                      >
                        <MinusIcon className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{product.orderQuantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleIncrease(product._id)}
                      >
                        <PlusIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>৳{product.price * product.orderQuantity}</TableCell>
                  <TableCell>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2Icon className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Remove product</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to remove <strong>{product.name}</strong> from your cart?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleRemove(product._id)}>
                            Remove
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between items-center p-6 border-t">
          <div>
            <p className="text-sm text-gray-500">
              Shipping and taxes will be calculated at checkout
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">Total: ৳{totalPrice}</p>
            <Button className="mt-2">Proceed to Checkout</Button>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
}