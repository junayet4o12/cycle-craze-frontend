import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { IProduct } from "@/types";


export default function ProductCard({ product }: { product: IProduct }) {
    return (
        <Card className="overflow-hidden group">
            <div className="relative aspect-square bg-muted/20">
                <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="object-cover object-center h-full w-full transition-transform duration-300 group-hover:scale-105"
                />
                {product.quantity <= 5 && product.quantity > 0 && (
                    <Badge className="absolute top-3 left-3 bg-yellow-500">
                        Low Stock: {product.quantity} left
                    </Badge>
                )}
                {product.quantity === 0 && (
                    <Badge className="absolute top-3 left-3 bg-red-500">
                        Out of Stock
                    </Badge>
                )}
            </div>
            <CardContent className="p-4">
                <h3 className="font-medium line-clamp-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                    {product.brand || product.category}
                </p>
                <div className="mt-2 flex items-center justify-between">
                    <p className="font-bold">${product.price.toLocaleString()}</p>
                    <Badge variant="outline">{product.category}</Badge>
                </div>
            </CardContent>
            <CardFooter className="px-4 pb-4 pt-0">
                <Button className="w-full" disabled={product.quantity === 0}>
                    {product.quantity === 0 ? "Out of Stock" : "Add to Cart"}
                </Button>
            </CardFooter>
        </Card>
    );
}