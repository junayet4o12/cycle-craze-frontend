import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { productCategories, productFrameMaterial } from "@/constant/product.const";
import { Dispatch, SetStateAction } from "react";
import { useSearchParams } from "react-router-dom";
type PropsType = {
    setPriceRange: Dispatch<SetStateAction<number[]>>,
    priceRange: number[]
}
export default function Shop_FilterPanel({ setPriceRange, priceRange }: PropsType) {
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryFilter = searchParams.get('category') || '';
    const frameFilter = searchParams.get('frameMaterial') || '';

    const handleFilterCategory = (category: (typeof productCategories[number]) | 'all') => {
        if (category === 'all') {
            searchParams.delete('category');
        } else {
            searchParams.set('category', category);
        }
        setSearchParams(searchParams);
    };
    const handleFilterFrame = (frameMaterial: (typeof productFrameMaterial[number]) | 'all') => {
        if (frameMaterial === 'all') {
            searchParams.delete('frameMaterial');
        } else {
            searchParams.set('frameMaterial', frameMaterial);
        }
        setSearchParams(searchParams);
    };

    const handleResetPriceRange = () => {
        setPriceRange([0, 100000]);
        searchParams.delete("priceRange");
        setSearchParams(searchParams);
    };
    const handlePriceRangeChange = (value: number[]) => {
        setPriceRange(value);
    };

    const handlePriceRangeFilter = () => {
        const priceRangeText = priceRange.join("-");
        searchParams.set("priceRange", priceRangeText);
        setSearchParams(searchParams);
    };
    return (
        <>
            {/* Category Filter */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sm">Categories</h3>
                    {categoryFilter && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleFilterCategory('all')}
                            className="h-6 text-xs text-muted-foreground hover:text-foreground"
                        >
                            Clear
                        </Button>
                    )}
                </div>
                <div className="space-y-1">
                    <Button
                        variant={!categoryFilter ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleFilterCategory('all')}
                        className="mr-2 mb-2"
                    >
                        All
                    </Button>
                    {productCategories.map((category) => (
                        <Button
                            key={category}
                            variant={categoryFilter === category ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleFilterCategory(category)}
                            className="mr-2 mb-2"
                        >
                            {category}
                        </Button>
                    ))}
                </div>
            </div>

            <Separator className="my-6" />

            {/* Price Range */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sm">Price Range</h3>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleResetPriceRange}
                        className="h-6 text-xs text-muted-foreground hover:text-foreground"
                    >
                        Reset
                    </Button>
                </div>

                <Slider
                    value={priceRange}
                    min={0}
                    max={100000}
                    step={1000}
                    onValueChange={handlePriceRangeChange}
                    className="py-4"
                />

                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">৳{priceRange[0].toLocaleString()}</span>
                    <span className="text-sm font-medium">৳{priceRange[1].toLocaleString()}</span>
                </div>

                <Button onClick={handlePriceRangeFilter} size="sm" className="w-full mt-2">
                    Apply Price Filter
                </Button>
            </div>


            <Separator className="my-6" />

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sm">Materials</h3>
                    {frameFilter && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleFilterCategory('all')}
                            className="h-6 text-xs text-muted-foreground hover:text-foreground"
                        >
                            Clear
                        </Button>
                    )}
                </div>
                <div className="space-y-1">
                    <Button
                        variant={!frameFilter ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleFilterFrame('all')}
                        className="mr-2 mb-2"
                    >
                        All
                    </Button>
                    {productFrameMaterial.map((frameMaterial) => (
                        <Button
                            key={frameMaterial}
                            variant={frameFilter === frameMaterial ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleFilterFrame(frameMaterial)}
                            className="mr-2 mb-2"
                        >
                            {frameMaterial}
                        </Button>
                    ))}
                </div>
            </div>
        </>
    );
}