import { useState } from "react"
import { Facebook, Twitter, Instagram, Share2, Heart, Scale, Ruler } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CartProduct, IProduct } from "@/types"
import { useAppDispatch } from "@/redux/hooks"
import { addProduct } from "@/redux/features/cart/cartSlice"

export default function PD_RightSideDetails({ product }: { product: IProduct }) {
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
    return (
        <Card className="w-full border-none shadow-none">
            <CardContent className="p-6">
                {/* Product Name and Badge */}
                <div className="flex items-start justify-between mb-4">
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    {product.quantity > 0 ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">In Stock</Badge>
                    ) : (
                        <Badge variant="destructive">Out of Stock</Badge>
                    )}
                </div>

                {/* Price */}
                <div className="mb-6">
                    <p className="text-2xl font-bold text-primary">৳{product.price}</p>
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

                    <div className="flex flex-col sm:flex-row gap-3">
                        <Button onClick={handleAddToCart} className="flex-1">Add to Cart</Button>
                        <Button variant="secondary" className="flex-1">Buy it now</Button>
                    </div>
                </div>

                <Separator className="my-6" />

                {/* Action buttons */}
                <div className="flex items-center justify-between">
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <Scale size={18} />
                        <span>Compare</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <Heart size={18} />
                        <span>Wishlist</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <Ruler size={18} />
                        <span>Size Guide</span>
                    </Button>
                </div>

                <Separator className="my-6" />

                {/* Share section */}
                <div className="mb-6">
                    <p className="text-sm font-medium mb-3">Share:</p>
                    <div className="flex gap-3">
                        <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                            <Facebook size={16} />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                            <Twitter size={16} />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                            <Instagram size={16} />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                            <Share2 size={16} />
                        </Button>
                    </div>
                </div>

                <Separator className="my-6" />

                {/* Product details tabs */}
                <Tabs defaultValue="description" className="w-full">
                    <TabsList className="grid grid-cols-2 mb-4">
                        <TabsTrigger value="description">Description</TabsTrigger>
                        <TabsTrigger value="specifications">Specifications</TabsTrigger>
                    </TabsList>
                    <TabsContent value="description" className="text-sm">
                        <div className="prose prose-sm max-w-none">
                            <p dangerouslySetInnerHTML={{ __html: product.description }}></p>
                        </div>
                    </TabsContent>
                    <TabsContent value="specifications">
                        <div className="space-y-3">
                            {/* Basic specs */}
                            <div className="grid grid-cols-2 text-sm">
                                <span className="font-medium">Brand:</span>
                                <span>{product.brand}</span>
                            </div>
                            <div className="grid grid-cols-2 text-sm">
                                <span className="font-medium">Category:</span>
                                <span>{product.category}</span>
                            </div>
                            <div className="grid grid-cols-2 text-sm">
                                <span className="font-medium">Material:</span>
                                <span>{product.frameMaterial}</span>
                            </div>
                            <div className="grid grid-cols-2 text-sm">
                                <span className="font-medium">Wheel Size:</span>
                                <span>{product.wheelSize}"</span>
                            </div>

                            {/* Dynamic specifications */}
                            {
                                product.specifications.length > 0 && <>
                                    <Separator className="my-3" />
                                    <h3 className="font-medium mb-2">Additional Specifications</h3>
                                    {product.specifications.map((spec, index) => (
                                        <div key={index} className="grid grid-cols-2 text-sm">
                                            <span className="font-medium">{spec.key}:</span>
                                            <span>{spec.value}</span>
                                        </div>
                                    ))}
                                </>
                            }

                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}