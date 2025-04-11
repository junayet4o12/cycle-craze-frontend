
import { useState } from "react"
import { Package, Grid, List,} from "lucide-react"

import { Button } from "@/components/ui/button"

import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import MP_ProductCard from "@/components/modules/dashboard/manage-products/MP_ProductCard"
import { IProduct } from "@/types"
import MP_ProductRow from "@/components/modules/dashboard/manage-products/MP_ProductRow"
import AddProduct from "@/components/modules/dashboard/manage-products/AddProduct"

// Demo product data
export const products: IProduct[] = [
  {
    name: "TrailBlazer 500",
    brand: "Cyclone Bikes",
    price: 899.99,
    category: "Mountain",
    frameMaterial: "Aluminum",
    wheelSize: 27.5,
    quantity: 10,
    description: "A robust mountain bike built for off-road adventures and steep trails.",
    images: [
      "https://example.com/trailblazer500-front.jpg",
      "https://example.com/trailblazer500-side.jpg"
    ],
    specifications: [
      { key: "Brake Type", value: "Hydraulic Disc" },
      { key: "Suspension", value: "Front" },
      { key: "Gears", value: "21-speed" }
    ]
  },
  {
    name: "Speedster X2",
    brand: "VeloMax",
    price: 1199.5,
    category: "Road",
    frameMaterial: "Carbon",
    wheelSize: 28,
    quantity: 5,
    description: "Ultra-lightweight road bike designed for long-distance and high-speed rides.",
    images: [
      "https://example.com/speedsterx2-main.jpg",
      "https://example.com/speedsterx2-angled.jpg"
    ],
    specifications: [
      { key: "Weight", value: "7.8kg" },
      { key: "Brake Type", value: "Caliper" },
      { key: "Gears", value: "22-speed" }
    ]
  },
  {
    name: "Urban Glide",
    brand: "CityRider",
    price: 499.99,
    category: "Hybrid",
    frameMaterial: "Steel",
    wheelSize: 26,
    quantity: 15,
    description: "A comfortable hybrid bike perfect for commuting and casual rides.",
    images: [
      "https://example.com/urbanglide-1.jpg",
      "https://example.com/urbanglide-2.jpg"
    ],
    specifications: [
      { key: "Basket Included", value: "Yes" },
      { key: "Brake Type", value: "V-Brake" },
      { key: "Gears", value: "7-speed" }
    ]
  },
  {
    name: "TrickMaster Pro",
    brand: "StuntZone",
    price: 699.0,
    category: "BMX",
    frameMaterial: "Titanium",
    wheelSize: 20,
    quantity: 7,
    description: "Built for freestyle tricks and durability, the TrickMaster Pro handles anything.",
    images: [
      "https://example.com/trickmaster-front.jpg",
      "https://example.com/trickmaster-action.jpg"
    ],
    specifications: [
      { key: "Pegs", value: "Yes" },
      { key: "Brake Type", value: "U-Brake" },
      { key: "Weight", value: "10kg" }
    ]
  },
  {
    name: "EcoRide E200",
    brand: "VoltWheel",
    price: 1499.95,
    category: "Electric",
    frameMaterial: "Aluminum",
    wheelSize: 27.5,
    quantity: 4,
    description: "An electric bike designed for smooth, energy-efficient urban commuting.",
    images: [
      "https://example.com/ecoride-main.jpg",
      "https://example.com/ecoride-side.jpg"
    ],
    specifications: [
      { key: "Battery Range", value: "50km" },
      { key: "Charging Time", value: "4 hours" },
      { key: "Motor Power", value: "250W" }
    ]
  }
];

export default function ManageProducts() {
  const [viewMode, setViewMode] = useState("table")


  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Package className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Manage Products</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center border rounded-md p-1">
            <Button
              variant={viewMode === "table" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("table")}
              className="gap-1"
            >
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">Table</span>
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="gap-1"
            >
              <Grid className="h-4 w-4" />
              <span className="hidden sm:inline">Grid</span>
            </Button>
          </div>

         <AddProduct/>
        </div>
      </div>

      <div className="rounded-lg border shadow-sm p-4">
        {viewMode === "table" ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <MP_ProductRow key={product.name} product={product} />
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <MP_ProductCard key={product.name} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
