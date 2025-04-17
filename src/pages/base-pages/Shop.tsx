import { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { SlidersHorizontal, Grid, ListFilter, X } from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
// Import shadcn/ui components
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

import { productCategories, productFrameMaterial } from "@/constant/product.const";
import { useProductsQuery } from "@/redux/features/product/productApi";
import { TQueryParams } from "@/types";
import ProductCard from "@/components/modules/shop/ProductCard";
import Shop_FilterPanel from "@/components/modules/shop/Shop_FilterPanel";
import SearchProducts from "@/components/search-products";
import DefaultPagination from "@/components/default-pagination";
import { GridToggler } from "@/components/modules/shop/GridToggler";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [gridNumber, setGridNumber] = useState<number>(3)
  const [gridNumberSmallDevice, setGridNumberSmallDevice] = useState<number>(2)
  const location = useLocation();
  const queries = new URLSearchParams(location.search);
  const [priceRange, setPriceRange] = useState<number[]>([0, 100000]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const queryArray: TQueryParams[] = Array.from(queries.entries()).map(([key, value]) => ({
    name: key,
    value: value,
  }));

  const sort = searchParams.get('sort') || '';
  const categoryFilter = searchParams.get('category') || '';
  const frameFilter = searchParams.get('frameMaterial') || '';
  const currentPriceRange = searchParams.get('priceRange')?.split('-').map(Number) || [0, 100000];

  const params: TQueryParams[] | undefined = queryArray.length > 0 ? queryArray : [];
  const finalParams = [...params, { name: 'fields', value: 'name,price,category,images,quantity,brand,frameMaterial,specifications' }];
  const { data, isLoading, isFetching } = useProductsQuery(finalParams);

  const isLoadingData = isLoading || isFetching;
  const products = data?.data || [];
  const meta = data?.meta;

  const handleNameSorting = (value: string) => {
    if (value === "none") {
      searchParams.delete('sort');
    } else {
      searchParams.set('sort', value);
    }
    setSearchParams(searchParams);
  };

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

  const handleClearAllFilters = () => {
    setSearchParams(new URLSearchParams());
    setPriceRange([0, 100000]);
  };
  console.log(gridNumber);
  return (
    <section className="py-8">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
        <div className="w-full md:w-80">
          <SearchProducts />
        </div>

        <div className="flex items-center gap-4 self-end md:self-auto">
          <Select value={sort} onValueChange={handleNameSorting}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Featured</SelectItem>
              <SelectItem value="price">Price: Low to High</SelectItem>
              <SelectItem value="-price">Price: High to Low</SelectItem>
              <SelectItem value="name">Name: A-Z</SelectItem>
              <SelectItem value="-name">Name: Z-A</SelectItem>
            </SelectContent>
          </Select>

          {/* Mobile filter trigger */}
          <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 px-4 py-8">
              <h2 className="text-lg font-semibold mb-6">Filters</h2>
              <ScrollArea className="h-[calc(100vh-8rem)]">
                <Shop_FilterPanel priceRange={priceRange} setPriceRange={setPriceRange} />
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Active filters */}
      {(categoryFilter || searchParams.get('priceRange') || frameFilter) && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <Badge variant="outline" className="bg-muted/50">
            Active Filters:
          </Badge>

          {categoryFilter && (
            <Badge
              variant="secondary"
              className="flex items-center gap-1"
            >
              {categoryFilter}
              <X
                className="h-3 w-3 ml-1 cursor-pointer"
                onClick={() => handleFilterCategory('all')}
              />
            </Badge>
          )}

          {frameFilter && (
            <Badge
              variant="secondary"
              className="flex items-center gap-1"
            >
              {frameFilter}
              <X
                className="h-3 w-3 ml-1 cursor-pointer"
                onClick={() => handleFilterFrame('all')}
              />
            </Badge>
          )}

          {searchParams.get('priceRange') && (
            <Badge
              variant="secondary"
              className="flex items-center gap-1"
            >
              Price: ${currentPriceRange[0].toLocaleString()} - ${currentPriceRange[1].toLocaleString()}
              <X
                className="h-3 w-3 ml-1 cursor-pointer"
                onClick={handleResetPriceRange}
              />
            </Badge>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAllFilters}
            className="text-xs h-7"
          >
            Clear All
          </Button>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        {/* Desktop Filters Sidebar */}
        <div className="hidden md:block w-64 shrink-0 relative">
          <Card className="sticky top-24">
            <CardContent className="px-4">
              <h2 className="text-lg font-semibold mb-6">Filters</h2>
              <Shop_FilterPanel priceRange={priceRange} setPriceRange={setPriceRange} />
            </CardContent>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {isLoadingData ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="p-4">
                    <Skeleton className="h-48 w-full rounded-md" />
                    <div className="space-y-2 mt-4">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <ListFilter className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground text-center max-w-md">
                Try adjusting your search or filter criteria to find what you're looking for.
              </p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={handleClearAllFilters}
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">
                  Showing <span className="font-medium text-foreground">{products.length}</span> products
                  {meta?.total && products.length !== meta.total && ` of ${meta.total}`}
                </p>
                <div className="hidden lg:block"><GridToggler gridNumber={gridNumber} setGridNumber={setGridNumber} /></div>
                <div className="lg:hidden"><GridToggler gridNumber={gridNumberSmallDevice} setGridNumber={setGridNumberSmallDevice} totalGrid={2} increaseBy={1} /></div>
              </div>
              

              <LayoutGroup>
                <motion.div
                  layout
                  className={`grid grid-cols-${gridNumberSmallDevice} lg:grid-cols-${gridNumber} gap-4 sm:gap-6`}
                >
                  <AnimatePresence>
                    {products.map((product) => (
                      <motion.div
                        key={product._id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </LayoutGroup>

              {
                meta && <DefaultPagination meta={meta} showItemPerPage={false} />
              }
            </>
          )}
        </div>
      </div>
    </section>
  );
}