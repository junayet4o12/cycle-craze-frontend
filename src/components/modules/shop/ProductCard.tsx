import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { IProduct } from "@/types";
import { Link } from "react-router-dom";
import { ShoppingCart, Info } from "lucide-react";

export default function ProductCard({ product }: { product: IProduct }) {
  return (
    <Link to={`/product-details/${product._id}`}>
      <Card className="overflow-hidden group transition-all duration-300 hover:shadow-lg pt-0">
        <div className="relative bg-gray-50 py-1 flex justify-center items-center overflow-hidden">
          <img 
            src={product.images?.[0]} 
            alt={product.name} 
            className="object-cover w-full transition-transform duration-500 group-hover:scale-105 aspect-[5/3]" 
          />
          {/* Stock badges */}
          {product.quantity <= 5 && product.quantity > 0 && (
            <Badge className="absolute top-3 left-3 bg-amber-500 text-white font-medium">
              Only {product.quantity} left
            </Badge>
          )}
          {product.quantity === 0 && (
            <Badge className="absolute top-3 left-3 bg-red-500 text-white font-medium">
              Out of Stock
            </Badge>
          )}
        </div>
        
        <CardContent className="p-4 pt-0 pb-0">
          <p className="text-xs font-medium text-foreground/70 uppercase tracking-wider mb-1">
            {product.brand || product.category}
          </p>
          {/* Product name */}
          <h5 className="line-clamp-1 hover:text-primary transition-colors">
            {product.name}
          </h5>
          {/* Price section */}
          <div className="sm:mt-2 flex items-center gap-2">
            <p className="font-bold">৳{product.price.toLocaleString()}</p>
          </div>
        </CardContent>
        
        <CardFooter className="px-4 flex gap-2">
          <Button 
            className="flex-1 font-medium text-xs h-9 px-2 sm:text-sm sm:px-3" 
            disabled={product.quantity === 0}
            variant={product.quantity === 0 ? "outline" : "default"}
          >
            <ShoppingCart className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">
              {product.quantity === 0 ? "Out of Stock" : "Add to Cart"}
            </span>
          </Button>
          <Button 
            className="flex-1 font-medium text-xs h-9 px-2 sm:text-sm sm:px-3" 
            variant="outline"
          >
            <Info className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Details</span>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}