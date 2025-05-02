import { ChevronsUpDown, Package } from "lucide-react";
import { useState } from "react";

import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import MP_SingleProduct from "@/components/modules/dashboard/manage-products/MP_SingleProduct";
import AddProduct from "@/components/modules/dashboard/manage-products/AddProduct";
import { useProductsQuery } from "@/redux/features/product/productApi";

import { productCategories } from "@/constant/product.const";
import { TQueryParams } from "@/types";
import { useLocation, useSearchParams } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import DefaultPagination from "@/components/default-pagination";
import SearchItems from "@/components/search-items";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";


export default function ManageProducts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const queries = new URLSearchParams(location.search);
  const [priceRange, setPriceRange] = useState([0, 100000]) // example range
  const queryArray: TQueryParams[] = Array.from(queries.entries()).map(([key, value]) => ({
    name: key,
    value: value,
  }));
  const sort = searchParams.get('sort') || '';
  const categoryFilter = searchParams.get('category') || ''

  const params: TQueryParams[] | undefined = queryArray.length > 0 ? queryArray : undefined;

  const { data, isLoading, isFetching } = useProductsQuery(params);

  const isLoadingData = isLoading || isFetching;
  const products = data?.data || [];
  const meta = data?.meta;


  const handleSorting = (value: string) => {
    if (value === "none") {
      searchParams.delete('sort');
    } else {
      searchParams.set('sort', value);
    }
    setSearchParams(searchParams);
  };

  const handleFilterCategory = (category: (typeof productCategories[number]) | 'all') => {

    if (category === 'all') {
      searchParams.delete('category')
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value)


  }
  const handlePriceRangeFilter = () => {
    const priceRangeText = priceRange.join("-");
    searchParams.set("priceRange", priceRangeText);
    setSearchParams(searchParams);
  };

  const handleResetPriceRange = () => {
    setPriceRange([0, 100000]);
    searchParams.delete("priceRange");
    setSearchParams(searchParams);
  };
  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Top header */}
      <div className="flex justify-between items-center -mt-[3px]">
        <div className="flex items-center gap-2">
          <Package className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Manage Products</h1>
        </div>
        <AddProduct />
      </div>

      {/* Filters */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SearchItems placeholder="Search Products..." />
          <div className="flex justify-end gap-4">


            <div className="w-48">
              <div className="w-full">
                <div className="text-xs text-muted-foreground mb-2 flex justify-between">
                  <span>৳{priceRange[0]}</span>
                  <span>৳{priceRange[1]}</span>
                </div>
                <Slider
                  value={priceRange}
                  onValueChange={handlePriceRangeChange}
                  min={0}
                  max={100000}
                  step={10}
                  className="w-full"
                />
              </div>
              <div className="text-end flex mt-2 justify-end">
                <Button onClick={handleResetPriceRange} variant={"ghost"} size={"sm"}>Reset</Button>
                <Button onClick={handlePriceRangeFilter} variant={"outline"} size={"sm"}>Apply</Button>
              </div>
            </div>
            <Select value={sort} onValueChange={handleSorting}>
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

          </div>
        </div>

      </div>

      {/* Table */}
      <div className="">
        {isLoadingData ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Name </TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-12 w-12 rounded" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-16" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-12" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Skeleton className="h-8 w-8 rounded-md" />
                        <Skeleton className="h-8 w-8 rounded-md" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead> Name</TableHead>
                <TableHead className="cursor-pointer">

                  <DropdownMenu>
                    <DropdownMenuTrigger className="w-full cursor-pointer">
                      <div className="flex gap-2 items-center justify-between">
                        Category <ChevronsUpDown size={16} />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Category</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer" onClick={() => handleFilterCategory('all')} >All</DropdownMenuItem>
                      {
                        productCategories.map(item => <DropdownMenuItem className={`cursor-pointer ${item === categoryFilter && 'bg-accent'}`} onClick={() => handleFilterCategory(item)} key={item} >{item}</DropdownMenuItem>)
                      }
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <MP_SingleProduct key={product._id} product={product} />
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      {
        meta && <DefaultPagination meta={meta} />
      }
    </div>
  );
}
