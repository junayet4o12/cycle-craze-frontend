import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { productCategories, productFrameMaterial } from "@/constant/product.const";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

type PropsType = {
  setPriceRange: Dispatch<SetStateAction<number[]>>,
  priceRange: number[]
};

export default function Shop_FilterPanel({ setPriceRange, priceRange }: PropsType) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Extract filters from URL
  const categoryFilter = searchParams.get('category') || '';
  const frameFilter = searchParams.get('frameMaterial') || '';
  const priceRangeParam = searchParams.get('priceRange');

  // Sync priceRange state from URL on mount
  useEffect(() => {
    if (priceRangeParam) {
      const [min, max] = priceRangeParam.split("-").map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        setPriceRange([min, max]);
      }
    }
  }, [priceRangeParam, setPriceRange]);

  // Category filter
  const handleFilterCategory = (category: (typeof productCategories[number]) | 'all') => {
    if (category === 'all') searchParams.delete('category');
    else searchParams.set('category', category);
    setSearchParams(searchParams);
  };

  // Frame Material filter
  const handleFilterFrame = (frameMaterial: (typeof productFrameMaterial[number]) | 'all') => {
    if (frameMaterial === 'all') searchParams.delete('frameMaterial');
    else searchParams.set('frameMaterial', frameMaterial);
    setSearchParams(searchParams);
  };

  // Reset price range to default
  const handleResetPriceRange = () => {
    setPriceRange([0, 100000]);
    searchParams.delete("priceRange");
    setSearchParams(searchParams);
  };

  // Apply price range to search params
  const handlePriceRangeFilter = () => {
    const priceRangeText = priceRange.join("-");
    searchParams.set("priceRange", priceRangeText);
    setSearchParams(searchParams);
  };

  return (
    <div className="space-y-8">
      {/* Categories */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-foreground">Categories</h3>
          {categoryFilter && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleFilterCategory('all')}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Clear
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {['all', ...productCategories].map((category) => (
            <Button
              key={category}
              variant={categoryFilter === category || (category === 'all' && !categoryFilter) ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterCategory(category as any)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-foreground">Price Range</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetPriceRange}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Reset
          </Button>
        </div>

        <Slider
          value={priceRange}
          min={0}
          max={100000}
          step={1000}
          onValueChange={(value) => setPriceRange(value)}
          className="py-2"
        />

        <div className="flex justify-between text-sm text-muted-foreground">
          <span>৳{priceRange[0].toLocaleString()}</span>
          <span>৳{priceRange[1].toLocaleString()}</span>
        </div>

        <Button onClick={handlePriceRangeFilter} size="sm" className="w-full">
          Apply Price Filter
        </Button>
      </div>

      <Separator />

      {/* Frame Material */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-foreground">Frame Materials</h3>
          {frameFilter && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleFilterFrame('all')}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Clear
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {['all', ...productFrameMaterial].map((material) => (
            <Button
              key={material}
              variant={frameFilter === material || (material === 'all' && !frameFilter) ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterFrame(material as any)}
            >
              {material}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
