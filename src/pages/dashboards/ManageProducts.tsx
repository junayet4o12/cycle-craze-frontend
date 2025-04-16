import { ArrowDown, ArrowUp, ChevronDown, ChevronsUpDown, ChevronUp, Package, Search, X } from "lucide-react";
import { ChangeEvent, useState } from "react";

import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import MP_SingleProduct from "@/components/modules/dashboard/manage-products/MP_SingleProduct";
import AddProduct from "@/components/modules/dashboard/manage-products/AddProduct";
import { useProductsQuery } from "@/redux/features/product/productApi";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { productCategories } from "@/constant/product.const";
import { TQueryParams } from "@/types";
import { useLocation, useSearchParams } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import DefaultPagination from "@/components/default-pagination";


export default function ManageProducts() {

  const [searchParams, setSearchParams] = useSearchParams();
  const [priceDropdownOpen, setPriceDropdownOpen] = useState(false);
  const location = useLocation();
  const queries = new URLSearchParams(location.search);
  const [priceRange, setPriceRange] = useState([0, 100000]) // example range
  const queryArray: TQueryParams[] = Array.from(queries.entries()).map(([key, value]) => ({
    name: key,
    value: value,
  }));
  const sort = searchParams.get('sort') || '';
  const categoryFilter = searchParams.get('category') || ''
  const searchingTextParams = searchParams.get('searchTerm') || ''

  const params: TQueryParams[] | undefined = queryArray.length > 0 ? queryArray : undefined;

  const { data, isLoading, isFetching } = useProductsQuery(params);

  const isLoadingData = isLoading || isFetching;
  const products = data?.data || [];
  const meta = data?.meta;

  const nameSorting = sort === 'name' ? 'name' : sort === '-name' ? '-name' : ''

  const handleNameSorting = () => {
    if (!nameSorting) {
      searchParams.set('sort', 'name');
    } else if (nameSorting === 'name') {
      searchParams.set('sort', '-name');
    } else if (nameSorting === '-name') {
      searchParams.delete('sort');
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

  const handleSearch = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const searchingText = e.target.searchTerm.value;

    if (!searchingText) {
      searchParams.delete('searchTerm');
    } else {
      searchParams.set('searchTerm', searchingText)
    }
    setSearchParams(searchParams);

  }

  const handleSearchSort = (type: '' | 'price' | '-price') => {
    if (!type) {
      searchParams.delete('sort');
    } else {
      searchParams.set('sort', type);
    }
    setSearchParams(searchParams);
  }

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value)


  }
  const handlePriceRangeFilter = () => {
    const priceRangeText = priceRange.join("-");
    searchParams.set("priceRange", priceRangeText);
    setSearchParams(searchParams);
    setPriceDropdownOpen(false); // 👈 close the dropdown
  };

  const handleResetPriceRange = () => {
    setPriceRange([0, 100000]);
    searchParams.delete("priceRange");
    setSearchParams(searchParams);
    setPriceDropdownOpen(false); // 👈 close the dropdown
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Top header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Package className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Manage Products</h1>
        </div>
        <AddProduct />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input name="searchTerm" defaultValue={searchingTextParams} placeholder="Search products..." />
          <Button variant={"outline"} size={"icon"}><Search /></Button>
        </form>


        {/* <div className="col-span-1  flex flex-col gap-1">
          <label className="text-sm font-medium">Price Range</label>
          <Slider defaultValue={[0, 1000]} max={2000} step={10} />
        </div> */}
      </div>

      {/* Table */}
      <div className="rounded-lg border shadow-sm p-4">
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
                <TableHead className="cursor-pointer">
                  <div onClick={handleNameSorting} className="flex gap-2 items-center justify-between">
                    Name
                    {nameSorting === 'name' && <ChevronUp size={16} />}
                    {nameSorting === '-name' && <ChevronDown size={16} />}
                    {!nameSorting && <ChevronsUpDown size={16} />}
                  </div>
                </TableHead>
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
                <TableHead className="cursor-pointer">
                  <DropdownMenu open={priceDropdownOpen} onOpenChange={setPriceDropdownOpen}>
                    <DropdownMenuTrigger className="w-full cursor-pointer">
                      <div className="flex gap-2 items-center justify-between">
                        Price <ChevronsUpDown size={16} />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-60 p-2">
                      <DropdownMenuLabel>Sort by Price</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleSearchSort("")}>
                        <X className="w-4 h-4 mr-2" /> Default
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSearchSort("price")}>
                        <ArrowUp className="w-4 h-4 mr-2" /> Low to High
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSearchSort("-price")}>
                        <ArrowDown className="w-4 h-4 mr-2" /> High to Low
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Filter by Range</DropdownMenuLabel>
                      <div className="px-2 py-3">
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
                        <div className="text-end space-x-2 mt-2">
                          <Button onClick={handleResetPriceRange} variant="ghost" size="sm">Reset</Button>
                          <Button onClick={handlePriceRangeFilter} variant="outline" size="sm">Save</Button>
                        </div>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableHead>
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
