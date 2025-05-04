import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

import { CartProduct, IProduct } from "@/types"
import { useAppDispatch } from "@/redux/hooks"
import { addProduct, clearCart } from "@/redux/features/cart/cartSlice"
import PD_WishlistBtn from "./PD_WishlistBtn"
import { useNavigate } from "react-router-dom"
import StatusBadge from "../dashboard/manage-products/MP_StatusBadge"
import PD_Share from "./PD_Share"
import useIsAdmin from "@/hooks/useIsAdmin"
import { PencilLineIcon } from "lucide-react"
import EditProduct from "../dashboard/manage-products/EditProduct"

export default function PD_RightSideDetails({ product }: { product: IProduct }) {
    const [openEditForm, setOpenEditForm] = useState(false)
    const [isAdmin, isLoading] = useIsAdmin()
    const navigate = useNavigate()
    const [quantity, setQuantity] = useState(1)
    const dispatch = useAppDispatch()
    const incrementQuantity = () => {
        setQuantity((prev) => prev + 1)
    }

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1)
        }
    }
    const handleAddToCart = () => {
        const cartProduct: CartProduct = {
            _id: product._id,
            image: product.images[0],
            name: product.name,
            orderQuantity: quantity,
            price: product.price,
            brand: product.brand
        }
        dispatch(addProduct({ product: cartProduct, quantity: product.quantity }))

        setQuantity(1)
    }
    const handleBuyItNow = () => {
        dispatch(clearCart())
        handleAddToCart()
        navigate('/checkout')
    }
    const wishListData = {
        _id: product._id,
        name: product.name,
        image: product.images[0],
        brand: product.brand,
    }
    return (
        <>
            <Card className="w-full border-none shadow-none py-4">
                <CardContent className="px-6">
                    {/* Product Name and Badge */}
                    <div className="flex items-start justify-between mb-4">
                        <h3 className="font-bold">{product.name}</h3>
                        <div className="flex gap-2 items-end">
                            <StatusBadge quantity={product.quantity} />
                            {!isLoading && isAdmin && <Button onClick={() => setOpenEditForm(true)} variant={"outline"} size={"icon"} >
                                <PencilLineIcon className='cursor-pointer size-5' />
                            </Button>}
                        </div>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                        <p className="text-lg md:text-2xl font-bold text-primary">৳{product.price}</p>
                    </div>

                    <Separator className="mb-6" />

                    {/* Quantity and Buttons */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center border rounded-md">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-none"
                                    onClick={decrementQuantity}
                                >
                                    -
                                </Button>
                                <Input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    className="w-12 h-8 text-center border-0 p-0 focus-visible:ring-0"
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-none"
                                    onClick={incrementQuantity}
                                >
                                    +
                                </Button>
                            </div>
                            <span className="text-sm text-muted-foreground">
                                {product.quantity} available
                            </span>
                        </div>

                        <div className="flex flex-row gap-3">
                            <Button onClick={handleAddToCart} className="flex-1">Add to Cart</Button>
                            <Button onClick={handleBuyItNow} variant="secondary" className="flex-1">Buy it now</Button>
                        </div>
                    </div>

                    <Separator className="my-6" />

                    {/* Action buttons */}
                    <div className="flex items-center justify-between">
                        {/* <Button variant="ghost" size="sm" className="flex items-center gap-2">
                            <Scale size={18} />
                            <span>Compare</span>
                        </Button> */}
                        <PD_WishlistBtn data={wishListData} />
                        {/* <Button variant="ghost" size="sm" className="flex items-center gap-2">
                            <Ruler size={18} />
                            <span>Size Guide</span>
                        </Button> */}
                    </div>

                    <Separator className="my-6" />

                    {/* Share section */}
                    <div className="mb-6">
                        <p className="text-sm font-medium mb-3">Share:</p>
                        <PD_Share />
                    </div>


                </CardContent>
            </Card>
            {!isLoading && isAdmin &&  <EditProduct isDialogOpen={openEditForm} setIsDialogOpen={setOpenEditForm} product={product} />}
        </>
    );
}
